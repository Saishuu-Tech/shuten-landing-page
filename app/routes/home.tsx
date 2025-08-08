import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Mail } from "lucide-react";

export default function Home() {
  const [searchParams] = useSearchParams();
  const fetcher = useFetcher();
  const [email, setEmail] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isSubmitting = fetcher.state === "submitting";
  const error = fetcher.data?.error;
  const success = fetcher.data?.success;

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

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setEmail("");
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [success]);

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
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-foreground flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-6 py-6 md:px-12 md:py-8">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl md:text-2xl tracking-tight">
            <a
              href="https://www.saishuu.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 font-bold hover:text-muted-foreground transition-colors"
            >
              Saishuu
            </a>
            <span className="mr-2 select-none">|</span>
            <span className="text-primary font-semibold select-none">
              Shuten
            </span>
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
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span className="block -ml-4 md:-ml-8 lg:-ml-36 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              The last backend
            </span>
            <span className="block ml-4 md:ml-8 lg:ml-48 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              you'll ever need
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl lg:text-3xl text-muted-foreground mb-8 lg:mb-16"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            AI-powered infrastructure that just works
          </p>

          {/* Stealth Mode Notice */}
          <p
            className="text-sm text-muted-foreground/70 mb-4 italic"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Early access by invitation only
          </p>

          {/* Email Signup Form */}
          <fetcher.Form
            method="post"
            action="/api/waitlist"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                id="email-input"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:ring-ring"
                required
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </fetcher.Form>

          {/* Success/Error Messages */}
          {showSuccess && (
            <div className="text-center mb-4 space-y-1">
              <p className="text-lg font-bold text-success animate-in fade-in slide-in-from-bottom-2 duration-500">
                You're on the list!
              </p>
              <p className="text-xs text-muted-foreground/80">
                Check your email for confirmation
              </p>
            </div>
          )}
          {error && (
            <p className="text-sm text-error text-center mb-4">{error}</p>
          )}

          {/* Rotating Questions */}
          <div className="h-32 md:h-36 flex items-center justify-center relative">
            <div className="text-base md:text-lg lg:text-xl text-muted-foreground italic relative w-full">
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
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {question}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 md:px-12 md:py-8 text-center">
        <p className="text-sm text-muted-foreground/70">
          A product of{" "}
          <a
            href="https://www.saishuu.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Saishuu Technologies
          </a>
        </p>
        <p className="text-xs text-muted-foreground/50 mt-2">
          © {new Date().getFullYear()} Saishuu Technologies. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
