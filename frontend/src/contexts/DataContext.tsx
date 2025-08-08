import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  accountId: string;
  category: string;
  date: string;
  description: string;
  isRecurring: boolean;
  recurringInterval?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Account {
  id: string;
  name: string;
  type: 'savings' | 'current' | 'investment';
  balance: number;
  isDefault: boolean;
}

interface DataContextType {
  accounts: Account[];
  transactions: Transaction[];
  budget: number;
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  deleteTransactions: (ids: string[]) => void;
  updateBudget: (amount: number) => void;
  scanReceipt: (file: File) => Promise<Partial<Transaction>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Main Checking',
      type: 'current',
      balance: 5420.50,
      isDefault: true
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'savings',
      balance: 12800.00,
      isDefault: false
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'expense',
      amount: 250.00,
      accountId: '1',
      category: 'Food & Dining',
      date: '2024-01-15',
      description: 'Grocery shopping',
      isRecurring: false
    },
    {
      id: '2',
      type: 'income',
      amount: 3000.00,
      accountId: '1',
      category: 'Salary',
      date: '2024-01-01',
      description: 'Monthly salary',
      isRecurring: true,
      recurringInterval: 'monthly'
    },
    {
      id: '3',
      type: 'expense',
      amount: 80.00,
      accountId: '1',
      category: 'Transportation',
      date: '2024-01-14',
      description: 'Gas station',
      isRecurring: false
    }
  ]);

  const [budget, setBudget] = useState(2500);

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = {
      ...account,
      id: Date.now().toString(),
    };
    
    if (account.isDefault) {
      setAccounts(prev => prev.map(acc => ({ ...acc, isDefault: false })));
    }
    
    setAccounts(prev => [...prev, newAccount]);
  };

  const updateAccount = (id: string, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(account => {
      if (account.id === id) {
        const updated = { ...account, ...updates };
        if (updates.isDefault && updated.isDefault) {
          // Set all other accounts to not default
          setAccounts(current => current.map(acc => 
            acc.id === id ? updated : { ...acc, isDefault: false }
          ));
          return updated;
        }
        return updated;
      }
      return account;
    }));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
    setTransactions(prev => prev.filter(transaction => transaction.accountId !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    
    // Update account balance
    setAccounts(prev => prev.map(account => {
      if (account.id === transaction.accountId) {
        const balanceChange = transaction.type === 'income' 
          ? transaction.amount 
          : -transaction.amount;
        return { ...account, balance: account.balance + balanceChange };
      }
      return account;
    }));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === id ? { ...transaction, ...updates } : transaction
    ));
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      
      // Revert account balance change
      setAccounts(prev => prev.map(account => {
        if (account.id === transaction.accountId) {
          const balanceChange = transaction.type === 'income' 
            ? -transaction.amount 
            : transaction.amount;
          return { ...account, balance: account.balance + balanceChange };
        }
        return account;
      }));
    }
  };

  const deleteTransactions = (ids: string[]) => {
    ids.forEach(id => deleteTransaction(id));
  };

  const updateBudget = (amount: number) => {
    setBudget(amount);
  };

  const scanReceipt = async (file: File): Promise<Partial<Transaction>> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock parsed data
    return {
      type: 'expense',
      amount: Math.floor(Math.random() * 100) + 10,
      category: 'Food & Dining',
      description: 'Receipt scan - ' + file.name.split('.')[0],
      date: new Date().toISOString().split('T')[0]
    };
  };

  return (
    <DataContext.Provider value={{
      accounts,
      transactions,
      budget,
      addAccount,
      updateAccount,
      deleteAccount,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      deleteTransactions,
      updateBudget,
      scanReceipt
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};