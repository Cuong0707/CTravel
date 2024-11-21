package com.datn.api.services;

import java.nio.ByteBuffer;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.datn.api.entity.Users;
import com.datn.api.entity.dto.AuthenticationRequest;
import com.datn.api.entity.dto.AuthenticationResponse;
import com.datn.api.entity.dto.ChangePasswordRequest;
import com.datn.api.entity.dto.ProfileGoogle;
import com.datn.api.entity.dto.RegisterRequest;
import com.datn.api.enums.Role;
import com.datn.api.enums.UserStatus;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.exceptions.DuplicateRecordException;
import com.datn.api.exceptions.NotFoundException;
import com.datn.api.repository.DistrictRepository;
import com.datn.api.repository.UsersRepository;

import freemarker.template.Configuration;
import freemarker.template.Template;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UsersRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@Autowired
	UsersServiceImpl usersService;

	@Autowired
	private Configuration configFreemarker;

	@Autowired
	DistrictRepository districtRepository;

	@Autowired
	UsersRepository usersRepository;

	@Value("${datn.domain}")
	String domain;

	@Autowired
	MailerService mailerService;

	public AuthenticationResponse register(RegisterRequest request) {
		var user = repository.findByEmailAndPasswordNotNull(request.getEmail()).orElse(null);
		if (user != null)
			throw new DuplicateRecordException("Email đã tồn tại");
		var users = Users.builder().userID(shortUUID()).fullname(request.getFullname())

				.password(passwordEncoder.encode(request.getPassword())).email(request.getEmail())
				.districts(districtRepository.findById(request.getDistrictId()).get())
				.registrationDate(LocalDateTime.now()).status(UserStatus.active).role(Role.user)
				.lastLogin(LocalDateTime.now()).build()
				;
		var jwtToken = jwtService.generateToken(users);
		users.setToken(jwtToken);
		Users userSaved = repository.save(users);

		return AuthenticationResponse.builder().infoUser(usersService.usersToDto(userSaved)).token(jwtToken).build();
	}

	public ApiResponse<?> forgotPassword(String email) {
		Users userEntity = usersService.findUserByEmail(email)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy email"));
		if (userEntity != null) {
			String token = UUID.randomUUID().toString();
			userEntity.setToken(token);
			usersRepository.save(userEntity);
			try {
				Map<String, Object> model = new HashMap<>();
				model.put("display", userEntity.getFullname());
				model.put("link_reset_password", domain + "reset-password?t=" + token);
				Template t = configFreemarker.getTemplate("email-template.ftl");
				String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
				mailerService.send(email, "Lấy lại mật khẩu", html);
				return ApiResponse.success(HttpStatus.OK, "Success", null);
			} catch (Exception e) {
				System.out.println(e.getMessage());
				return ApiResponse.error(HttpStatus.BAD_REQUEST, "Bad Request", e.getMessage());
			}
		}
		return ApiResponse.error(HttpStatus.FAILED_DEPENDENCY, "Email not found", null);
	}

	public ApiResponse<?> resetPassword(String token, String password) {
		Users users = usersRepository.getUsersByToken(token)
				.orElseThrow(() -> new NotFoundException("Không đúng token"));
		users.setPassword(passwordEncoder.encode(password));
		repository.save(users);
		return ApiResponse.success(HttpStatus.OK, "Reset password success", null);
	}

	// request.getEmail()
	public AuthenticationResponse authenticate(AuthenticationRequest request)  {
		try {
			var users = repository.findByEmail(request.getEmail())
					.orElseThrow(() -> new NotFoundException("Email không tồn tại"));
			if(!passwordEncoder.matches(request.getPassword(),users.getPassword())){
				throw new DuplicateRecordException("Sai mật khẩu");
			}
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			users.setLastLogin(LocalDateTime.now());
			String jwtToken = jwtService.generateToken(users);
			users.setToken(jwtToken);
			Users userSaved = repository.save(users);
			return AuthenticationResponse.builder().infoUser(usersService.usersToDto(users)).token(jwtToken).build();
		} catch (DuplicateRecordException ex) {
			throw new DuplicateRecordException(ex.getMessage());
		}
	}

	public AuthenticationResponse loginWithGoogle(ProfileGoogle profileGoogle) {

		var users = Users.builder().userID(shortUUID()).fullname(profileGoogle.getName()).password(null).birthday(null)
				.email(profileGoogle.getEmail() + "--google").avatar(profileGoogle.getImageUrl()).address(null)
				.registrationDate(LocalDateTime.now()).status(UserStatus.active).role(Role.user).build();
		Optional<Users> optional = repository.findByEmailAndPasswordNull(users.getEmail());

		var userSaved = optional.isPresent() ? optional.get() : repository.save(users);
		var jwtToken = jwtService.generateToken(userSaved);

		return AuthenticationResponse.builder().infoUser(usersService.usersToDto(userSaved)).token(jwtToken).build();
	}

	public static String shortUUID() {
		UUID uuid = UUID.randomUUID();
		long l = ByteBuffer.wrap(uuid.toString().getBytes()).getLong();
		return Long.toString(l, Character.MAX_RADIX);
	}

	public AuthenticationResponse changePassword(ChangePasswordRequest request) {
		try {
			var user = UserCurrent.get();
			if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
				throw new DuplicateRecordException("Sai mật khẩu");
			}
			user.setPassword(passwordEncoder.encode(request.getNewPassword()));
			var userSaved = usersRepository.save(user);
			var jwtToken = jwtService.generateToken(userSaved);
			return AuthenticationResponse.builder().infoUser(usersService.usersToDto(userSaved)).token(jwtToken)
					.build();
		} catch (DuplicateRecordException ex) {
			throw new DuplicateRecordException("Sai mật khẩu");
		}
	}
}
