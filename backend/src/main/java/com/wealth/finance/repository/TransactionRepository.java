package com.wealth.finance.repository;

import com.wealth.finance.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    
    List<Transaction> findByUserId(String userId);
    
    List<Transaction> findByUserIdOrderByDateDesc(String userId);
    
    List<Transaction> findByAccountId(String accountId);
    
    List<Transaction> findByUserIdAndAccountId(String userId, String accountId);
    
    @Query("{'userId': ?0, 'date': {$gte: ?1, $lte: ?2}}")
    List<Transaction> findByUserIdAndDateBetween(String userId, LocalDate startDate, LocalDate endDate);
    
    @Query("{'userId': ?0, 'accountId': ?1, 'date': {$gte: ?2, $lte: ?3}}")
    List<Transaction> findByUserIdAndAccountIdAndDateBetween(String userId, String accountId, LocalDate startDate, LocalDate endDate);
    
    @Query("{'userId': ?0, 'type': 'EXPENSE', 'date': {$gte: ?1, $lte: ?2}}")
    List<Transaction> findExpensesByUserIdAndDateBetween(String userId, LocalDate startDate, LocalDate endDate);
    
    @Query("{'userId': ?0, 'type': 'INCOME', 'date': {$gte: ?1, $lte: ?2}}")
    List<Transaction> findIncomeByUserIdAndDateBetween(String userId, LocalDate startDate, LocalDate endDate);
    
    Optional<Transaction> findByIdAndUserId(String id, String userId);
    
    long countByUserId(String userId);
} 