package com.datn.api.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.datn.api.enums.Role;
import com.datn.api.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class Users implements UserDetails {
	@Id
	@Column(name = "user_id", nullable = false, length = 60)
	private String userID;

	@Column(name = "password", nullable = true, length = 60)
	private String password;

	@Column(name = "token", nullable = true, length = 255)
	private String token;

	@Column(name = "fullname", nullable = false, length = 50)
	private String fullname;

	@Column(name = "avatar", nullable = true, length = -1)
	private String avatar;

	@Column(name = "phone_number", nullable = true, length = 11)
	private String phone_number;

	@Column(name = "email", nullable = false, length = 50, unique = true)
	private String email;

	@Column(name = "birthday", nullable = true)
	private LocalDate birthday;

	@Column(name = "address", nullable = true, length = -1)
	private String address;

	@Column(name = "registration_date", nullable = true)
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime registrationDate;

	@Column(name = "last_login", nullable = true)
	private LocalDateTime lastLogin;

	@Column(name = "is_Delete", nullable = false)
	private boolean isDelete;
	@Column(name = "status", nullable = true)
	@Enumerated(EnumType.STRING)
	private UserStatus status;

	@Column(name = "role", nullable = true)
	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Admins admins;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Partners partners;

	@ManyToOne
	@JoinColumn(name = "district_id")
	@JsonBackReference
	private Districts districts;

//	@OneToMany(mappedBy = "users")
//	@JsonManagedReference
//	List<Orders> orders;

	public Users(String user_id, String password, String token, String fullname, String email, String phone_number,
				 String avatar, LocalDate birthday, LocalDateTime registrationDate, LocalDateTime lastLogin,
				 UserStatus status, Role role, Districts districtID) {
		this.userID = user_id;
		this.password = password;
		this.token = token;
		this.fullname = fullname;
		this.avatar = avatar;
		this.phone_number = phone_number;
		this.email = email;
		this.birthday = birthday;
		this.registrationDate = registrationDate;
		this.lastLogin = lastLogin;
		this.status = status;
		this.role = role;
		this.districts = districtID;
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}
	@Override
	public String getPassword() {
		return password ;
	}
	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	// Tài khoản chưa bị khóa ?
	public boolean isAccountNonLocked() {
		return this.status != UserStatus.banned;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
