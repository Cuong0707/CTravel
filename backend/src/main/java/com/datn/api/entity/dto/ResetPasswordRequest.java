package com.datn.api.entity.dto;

import lombok.Data;

@Data
public class ResetPasswordRequest {
	String password;
	String token;
}
