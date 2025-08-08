import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useData, Transaction } from "@/contexts/DataContext";
import { Header } from "@/components/layout/Header";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, Upload, Loader2, ArrowLeft, Sparkles, DollarSign, Calendar as CalendarIcon2, FileText, Repeat } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("Amount must be positive"),
  accountId: z.string().min(1, "Please select an account"),
  category: z.string().min(1, "Please select a category"),
  date: z.date(),
  description: z.string().min(1, "Description is required"),
  isRecurring: z.boolean(),
  recurringInterval: z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
});

type TransactionForm = z.infer<typeof transactionSchema>;

const incomeCategories = ["Salary", "Freelance", "Investment", "Gift", "Other Income"];
const expenseCategories = ["Food & Dining", "Transportation", "Shopping", "Entertainment", "Bills & Utilities", "Healthcare", "Education", "Travel", "Other Expense"];

export default function AddTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts, transactions, addTransaction, updateTransaction, scanReceipt } = useData();
  const [isScanning, setIsScanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scannedPreview, setScannedPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = Boolean(id);
  const existingTransaction = transactions.find(t => t.id === id);

  const form = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: isEditing && existingTransaction ? {
      type: existingTransaction.type,
      amount: existingTransaction.amount,
      accountId: existingTransaction.accountId,
      category: existingTransaction.category,
      date: new Date(existingTransaction.date),
      description: existingTransaction.description,
      isRecurring: existingTransaction.isRecurring,
      recurringInterval: existingTransaction.recurringInterval,
    } : {
      type: "expense",
      amount: 0,
      accountId: "",
      category: "",
      date: new Date(),
      description: "",
      isRecurring: false,
      recurringInterval: "monthly",
    },
    mode: "onChange", // Enable real-time validation
  });

  const watchType = form.watch("type");
  const watchIsRecurring = form.watch("isRecurring");
  const categories = watchType === "income" ? incomeCategories : expenseCategories;
  
  // Check if form is valid for submit button - simplified validation
  const formValues = form.getValues();
  const hasRequiredFields = 
    formValues.amount > 0 && 
    formValues.accountId && 
    formValues.category && 
    formValues.description;
  
  const isFormValid = hasRequiredFields;

  // Debug logging
  console.log("Form validation:", {
    amount: formValues.amount,
    accountId: formValues.accountId,
    category: formValues.category,
    description: formValues.description,
    hasRequiredFields,
    isFormValid
  });

  const onSubmit = async (data: TransactionForm) => {
    console.log("onSubmit called with data:", data);
    try {
      setIsSubmitting(true);
      
      const transactionData = {
        ...data,
        date: data.date.toISOString().split('T')[0],
        recurringInterval: data.isRecurring ? data.recurringInterval : undefined,
      };

      console.log("Transaction data to save:", transactionData);

      if (isEditing && existingTransaction) {
        updateTransaction(existingTransaction.id, transactionData);
        toast({
          title: "Transaction updated",
          description: "Your transaction has been updated successfully.",
        });
      } else {
        addTransaction(transactionData);
        toast({
          title: "Transaction added",
          description: "Your transaction has been added successfully.",
        });
      }
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting transaction:", error);
      toast({
        title: "Error",
        description: "Failed to save transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScanReceipt = async () => {
    if (!fileInputRef.current) return;
    
    const file = fileInputRef.current.files?.[0];
    if (!file) return;

    try {
      setIsScanning(true);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setScannedPreview(previewUrl);
      
      const scannedData = await scanReceipt(file);
      
      // Update form with scanned data
      if (scannedData.amount) form.setValue("amount", scannedData.amount);
      if (scannedData.category) form.setValue("category", scannedData.category);
      if (scannedData.description) form.setValue("description", scannedData.description);
      if (scannedData.date) form.setValue("date", new Date(scannedData.date));
      if (scannedData.type) form.setValue("type", scannedData.type);

      toast({
        title: "Receipt scanned successfully!",
        description: "Transaction details have been filled automatically.",
      });
    } catch (error) {
      toast({
        title: "Scan failed",
        description: "Failed to scan receipt. Please enter details manually.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mb-6 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {isEditing ? "Edit Transaction" : "Add Transaction"}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  {isEditing ? "Update your transaction details" : "Add a new income or expense transaction"}
                </p>
              </div>
            </div>
          </div>

          {/* AI Receipt Scanner */}
          {!isEditing && (
            <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">AI Receipt Scanner</CardTitle>
                </div>
                <CardDescription>
                  Upload a receipt and let AI fill the transaction details automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scannedPreview && (
                  <div className="relative">
                    <img 
                      src={scannedPreview} 
                      alt="Receipt preview" 
                      className="w-full max-w-xs mx-auto rounded-lg border shadow-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setScannedPreview(null)}
                      className="absolute top-2 right-2"
                    >
                      ✕
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleScanReceipt}
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isScanning}
                    className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning Receipt...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Receipt
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG, PDF files
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transaction Form */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-background to-muted/20">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Transaction Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Transaction Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Transaction Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select transaction type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Amount */}
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                $
                              </span>
                              <Input
                                {...field}
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="h-12 pl-8"
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Account */}
                    <FormField
                      control={form.control}
                      name="accountId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Account</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "h-12 w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon2 className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Description</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter transaction description"
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Recurring Transaction */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="isRecurring"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base font-medium flex items-center gap-2">
                              <Repeat className="w-4 h-4" />
                              Recurring Transaction
                            </FormLabel>
                            <FormDescription>
                              Set up automatic recurring transactions
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {watchIsRecurring && (
                      <FormField
                        control={form.control}
                        name="recurringInterval"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Recurring Interval</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select interval" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity h-12"
                      onClick={() => {
                        console.log("Submit button clicked");
                        console.log("Form values:", form.getValues());
                        console.log("Is form valid:", isFormValid);
                        console.log("Is submitting:", isSubmitting);
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {isEditing ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          {isEditing ? "Update Transaction" : "Add Transaction"}
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                      className="h-12"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}