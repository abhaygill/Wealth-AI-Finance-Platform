package com.wealth.finance.service;

import com.wealth.finance.model.Account;
import com.wealth.finance.repository.AccountRepository;
import com.wealth.finance.dto.AccountRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepository;
    
    public List<Account> getAllAccountsByUserId(String userId) {
        return accountRepository.findByUserId(userId);
    }
    
    public Account createAccount(AccountRequest accountRequest, String userId) {
        Account account = new Account();
        account.setAccountName(accountRequest.getAccountName());
        account.setBalance(accountRequest.getBalance());
        account.setAccountType(accountRequest.getAccountType());
        account.setDefault(accountRequest.isDefault());
        account.setUserId(userId);
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        
        // If this account is set as default, unset other default accounts
        if (accountRequest.isDefault()) {
            Optional<Account> currentDefault = accountRepository.findByUserIdAndIsDefaultTrue(userId);
            if (currentDefault.isPresent()) {
                Account defaultAccount = currentDefault.get();
                defaultAccount.setDefault(false);
                defaultAccount.setUpdatedAt(LocalDateTime.now());
                accountRepository.save(defaultAccount);
            }
        }
        
        return accountRepository.save(account);
    }
    
    public Account getAccountById(String accountId, String userId) {
        return accountRepository.findByIdAndUserId(accountId, userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }
    
    public Account updateAccount(String accountId, AccountRequest accountRequest, String userId) {
        Account account = getAccountById(accountId, userId);
        
        account.setAccountName(accountRequest.getAccountName());
        account.setBalance(accountRequest.getBalance());
        account.setAccountType(accountRequest.getAccountType());
        account.setUpdatedAt(LocalDateTime.now());
        
        // Handle default account logic
        if (accountRequest.isDefault() && !account.isDefault()) {
            // Unset current default account
            Optional<Account> currentDefault = accountRepository.findByUserIdAndIsDefaultTrue(userId);
            if (currentDefault.isPresent()) {
                Account defaultAccount = currentDefault.get();
                defaultAccount.setDefault(false);
                defaultAccount.setUpdatedAt(LocalDateTime.now());
                accountRepository.save(defaultAccount);
            }
            account.setDefault(true);
        } else if (!accountRequest.isDefault() && account.isDefault()) {
            account.setDefault(false);
        }
        
        return accountRepository.save(account);
    }
    
    public void deleteAccount(String accountId, String userId) {
        Account account = getAccountById(accountId, userId);
        accountRepository.delete(account);
    }
    
    public Account setDefaultAccount(String accountId, String userId) {
        // Unset current default account
        Optional<Account> currentDefault = accountRepository.findByUserIdAndIsDefaultTrue(userId);
        if (currentDefault.isPresent()) {
            Account defaultAccount = currentDefault.get();
            defaultAccount.setDefault(false);
            defaultAccount.setUpdatedAt(LocalDateTime.now());
            accountRepository.save(defaultAccount);
        }
        
        // Set new default account
        Account account = getAccountById(accountId, userId);
        account.setDefault(true);
        account.setUpdatedAt(LocalDateTime.now());
        return accountRepository.save(account);
    }
    
    public Optional<Account> getDefaultAccount(String userId) {
        return accountRepository.findByUserIdAndIsDefaultTrue(userId);
    }
} 