import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { IntroAnimation } from "@/components/IntroAnimation";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Play the intro once per browser session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem("sa-intro-seen");
    } catch {
      return true;
    }
  });

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem("sa-intro-seen", "1");
    } catch {
      // ignore private-mode errors
    }
    setShowIntro(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Intro overlay — mounts above everything, removed after animation */}
        <AnimatePresence>
          {showIntro && (
            <IntroAnimation key="intro" onComplete={handleIntroComplete} />
          )}
        </AnimatePresence>

        {/* Main site — renders beneath the intro from the start */}
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
