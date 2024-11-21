package com.datn.api.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ApiResponse<T> {
	private int status;
	private HttpStatus error;
	private String message;
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime time = LocalDateTime.now();
	private T data;

	public ApiResponse(HttpStatus status, String message) {
		this.status = status.value();
		this.error = status;
		this.message = message;
		this.time = LocalDateTime.now();
		this.data = null;
	}
	public ApiResponse(HttpStatus status, String message,T data) {
		this.status = status.value();
		this.error = status;
		this.message = message;
		this.time = LocalDateTime.now();
		this.data = data;
	}
	public static <T> ApiResponse<T> success(HttpStatus status, String message, T data) {
		return new ApiResponse<>(status, message, data);
	}

	public static <T> ApiResponse<T> error(HttpStatus status, String message) {
		return new ApiResponse<>(status, message);
	}
	public static <T> ApiResponse<T> error(HttpStatus status, String message, T data) {
		return new ApiResponse<>(status, message, data);
	}
}
