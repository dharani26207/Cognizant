package com.cognizant.springlearn.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cognizant.springlearn.model.UserCredentials;
import com.cognizant.springlearn.util.BasicAuthDecoder;
import com.cognizant.springlearn.util.JwtUtil;

@Service
public class AuthenticationService {

	private final BasicAuthDecoder basicAuthDecoder;
	private final JwtUtil jwtUtil;
	private final String expectedUsername;
	private final String expectedPassword;

	public AuthenticationService(
			BasicAuthDecoder basicAuthDecoder,
			JwtUtil jwtUtil,
			@Value("${app.auth.username}") String expectedUsername,
			@Value("${app.auth.password}") String expectedPassword) {
		this.basicAuthDecoder = basicAuthDecoder;
		this.jwtUtil = jwtUtil;
		this.expectedUsername = expectedUsername;
		this.expectedPassword = expectedPassword;
	}

	public String authenticate(String authorizationHeader) {
		UserCredentials credentials = basicAuthDecoder.decode(authorizationHeader);

		if (!expectedUsername.equals(credentials.getUsername())
				|| !expectedPassword.equals(credentials.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
		}

		return jwtUtil.generateToken(credentials.getUsername());
	}
}
