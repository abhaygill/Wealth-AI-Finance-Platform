package com.wealth.finance.service;

import com.wealth.finance.model.Budget;
import com.wealth.finance.repository.BudgetRepository;
import com.wealth.finance.dto.BudgetRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.YearMonth;
import java.util.Optional;

@Service
public class BudgetService {
    
    @Autowired
    private BudgetRepository budgetRepository;
    
    public Budget setBudget(BudgetRequest budgetRequest, String userId) {
        // Check if budget already exists for this month
        Optional<Budget> existingBudget = budgetRepository.findByUserIdAndYearMonth(userId, budgetRequest.getYearMonth());
        
        if (existingBudget.isPresent()) {
            Budget budget = existingBudget.get();
            budget.setAmount(budgetRequest.getAmount());
            budget.setUpdatedAt(java.time.LocalDateTime.now());
            return budgetRepository.save(budget);
        } else {
            Budget budget = new Budget();
            budget.setUserId(userId);
            budget.setAmount(budgetRequest.getAmount());
            budget.setYearMonth(budgetRequest.getYearMonth());
            budget.setCreatedAt(java.time.LocalDateTime.now());
            budget.setUpdatedAt(java.time.LocalDateTime.now());
            return budgetRepository.save(budget);
        }
    }
    
    public Optional<Budget> getBudgetByMonth(String userId, YearMonth yearMonth) {
        return budgetRepository.findByUserIdAndYearMonth(userId, yearMonth);
    }
    
    public Optional<Budget> getCurrentBudget(String userId) {
        return budgetRepository.findFirstByUserIdOrderByYearMonthDesc(userId);
    }
} 