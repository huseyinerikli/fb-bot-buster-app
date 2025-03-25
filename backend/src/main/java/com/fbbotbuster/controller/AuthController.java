package com.fbbotbuster.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private OAuth2AuthorizedClientService clientService;

    @GetMapping("/twitter")
    public ResponseEntity<Map<String, String>> getLoginUrl() {
        try {
            String loginUrl = "http://localhost:8080/api/oauth2/authorization/twitter";
            Map<String, String> response = new HashMap<>();
            response.put("url", loginUrl);
            response.put("message", "Redirecting to Twitter login...");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to generate login URL: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUser(
            @AuthenticationPrincipal OAuth2User principal) {
        
        if (principal == null) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }

        try {
            Map<String, Object> userData = new HashMap<>();
            userData.put("authenticated", true);
            userData.put("name", principal.getAttribute("name"));
            userData.put("username", principal.getAttribute("username"));
            userData.put("profileImageUrl", principal.getAttribute("profile_image_url"));

            return ResponseEntity.ok(userData);
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                "authenticated", false,
                "error", "Failed to get user data: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/success")
    public ResponseEntity<Map<String, Object>> authSuccess(
            @AuthenticationPrincipal OAuth2User principal,
            OAuth2AuthenticationToken authentication) {
        
        try {
            OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                authentication.getAuthorizedClientRegistrationId(),
                authentication.getName()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("access_token", client.getAccessToken().getTokenValue());
            response.put("user", principal.getAttributes());
            response.put("redirect_url", "http://localhost:3000/dashboard");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Authentication failed: " + e.getMessage());
            errorResponse.put("redirect_url", "http://localhost:3000/login?error=auth_failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/failure")
    public ResponseEntity<Map<String, String>> authFailure() {
        Map<String, String> response = new HashMap<>();
        response.put("success", "false");
        response.put("message", "Authentication failed");
        response.put("redirect_url", "http://localhost:3000/login?error=auth_failed");
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
} 