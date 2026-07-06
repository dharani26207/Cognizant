package com.cognizant.springlearn.util;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.stereotype.Component;

import com.cognizant.springlearn.model.UserCredentials;

@Component
public class BasicAuthDecoder {

	private static final String BASIC_PREFIX = "Basic ";

	public UserCredentials decode(String authorizationHeader) {
		if (authorizationHeader == null || !authorizationHeader.startsWith(BASIC_PREFIX)) {
			throw new IllegalArgumentException("Missing or invalid Authorization header");
		}

		String base64Credentials = authorizationHeader.substring(BASIC_PREFIX.length());
		byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
		String credentials = new String(decodedBytes, StandardCharsets.UTF_8);

		int separatorIndex = credentials.indexOf(':');
		if (separatorIndex == -1) {
			throw new IllegalArgumentException("Invalid Basic authentication credentials");
		}

		String username = credentials.substring(0, separatorIndex);
		String password = credentials.substring(separatorIndex + 1);
		return new UserCredentials(username, password);
	}
}
