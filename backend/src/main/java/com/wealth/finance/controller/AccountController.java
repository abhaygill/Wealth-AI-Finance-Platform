package com.wealth.finance.controller;

import com.wealth.finance.dto.AccountRequest;
import com.wealth.finance.model.Account;
import com.wealth.finance.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@Tag(name = "Accounts", description = "Account management APIs")
@CrossOrigin(origins = "*")
public class AccountController {
    
    @Autowired
    private AccountService accountService;
    
    @GetMapping
    @Operation(summary = "Get all accounts", description = "Get all accounts for the current user")
    public ResponseEntity<List<Account>> getAllAccounts(@RequestParam String userId) {
        List<Account> accounts = accountService.getAllAccountsByUserId(userId);
        return ResponseEntity.ok(accounts);
    }
    
    @PostMapping
    @Operation(summary = "Create account", description = "Create a new account")
    public ResponseEntity<Account> createAccount(@Valid @RequestBody AccountRequest accountRequest, 
                                               @RequestParam String userId) {
        Account account = accountService.createAccount(accountRequest, userId);
        return ResponseEntity.ok(account);
    }
    
    @GetMapping("/{accountId}")
    @Operation(summary = "Get account by ID", description = "Get account details by account ID")
    public ResponseEntity<Account> getAccountById(@PathVariable String accountId, 
                                                @RequestParam String userId) {
        Account account = accountService.getAccountById(accountId, userId);
        return ResponseEntity.ok(account);
    }
    
    @PutMapping("/{accountId}")
    @Operation(summary = "Update account", description = "Update account details")
    public ResponseEntity<Account> updateAccount(@PathVariable String accountId,
                                               @Valid @RequestBody AccountRequest accountRequest,
                                               @RequestParam String userId) {
        Account account = accountService.updateAccount(accountId, accountRequest, userId);
        return ResponseEntity.ok(account);
    }
    
    @DeleteMapping("/{accountId}")
    @Operation(summary = "Delete account", description = "Delete an account")
    public ResponseEntity<Void> deleteAccount(@PathVariable String accountId,
                                            @RequestParam String userId) {
        accountService.deleteAccount(accountId, userId);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{accountId}/default")
    @Operation(summary = "Set default account", description = "Set an account as default")
    public ResponseEntity<Account> setDefaultAccount(@PathVariable String accountId,
                                                   @RequestParam String userId) {
        Account account = accountService.setDefaultAccount(accountId, userId);
        return ResponseEntity.ok(account);
    }
    
    @GetMapping("/default")
    @Operation(summary = "Get default account", description = "Get the default account for the user")
    public ResponseEntity<Account> getDefaultAccount(@RequestParam String userId) {
        return accountService.getDefaultAccount(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 