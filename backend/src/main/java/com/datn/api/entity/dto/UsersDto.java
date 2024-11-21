package com.datn.api.entity.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.datn.api.enums.Role;
import com.datn.api.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UsersDto {
	private String userID;
	private String fullname;
	private String email;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate birthday;
	private String phone_number;
	private String avatar;
	private String address;
	private UserStatus status;
	@JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss")
	private LocalDateTime registrationDate;
	private Role role;
	private PartnersDto partnersDto;
}
