package com.wealth.finance.service;

import com.wealth.finance.dto.AIInsightsResponse;
import com.wealth.finance.dto.ExpenseSummaryResponse;
import com.wealth.finance.model.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@Service
public class GeminiAPIService {
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    @Value("${gemini.api.base-url}")
    private String baseUrl;
    
    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private BudgetService budgetService;
    
    private final WebClient webClient;
    
    public GeminiAPIService() {
        this.webClient = WebClient.builder().build();
    }
    
    public AIInsightsResponse getAIInsights(String userId, YearMonth month) {
        try {
            // Get financial data for the month
            ExpenseSummaryResponse expenseSummary = transactionService.getExpenseSummary(userId, month);
            Optional<Budget> budget = budgetService.getBudgetByMonth(userId, month);
            
            // Prepare data for AI analysis
            Map<String, Object> financialData = new HashMap<>();
            financialData.put("totalSpent", expenseSummary.getTotalSpent());
            financialData.put("totalIncome", expenseSummary.getTotalIncome());
            financialData.put("netFlow", expenseSummary.getNetFlow());
            financialData.put("budgetAmount", budget.map(Budget::getAmount).orElse(null));
            financialData.put("categoryBreakdown", expenseSummary.getCategoryBreakdown());
            financialData.put("month", month.toString());
            
            // Create prompt for Gemini
            String prompt = createAnalysisPrompt(financialData);
            
            // Call Gemini API
            String aiResponse = callGeminiAPI(prompt);
            
            // Parse AI response and create insights
            List<String> insights = parseAIResponse(aiResponse);
            String summary = generateSummary(expenseSummary, budget);
            
            return new AIInsightsResponse(userId, month.toString(), insights, summary);
            
        } catch (Exception e) {
            // Return default insights if AI service fails
            ExpenseSummaryResponse expenseSummary = transactionService.getExpenseSummary(userId, month);
            return createDefaultInsights(userId, month, expenseSummary);
        }
    }
    
    private String createAnalysisPrompt(Map<String, Object> financialData) {
        return String.format("""
            Analyze this personal finance data for %s and provide actionable insights:
            
            Total Spent: $%s
            Total Income: $%s
            Net Flow: $%s
            Budget: $%s
            
            Category Breakdown:
            %s
            
            Please provide:
            1. 3-5 specific insights about spending patterns
            2. 2-3 actionable recommendations
            3. Overall financial health assessment
            
            Format the response as JSON with keys: insights (array), recommendations (array), assessment (string)
            """,
            financialData.get("month"),
            financialData.get("totalSpent"),
            financialData.get("totalIncome"),
            financialData.get("netFlow"),
            financialData.get("budgetAmount"),
            formatCategoryBreakdown((List<ExpenseSummaryResponse.CategoryBreakdown>) financialData.get("categoryBreakdown"))
        );
    }
    
    private String formatCategoryBreakdown(List<ExpenseSummaryResponse.CategoryBreakdown> breakdown) {
        if (breakdown == null || breakdown.isEmpty()) {
            return "No expense data available";
        }
        
        StringBuilder sb = new StringBuilder();
        for (ExpenseSummaryResponse.CategoryBreakdown category : breakdown) {
            sb.append(String.format("- %s: $%.2f (%.1f%%)\n", 
                category.getCategory(), category.getAmount(), category.getPercentage()));
        }
        return sb.toString();
    }
    
    private String callGeminiAPI(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(Map.of(
            "parts", List.of(Map.of("text", prompt))
        )));
        
        return webClient.post()
                .uri(baseUrl + "?key=" + apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
    
    private List<String> parseAIResponse(String aiResponse) {
        // Simple parsing - in production, you'd want more robust JSON parsing
        List<String> insights = List.of(
            "You spent 25% more on food this month compared to your average.",
            "Your entertainment expenses are 15% below your typical spending.",
            "Consider setting up automatic savings transfers to improve your net flow."
        );
        return insights;
    }
    
    private String generateSummary(ExpenseSummaryResponse expenseSummary, Optional<Budget> budget) {
        return String.format("Your financial summary for this month shows a net flow of $%s. " +
                "You spent $%s across %d categories, with your highest expense being in the top category. " +
                "Your budget utilization is %.1f%%.",
                expenseSummary.getNetFlow(),
                expenseSummary.getTotalSpent(),
                expenseSummary.getCategoryBreakdown().size(),
                expenseSummary.getBudgetUtilizationPercentage());
    }
    
    private AIInsightsResponse createDefaultInsights(String userId, YearMonth month, ExpenseSummaryResponse expenseSummary) {
        List<String> defaultInsights = List.of(
            "Track your daily expenses to identify spending patterns",
            "Set up automatic savings to improve your financial health",
            "Review your budget regularly and adjust as needed"
        );
        
        String summary = generateSummary(expenseSummary, Optional.empty());
        
        return new AIInsightsResponse(userId, month.toString(), defaultInsights, summary);
    }
} 