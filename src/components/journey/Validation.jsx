import React, { useState } from 'react';
import { Settings, Play, CheckCircle2 } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Validation() {
  const [complexity, setComplexity] = useState(3);

  // Mocked performance data to illustrate the concept clearly without complex math here
  // Train goes up with complexity, Val goes up then down.
  const getMetrics = (comp) => {
    // Train: 60 to 99
    const train = Math.min(99, 60 + (comp - 1) * 8);
    // Val: Peaks around complexity 4-5
    let val;
    if (comp <= 5) val = 55 + (comp - 1) * 7;
    else val = 83 - (comp - 5) * 5;
    return { train, val };
  };

  const { train, val } = getMetrics(complexity);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">3</span>
            Validation
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If we adjust our model until it gets a high score on the test set, haven't we just used the test set to train the model? Yes! That's why we need a third split: <Highlight color="#237957">Validation Data</Highlight>.
            <br/><br/>
            Validation data helps us tune settings (like model complexity) before we do our final, one-time evaluation on the test set.
          </p>
        </div>
      </section>

      <section>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Three Boxes Visual */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-8 flex flex-col items-center gap-4">
            
            <div className="w-full max-w-[200px] p-4 bg-sunshine border-2 border-ink rounded-xl shadow-[4px_4px_0_#17191f] text-center font-bold">
              TRAINING<br/>DATA
              <p className="text-xs opacity-60 mt-2 font-normal">→ learns parameters</p>
            </div>
            
            <div className="h-8 w-1 bg-ink/20"></div>
            
            <div className="w-full max-w-[200px] p-4 bg-[#c9baff] border-2 border-ink rounded-xl shadow-[4px_4px_0_#17191f] text-center font-bold">
              VALIDATION<br/>DATA
              <p className="text-xs opacity-60 mt-2 font-normal">→ compare settings</p>
            </div>

            <div className="h-8 w-1 bg-ink/20"></div>
            
            <div className="w-full max-w-[200px] p-4 bg-[#dff4e8] border-2 border-ink rounded-xl shadow-[4px_4px_0_#17191f] text-center font-bold opacity-80">
              TEST<br/>DATA
              <p className="text-xs opacity-60 mt-2 font-normal">→ final check</p>
            </div>
          </div>

          {/* Hands-on Experiment */}
          <div className="bg-paper rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-8 space-y-8">
            <div className="flex items-center gap-3">
              <Settings className="text-[#ec5faa]" />
              <h3 className="font-display font-bold text-xl">Choose Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-bold text-sm opacity-60">
                <span>Simple</span>
                <span>Complex</span>
              </div>
              <input 
                type="range" 
                min="1" max="10" step="1" 
                value={complexity} 
                onChange={(e) => setComplexity(parseInt(e.target.value))}
                className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
              />
              <div className="text-center font-bold text-sm">Model Complexity: {complexity}</div>
            </div>

            <div className="space-y-4 pt-4 border-t-2 border-ink/10">
              <div>
                <div className="flex justify-between font-bold text-sm mb-1">
                  <span>Training Performance</span>
                  <span className="font-mono">{train}%</span>
                </div>
                <div className="w-full h-4 bg-ink/10 rounded-full overflow-hidden">
                  <div className="h-full bg-sunshine transition-all duration-300" style={{ width: `${train}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-sm mb-1">
                  <span>Validation Performance</span>
                  <span className="font-mono">{val}%</span>
                </div>
                <div className="w-full h-4 bg-ink/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9baff] transition-all duration-300" style={{ width: `${val}%` }}></div>
                </div>
              </div>
            </div>

            {complexity > 7 && (
              <div className="bg-[#fffdf8] p-4 rounded-xl border-2 border-ink border-dashed text-sm font-bold animate-in fade-in slide-in-from-top-2">
                ⚠️ Notice how training performance is still going up, but validation performance is dropping! The model is getting too complex.
              </div>
            )}
            
            {complexity === 5 && (
              <div className="bg-[#dff4e8] p-4 rounded-xl border-2 border-ink text-sm font-bold animate-in fade-in slide-in-from-top-2 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#237957] shrink-0 mt-0.5" />
                This looks like the sweet spot. We would lock in Complexity 5 and evaluate on the Test Data once.
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
