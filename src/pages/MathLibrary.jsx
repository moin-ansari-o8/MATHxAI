import React, { useState, useRef, useEffect } from "react";
import { mathLibraryData } from "../data/mathLibrary";
export function MathLibrary() {
  const [activeTopic, setActiveTopic] = useState(() => mathLibraryData[0]?.topics[0]?.id || "");
  const [learnedTopics, setLearnedTopics] = useState(() => {
    const saved = localStorage.getItem("learnedMathTopics");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [collapsedChapters, setCollapsedChapters] = useState(() => {
    return new Set(mathLibraryData.slice(1).map(c => c.chapter));
  });
  const activeChapterObj = mathLibraryData.find(chapter => chapter.topics.some(t => t.id === activeTopic));
  
  const [pinnedChapters, setPinnedChapters] = useState(() => {
    return activeChapterObj ? new Set([activeChapterObj.chapter]) : new Set();
  });
  const [lastActiveChapter, setLastActiveChapter] = useState(activeChapterObj?.chapter);
  const [wigglingPin, setWigglingPin] = useState(null);

  useEffect(() => {
    if (activeChapterObj && activeChapterObj.chapter !== lastActiveChapter) {
      setLastActiveChapter(activeChapterObj.chapter);
      
      setCollapsedChapters(prev => {
        const newSet = new Set(prev);
        newSet.delete(activeChapterObj.chapter);
        return newSet;
      });
      
      setPinnedChapters(prev => {
        const newSet = new Set(prev);
        newSet.add(activeChapterObj.chapter);
        return newSet;
      });
    }
  }, [activeChapterObj?.chapter, lastActiveChapter]);
  
  const allTopics = mathLibraryData.flatMap(chapter => chapter.topics);
  const currentTopicIndex = allTopics.findIndex(t => t.id === activeTopic);
  const prevTopic = currentTopicIndex > 0 ? allTopics[currentTopicIndex - 1].id : null;
  const nextTopic = currentTopicIndex < allTopics.length - 1 ? allTopics[currentTopicIndex + 1].id : null;
  const activeTopicObj = allTopics.find(t => t.id === activeTopic);

  const togglePin = (e, chapterName) => {
    e.stopPropagation();
    setPinnedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterName)) {
        newSet.delete(chapterName);
      } else {
        newSet.add(chapterName);
        setCollapsedChapters(coll => {
           const newColl = new Set(coll);
           newColl.delete(chapterName);
           return newColl;
        });
      }
      return newSet;
    });
  };

  const toggleChapter = (chapterName) => {
    if (pinnedChapters.has(chapterName)) {
      setWigglingPin(chapterName);
      setTimeout(() => setWigglingPin(null), 400);
      return;
    }
    
    setCollapsedChapters(prev => {
      const newSet = new Set(mathLibraryData.map(c => c.chapter));
      if (prev.has(chapterName)) {
        newSet.delete(chapterName);
      }
      pinnedChapters.forEach(pinned => {
        newSet.delete(pinned);
      });
      return newSet;
    });
  };

  const toggleLearned = (topic) => {
    setLearnedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topic)) newSet.delete(topic);
      else newSet.add(topic);
      localStorage.setItem("learnedMathTopics", JSON.stringify([...newSet]));
      return newSet;
    });
  };
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

      {/* Workbook Layout */}
      <div className="flex-1 min-h-0 relative z-10 mx-auto flex w-full max-w-[1500px] flex-col lg:flex-row gap-12 lg:gap-10 px-5 pt-28 pb-6 sm:px-8 lg:px-10 xl:px-14">
        
        {/* Floating Sidebar (Table of Contents) wrapper */}
        <div className="w-full lg:w-[320px] xl:w-[340px] flex-shrink-0 h-full relative flex flex-col">
          
          <div className="relative flex-1 min-h-0 w-full rounded-[24px] border-[3px] border-ink shadow-[5px_6px_0_#17191f] bg-[#fffdf8] overflow-hidden flex flex-col">
            <aside 
              ref={sidebarRef}
              onScroll={handleScroll}
              className="w-full h-full flex flex-col overflow-y-auto p-6 hide-scrollbar"
              style={{ overflowAnchor: 'none' }}
            >
              <nav className="space-y-6 pt-4">
                {mathLibraryData.map((chapter) => {
                  const totalTopics = chapter.topics.length;
                  const learnedCount = chapter.topics.filter(t => learnedTopics.has(t.id)).length;
                  const progress = totalTopics > 0 ? (learnedCount / totalTopics) * 100 : 0;
                  
                  const isExpanded = !collapsedChapters.has(chapter.chapter);
                  
                  return (
                    <div key={chapter.chapter}>
                      <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer" onClick={() => toggleChapter(chapter.chapter)}>
                        <h3 className="font-display text-[12px] uppercase tracking-widest font-bold">
                          <span
                            className="bg-clip-text text-transparent inline-block"
                            style={{
                              backgroundImage: `linear-gradient(to right, #6654f5 50%, rgba(23, 25, 31, 0.4) 50%)`,
                              backgroundSize: "200% 100%",
                              backgroundPosition: `${100 - progress}% 0`,
                              transition: "background-position 1s cubic-bezier(0.22, 1, 0.36, 1)"
                            }}
                          >
                            {chapter.chapter}
                          </span>
                        </h3>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => togglePin(e, chapter.chapter)}
                            className={`p-1.5 rounded-md transition-all ${pinnedChapters.has(chapter.chapter) ? 'text-[#ec5faa] bg-[#ec5faa]/10 opacity-100' : 'text-ink/20 hover:text-ink/50 opacity-0 group-hover:opacity-100'}`}
                            title={pinnedChapters.has(chapter.chapter) ? "Unpin chapter" : "Pin chapter open"}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={pinnedChapters.has(chapter.chapter) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${pinnedChapters.has(chapter.chapter) ? "rotate-12 scale-110" : "hover:-rotate-12"} ${wigglingPin === chapter.chapter ? "animate-pin-wiggle" : ""}`}>
                              <line x1="12" y1="17" x2="12" y2="22"></line>
                              <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
                            </svg>
                          </button>
                          <button className="text-ink/40 group-hover:text-ink transition-colors">
                            <svg 
                              className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isExpanded ? "-rotate-90" : "rotate-0"}`} 
                              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                            >
                              <path d="M6 9l6 6 6-6"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div 
                        className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ gridTemplateRows: !isExpanded ? "0fr" : "1fr" }}
                      >
                        <div className="overflow-hidden -mx-2 px-2">
                          <ul className="space-y-1.5 pb-2">
                      {chapter.topics.map((topicObj) => {
                        const isActive = activeTopic === topicObj.id;
                        const isLearned = learnedTopics.has(topicObj.id);
                        return (
                          <li key={topicObj.id}>
                            <button
                              onClick={() => setActiveTopic(topicObj.id)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-[14px] font-semibold transition-all flex items-center justify-between gap-2 ${
                                isActive
                                  ? "bg-sunshine border-2 border-ink shadow-[2px_2px_0_#17191f] text-ink translate-x-1"
                                  : "text-ink/75 hover:bg-black/5 hover:text-ink border-2 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={isActive ? "" : "ml-4"}>{topicObj.title}</span>
                              </div>
                              {isLearned && (
                                <svg className="w-4 h-4 shrink-0 text-[#237957] opacity-80 rotate-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 6L9 17l-5-5"/>
                                </svg>
                              )}
                            </button>
                          </li>
                        );
                      })}
                          </ul>
                        </div>
                      </div>
                  </div>
                  );
                })}
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

        {/* Floating Lesson Page Wrapper */}
        <div className="flex-1 w-full h-full relative flex flex-col min-h-0">
          
          {/* Top Border Badge */}
          {activeChapterObj && (
            <div className="absolute -top-5 left-8 lg:left-12 z-20 px-5 py-2 bg-violetPop text-white border-[3px] border-ink font-display font-bold text-sm uppercase tracking-widest shadow-[3px_4px_0_#17191f] rotate-[-2deg]">
              {activeChapterObj.chapter}
            </div>
          )}

          <main className="flex-1 w-full h-full bg-[#fffdf8] rounded-[26px] border-[3px] border-ink shadow-[8px_10px_0_#17191f] flex flex-col relative rotate-[0.2deg] overflow-hidden">
          
          {/* subtle paper texture / header decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(102,85,242,0.12),transparent_70%)] pointer-events-none" />

          {/* Content Header */}
          <div className="p-8 lg:p-10 pb-6 border-b-2 border-ink/10 relative flex-shrink-0">

            {activeChapterObj && (
              <div className="relative z-10">
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4 flex items-center flex-wrap gap-x-3 mt-2">
                  <span>{activeTopicObj?.title}</span>
                  {/* Playful chalk rays decoration */}
                  <svg className="inline-block h-10 w-10 opacity-35" viewBox="0 0 112 112" aria-hidden="true">
                    <path d="M52 14 L36 42" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
                    <path d="M56 51 L84 34" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
                    <path d="M60 68 L94 73" stroke="#ffda45" strokeWidth="9" strokeLinecap="round" />
                  </svg>
                </h1>
                <p className="text-ink/70 font-medium text-lg lg:text-xl max-w-2xl">
                  {activeChapterObj.description}
                </p>
              </div>
            )}
          </div>

          {/* Content Body Placeholder */}
          <div className="flex-1 p-8 lg:p-10 bg-white/50 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="max-w-3xl">
              <p className="text-lg font-medium leading-relaxed mb-10">
                Welcome to the module on <strong className="font-bold relative inline-block">
                  {activeTopicObj?.title}
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

            <div className="mt-auto pt-10 flex justify-end items-center gap-3">
              {prevTopic && (
                <button 
                  onClick={() => setActiveTopic(prevTopic)}
                  className="w-[52px] h-[52px] rounded-xl border-[3px] border-ink font-bold shadow-[4px_5px_0_#17191f] transition-colors flex items-center justify-center bg-white text-ink hover:bg-sunshine shrink-0"
                  aria-label="Previous lesson"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
              )}
              
              <button 
                onClick={() => toggleLearned(activeTopic)}
                className={`w-[52px] h-[52px] rounded-xl border-[3px] border-ink font-bold shadow-[4px_5px_0_#17191f] transition-colors flex items-center justify-center shrink-0 ${
                  learnedTopics.has(activeTopic) 
                    ? "bg-[#dff4e8] text-[#237957]" 
                    : "bg-white text-ink/30 hover:bg-black/5 hover:text-ink/60"
                }`}
                aria-label="Mark as learned"
              >
                <svg className={`w-6 h-6 ${learnedTopics.has(activeTopic) ? "-rotate-3" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </button>

              {nextTopic && (
                <button 
                  onClick={() => setActiveTopic(nextTopic)}
                  className="w-[52px] h-[52px] rounded-xl border-[3px] border-ink font-bold shadow-[4px_5px_0_#17191f] transition-colors flex items-center justify-center bg-white text-ink hover:bg-sunshine shrink-0"
                  aria-label="Next lesson"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
}
