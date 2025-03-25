package com.fbbotbuster.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "bot_analysis")
public class BotAnalysis {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String username;
    
    @Column(nullable = false)
    private Double botProbability;
    
    @Column(length = 1000)
    private String analysisDetails;
    
    @Column(nullable = false)
    private LocalDateTime analyzedAt;
    
    @Column(nullable = false)
    private Integer followersCount;
    
    @Column(nullable = false)
    private Integer followingCount;
    
    @Column(nullable = false)
    private Integer tweetsCount;
    
    @Column(nullable = false)
    private Boolean isVerified;
    
    @Column(nullable = false)
    private LocalDateTime accountCreatedAt;
    
    @PrePersist
    protected void onCreate() {
        analyzedAt = LocalDateTime.now();
    }
} 