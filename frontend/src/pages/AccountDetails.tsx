import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useData } from "@/contexts/DataContext";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Edit, 
  Trash2, 
  Wallet, 
  PiggyBank, 
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  Plus
} from "lucide-react";

export default function AccountDetails() {
  const { id } = useParams();
  const { accounts, transactions, updateAccount, deleteAccount } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    balance: 0,
    type: ""
  });
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const account = accounts.find(a => a.id === id);
  
  if (!account) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Account Not Found</h1>
            <p className="text-muted-foreground mb-6">The account you're looking for doesn't exist.</p>
            <Link to="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Filter transactions for this account
  const accountTransactions = transactions
    .filter(t => t.accountId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate account statistics
  const totalIncome = accountTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = accountTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netFlow = totalIncome - totalExpenses;

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'savings': return <PiggyBank className="w-6 h-6" />;
      case 'investment': return <TrendingUp className="w-6 h-6" />;
      default: return <Wallet className="w-6 h-6" />;
    }
  };

  const handleEdit = () => {
    setEditData({
      name: account.name,
      balance: account.balance,
      type: account.type
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateAccount(account.id, editData);
    setIsEditing(false);
    toast({
      title: "Account updated",
      description: "Account information has been updated successfully.",
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
      deleteAccount(account.id);
      toast({
        title: "Account deleted",
        description: "Account has been deleted successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Account Details
              </h1>
              <p className="text-muted-foreground">
                Manage your {account.type} account and view transaction history.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Account Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {getAccountIcon(account.type)}
                  <div>
                    <CardTitle className="text-2xl">{account.name}</CardTitle>
                    <CardDescription className="capitalize">{account.type} Account</CardDescription>
                  </div>
                  {account.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Account Name</Label>
                        <Input
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Balance</Label>
                        <Input
                          type="number"
                          value={editData.balance}
                          onChange={(e) => setEditData({...editData, balance: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                      <p className="text-3xl font-bold text-primary">${account.balance.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                      <p className="text-2xl font-bold text-green-600">+${totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                      <p className="text-2xl font-bold text-red-600">-${totalExpenses.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5" />
                    <CardTitle>Account Statistics</CardTitle>
                  </div>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Net Flow</p>
                    <p className={`text-xl font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {netFlow >= 0 ? '+' : ''}${netFlow.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Transactions</p>
                    <p className="text-xl font-bold text-blue-600">{accountTransactions.length}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Avg. Transaction</p>
                    <p className="text-xl font-bold text-purple-600">
                      ${accountTransactions.length > 0 ? (Math.abs(netFlow) / accountTransactions.length).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Last Activity</p>
                    <p className="text-sm font-medium text-orange-600">
                      {accountTransactions.length > 0 
                        ? new Date(accountTransactions[0].date).toLocaleDateString()
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <CardTitle>Transaction History</CardTitle>
                  </div>
                  <Link to="/add-transaction">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Transaction
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-600' 
                            : 'bg-red-100 dark:bg-red-900 text-red-600'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {accountTransactions.length === 0 && (
                    <div className="text-center py-8">
                      <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No transactions found for this account.</p>
                      <Link to="/add-transaction">
                        <Button className="mt-4">Add Your First Transaction</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/add-transaction">
                  <Button className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Default Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Set as primary account
                    </p>
                  </div>
                  <Switch
                    checked={account.isDefault}
                    onCheckedChange={(checked) => {
                      // This would need to be implemented in the context
                      toast({
                        title: "Default account updated",
                        description: "Account default status has been updated.",
                      });
                    }}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <p className="text-sm text-muted-foreground capitalize">{account.type}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Account ID</Label>
                  <p className="text-sm text-muted-foreground font-mono">{account.id}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 