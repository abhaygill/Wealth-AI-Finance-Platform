package com.wealth.finance.controller;

import com.wealth.finance.dto.TransactionRequest;
import com.wealth.finance.dto.ExpenseSummaryResponse;
import com.wealth.finance.model.Transaction;
import com.wealth.finance.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@Tag(name = "Transactions", description = "Transaction management APIs")
@CrossOrigin(origins = "*")
public class TransactionController {
    
    @Autowired
    private TransactionService transactionService;
    
    @GetMapping
    @Operation(summary = "Get all transactions", description = "Get all transactions for the current user")
    public ResponseEntity<List<Transaction>> getAllTransactions(@RequestParam String userId) {
        List<Transaction> transactions = transactionService.getAllTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/account/{accountId}")
    @Operation(summary = "Get transactions by account", description = "Get all transactions for a specific account")
    public ResponseEntity<List<Transaction>> getTransactionsByAccount(@PathVariable String accountId,
                                                                     @RequestParam String userId) {
        List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId, userId);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/date-range")
    @Operation(summary = "Get transactions by date range", description = "Get transactions within a date range")
    public ResponseEntity<List<Transaction>> getTransactionsByDateRange(
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Transaction> transactions = transactionService.getTransactionsByDateRange(userId, startDate, endDate);
        return ResponseEntity.ok(transactions);
    }
    
    @PostMapping
    @Operation(summary = "Create transaction", description = "Create a new transaction")
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody TransactionRequest transactionRequest,
                                                       @RequestParam String userId) {
        Transaction transaction = transactionService.createTransaction(transactionRequest, userId);
        return ResponseEntity.ok(transaction);
    }
    
    @GetMapping("/{transactionId}")
    @Operation(summary = "Get transaction by ID", description = "Get transaction details by transaction ID")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable String transactionId,
                                                        @RequestParam String userId) {
        Transaction transaction = transactionService.getTransactionById(transactionId, userId);
        return ResponseEntity.ok(transaction);
    }
    
    @PutMapping("/{transactionId}")
    @Operation(summary = "Update transaction", description = "Update transaction details")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable String transactionId,
                                                       @Valid @RequestBody TransactionRequest transactionRequest,
                                                       @RequestParam String userId) {
        Transaction transaction = transactionService.updateTransaction(transactionId, transactionRequest, userId);
        return ResponseEntity.ok(transaction);
    }
    
    @DeleteMapping("/{transactionId}")
    @Operation(summary = "Delete transaction", description = "Delete a transaction")
    public ResponseEntity<Void> deleteTransaction(@PathVariable String transactionId,
                                                @RequestParam String userId) {
        transactionService.deleteTransaction(transactionId, userId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/analytics/summary")
    @Operation(summary = "Get expense summary", description = "Get expense summary and analytics for a month")
    public ResponseEntity<ExpenseSummaryResponse> getExpenseSummary(
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth month) {
        ExpenseSummaryResponse summary = transactionService.getExpenseSummary(userId, month);
        return ResponseEntity.ok(summary);
    }
    
    @GetMapping("/count")
    @Operation(summary = "Get transaction count", description = "Get total number of transactions for user")
    public ResponseEntity<Long> getTransactionCount(@RequestParam String userId) {
        long count = transactionService.getTransactionCount(userId);
        return ResponseEntity.ok(count);
    }
} 