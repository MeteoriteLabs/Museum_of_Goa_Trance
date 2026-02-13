import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, PETITION_LINK } from "@/lib/constants";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-md border-b"
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
          <img
            src="/images/logo.png"
            alt="Protect the Birthplace"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm hidden sm:inline">
            Protect the Birthplace
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={PETITION_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="sm" data-testid="button-petition-nav" className="hidden sm:flex">
              Sign the Petition
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </a>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={location === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileOpen(false)}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
