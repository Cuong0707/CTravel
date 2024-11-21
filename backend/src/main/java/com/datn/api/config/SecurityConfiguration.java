package com.datn.api.config;

import com.datn.api.exceptions.CustomExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.datn.api.exceptions.EntryPointExceptionHandler;
import com.datn.api.jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {
	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;

	private final EntryPointExceptionHandler entryPointExceptionHandler;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.exceptionHandling(exception -> exception.authenticationEntryPoint(entryPointExceptionHandler))
				.authorizeHttpRequests((request) -> request
						.requestMatchers(HttpMethod.GET, "/api/v1/auth/**", "/api/v1/users/**", "/api/v1/services/**",
								"/api/v1/hotels/**", "/api/v1/hotel/**", "/api/v1/user/**","/api/v1/hotels-detail/**",
								"/oauth2/authorization/google", "/api/v1/fileUpload/**", "/api/v1/orders/**")
						.permitAll()
						.requestMatchers("/api/v1/districts/**", "/api/v1/provinces/**", "/api/v1/user/**",
								"/api/v1/hotels/search?**","/api/v1/orders/**")
						.permitAll()
						.requestMatchers(HttpMethod.POST,"/api/v1/auth/**").permitAll()
						.requestMatchers(
								"/api/v1/users",
								"/api/v1/users/avatar",
								"/api/v1/orders/users"
								).authenticated()
						.anyRequest().permitAll()
				)
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
