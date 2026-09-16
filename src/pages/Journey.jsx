import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { journeyData } from "../data/journey";
import { Logo } from "../components/Logo";

export function Journey() {
  const [activeTopic, setActiveTopic] = useState("What is ML?");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sidebarRef = useRef(null);

  const handleScroll = () => {
    if (sidebarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    // Initial check in case it's scrollable on mount
    handleScroll();
  }, []);

  return (
    <div className="h-screen bg-paper text-ink overflow-hidden flex flex-col relative">
      {/* Playful Background Gradients */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,217,56,0.1),transparent_24%),radial-gradient(circle_at_84%_80%,rgba(102,85,242,0.08),transparent_27%)]" />
      
      {/* Floating Edge Decorations */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-10 top-[20%] block h-20 w-16 rotate-[25deg] rounded-xl border-[3px] border-ink bg-[#c9baff] opacity-50" />
        <div className="absolute -right-11 bottom-[10%] h-28 w-28 rounded-full border-[3px] border-ink bg-sunshine opacity-50" />
      </div>

      {/* Header */}
      <header className="flex-shrink-0 relative z-10 mx-auto flex w-full max-w-[1500px] items-center justify-between gap-6 px-5 py-6 sm:px-8 lg:px-10 xl:px-14">
        <Logo />
        <nav className="hidden items-center gap-7 text-[15px] font-bold lg:flex">
          <Link to="/">Home</Link>
          <Link to="/journey" className="rounded-full bg-sunshine px-5 py-1.5 shadow-[2px_3px_0_#17191f] border-2 border-ink">
            Journey
          </Link>
          <a href="#experiments">Experiments</a>
          <a href="#about">About</a>
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

      {/* Workbook Layout */}
      <div className="flex-1 min-h-0 relative z-10 mx-auto flex w-full max-w-[1500px] flex-col lg:flex-row gap-12 lg:gap-10 px-5 pt-2 pb-6 sm:px-8 lg:px-10 xl:px-14">
        
        {/* Floating Sidebar (Table of Contents) wrapper */}
        <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 h-full relative flex flex-col">
          
          <div className="relative flex-1 min-h-0 w-full rounded-[24px] border-[3px] border-ink shadow-[5px_6px_0_#17191f] bg-[#fffdf8] overflow-hidden flex flex-col">
            <aside 
              ref={sidebarRef}
              onScroll={handleScroll}
              className="w-full h-full flex flex-col overflow-y-auto p-6 hide-scrollbar"
            >
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-violetPop/20 flex items-center justify-center border-2 border-ink">
                  <span className="text-sm">📚</span>
                </span>
                Curriculum
              </h2>
              
              <nav className="space-y-6">
                {journeyData.map((chapter) => (
                  <div key={chapter.chapter}>
                    <h3 className="px-2 mb-2 font-display text-[12px] uppercase tracking-widest font-bold text-ink/40">
                      {chapter.chapter}
                    </h3>
                    <ul className="space-y-1.5">
                      {chapter.topics.map((topic) => {
                        const isActive = activeTopic === topic;
                        return (
                          <li key={topic}>
                            <button
                              onClick={() => setActiveTopic(topic)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 ${
                                isActive
                                  ? "bg-sunshine border-2 border-ink shadow-[2px_2px_0_#17191f] text-ink translate-x-1"
                                  : "text-ink/75 hover:bg-black/5 hover:text-ink border-2 border-transparent"
                              }`}
                            >
                              {isActive && (
                                <span className="text-violetPop">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                  </svg>
                                </span>
                              )}
                              <span className={isActive ? "" : "ml-4"}>{topic}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Chalk Horizontal Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[5px] opacity-100 z-20 pointer-events-none" aria-hidden="true">
              <div 
                className="absolute top-0 left-0 h-full bg-sunshine transition-all duration-75 ease-out"
                style={{ width: `${scrollProgress > 0 ? Math.max(0, scrollProgress) : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Floating Lesson Page */}
        <main className="flex-1 w-full h-full bg-[#fffdf8] rounded-[26px] border-[3px] border-ink shadow-[8px_10px_0_#17191f] flex flex-col relative rotate-[0.2deg] overflow-hidden">
          
          {/* subtle paper texture / header decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(102,85,242,0.12),transparent_70%)] pointer-events-none" />

          {/* Content Header */}
          <div className="p-8 lg:p-10 pb-6 border-b-2 border-ink/10 relative flex-shrink-0">
            {/* Playful chalk rays decoration */}
            <svg className="absolute right-12 top-10 h-16 w-16 opacity-30" viewBox="0 0 112 112" aria-hidden="true">
              <path d="M52 14 L36 42" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
              <path d="M56 51 L84 34" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
              <path d="M60 68 L94 73" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
            </svg>

            {journeyData.map(chapter => {
              if (chapter.topics.includes(activeTopic)) {
                return (
                  <div key="header" className="relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-violetPop/15 text-violetPop border-2 border-violetPop/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      {chapter.chapter}
                    </span>
                    <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4">
                      {activeTopic}
                    </h1>
                    <p className="text-ink/70 font-medium text-lg lg:text-xl max-w-2xl">
                      {chapter.description}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Content Body Placeholder */}
          <div className="flex-1 p-8 lg:p-10 bg-white/50 overflow-y-auto custom-scrollbar">
            <div className="max-w-3xl">
              <p className="text-lg font-medium leading-relaxed mb-10">
                Welcome to the module on <strong className="font-bold relative inline-block">
                  {activeTopic}
                  <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path d="M0 5 Q 50 0 100 5" stroke="#ec5faa" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                </strong>. This is where the core lesson content will be displayed.
              </p>
              
              <div className="p-8 lg:p-12 rounded-[20px] border-[3px] border-ink border-dashed bg-[#faf8f4] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-sunshine border-[3px] border-ink shadow-[4px_5px_0_#17191f] mb-6 flex items-center justify-center rotate-6">
                  <span className="text-3xl font-black font-display text-ink">?</span>
                </div>
                <h4 className="font-display font-bold text-2xl mb-3">Content coming soon</h4>
                <p className="text-ink/65 text-base max-w-md font-medium leading-relaxed">
                  The interactive visualizations, notebooks, and detailed explanations for this topic are currently being forged in our laboratory.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
