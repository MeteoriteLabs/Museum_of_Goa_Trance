import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, NAV_MORE_LINKS, PETITION_LINK } from "@/lib/constants";
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allLinks = [...NAV_LINKS, ...NAV_MORE_LINKS];
  const isMoreActive = NAV_MORE_LINKS.some((l) => location === l.href);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-md border-b"
      data-testid="navbar"
    >
      <div className={`max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 ${scrolled ? "py-1.5" : "py-3"} transition-all duration-300`}>
        <Link href="/" className="flex items-center gap-2" data-testid="link-home-logo">
          <img
            src="/images/logo.png"
            alt="Protect the Birthplace"
            className={`${scrolled ? "h-6 w-6" : "h-8 w-8"} transition-all duration-300 rounded-full object-cover`}
          />
          <span className="font-semibold text-sm hidden sm:inline">
            Museum of Goa Trance
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

          <div className="relative" ref={moreRef}>
            <Button
              variant={isMoreActive ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setMoreOpen((v) => !v)}
              data-testid="button-nav-more"
              className="gap-1"
            >
              More
              <ChevronDown className={`w-3 h-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </Button>
            {moreOpen && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-background border rounded-md shadow-lg py-1 z-50">
                {NAV_MORE_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <button
                      className={`w-full text-left px-3 py-2 text-sm hover-elevate ${location === link.href ? "bg-secondary" : ""}`}
                      onClick={() => setMoreOpen(false)}
                      data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
              {allLinks.map((link) => (
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
