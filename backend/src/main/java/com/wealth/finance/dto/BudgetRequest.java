package com.wealth.finance.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.YearMonth;

public class BudgetRequest {
    
    @NotNull(message = "Budget amount is required")
    @Positive(message = "Budget amount must be positive")
    private BigDecimal amount;
    
    @NotNull(message = "Year month is required")
    private YearMonth yearMonth;
    
    // Constructors
    public BudgetRequest() {}
    
    public BudgetRequest(BigDecimal amount, YearMonth yearMonth) {
        this.amount = amount;
        this.yearMonth = yearMonth;
    }
    
    // Getters and Setters
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public YearMonth getYearMonth() {
        return yearMonth;
    }
    
    public void setYearMonth(YearMonth yearMonth) {
        this.yearMonth = yearMonth;
    }
    
    @Override
    public String toString() {
        return "BudgetRequest{" +
                "amount=" + amount +
                ", yearMonth=" + yearMonth +
                '}';
    }
} 