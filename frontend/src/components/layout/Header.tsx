import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, Settings, LogOut, CreditCard, BarChart3, Moon, Sun, Menu, Home, Plus, Wallet } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { to: "/dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
    { to: "/add-transaction", label: "Add Transaction", icon: <Plus className="w-4 h-4" /> },
    { to: "/account/1", label: "Account Details", icon: <Wallet className="w-4 h-4" /> },
    { to: "/settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const MobileMenu = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetContent side="left" className="w-64">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent font-bold text-xl">
            Wealth
          </span>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center gap-3 px-3 py-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <span className="text-sm text-muted-foreground">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Wealth
          </span>
        </Link>

        {/* Desktop Navigation */}
        {user && (
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* User Menu or Auth Links */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="outline" size="sm" className="hidden sm:flex hover:bg-primary hover:text-primary-foreground transition-colors">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              
              {/* Mobile Menu Trigger */}
              {user && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="bg-gradient-primary bg-clip-text text-transparent font-bold text-xl">
                        Wealth
                      </span>
                    </div>
                    
                    <nav className="space-y-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t">
                      <div className="flex items-center gap-3 px-3 py-2">
                        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-muted transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="hover:bg-muted transition-colors">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-muted transition-colors">
                    <Link to="/settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleTheme} className="hover:bg-muted transition-colors">
                    {theme === 'light' ? (
                      <Moon className="mr-2 h-4 w-4" />
                    ) : (
                      <Sun className="mr-2 h-4 w-4" />
                    )}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50">
                Login
              </Link>
              <Link to="/signup" className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50">
                Sign Up
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="hover:bg-muted transition-colors">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};