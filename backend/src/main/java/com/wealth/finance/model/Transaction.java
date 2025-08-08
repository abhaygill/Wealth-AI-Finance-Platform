package com.wealth.finance.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "transactions")
public class Transaction {
    
    @Id
    private String id;
    
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
    @Indexed
    private String accountId;
    
    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;
    
    @NotNull(message = "Transaction type is required")
    private TransactionType type;
    
    private boolean isRecurring;
    private RecurringInterval recurringInterval;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Transaction Type Enum
    public enum TransactionType {
        INCOME, EXPENSE
    }
    
    // Recurring Interval Enum
    public enum RecurringInterval {
        DAILY, WEEKLY, MONTHLY, YEARLY
    }
    
    // Constructors
    public Transaction() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Transaction(String description, BigDecimal amount, String category, 
                      LocalDate date, String accountId, String userId, TransactionType type) {
        this();
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.accountId = accountId;
        this.userId = userId;
        this.type = type;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
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
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
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
        return "Transaction{" +
                "id='" + id + '\'' +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", category='" + category + '\'' +
                ", date=" + date +
                ", accountId='" + accountId + '\'' +
                ", userId='" + userId + '\'' +
                ", type=" + type +
                ", isRecurring=" + isRecurring +
                ", recurringInterval=" + recurringInterval +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
} 