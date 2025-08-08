package com.wealth.finance.dto;

import com.wealth.finance.model.Account.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class AccountRequest {
    
    @NotBlank(message = "Account name is required")
    private String accountName;
    
    @NotNull(message = "Balance is required")
    @Positive(message = "Balance must be positive")
    private BigDecimal balance;
    
    @NotNull(message = "Account type is required")
    private AccountType accountType;
    
    private boolean isDefault;
    
    // Constructors
    public AccountRequest() {}
    
    public AccountRequest(String accountName, BigDecimal balance, AccountType accountType, boolean isDefault) {
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
        this.isDefault = isDefault;
    }
    
    // Getters and Setters
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
    
    @Override
    public String toString() {
        return "AccountRequest{" +
                "accountName='" + accountName + '\'' +
                ", balance=" + balance +
                ", accountType=" + accountType +
                ", isDefault=" + isDefault +
                '}';
    }
} 