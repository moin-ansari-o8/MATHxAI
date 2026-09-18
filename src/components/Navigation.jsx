import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hideOnMobilePaths = ['/journey', '/math-library'];
  const isHiddenOnMobile = hideOnMobilePaths.includes(location.pathname);

  return (
    <div id="main-navigation" className={`fixed top-0 left-0 right-0 z-[50] ${isHiddenOnMobile ? 'hidden lg:block' : ''}`}>
      <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10 xl:px-14">
        <div className="bg-[#fffdf8] lg:bg-transparent rounded-[20px] lg:rounded-none px-2 lg:px-0 py-1 lg:py-0 border-[3px] border-ink lg:border-transparent shadow-[2px_3px_0_#17191f] lg:shadow-none">
          <Logo />
        </div>
        <nav className="hidden items-center gap-7 text-[15px] font-bold lg:flex">
          <Link 
            to="/"
            className={location.pathname === "/" ? "rounded-full bg-sunshine px-5 py-1.5 shadow-[2px_3px_0_#17191f] border-2 border-ink" : ""} 
          >
            Home
          </Link>
          <Link 
            to="/journey" 
            className={location.pathname === "/journey" ? "rounded-full bg-sunshine px-5 py-1.5 shadow-[2px_3px_0_#17191f] border-2 border-ink" : ""}
          >
            Journey
          </Link>
          {/* Hidden for now
          <Link 
            to="/math-library" 
            className={location.pathname === "/math-library" ? "rounded-full bg-sunshine px-5 py-1.5 shadow-[2px_3px_0_#17191f] border-2 border-ink" : ""}
          >
            Math Library
          </Link>
          <a href="#experiments">Experiments</a>
          */}
          <Link 
            to="/about"
            className={location.pathname === "/about" ? "rounded-full bg-sunshine px-5 py-1.5 shadow-[2px_3px_0_#17191f] border-2 border-ink" : ""}
          >
            About
          </Link>
        </nav>
        <div className="hidden items-center gap-6 xl:flex">
          <label className="flex h-10 w-52 items-center gap-3 rounded-full border-2 border-ink bg-[#fffdf8] px-4 shadow-[2px_3px_0_#17191f]">
            <Search className="h-4 w-4" strokeWidth={3} />
            <input
              className="w-full bg-transparent text-[13px] font-semibold outline-none placeholder:text-ink/60"
              placeholder="Search concepts..."
            />
          </label>
        </div>

        {/* Mobile Menu Toggle & Dropdown */}
        <div className="lg:hidden relative flex items-center gap-3">
          <Link 
            to="/about"
            className="p-2 bg-[#fffdf8] rounded-xl border-[3px] border-ink shadow-[2px_3px_0_#17191f] hover:bg-sunshine transition-all flex items-center justify-center"
            aria-label="About"
          >
            <span className="w-7 h-7 flex items-center justify-center text-ink text-2xl font-serif italic font-bold leading-none">i</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-[#fffdf8] rounded-xl border-[3px] border-ink shadow-[2px_3px_0_#17191f] hover:bg-sunshine transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7 text-ink" strokeWidth={3} /> : <Menu className="w-7 h-7 text-ink" strokeWidth={3} />}
          </button>
          
          {isMobileMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsMobileMenuOpen(false)} />
              <div className="absolute top-full right-0 mt-3 w-56 bg-[#fffdf8] border-[3px] border-ink shadow-[4px_5px_0_#17191f] rounded-xl z-50 flex flex-col p-2 animate-in fade-in slide-in-from-top-2">
                <nav className="flex flex-col gap-1 text-base font-bold font-display">
                  <Link 
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === "/" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"} 
                  >
                    Home
                  </Link>
                  <Link 
                    to="/journey" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === "/journey" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"}
                  >
                    Journey
                  </Link>
                  {/* Hidden for now
                  <Link 
                    to="/math-library" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === "/math-library" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"}
                  >
                    Math Library
                  </Link>
                  <a href="#experiments" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent">Experiments</a>
                  */}
                  <Link 
                    to="/about" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={location.pathname === "/about" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"}
                  >
                    About
                  </Link>
                </nav>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
