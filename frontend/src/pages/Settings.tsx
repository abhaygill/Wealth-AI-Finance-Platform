import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "@/hooks/use-toast";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette,
  Save,
  Camera,
  Mail,
  Phone,
  Globe
} from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    timezone: "UTC",
    currency: "USD"
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    budgetWarnings: true,
    weeklyReports: false
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    biometricLogin: false,
    sessionTimeout: "30"
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsLoading(false);
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved.",
    });
    setIsLoading(false);
  };

  const handleSaveSecurity = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved.",
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and security settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <CardTitle>Profile Information</CardTitle>
                </div>
                <CardDescription>
                  Update your personal information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={profileData.timezone} onValueChange={(value) => setProfileData({...profileData, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <CardTitle>Notification Preferences</CardTitle>
                </div>
                <CardDescription>
                  Choose how you want to be notified about your financial activities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Transaction Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new transactions
                    </p>
                  </div>
                  <Switch
                    checked={notifications.transactionAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, transactionAlerts: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Budget Warnings</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert when approaching budget limits
                    </p>
                  </div>
                  <Switch
                    checked={notifications.budgetWarnings}
                    onCheckedChange={(checked) => setNotifications({...notifications, budgetWarnings: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly financial summaries
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                  />
                </div>

                <Button onClick={handleSaveNotifications} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>
                  Manage your account security and privacy settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Biometric Login</Label>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition to log in
                    </p>
                  </div>
                  <Switch
                    checked={security.biometricLogin}
                    onCheckedChange={(checked) => setSecurity({...security, biometricLogin: checked})}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Select value={security.sessionTimeout} onValueChange={(value) => setSecurity({...security, sessionTimeout: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveSecurity} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Security Settings"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Settings Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5" />
                  <CardTitle>Appearance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Dark Mode</Label>
                  <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={profileData.currency} onValueChange={(value) => setProfileData({...profileData, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <CardTitle>Quick Actions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 