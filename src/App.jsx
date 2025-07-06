import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator";
import About from "./components/About";


function App() {
  const [hideIntro, setHideIntro] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideIntro(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Main Page Content */}
      <Navbar />
      <Hero />
      <Calculator />
      <About/>
      <Footer />

      {/* Intro Overlay */}
      <div
        className={`fixed inset-0 bg-black flex flex-col items-center justify-center space-y-4 transition-transform duration-700 ease-in-out ${
          hideIntro ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-emerald-400 animate-pulse">
          Welcome to
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
          Loan <span className="text-emerald-400">Calculator</span>
        </h2>
      </div>
    </div>
  );
}

export default App;
