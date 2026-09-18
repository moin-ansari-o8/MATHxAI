import React, { useState } from 'react';
import { Route, EyeOff, X } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function InformationFlow() {
  const [removedAnimal, setRemovedAnimal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const tokens = [
    { word: 'animal', weight: 0.5, color: '#ec5faa' },
    { word: 'crossed', weight: 0.1, color: '#17191f' },
    { word: 'street', weight: 0.1, color: '#17191f' },
    { word: 'tired', weight: 0.3, color: '#237957' }
  ];

  // Adjust weights if 'animal' is removed
  const getWeights = () => {
    if (!removedAnimal) return tokens;
    
    // If animal is removed, 'tired' gets much higher weight, others get a bit more
    return [
      { word: '[removed]', weight: 0.0, color: '#17191f' },
      { word: 'crossed', weight: 0.15, color: '#17191f' },
      { word: 'street', weight: 0.15, color: '#17191f' },
      { word: 'tired', weight: 0.7, color: '#237957' }
    ];
  };

  const currentWeights = getWeights();

  const stepDetails = [
    "Raw Embedding (No Context)",
    "Attention Weights Computed",
    "Weighted Information Flows In",
    "New Contextual Representation"
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">6</span>
            Information Flow
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            The key conceptual shift is this: Do not think of attention as the model "looking" at a word. Think of it as <Highlight color="#6654f5">the representation being updated</Highlight> using weighted information flowing in from other representations.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Route className="text-[#ec5faa]" />
          Information Flow Map
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center min-h-[400px]">
            
            {/* Left side: Context words */}
            <div className="space-y-6">
              {currentWeights.map((t, i) => (
                <div key={i} className={`flex items-center justify-end gap-4 transition-all duration-500 ${t.weight === 0 ? 'opacity-20 grayscale' : ''}`}>
                  <div className="font-serif text-xl font-bold">{t.word}</div>
                  
                  {/* The flowing arrow */}
                  <div className="w-32 h-16 flex items-center relative overflow-hidden group">
                    <div 
                      className="absolute right-0 h-1 bg-ink rounded-l-full transition-all duration-700 ease-out flex items-center justify-start"
                      style={{
                        width: activeStep >= 2 ? '100%' : '0%',
                        height: activeStep >= 2 ? `${t.weight * 20 + 2}px` : '2px',
                        backgroundColor: t.color,
                        opacity: activeStep >= 1 ? 1 : 0
                      }}
                    >
                      {activeStep >= 2 && t.weight > 0 && (
                        <div className="w-2 h-2 bg-white rounded-full ml-1 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle divider */}
            <div className="w-1 bg-ink/10 h-full rounded-full hidden lg:block" />

            {/* Right side: The target word getting updated */}
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold tracking-widest opacity-60 mb-8">TARGET TOKEN</div>
              
              <div className="relative">
                {/* The before/after container */}
                <div className={`
                  w-48 h-48 rounded-full border-4 border-ink shadow-[8px_8px_0_#17191f] flex flex-col items-center justify-center transition-all duration-1000
                  ${activeStep === 0 ? 'bg-white' : ''}
                  ${activeStep === 1 ? 'bg-paper' : ''}
                  ${activeStep === 2 ? 'bg-[#c9baff] scale-110' : ''}
                  ${activeStep === 3 ? 'bg-[#237957] text-white scale-100 border-white' : ''}
                `}>
                  <div className="font-display font-bold text-5xl mb-2">it</div>
                  
                  <div className="text-xs font-bold tracking-widest px-4 text-center">
                    {activeStep === 0 && "STATIC EMBEDDING"}
                    {activeStep === 1 && "AWAITING CONTEXT"}
                    {activeStep === 2 && "MIXING VALUES..."}
                    {activeStep === 3 && "CONTEXT-AWARE VECTOR"}
                  </div>
                </div>
                
                {/* Flow particles animation when step 2 */}
                {activeStep === 2 && (
                  <div className="absolute inset-0 rounded-full border-4 border-[#ec5faa] animate-ping opacity-50" />
                )}
              </div>

              <div className="mt-12 bg-paper p-4 rounded-xl border-2 border-ink text-center w-full shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest text-[#ec5faa] mb-2">STEP {activeStep + 1} OF 4</h3>
                <div className="font-medium text-sm">{stepDetails[activeStep]}</div>
                <div className="flex justify-center gap-2 mt-4">
                  <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} className="px-3 py-1 bg-white border-2 border-ink rounded font-bold disabled:opacity-50">Prev</button>
                  <button onClick={() => setActiveStep(Math.max(0, activeStep + 1))} disabled={activeStep === 3} className="px-3 py-1 bg-ink text-white border-2 border-ink rounded font-bold disabled:opacity-50">Next</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hands on: Remove Context */}
      <section>
        <div className="bg-paper rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          <h3 className="font-bold text-sm tracking-widest opacity-60 flex items-center gap-2 mb-6"><EyeOff size={16}/> HANDS-ON EXPERIMENT</h3>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-xl font-bold font-display leading-relaxed">
                What happens if we remove the word <Highlight color="#ec5faa">animal</Highlight>?
              </div>
              <p className="font-medium opacity-80">
                The sentence becomes: <i>"The _____ crossed the street because it was tired."</i>
                <br/><br/>
                Without "animal", the model must rely more heavily on other words (like "tired" or "street") to figure out what "it" means, changing the attention weights entirely.
              </p>
              
              <button 
                onClick={() => {
                  setRemovedAnimal(!removedAnimal);
                  if (activeStep === 3) setActiveStep(1); // Force re-render of flow if finished
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all ${removedAnimal ? 'bg-[#ec5faa] text-white shadow-[4px_4px_0_#17191f]' : 'bg-white hover:bg-paper'}`}
              >
                {removedAnimal ? <X size={18} /> : <EyeOff size={18} />}
                {removedAnimal ? 'RESTORE "ANIMAL"' : 'REMOVE "ANIMAL"'}
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="font-bold text-sm tracking-widest opacity-60 mb-4">NEW WEIGHT DISTRIBUTION</div>
              
              <div className="flex h-12 bg-paper rounded border border-ink/20 overflow-hidden">
                {currentWeights.map((t, i) => (
                  t.weight > 0 && (
                    <div 
                      key={i}
                      className="h-full flex items-center justify-center text-xs font-bold font-mono text-white transition-all duration-700 overflow-hidden"
                      style={{width: `${t.weight * 100}%`, backgroundColor: t.color, opacity: 0.9}}
                    >
                      {t.weight > 0.15 ? t.word : ''}
                    </div>
                  )
                ))}
              </div>
              <div className="mt-4 text-center font-bold font-mono text-sm">
                Context Changed → Attention Changed → Output Changed
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
