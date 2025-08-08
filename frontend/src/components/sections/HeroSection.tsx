import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Manage your finances with{" "}
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                intelligence
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl animate-fade-in [animation-delay:200ms]">
              Take control of your financial future with our AI-powered platform. 
              Track expenses, set budgets, and gain insights that help you make smarter financial decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in [animation-delay:400ms]">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-glow transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link to="/login">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 animate-fade-in [animation-delay:600ms]">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-white/70 text-sm">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">2M+</div>
                <div className="text-white/70 text-sm">Transactions</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">$10B+</div>
                <div className="text-white/70 text-sm">Managed</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in [animation-delay:800ms]">
            <div className="relative">
              <img 
                src={dashboardPreview} 
                alt="Wealth Dashboard Preview" 
                className="w-full rounded-2xl shadow-2xl animate-tilt"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg animate-bounce-in [animation-delay:1000ms]">
              <div className="text-sm font-medium text-foreground">Monthly Savings</div>
              <div className="text-2xl font-bold text-success">+$2,450</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg animate-bounce-in [animation-delay:1200ms]">
              <div className="text-sm font-medium text-foreground">Budget Health</div>
              <div className="text-2xl font-bold text-primary">85%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};