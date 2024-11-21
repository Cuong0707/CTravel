package com.datn.api.config;

import java.util.Arrays;

import com.datn.api.exceptions.ApiResponse;
import com.datn.api.exceptions.CustomExceptionHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Configuration
@EnableWebMvc
public class WebConfig  implements WebMvcConfigurer  {
	private static final Long MAX_AGE = 3600L;
	private static final int CORS_FILTER_ORDER = -102;

	@Value("${datn.domain}")
	private String domain;
	@Bean
	public ResponseEntityExceptionHandler notFoundException() {
		return new ResponseEntityExceptionHandler() {
			@ExceptionHandler(NoHandlerFoundException.class)
			public ApiResponse<Void> handleNoHandlerFoundException(NoHandlerFoundException ex) {
				return ApiResponse.error(HttpStatus.NOT_FOUND, ex.getMessage());
			}
		};
	}
	@Bean
	public FilterRegistrationBean corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin(domain);
		config.addAllowedHeader("*");
		config.setAllowedMethods(Arrays.asList(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(),
				HttpMethod.DELETE.name()));
		config.setMaxAge(MAX_AGE);
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

		bean.setOrder(CORS_FILTER_ORDER);
		return bean;
	}
	
}
