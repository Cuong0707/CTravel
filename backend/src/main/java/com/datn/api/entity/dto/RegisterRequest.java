package com.datn.api.entity.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
public class RegisterRequest {
	private String userID;
	private String fullname;
	private String password;
	private String email;
	private long districtId;
	private LocalDate birthday;
	private String avatar;
	private String address;
}
