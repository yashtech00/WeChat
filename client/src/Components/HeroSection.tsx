
import { useEffect, useState } from "react";

import { MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-16 bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div 
            className={`space-y-6 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Connect with <br /><span className="text-gradient">Anyone, Anywhere</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              Experience seamless communication with our intuitive and powerful chat platform. Share moments, connect with friends, and build communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-800 text-white flex items-center gap-2 rounded-full px-6"
              >
                <MessageSquare className="h-5 w-5" />
                Start Chatting
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-orange-600 text-orange-600 hover:bg-orange-600 rounded-full px-6"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div 
            className={`relative ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative z-10 bg-gradient-to-br from-stone-800 to-stone-900 p-3 rounded-3xl shadow-2xl overflow-hidden border border-black">
              <div className="bg-black rounded-2xl p-4 overflow-hidden">
                // ... keep existing code (chat interface elements)
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-orange-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-28 h-28 bg-orange-600 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default Hero;
