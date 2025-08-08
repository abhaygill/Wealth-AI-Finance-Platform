package com.wealth.finance.service;

import com.wealth.finance.model.Transaction;
import com.wealth.finance.repository.TransactionRepository;
import com.wealth.finance.dto.TransactionRequest;
import com.wealth.finance.dto.ExpenseSummaryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    public List<Transaction> getAllTransactionsByUserId(String userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId);
    }
    
    public List<Transaction> getTransactionsByAccountId(String accountId, String userId) {
        return transactionRepository.findByUserIdAndAccountId(userId, accountId);
    }
    
    public List<Transaction> getTransactionsByDateRange(String userId, LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
    }
    
    public Transaction createTransaction(TransactionRequest transactionRequest, String userId) {
        Transaction transaction = new Transaction();
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setCategory(transactionRequest.getCategory());
        transaction.setDate(transactionRequest.getDate());
        transaction.setAccountId(transactionRequest.getAccountId());
        transaction.setUserId(userId);
        transaction.setType(transactionRequest.getType());
        transaction.setRecurring(transactionRequest.isRecurring());
        transaction.setRecurringInterval(transactionRequest.getRecurringInterval());
        transaction.setCreatedAt(java.time.LocalDateTime.now());
        transaction.setUpdatedAt(java.time.LocalDateTime.now());
        
        return transactionRepository.save(transaction);
    }
    
    public Transaction getTransactionById(String transactionId, String userId) {
        return transactionRepository.findByIdAndUserId(transactionId, userId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }
    
    public Transaction updateTransaction(String transactionId, TransactionRequest transactionRequest, String userId) {
        Transaction transaction = getTransactionById(transactionId, userId);
        
        transaction.setDescription(transactionRequest.getDescription());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setCategory(transactionRequest.getCategory());
        transaction.setDate(transactionRequest.getDate());
        transaction.setAccountId(transactionRequest.getAccountId());
        transaction.setType(transactionRequest.getType());
        transaction.setRecurring(transactionRequest.isRecurring());
        transaction.setRecurringInterval(transactionRequest.getRecurringInterval());
        transaction.setUpdatedAt(java.time.LocalDateTime.now());
        
        return transactionRepository.save(transaction);
    }
    
    public void deleteTransaction(String transactionId, String userId) {
        Transaction transaction = getTransactionById(transactionId, userId);
        transactionRepository.delete(transaction);
    }
    
    public ExpenseSummaryResponse getExpenseSummary(String userId, YearMonth yearMonth) {
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();
        
        List<Transaction> expenses = transactionRepository.findExpensesByUserIdAndDateBetween(userId, startDate, endDate);
        List<Transaction> income = transactionRepository.findIncomeByUserIdAndDateBetween(userId, startDate, endDate);
        
        BigDecimal totalSpent = expenses.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal totalIncome = income.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Calculate category breakdown
        Map<String, BigDecimal> categoryTotals = expenses.stream()
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)
                ));
        
        List<ExpenseSummaryResponse.CategoryBreakdown> categoryBreakdown = categoryTotals.entrySet().stream()
                .map(entry -> {
                    double percentage = totalSpent.compareTo(BigDecimal.ZERO) > 0 
                        ? (entry.getValue().doubleValue() / totalSpent.doubleValue()) * 100 : 0;
                    return new ExpenseSummaryResponse.CategoryBreakdown(
                            entry.getKey(),
                            entry.getValue(),
                            percentage,
                            getCategoryColor(entry.getKey())
                    );
                })
                .collect(Collectors.toList());
        
        ExpenseSummaryResponse response = new ExpenseSummaryResponse(totalSpent, totalIncome, BigDecimal.ZERO);
        response.setCategoryBreakdown(categoryBreakdown);
        
        return response;
    }
    
    private String getCategoryColor(String category) {
        // Define colors for different categories
        Map<String, String> categoryColors = Map.of(
                "Food & Dining", "#FF6B6B",
                "Transportation", "#4ECDC4",
                "Shopping", "#45B7D1",
                "Entertainment", "#96CEB4",
                "Bills & Utilities", "#FFEAA7",
                "Healthcare", "#DDA0DD",
                "Education", "#98D8C8",
                "Travel", "#F7DC6F",
                "Other Expense", "#BB8FCE"
        );
        
        return categoryColors.getOrDefault(category, "#FF6B6B");
    }
    
    public long getTransactionCount(String userId) {
        return transactionRepository.countByUserId(userId);
    }
} 