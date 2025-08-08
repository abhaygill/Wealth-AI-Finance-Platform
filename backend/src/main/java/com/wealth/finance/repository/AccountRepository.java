package com.wealth.finance.repository;

import com.wealth.finance.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    
    List<Account> findByUserId(String userId);
    
    Optional<Account> findByUserIdAndIsDefaultTrue(String userId);
    
    Optional<Account> findByIdAndUserId(String id, String userId);
    
    boolean existsByUserIdAndAccountName(String userId, String accountName);
} 