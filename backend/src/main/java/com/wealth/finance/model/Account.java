package com.wealth.finance.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "accounts")
public class Account {
    
    @Id
    private String id;
    
    @NotBlank(message = "Account name is required")
    private String accountName;
    
    @NotNull(message = "Balance is required")
    @Positive(message = "Balance must be positive")
    private BigDecimal balance;
    
    @NotNull(message = "Account type is required")
    private AccountType accountType;
    
    private boolean isDefault;
    
    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Account Type Enum
    public enum AccountType {
        SAVINGS, CURRENT, WALLET
    }
    
    // Constructors
    public Account() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Account(String accountName, BigDecimal balance, AccountType accountType, String userId) {
        this();
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
        this.userId = userId;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getAccountName() {
        return accountName;
    }
    
    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }
    
    public BigDecimal getBalance() {
        return balance;
    }
    
    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
    
    public AccountType getAccountType() {
        return accountType;
    }
    
    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }
    
    public boolean isDefault() {
        return isDefault;
    }
    
    public void setDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
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
        return "Account{" +
                "id='" + id + '\'' +
                ", accountName='" + accountName + '\'' +
                ", balance=" + balance +
                ", accountType=" + accountType +
                ", isDefault=" + isDefault +
                ", userId='" + userId + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
} 