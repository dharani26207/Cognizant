package com.cognizant.springlearn.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.model.TokenResponse;
import com.cognizant.springlearn.service.AuthenticationService;

@RestController
public class AuthenticationController {

	private final AuthenticationService authenticationService;

	public AuthenticationController(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}

	@GetMapping("/authenticate")
	public ResponseEntity<TokenResponse> authenticate(
			@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
		String token = authenticationService.authenticate(authorizationHeader);
		return ResponseEntity.ok(new TokenResponse(token));
	}
}
