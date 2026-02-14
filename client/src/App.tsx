import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import MobileCTA from "@/components/MobileCTA";
import Home from "@/pages/home";
import Evidence from "@/pages/evidence";
import CasePage from "@/pages/case";
import MediaPage from "@/pages/media";
import CulturePage from "@/pages/culture";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/culture" component={CulturePage} />
      <Route path="/evidence" component={Evidence} />
      <Route path="/case" component={CasePage} />
      <Route path="/media" component={MediaPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navbar />
        <Router />
        <MobileCTA />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
