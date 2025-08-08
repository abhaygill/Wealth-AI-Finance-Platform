package com.wealth.finance.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Document(collection = "budgets")
public class Budget {
    
    @Id
    private String id;
    
    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;
    
    @NotNull(message = "Budget amount is required")
    @Positive(message = "Budget amount must be positive")
    private BigDecimal amount;
    
    @NotNull(message = "Year month is required")
    private YearMonth yearMonth;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public Budget() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Budget(String userId, BigDecimal amount, YearMonth yearMonth) {
        this();
        this.userId = userId;
        this.amount = amount;
        this.yearMonth = yearMonth;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
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
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public String toString() {
        return "Budget{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", amount=" + amount +
                ", yearMonth=" + yearMonth +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
} 