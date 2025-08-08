package com.wealth.finance.controller;

import com.wealth.finance.dto.BudgetRequest;
import com.wealth.finance.model.Budget;
import com.wealth.finance.service.BudgetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.YearMonth;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
@Tag(name = "Budgets", description = "Budget management APIs")
@CrossOrigin(origins = "*")
public class BudgetController {
    
    @Autowired
    private BudgetService budgetService;
    
    @PostMapping
    @Operation(summary = "Set budget", description = "Set or update monthly budget")
    public ResponseEntity<Budget> setBudget(@Valid @RequestBody BudgetRequest budgetRequest,
                                          @RequestParam String userId) {
        Budget budget = budgetService.setBudget(budgetRequest, userId);
        return ResponseEntity.ok(budget);
    }
    
    @GetMapping("/month")
    @Operation(summary = "Get budget by month", description = "Get budget for a specific month")
    public ResponseEntity<Budget> getBudgetByMonth(
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth month) {
        Optional<Budget> budget = budgetService.getBudgetByMonth(userId, month);
        return budget.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/current")
    @Operation(summary = "Get current budget", description = "Get the most recent budget")
    public ResponseEntity<Budget> getCurrentBudget(@RequestParam String userId) {
        Optional<Budget> budget = budgetService.getCurrentBudget(userId);
        return budget.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 