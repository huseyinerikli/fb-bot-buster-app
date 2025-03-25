package com.fbbotbuster.service;

import com.fbbotbuster.dto.FollowerAnalysisRequest.TwitterCredentials;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

@Service
public class TwitterService {
    private static final String TWITTER_API_BASE_URL = "https://api.twitter.com/2";
    private final RestTemplate restTemplate;

    public TwitterService() {
        this.restTemplate = new RestTemplate();
    }

    public List<String> getFollowers(String username, TwitterCredentials credentials) {
        String url = TWITTER_API_BASE_URL + "/users/by/username/" + username;
        
        // Get user ID first
        HttpHeaders headers = createHeaders(credentials.getBearerToken());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        Map<String, Object> userData = userResponse.getBody();
        if (userData == null || !userData.containsKey("data")) {
            throw new RuntimeException("User not found");
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> data = (Map<String, Object>) userData.get("data");
        String userId = (String) data.get("id");

        // Get followers
        String followersUrl = TWITTER_API_BASE_URL + "/users/" + userId + "/followers";
        ResponseEntity<Map<String, Object>> followersResponse = restTemplate.exchange(
            followersUrl,
            HttpMethod.GET,
            entity,
            new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        Map<String, Object> followersData = followersResponse.getBody();
        if (followersData == null || !followersData.containsKey("data")) {
            return Collections.emptyList();
        }

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> followers = (List<Map<String, Object>>) followersData.get("data");
        return followers.stream()
            .map(follower -> (String) follower.get("username"))
            .toList();
    }

    private HttpHeaders createHeaders(String bearerToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(bearerToken);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }
} 