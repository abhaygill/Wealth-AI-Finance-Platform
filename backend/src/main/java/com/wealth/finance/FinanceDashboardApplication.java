package com.wealth.finance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Personal Finance Dashboard API",
        version = "1.0",
        description = "API for managing personal finances, accounts, transactions, and AI-powered insights"
    )
)
public class FinanceDashboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinanceDashboardApplication.class, args);
    }
} 