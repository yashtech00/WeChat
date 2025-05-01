
import  { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import axios from "axios";

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
    
    const { authUser, loading } = useAuth();

    if (loading) {
        return (
            <div>
                loading
            </div>
        )
    }

    const Backend_Url = import.meta.env.VITE_APP_BACKEND_URL;


    const handleLogout = async () => {
        try {
            const res = await axios.post(`${Backend_Url}/user/logout`, {}, { withCredentials: true })
        } catch (e:any) {
            console.error(e.message);
        }
    }

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
                  {!authUser ? (
                      <div>
                          <Link to={"/login"}>
                              <Button variant="ghost" className="hover:text-orange-600 text-white">Login</Button>
                          </Link>

                          <Link to={"/signup"}>
                              <Button className="bg-orange-600 hover:bg-orange-600-dark">Sign Up</Button>
                              </Link>
                        </div>
                  ) : (
                          <div>
                           <Button className="bg-orange-600 hover:bg-orange-600-dark" onClick={handleLogout}>Logout</Button >   
                          </div>
                  )}
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;