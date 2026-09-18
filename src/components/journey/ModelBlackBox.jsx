import React, { useState } from 'react';
import { ArrowRight, Settings, Eye, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function ModelBlackBox() {
  const [hours, setHours] = useState(6);
  const [attendance, setAttendance] = useState(91);
  const [isRevealed, setIsRevealed] = useState(false);

  // Simple mock model equation
  // Score = 20 + (hours * 5) + (attendance * 0.3)
  const predictedScore = Math.min(100, Math.round(20 + (hours * 5) + (attendance * 0.3)));

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">1</span>
            What Does a Model Actually Do?
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A model is simply a <Highlight color="#62a9ff">mathematical system</Highlight> that takes inputs and produces an output. 
            Once we have translated our real-world information into numbers, a model can use them to make a prediction.
          </p>
          <div className="bg-[#c9baff] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center text-center font-bold">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-lg">
              <span>Inputs</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span className="bg-white border-2 border-ink px-4 py-2 rounded-lg">Model</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Prediction</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Settings className="text-[#ec5faa]" />
          Model Machine
        </h2>
        
        <div className="p-4 sm:p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-white shadow-[6px_8px_0_#17191f] mb-8">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setIsRevealed(!isRevealed)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 border-ink transition-all ${isRevealed ? 'bg-white shadow-[2px_2px_0_#17191f]' : 'bg-sunshine shadow-[4px_4px_0_#17191f] hover:-translate-y-1'}`}
            >
              <Eye size={18} /> {isRevealed ? "Hide Internals" : "Reveal What's Inside"}
            </button>
          </div>

          <div className="grid lg:grid-cols-[250px_1fr_200px] gap-6 items-center">
            
            {/* Inputs */}
            <div className="space-y-6 bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold text-center border-b-2 border-ink/20 pb-2 mb-4">INPUTS</h3>
              
              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <label>Hours Studied</label>
                  <span className="font-mono text-[#4185d9]">{hours}</span>
                </div>
                <input 
                  type="range" min="0" max="15" value={hours} 
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full accent-[#4185d9]"
                />
              </div>
              
              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <label>Attendance (%)</label>
                  <span className="font-mono text-[#d83f97]">{attendance}</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={attendance} 
                  onChange={(e) => setAttendance(parseInt(e.target.value))}
                  className="w-full accent-[#d83f97]"
                />
              </div>
            </div>

            {/* The Model */}
            <div className="flex justify-center relative">
              <ArrowRight size={32} className="absolute -left-6 top-1/2 -translate-y-1/2 text-ink/30 hidden lg:block" />
              <ArrowRight size={32} className="absolute -right-6 top-1/2 -translate-y-1/2 text-ink/30 hidden lg:block" />
              
              {!isRevealed ? (
                <div className="w-full max-w-[250px] aspect-square bg-[#17191f] rounded-2xl flex flex-col items-center justify-center text-white p-6 shadow-[8px_8px_0_#c9baff]">
                  <Settings size={48} className="mb-4 text-sunshine animate-[spin_10s_linear_infinite]" />
                  <div className="font-display text-2xl font-bold tracking-widest">MODEL</div>
                  <div className="text-white/50 font-mono mt-2 text-sm">???</div>
                </div>
              ) : (
                <div className="w-full max-w-[300px] bg-[#fbe1eb] border-[3px] border-ink rounded-2xl flex flex-col items-center p-6 shadow-[6px_6px_0_#17191f] text-ink animate-[fadeIn_0.3s_ease-out]">
                  <h3 className="font-bold mb-4 bg-white px-3 py-1 rounded border-2 border-ink text-sm">INSIDE THE MODEL</h3>
                  
                  <div className="w-full space-y-3 font-mono text-sm">
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span>Hours × 5.0</span>
                      <span className="font-bold text-[#4185d9]">{(hours * 5).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span>Att. × 0.3</span>
                      <span className="font-bold text-[#d83f97]">{(attendance * 0.3).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span>Base (Bias)</span>
                      <span className="font-bold text-[#237957]">20.0</span>
                    </div>
                    <div className="h-0.5 w-full bg-ink/20 my-2"></div>
                    <div className="flex justify-between items-center font-bold text-base">
                      <span>Sum</span>
                      <span>{predictedScore}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Output */}
            <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] flex flex-col items-center justify-center min-h-[150px]">
              <h3 className="font-bold text-center border-b-2 border-ink/20 pb-2 mb-4 w-full text-sm">PREDICTED SCORE</h3>
              <div className="font-display text-5xl font-bold text-[#237957]">
                {predictedScore}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Real AI Connection */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Examples</h2>
          
          <div className="space-y-4 font-mono font-bold text-sm sm:text-base">
            <div className="bg-white/80 border-2 border-ink p-4 rounded-xl shadow-[4px_4px_0_#17191f] flex flex-wrap items-center gap-3">
              <span className="w-24">Image</span> <ArrowRight size={16} className="text-ink/40" /> 
              <span className="bg-ink text-white px-3 py-1 rounded">Vision Model</span> <ArrowRight size={16} className="text-ink/40" />
              <span className="text-[#6654f5]">"Dog"</span>
            </div>
            
            <div className="bg-white/80 border-2 border-ink p-4 rounded-xl shadow-[4px_4px_0_#17191f] flex flex-wrap items-center gap-3">
              <span className="w-24">House features</span> <ArrowRight size={16} className="text-ink/40" /> 
              <span className="bg-ink text-white px-3 py-1 rounded">Pricing Model</span> <ArrowRight size={16} className="text-ink/40" />
              <span className="text-[#237957]">$450,000</span>
            </div>

            <div className="bg-white/80 border-2 border-ink p-4 rounded-xl shadow-[4px_4px_0_#17191f] flex flex-wrap items-center gap-3">
              <span className="w-24">Email text</span> <ArrowRight size={16} className="text-ink/40" /> 
              <span className="bg-ink text-white px-3 py-1 rounded">Spam Filter</span> <ArrowRight size={16} className="text-ink/40" />
              <span className="text-[#ec5faa]">"Spam"</span>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed mt-8 bg-white/50 p-6 rounded-xl border-2 border-ink/20">
            A model is just a mathematical system that transforms input data into an output. In the rest of this chapter, we'll build up that exact mathematical system from scratch.
          </div>
        </div>
      </section>
    </div>
  );
}
