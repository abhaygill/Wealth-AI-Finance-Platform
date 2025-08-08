package com.wealth.finance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.YearMonth;

public class AIInsightsRequest {
    
    @NotBlank(message = "User ID is required")
    private String userId;
    
    @NotNull(message = "Month is required")
    private YearMonth month;
    
    // Constructors
    public AIInsightsRequest() {}
    
    public AIInsightsRequest(String userId, YearMonth month) {
        this.userId = userId;
        this.month = month;
    }
    
    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public YearMonth getMonth() {
        return month;
    }
    
    public void setMonth(YearMonth month) {
        this.month = month;
    }
    
    @Override
    public String toString() {
        return "AIInsightsRequest{" +
                "userId='" + userId + '\'' +
                ", month=" + month +
                '}';
    }
} 