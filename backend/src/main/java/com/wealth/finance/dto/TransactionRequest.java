package com.wealth.finance.dto;

import com.wealth.finance.model.Transaction.TransactionType;
import com.wealth.finance.model.Transaction.RecurringInterval;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionRequest {
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private BigDecimal amount;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    @NotBlank(message = "Account ID is required")
    private String accountId;
    
    @NotNull(message = "Transaction type is required")
    private TransactionType type;
    
    private boolean isRecurring;
    private RecurringInterval recurringInterval;
    
    // Constructors
    public TransactionRequest() {}
    
    public TransactionRequest(String description, BigDecimal amount, String category, 
                            LocalDate date, String accountId, TransactionType type) {
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.accountId = accountId;
        this.type = type;
    }
    
    // Getters and Setters
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public String getAccountId() {
        return accountId;
    }
    
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }
    
    public TransactionType getType() {
        return type;
    }
    
    public void setType(TransactionType type) {
        this.type = type;
    }
    
    public boolean isRecurring() {
        return isRecurring;
    }
    
    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }
    
    public RecurringInterval getRecurringInterval() {
        return recurringInterval;
    }
    
    public void setRecurringInterval(RecurringInterval recurringInterval) {
        this.recurringInterval = recurringInterval;
    }
    
    @Override
    public String toString() {
        return "TransactionRequest{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                ", category='" + category + '\'' +
                ", date=" + date +
                ", accountId='" + accountId + '\'' +
                ", type=" + type +
                ", isRecurring=" + isRecurring +
                ", recurringInterval=" + recurringInterval +
                '}';
    }
} 