import Features from "./Features";
import { Footer } from "./Footer";
import Hero from "./HeroSection";
import Navbar from "./NavBar";


const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
