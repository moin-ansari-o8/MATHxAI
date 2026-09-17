import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { PanelLeftClose } from "lucide-react";

export function MobileDrawer({ isOpen, onClose, sidebarContent, pageTitle }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Reset dropdown when drawer closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsDropdownOpen(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[9998] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[85%] max-w-[360px] bg-[#fffdf8] z-[9999] border-r-[3px] border-ink flex flex-col transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${isOpen ? "translate-x-0 shadow-[8px_0_0_#17191f]" : "-translate-x-full shadow-none"}`}>
        
        {/* Header */}
        <div className="pt-5 px-5 pb-3 shrink-0 flex flex-col gap-5 relative z-20">
          <div className="flex items-center justify-between">
            <Logo />
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl border-2 border-transparent hover:border-ink hover:bg-sunshine hover:shadow-[2px_2px_0_#17191f] transition-all"
              aria-label="Close menu"
            >
              <PanelLeftClose className="w-6 h-6 text-ink" strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="relative flex justify-center">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="font-display font-bold text-lg tracking-wide uppercase flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/5 transition-colors text-ink"
            >
              {pageTitle}
              <svg className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#fffdf8] border-[3px] border-ink shadow-[4px_5px_0_#17191f] rounded-xl z-50 flex flex-col p-2 animate-in fade-in slide-in-from-top-2">
                  <nav className="flex flex-col gap-1 text-base font-bold font-display">
                    <Link 
                      to="/"
                      onClick={onClose}
                      className={location.pathname === "/" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"} 
                    >
                      Home
                    </Link>
                    <Link 
                      to="/journey" 
                      onClick={onClose}
                      className={location.pathname === "/journey" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"}
                    >
                      Journey
                    </Link>
                    <Link 
                      to="/math-library" 
                      onClick={onClose}
                      className={location.pathname === "/math-library" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"}
                    >
                      Math Library
                    </Link>
                    <a href="#experiments" onClick={onClose} className="px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent">Experiments</a>
                    <Link 
                      to="/about" 
                      onClick={onClose} 
                      className={location.pathname === "/about" ? "inline-block rounded-lg bg-sunshine px-4 py-3 shadow-[2px_2px_0_#17191f] border-2 border-ink w-full" : "px-4 py-3 w-full hover:bg-black/5 rounded-lg border-2 border-transparent"}
                    >
                      About
                    </Link>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hand-written Separator */}
        <div className="flex justify-center w-full mb-3 shrink-0">
          <svg className="h-2 w-24" preserveAspectRatio="none" viewBox="0 0 100 10">
            <path d="M0 5 Q 50 0 100 5" stroke="#ec5faa" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative z-10">
          <div className="absolute inset-0">
            {sidebarContent}
          </div>
        </div>
      </div>
    </>
  );
}
