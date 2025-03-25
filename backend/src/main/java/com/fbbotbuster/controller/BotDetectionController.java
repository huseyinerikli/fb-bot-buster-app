package com.fbbotbuster.controller;

import com.fbbotbuster.dto.FollowerAnalysisRequest;
import com.fbbotbuster.model.BotAnalysis;
import com.fbbotbuster.service.BotDetectionService;
import com.fbbotbuster.service.TwitterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/bot-detection")
@CrossOrigin(origins = "http://localhost:3000")
public class BotDetectionController {

    @Autowired
    private BotDetectionService botDetectionService;

    @Autowired
    private TwitterService twitterService;

    @PostMapping("/analyze")
    public ResponseEntity<BotAnalysis> analyzeAccount(@RequestParam String username) {
        try {
            BotAnalysis analysis = botDetectionService.analyzeAccount(username);
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/analyze-followers")
    public ResponseEntity<Map<String, Object>> analyzeFollowers(@RequestBody FollowerAnalysisRequest request) {
        try {
            // Get followers using Twitter API
            List<String> followers = twitterService.getFollowers(
                request.getUsername(),
                request.getCredentials()
            );

            // Analyze each follower
            List<Map<String, Object>> botAccounts = new ArrayList<>();
            int suspectedBots = 0;

            for (String follower : followers) {
                BotAnalysis analysis = botDetectionService.analyzeAccount(follower);
                if (analysis.getBotProbability() > 0.7) { // 70% threshold for bot detection
                    suspectedBots++;
                    botAccounts.add(Map.of(
                        "username", follower,
                        "probability", Math.round(analysis.getBotProbability() * 100)
                    ));
                }
            }

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("totalAnalyzed", followers.size());
            response.put("suspectedBots", suspectedBots);
            response.put("botPercentage", followers.isEmpty() ? 0 :
                Math.round((double) suspectedBots / followers.size() * 100));
            response.put("botAccounts", botAccounts);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/analysis/{username}")
    public ResponseEntity<BotAnalysis> getLatestAnalysis(@PathVariable String username) {
        try {
            BotAnalysis analysis = botDetectionService.analyzeAccount(username);
            return ResponseEntity.ok(analysis);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
} 