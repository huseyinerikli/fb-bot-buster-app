package com.fbbotbuster.repository;

import com.fbbotbuster.model.BotAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BotAnalysisRepository extends JpaRepository<BotAnalysis, Long> {
    Optional<BotAnalysis> findFirstByUsernameOrderByAnalyzedAtDesc(String username);
    boolean existsByUsername(String username);
} 