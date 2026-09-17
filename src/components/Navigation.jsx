import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { Logo } from "./Logo";

export function Navigation() {
  const location = useLocation();
  const hideOnMobilePaths = ['/journey', '/math-library'];
  const isHiddenOnMobile = hideOnMobilePaths.includes(location.pathname);

  return (
    <div id="main-navigation" className={`fixed top-0 left-0 right-0 z-[50] bg-[#fffdf8]/60 backdrop-blur-md ${isHiddenOnMobile ? 'hidden lg:block' : ''}`}>
      <header className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10 xl:px-14">
        <Logo />
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
          <Link 
            to="/math-library" 
            className={location.pathname === "/math-library" ? "rounded-full bg-sunshine px-5 py-1.5 shadow-[2px_3px_0_#17191f] border-2 border-ink" : ""}
          >
            Math Library
          </Link>
          <a href="#experiments">Experiments</a>
          <Link to="/about">About</Link>
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
      </header>
    </div>
  );
}
