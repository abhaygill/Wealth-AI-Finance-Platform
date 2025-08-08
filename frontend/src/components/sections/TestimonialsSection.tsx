import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    avatar: "SJ",
    content: "Wealth has completely transformed how I manage my finances. The AI insights helped me save $3,000 in just 6 months!",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Software Engineer", 
    avatar: "MC",
    content: "The receipt scanning feature is a game-changer. I no longer dread expense tracking - it's actually enjoyable now.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    avatar: "ER", 
    content: "Finally, a finance app that actually understands my spending patterns. The budget recommendations are spot-on.",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by thousands of users
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our community says about their financial transformation with Wealth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <CardContent className="p-6">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                
                {/* Testimonial content */}
                <blockquote className="text-foreground mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                {/* User info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};