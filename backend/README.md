# Personal Finance Dashboard Backend

A comprehensive Spring Boot backend for managing personal finances, accounts, transactions, and AI-powered insights.

## 🚀 Features

### Core Functionality
- **User Management**: Registration, login, and profile management with JWT authentication
- **Account Management**: CRUD operations for bank accounts (Savings, Current, Wallet)
- **Transaction Management**: Complete transaction lifecycle with categories and types
- **Budget Management**: Monthly budget setting and tracking
- **Analytics**: Expense summaries, category breakdowns, and financial insights
- **AI Integration**: Gemini API-powered financial insights and recommendations

### Technical Features
- **Spring Security** with JWT authentication
- **MongoDB** integration with Spring Data
- **RESTful APIs** with comprehensive documentation
- **Swagger/OpenAPI 3.0** documentation
- **Global Exception Handling** with standardized error responses
- **CORS Configuration** for frontend integration
- **Validation** with Bean Validation annotations

## 🛠️ Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data MongoDB**
- **JWT (JSON Web Tokens)**
- **Swagger/OpenAPI 3.0**
- **Maven**

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MongoDB 4.4+
- Gemini API key (for AI insights)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Configure MongoDB
Ensure MongoDB is running on `localhost:27017` or update the connection string in `application.yml`.

### 3. Configure Gemini API
Update the Gemini API key in `application.yml`:
```yaml
gemini:
  api:
    key: your-gemini-api-key-here
```

### 4. Build and Run
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8081`

## 📚 API Documentation

Once the application is running, you can access:
- **Swagger UI**: `http://localhost:8081/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8081/api-docs`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create account
- `GET /api/accounts/{id}` - Get account by ID
- `PUT /api/accounts/{id}` - Update account
- `DELETE /api/accounts/{id}` - Delete account
- `PUT /api/accounts/{id}/default` - Set default account
- `GET /api/accounts/default` - Get default account

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/{id}` - Get transaction by ID
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction
- `GET /api/transactions/account/{accountId}` - Get transactions by account
- `GET /api/transactions/date-range` - Get transactions by date range
- `GET /api/transactions/analytics/summary` - Get expense summary
- `GET /api/transactions/count` - Get transaction count

### Budgets
- `POST /api/budgets` - Set budget
- `GET /api/budgets/month` - Get budget by month
- `GET /api/budgets/current` - Get current budget

### AI Insights
- `POST /api/ai/insights` - Get AI insights
- `GET /api/ai/insights` - Get AI insights by month

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Data Models

### User
- `id` (UUID)
- `username` (String)
- `email` (String)
- `password` (Hashed)
- `createdAt`, `updatedAt` (DateTime)

### Account
- `id` (UUID)
- `accountName` (String)
- `balance` (BigDecimal)
- `accountType` (SAVINGS, CURRENT, WALLET)
- `isDefault` (Boolean)
- `userId` (Reference)
- `createdAt`, `updatedAt` (DateTime)

### Transaction
- `id` (UUID)
- `description` (String)
- `amount` (BigDecimal)
- `category` (String)
- `date` (LocalDate)
- `type` (INCOME, EXPENSE)
- `accountId` (Reference)
- `userId` (Reference)
- `isRecurring` (Boolean)
- `recurringInterval` (DAILY, WEEKLY, MONTHLY, YEARLY)
- `createdAt`, `updatedAt` (DateTime)

### Budget
- `id` (UUID)
- `userId` (Reference)
- `amount` (BigDecimal)
- `yearMonth` (YearMonth)
- `createdAt`, `updatedAt` (DateTime)

## 🤖 AI Integration

The application integrates with Google's Gemini API to provide AI-powered financial insights:

- **Spending Pattern Analysis**: Identifies trends and anomalies
- **Budget Recommendations**: Suggests budget adjustments
- **Financial Health Assessment**: Overall financial wellness evaluation
- **Actionable Insights**: Specific recommendations for improvement

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt password encryption
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Secure cross-origin resource sharing
- **Global Exception Handling**: Secure error responses

## 🧪 Testing

```bash
# Run tests
mvn test

# Run with coverage
mvn jacoco:report
```

## 📝 Environment Variables

Key configuration properties in `application.yml`:

```yaml
server:
  port: 8081

spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/finance_dashboard

spring:
  security:
    jwt:
      secret: your-256-bit-secret-key
      expiration: 86400000

gemini:
  api:
    key: your-gemini-api-key
    base-url: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

## 🚀 Deployment

### Docker
```bash
# Build Docker image
docker build -t finance-dashboard-backend .

# Run container
docker run -p 8081:8081 finance-dashboard-backend
```

### Production
1. Update `application.yml` with production settings
2. Set environment variables for sensitive data
3. Configure MongoDB connection for production
4. Deploy to your preferred cloud platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/swagger-ui.html` 