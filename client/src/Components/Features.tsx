
import  { useEffect, useState } from "react";
import { MessageSquare, UserPlus, LogIn } from "lucide-react";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("features-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const features = [
    {
      icon: <MessageSquare className="h-12 w-12 text-wechat-orange" />,
      title: "Real-time Messaging",
      description:
        "Exchange messages instantly with friends and colleagues. Enjoy smooth, seamless communication with immediate delivery notifications.",
      delay: "0.2s",
    },
    {
      icon: <LogIn className="h-12 w-12 text-wechat-orange" />,
      title: "Secure Login",
      description:
        "Protect your conversations with our robust authentication system. Your privacy is our top priority with end-to-end encryption.",
      delay: "0.4s",
    },
    {
      icon: <UserPlus className="h-12 w-12 text-wechat-orange" />,
      title: "Easy Onboarding",
      description:
        "Join our community in seconds. Create your account and start connecting with friends and family around the globe.",
      delay: "0.6s",
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-wechat-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient">WeChat</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our platform combines powerful features with an intuitive user experience to make staying connected easier than ever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-wechat-black-light dark:bg-wechat-black-dark shadow-lg rounded-2xl p-8 border border-gray-800 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: feature.delay }}
            >
              <div className="bg-wechat-orange/10 rounded-2xl p-4 inline-flex mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
