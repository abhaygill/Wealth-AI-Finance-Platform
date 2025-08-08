package com.wealth.finance.dto;

import java.util.List;

public class AIInsightsResponse {
    
    private String userId;
    private String month;
    private List<String> insights;
    private String summary;
    private List<Recommendation> recommendations;
    
    // Recommendation Inner Class
    public static class Recommendation {
        private String category;
        private String suggestion;
        private String impact;
        private double potentialSavings;
        
        public Recommendation() {}
        
        public Recommendation(String category, String suggestion, String impact, double potentialSavings) {
            this.category = category;
            this.suggestion = suggestion;
            this.impact = impact;
            this.potentialSavings = potentialSavings;
        }
        
        // Getters and Setters
        public String getCategory() {
            return category;
        }
        
        public void setCategory(String category) {
            this.category = category;
        }
        
        public String getSuggestion() {
            return suggestion;
        }
        
        public void setSuggestion(String suggestion) {
            this.suggestion = suggestion;
        }
        
        public String getImpact() {
            return impact;
        }
        
        public void setImpact(String impact) {
            this.impact = impact;
        }
        
        public double getPotentialSavings() {
            return potentialSavings;
        }
        
        public void setPotentialSavings(double potentialSavings) {
            this.potentialSavings = potentialSavings;
        }
    }
    
    // Constructors
    public AIInsightsResponse() {}
    
    public AIInsightsResponse(String userId, String month, List<String> insights, String summary) {
        this.userId = userId;
        this.month = month;
        this.insights = insights;
        this.summary = summary;
    }
    
    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getMonth() {
        return month;
    }
    
    public void setMonth(String month) {
        this.month = month;
    }
    
    public List<String> getInsights() {
        return insights;
    }
    
    public void setInsights(List<String> insights) {
        this.insights = insights;
    }
    
    public String getSummary() {
        return summary;
    }
    
    public void setSummary(String summary) {
        this.summary = summary;
    }
    
    public List<Recommendation> getRecommendations() {
        return recommendations;
    }
    
    public void setRecommendations(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }
} 