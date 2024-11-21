package com.datn.api.exceptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;

@Component
public class EntryPointExceptionHandler implements AccessDeniedHandler,AuthenticationEntryPoint {
	private static final Logger logger = LoggerFactory.getLogger(CustomExceptionHandler.class);
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
		handleErrorResponse(response, HttpStatus.FORBIDDEN, "Access Denied");
	}

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
		handleErrorResponse(response, HttpStatus.UNAUTHORIZED, "Unauthorized");
	}

	private void handleErrorResponse(HttpServletResponse response, HttpStatus httpStatus, String errorMessage) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());

		response.setStatus(httpStatus.value());
		response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
		logger.error(errorMessage);
		objectMapper.writeValue(response.getOutputStream(), ApiResponse.error(httpStatus, errorMessage));
	}
	}


