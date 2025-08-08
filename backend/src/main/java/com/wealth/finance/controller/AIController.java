package com.wealth.finance.controller;

import com.wealth.finance.dto.AIInsightsRequest;
import com.wealth.finance.dto.AIInsightsResponse;
import com.wealth.finance.service.GeminiAPIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.YearMonth;

@RestController
@RequestMapping("/api/ai")
@Tag(name = "AI Insights", description = "AI-powered financial insights APIs")
@CrossOrigin(origins = "*")
public class AIController {
    
    @Autowired
    private GeminiAPIService geminiAPIService;
    
    @PostMapping("/insights")
    @Operation(summary = "Get AI insights", description = "Get AI-generated financial insights for a month")
    public ResponseEntity<AIInsightsResponse> getAIInsights(@Valid @RequestBody AIInsightsRequest request) {
        AIInsightsResponse insights = geminiAPIService.getAIInsights(request.getUserId(), request.getMonth());
        return ResponseEntity.ok(insights);
    }
    
    @GetMapping("/insights")
    @Operation(summary = "Get AI insights by month", description = "Get AI-generated financial insights for a specific month")
    public ResponseEntity<AIInsightsResponse> getAIInsightsByMonth(
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth month) {
        AIInsightsResponse insights = geminiAPIService.getAIInsights(userId, month);
        return ResponseEntity.ok(insights);
    }
} 