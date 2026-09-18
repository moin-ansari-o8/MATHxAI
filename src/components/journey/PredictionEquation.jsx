import React, { useState } from 'react';
import { Target, Calculator, Zap, HelpCircle } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function PredictionEquation() {
  const [w, setW] = useState(4.2);
  const [b, setB] = useState(12);
  const [activeTerm, setActiveTerm] = useState(null);
  
  const x = 6; // Fixed input
  const target = 80; // The goal prediction
  
  const currentPrediction = parseFloat((w * x + b).toFixed(1));
  const isWinner = Math.abs(currentPrediction - target) < 0.1;

  const terms = {
    y: { title: "Prediction (y)", desc: "The final output or answer our model gives us.", color: "text-[#17191f]" },
    w: { title: "Weight (w)", desc: "Controls how strongly the input affects the output.", color: "text-[#d83f97]" },
    x: { title: "Input (x)", desc: "The real-world information given to the model.", color: "text-[#4185d9]" },
    b: { title: "Bias (b)", desc: "Shifts the entire prediction up or down.", color: "text-[#237957]" }
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">5</span>
            The Prediction Equation
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If we combine everything we've discovered so far, we get the foundational equation that powers predictions in AI.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Calculator className="text-[#ec5faa]" />
          Equation Builder
        </h2>
        
        <div className="bg-white p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] mb-8">
          
          <div className="text-center mb-8 font-medium text-ink/70 flex items-center justify-center gap-2">
            <HelpCircle size={16} /> Click any term in the equation to understand it
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-4 font-mono text-4xl sm:text-5xl lg:text-7xl font-bold mb-12">
            <button 
              onClick={() => setActiveTerm('y')} 
              className={`transition-colors p-2 rounded-xl ${activeTerm === 'y' ? 'bg-[#17191f] text-white' : 'hover:bg-ink/5'}`}
            >
              y
            </button>
            <span>=</span>
            <button 
              onClick={() => setActiveTerm('w')} 
              className={`transition-colors p-2 rounded-xl text-[#d83f97] ${activeTerm === 'w' ? 'bg-[#fbe1eb]' : 'hover:bg-[#fbe1eb]/50'}`}
            >
              [w]
            </button>
            <span className="text-2xl text-ink/40">×</span>
            <button 
              onClick={() => setActiveTerm('x')} 
              className={`transition-colors p-2 rounded-xl text-[#4185d9] ${activeTerm === 'x' ? 'bg-[#c9baff]' : 'hover:bg-[#c9baff]/50'}`}
            >
              [x]
            </button>
            <span>+</span>
            <button 
              onClick={() => setActiveTerm('b')} 
              className={`transition-colors p-2 rounded-xl text-[#237957] ${activeTerm === 'b' ? 'bg-[#dff4e8]' : 'hover:bg-[#dff4e8]/50'}`}
            >
              [b]
            </button>
          </div>

          <div className="h-24">
            {activeTerm && (
              <div className="bg-paper p-4 rounded-xl border-2 border-ink animate-[fadeIn_0.2s_ease-out] text-center max-w-lg mx-auto">
                <div className={`font-bold text-lg mb-1 ${terms[activeTerm].color}`}>{terms[activeTerm].title}</div>
                <div className="font-medium text-ink/80">{terms[activeTerm].desc}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Target className="text-[#ec5faa]" />
          Beat the Target
        </h2>

        <div className={`p-6 lg:p-10 rounded-[20px] border-[3px] shadow-[6px_8px_0_#17191f] transition-colors duration-500 ${isWinner ? 'bg-[#dff4e8] border-[#237957]' : 'bg-[#c9baff] border-ink'}`}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            {/* Controls */}
            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              <div className="font-bold border-b-2 border-ink/20 pb-2 mb-4">ADJUST THE MODEL</div>
              
              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <label>Weight (w)</label>
                  <span className="font-mono text-[#d83f97]">{w.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0" max="20" step="0.1" value={w} 
                  onChange={(e) => setW(parseFloat(e.target.value))}
                  className="w-full accent-[#d83f97]"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <label>Bias (b)</label>
                  <span className="font-mono text-[#237957]">{b.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="-20" max="50" step="1" value={b} 
                  onChange={(e) => setB(parseFloat(e.target.value))}
                  className="w-full accent-[#237957]"
                />
              </div>
              
              <div className="pt-4 mt-4 border-t-2 border-ink/10">
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <label>Input (x) — <span className="opacity-60">Fixed from reality</span></label>
                  <span className="font-mono text-[#4185d9]">{x}</span>
                </div>
              </div>
            </div>

            {/* Scoreboard */}
            <div className="space-y-6 text-center">
              <div className="flex justify-center items-center gap-4 text-2xl font-bold font-mono">
                <span className="text-[#d83f97]">{w.toFixed(1)}</span>
                <span className="text-sm opacity-50">×</span>
                <span className="text-[#4185d9]">{x}</span>
                <span className="text-sm opacity-50">+</span>
                <span className="text-[#237957]">{b.toFixed(1)}</span>
              </div>
              
              <div className="text-5xl font-display font-bold">
                = <span className={isWinner ? 'text-[#237957]' : ''}>{currentPrediction.toFixed(1)}</span>
              </div>

              <div className={`mt-8 p-4 rounded-xl border-2 border-dashed ${isWinner ? 'border-[#237957] bg-white/50' : 'border-ink/20'}`}>
                <div className="text-sm font-bold opacity-60 mb-1">TARGET PREDICTION</div>
                <div className="text-3xl font-bold">{target.toFixed(1)}</div>
              </div>

              {isWinner && (
                <div className="font-bold text-[#237957] text-xl animate-[bounce_1s_infinite]">
                  TARGET REACHED! 🎉
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] text-ink shadow-[6px_8px_0_#17191f] text-center">
          <p className="text-xl font-bold leading-relaxed max-w-2xl mx-auto">
            Congratulations! You just built and tuned a tiny predictive model. By adjusting the weight and bias, you taught it to hit a target.
          </p>
        </div>
      </section>
    </div>
  );
}
