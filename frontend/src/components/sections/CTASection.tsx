import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Start your financial journey today</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to take control of your finances?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial lives with Wealth. 
            Start your free trial today and experience the power of AI-driven finance management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-glow transition-all duration-300 hover:scale-105 animate-bounce-in"
              asChild
            >
              <Link to="/signup">
                Start Free Trial
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
                Schedule Demo
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">Free Trial</div>
              <div className="text-white font-semibold">30 Days</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">Setup Time</div>
              <div className="text-white font-semibold">2 Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">Support</div>
              <div className="text-white font-semibold">24/7</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};