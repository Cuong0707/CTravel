package com.datn.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.datn.api.entity.dto.AuthenticationRequest;
import com.datn.api.entity.dto.AuthenticationResponse;
import com.datn.api.entity.dto.ChangePasswordRequest;
import com.datn.api.entity.dto.ProfileGoogle;
import com.datn.api.entity.dto.RegisterRequest;
import com.datn.api.entity.dto.ResetPasswordRequest;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.repository.UsersRepository;
import com.datn.api.services.AuthenticationService;
import com.datn.api.services.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService service;

	@Autowired
	UsersRepository usersRepository;

	@Autowired
	JwtService jwtService;

	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(service.register(request));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(service.authenticate(request));
	}

	@PostMapping("/login-google")
	public ResponseEntity<AuthenticationResponse> loginWithGoogle(@RequestBody ProfileGoogle profileGoogle) {
		System.out.println(profileGoogle.getEmail());
		return ResponseEntity.ok(service.loginWithGoogle(profileGoogle));
	}

	@PutMapping("/change-password")
	public ApiResponse<AuthenticationResponse> changePassword(@RequestBody ChangePasswordRequest request) {
		return ApiResponse.success(HttpStatus.OK, "Đổi mật khẩu thành công", service.changePassword(request));
	}

	@PostMapping("/forgot-password")
	public ApiResponse<?> forgotPassword(@RequestParam String email) {
		return service.forgotPassword(email);
	}

	@PostMapping("/reset-password")
	public ApiResponse<?> forgotPassword(@RequestBody ResetPasswordRequest request) {
		return service.resetPassword(request.getToken(), request.getPassword());
	}

}
