import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  const questions = [
    "What if backend development didn't have to be hard?",
    "What if you could ship in minutes instead of months?",
    "What if infrastructure just... worked?",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prev) => {
        setPreviousQuestionIndex(prev);
        return (prev + 1) % questions.length;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waitlist signup:", email);
  };

  useEffect(() => {
    if (searchParams.get("focus") === "email") {
      setTimeout(() => {
        const emailInput = document.getElementById("email-input");
        emailInput?.focus();
        emailInput?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100 flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-6 py-6 md:px-12 md:py-8">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl md:text-2xl font-bold tracking-tight">
            Shuten
          </div>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block -ml-4 md:-ml-8 lg:-ml-36 bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
              The last backend
            </span>
            <span className="block ml-4 md:ml-8 lg:ml-48 bg-gradient-to-r from-stone-100 to-stone-300 bg-clip-text text-transparent">
              you'll ever need
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-3xl text-stone-400 mb-12">
            AI-powered infrastructure that just works
          </p>

          {/* Rotating Questions */}
          <div className="h-32 md:h-36 mb-12 flex items-center justify-center relative">
            <div className="text-base md:text-lg lg:text-xl text-stone-300 italic relative w-full">
              {questions.map((question, index) => (
                <span
                  key={index}
                  className={`absolute left-0 right-0 transition-all duration-700 ${
                    index === currentQuestionIndex
                      ? "opacity-100 translate-y-4"
                      : index === previousQuestionIndex
                      ? "opacity-30 -translate-y-8"
                      : "opacity-0 translate-y-12"
                  }`}
                >
                  {question}
                </span>
              ))}
            </div>
          </div>

          {/* Email Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
          >
            <Input
              id="email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-stone-900/50 border-stone-800 text-stone-100 placeholder:text-stone-500 focus:border-stone-600 focus:ring-stone-600"
              required
            />
            <Button
              type="submit"
              className="bg-stone-100 text-stone-900 hover:bg-stone-200 font-semibold px-6"
            >
              Join Waitlist
            </Button>
          </form>

          {/* Stealth Mode Notice */}
          <p className="text-sm text-stone-500">
            Early access by invitation only
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 md:px-12 md:py-8 text-center">
        <p className="text-sm text-stone-500">
          A product of{" "}
          <a
            href="https://www.saishuu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-stone-100 transition-colors underline"
          >
            Saishuu Technologies
          </a>
        </p>
        <p className="text-xs text-stone-600 mt-2">
          © {new Date().getFullYear()} Saishuu Technologies. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
