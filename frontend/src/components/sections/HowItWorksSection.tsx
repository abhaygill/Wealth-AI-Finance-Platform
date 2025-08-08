import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Scan, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    step: "01",
    title: "Connect Your Accounts",
    description: "Securely link your bank accounts and credit cards to get a complete view of your finances."
  },
  {
    icon: Scan,
    step: "02", 
    title: "Track Expenses Automatically",
    description: "Use our AI-powered receipt scanner or let us automatically categorize your transactions."
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Gain Financial Insights",
    description: "Get personalized insights, budget recommendations, and achieve your financial goals faster."
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with Wealth in three simple steps and take control of your financial future.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/60 to-secondary/60 z-0" 
                  style={{ width: 'calc(100% - 2rem)' }} 
                />
              )}
              
              <Card className="relative z-10 text-center bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  {/* Step number */}
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};