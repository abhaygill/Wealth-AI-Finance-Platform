import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Scan, 
  Target, 
  Shield, 
  TrendingUp, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get detailed insights into your spending patterns with AI-powered analytics and forecasting."
  },
  {
    icon: Scan,
    title: "Smart Receipt Scanner",
    description: "Simply scan receipts with your camera and let AI automatically categorize and track expenses."
  },
  {
    icon: Target,
    title: "Budget Planning",
    description: "Set intelligent budgets that adapt to your lifestyle and receive proactive alerts and suggestions."
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your financial data is protected with enterprise-grade encryption and security protocols."
  },
  {
    icon: TrendingUp,
    title: "Investment Tracking",
    description: "Monitor your portfolio performance and get AI-driven investment recommendations."
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Access your finances anywhere with our responsive design and mobile-optimized experience."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to master your finances
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to simplify your financial life and help you achieve your goals faster.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};