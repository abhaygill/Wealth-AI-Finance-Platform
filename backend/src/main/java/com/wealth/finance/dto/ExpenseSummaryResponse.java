package com.wealth.finance.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class ExpenseSummaryResponse {
    
    private BigDecimal totalSpent;
    private BigDecimal totalIncome;
    private BigDecimal netFlow;
    private BigDecimal budgetAmount;
    private BigDecimal remainingBudget;
    private double budgetUtilizationPercentage;
    private List<CategoryBreakdown> categoryBreakdown;
    private Map<String, BigDecimal> monthlyTrends;
    
    // Category Breakdown Inner Class
    public static class CategoryBreakdown {
        private String category;
        private BigDecimal amount;
        private double percentage;
        private String color;
        
        public CategoryBreakdown() {}
        
        public CategoryBreakdown(String category, BigDecimal amount, double percentage, String color) {
            this.category = category;
            this.amount = amount;
            this.percentage = percentage;
            this.color = color;
        }
        
        // Getters and Setters
        public String getCategory() {
            return category;
        }
        
        public void setCategory(String category) {
            this.category = category;
        }
        
        public BigDecimal getAmount() {
            return amount;
        }
        
        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }
        
        public double getPercentage() {
            return percentage;
        }
        
        public void setPercentage(double percentage) {
            this.percentage = percentage;
        }
        
        public String getColor() {
            return color;
        }
        
        public void setColor(String color) {
            this.color = color;
        }
    }
    
    // Constructors
    public ExpenseSummaryResponse() {}
    
    public ExpenseSummaryResponse(BigDecimal totalSpent, BigDecimal totalIncome, BigDecimal budgetAmount) {
        this.totalSpent = totalSpent;
        this.totalIncome = totalIncome;
        this.budgetAmount = budgetAmount;
        this.netFlow = totalIncome.subtract(totalSpent);
        this.remainingBudget = budgetAmount.subtract(totalSpent);
        this.budgetUtilizationPercentage = budgetAmount.compareTo(BigDecimal.ZERO) > 0 
            ? (totalSpent.doubleValue() / budgetAmount.doubleValue()) * 100 : 0;
    }
    
    // Getters and Setters
    public BigDecimal getTotalSpent() {
        return totalSpent;
    }
    
    public void setTotalSpent(BigDecimal totalSpent) {
        this.totalSpent = totalSpent;
    }
    
    public BigDecimal getTotalIncome() {
        return totalIncome;
    }
    
    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }
    
    public BigDecimal getNetFlow() {
        return netFlow;
    }
    
    public void setNetFlow(BigDecimal netFlow) {
        this.netFlow = netFlow;
    }
    
    public BigDecimal getBudgetAmount() {
        return budgetAmount;
    }
    
    public void setBudgetAmount(BigDecimal budgetAmount) {
        this.budgetAmount = budgetAmount;
    }
    
    public BigDecimal getRemainingBudget() {
        return remainingBudget;
    }
    
    public void setRemainingBudget(BigDecimal remainingBudget) {
        this.remainingBudget = remainingBudget;
    }
    
    public double getBudgetUtilizationPercentage() {
        return budgetUtilizationPercentage;
    }
    
    public void setBudgetUtilizationPercentage(double budgetUtilizationPercentage) {
        this.budgetUtilizationPercentage = budgetUtilizationPercentage;
    }
    
    public List<CategoryBreakdown> getCategoryBreakdown() {
        return categoryBreakdown;
    }
    
    public void setCategoryBreakdown(List<CategoryBreakdown> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }
    
    public Map<String, BigDecimal> getMonthlyTrends() {
        return monthlyTrends;
    }
    
    public void setMonthlyTrends(Map<String, BigDecimal> monthlyTrends) {
        this.monthlyTrends = monthlyTrends;
    }
} 