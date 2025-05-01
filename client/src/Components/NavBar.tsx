
import  { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-black shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gradient text-orange-700">WeChat</div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex gap-2 items-center hover:bg-orange-600 text-orange-600">
            <Star className="h-5 w-5" />
            <span>Give us a star</span>
          </Button>
          <Button variant="ghost" className="hover:text-orange-600 text-white">Login</Button>
          <Button className="bg-orange-600 hover:bg-orange-600-dark">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;