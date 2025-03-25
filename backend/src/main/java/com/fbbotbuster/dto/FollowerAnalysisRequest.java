package com.fbbotbuster.dto;

import lombok.Data;

@Data
public class FollowerAnalysisRequest {
    private String username;
    private TwitterCredentials credentials;

    @Data
    public static class TwitterCredentials {
        private String apiKey;
        private String apiSecret;
        private String bearerToken;
    }
} 