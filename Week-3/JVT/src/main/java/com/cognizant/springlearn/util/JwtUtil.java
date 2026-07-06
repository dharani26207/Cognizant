package com.cognizant.springlearn.util;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final SecretKey secretKey;
	private final long expirationMs;

	public JwtUtil(
			@Value("${jwt.secret}") String secret,
			@Value("${jwt.expiration-ms}") long expirationMs) {
		this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
		this.expirationMs = expirationMs;
	}

	public String generateToken(String username) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + expirationMs);

		return Jwts.builder()
				.subject(username)
				.issuedAt(now)
				.expiration(expiry)
				.signWith(secretKey, Jwts.SIG.HS256)
				.compact();
	}
}
