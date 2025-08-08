package com.wealth.finance.repository;

import com.wealth.finance.model.Budget;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.YearMonth;
import java.util.Optional;

@Repository
public interface BudgetRepository extends MongoRepository<Budget, String> {
    
    Optional<Budget> findByUserIdAndYearMonth(String userId, YearMonth yearMonth);
    
    Optional<Budget> findFirstByUserIdOrderByYearMonthDesc(String userId);
} 