import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import MobileCTA from "@/components/MobileCTA";
import Home from "@/pages/home";
import Evidence from "@/pages/evidence";
import CasePage from "@/pages/case";
import MediaPage from "@/pages/media";
import CulturePage from "@/pages/culture";
import ExperiencePage from "@/pages/experience";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/experience" component={ExperiencePage} />
          <Route path="/culture" component={CulturePage} />
          <Route path="/evidence" component={Evidence} />
          <Route path="/case" component={CasePage} />
          <Route path="/media" component={MediaPage} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [location] = useLocation();
  const isImmersive = location === "/experience";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navbar />
        <Router />
        {!isImmersive && <MobileCTA />}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
