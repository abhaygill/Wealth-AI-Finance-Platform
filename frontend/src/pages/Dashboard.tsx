import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useData } from "@/contexts/DataContext";
import { Header } from "@/components/layout/Header";
import { 
  Plus, 
  Edit, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  PiggyBank,
  TrendingUp,
  BarChart3,
  CreditCard,
  TrendingDown,
  Calendar,
  Target,
  MoreVertical,
  Trash2,
  Settings
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Distinct colors for expense categories
const EXPENSE_COLORS = {
  "Food & Dining": "#FF6B6B",
  "Transportation": "#4ECDC4", 
  "Shopping": "#45B7D1",
  "Entertainment": "#96CEB4",
  "Bills & Utilities": "#FFEAA7",
  "Healthcare": "#DDA0DD",
  "Education": "#98D8C8",
  "Travel": "#F7DC6F",
  "Other Expense": "#BB8FCE"
};

const FALLBACK_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'];

export default function Dashboard() {
  const { accounts, transactions, budget, updateBudget, addAccount, updateAccount, deleteAccount } = useData();
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget.toString());
  const [selectedAccount, setSelectedAccount] = useState<string>("all");

  // Calculate current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'expense' && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetProgress = (monthlyExpenses / budget) * 100;
  const getBudgetColor = (progress: number) => {
    if (progress < 70) return "hsl(var(--primary))";
    if (progress < 90) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  // Filter transactions for recent transactions display
  const filteredTransactions = selectedAccount === "all" 
    ? transactions 
    : transactions.filter(t => t.accountId === selectedAccount);
  
  const recentTransactions = filteredTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Calculate expense breakdown by category
  const expensesByCategory = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'expense' && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    })
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: EXPENSE_COLORS[category as keyof typeof EXPENSE_COLORS] || FALLBACK_COLORS[0]
  }));

  const handleBudgetSave = () => {
    const newBudget = parseFloat(budgetInput);
    if (!isNaN(newBudget) && newBudget > 0) {
      updateBudget(newBudget);
    }
    setIsEditingBudget(false);
  };

  const handleBudgetCancel = () => {
    setBudgetInput(budget.toString());
    setIsEditingBudget(false);
  };

  const handleDefaultToggle = (accountId: string, isDefault: boolean) => {
    updateAccount(accountId, { isDefault });
  };

  const handleDeleteAccount = (accountId: string, accountName: string) => {
    if (confirm(`Are you sure you want to delete "${accountName}"? This action cannot be undone.`)) {
      deleteAccount(accountId);
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'savings': return <PiggyBank className="w-5 h-5" />;
      case 'investment': return <TrendingUp className="w-5 h-5" />;
      default: return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-24 sm:pt-24 sm:pb-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mt-1">
                Welcome back! Here's an overview of your financial health.
              </p>
            </div>
          </div>
        </div>

        {/* Budget Progress Section */}
        <Card className="mb-8 sm:mb-12 shadow-lg border-0 bg-gradient-to-r from-background to-muted/20">
          <CardHeader className="pb-4 sm:pb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-2xl font-bold">Monthly Budget</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Track your spending against your monthly budget
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Current expenses</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">${monthlyExpenses.toFixed(2)}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Budget</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  {isEditingBudget ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={budgetInput}
                        onChange={(e) => setBudgetInput(e.target.value)}
                        className="w-20 sm:w-28 h-8 sm:h-10 text-sm"
                      />
                      <Button size="sm" onClick={handleBudgetSave} className="hover:bg-green-600 transition-colors h-8 sm:h-10">
                        ✓
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleBudgetCancel} className="hover:bg-red-100 dark:hover:bg-red-900 transition-colors h-8 sm:h-10">
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">${budget.toFixed(2)}</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setIsEditingBudget(true)}
                        className="hover:bg-primary/10 transition-colors h-8 sm:h-10"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-xs sm:text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">{budgetProgress.toFixed(1)}% used</span>
                <span className="text-foreground">${(budget - monthlyExpenses).toFixed(2)} remaining</span>
              </div>
              <Progress 
                value={budgetProgress} 
                className="h-3 sm:h-4 bg-muted"
                style={{ 
                  '--progress-background': getBudgetColor(budgetProgress) 
                } as React.CSSProperties}
              />
            </div>
          </CardContent>
        </Card>

        {/* Accounts Grid */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-3xl font-bold">Your Accounts</h2>
            </div>
            <Link to="/add-account">
              <Button size="sm" className="h-8 sm:h-10 px-3 sm:px-4">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add Account</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <Card key={account.id} className="relative shadow-md hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getAccountIcon(account.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-xl font-bold truncate">{account.name}</CardTitle>
                        <CardDescription className="capitalize text-xs sm:text-sm truncate">{account.type} Account</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {account.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="text-xs">
                            <Edit className="w-3 h-3 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-xs text-destructive"
                            onClick={() => handleDeleteAccount(account.id, account.name)}
                          >
                            <Trash2 className="w-3 h-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      ${account.balance.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Set as default
                      </span>
                      <Switch
                        checked={account.isDefault}
                        onCheckedChange={(checked) => handleDefaultToggle(account.id, checked)}
                        className="data-[state=checked]:bg-primary scale-90 sm:scale-100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add New Account Card */}
            <Card className="border-dashed border-2 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg bg-gradient-to-br from-background to-muted/20">
              <CardContent className="flex items-center justify-center h-full min-h-[160px] sm:min-h-[200px]">
                <Link to="/add-account" className="flex flex-col items-center gap-2 sm:gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <span className="font-medium text-sm sm:text-base text-center">Add New Account</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Recent Transactions */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-background to-muted/20">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl font-bold">Recent Transactions</CardTitle>
                </div>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="w-full sm:w-44 h-9 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentTransactions.map((transaction) => {
                  const account = accounts.find(a => a.id === transaction.accountId);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                            : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm sm:text-base truncate">{transaction.description}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {new Date(transaction.date).toLocaleDateString()} • {account?.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className={`font-bold text-sm sm:text-lg ${
                          transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {recentTransactions.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium text-sm sm:text-base">No transactions found</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Start by adding your first transaction</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Expense Breakdown */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-background to-muted/20">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-2xl font-bold">Monthly Expense Breakdown</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Your spending by category this month
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {pieData.length > 0 ? (
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={250} className="sm:hidden">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <ResponsiveContainer width="100%" height={300} className="hidden sm:block">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Mobile-friendly legend */}
                  <div className="sm:hidden">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {pieData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="truncate">{entry.name}</span>
                          <span className="font-medium">${entry.value.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 sm:h-64 text-muted-foreground">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <p className="font-medium text-sm sm:text-base">No expense data for this month</p>
                    <p className="text-xs sm:text-sm mt-1">Add some transactions to see your spending breakdown</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Floating Add Transaction Button */}
      <Link to="/add-transaction">
        <Button 
          className="fixed bottom-6 right-6 h-14 w-14 sm:h-16 sm:w-auto sm:px-6 rounded-full shadow-lg bg-gradient-primary hover:opacity-90 transition-all duration-300 z-50"
          size="lg"
        >
          <Plus className="w-6 h-6 sm:w-5 sm:h-5 sm:mr-2" />
          <span className="hidden sm:inline">Add Transaction</span>
        </Button>
      </Link>
    </div>
  );
}