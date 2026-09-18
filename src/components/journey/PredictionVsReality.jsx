import React, { useState } from 'react';
import { MoveHorizontal, Eye, Scale, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function PredictionVsReality() {
  const [prediction, setPrediction] = useState(65);
  const target = 80;
  const difference = Math.abs(target - prediction);
  
  const [revealed, setRevealed] = useState(false);
  
  const testCases = [
    { name: 'A', pred: 95, color: '#ec5faa' },
    { name: 'B', pred: 80, color: '#4185d9' },
    { name: 'C', pred: 102, color: '#6654f5' },
    { name: 'D', pred: 40, color: '#d83f97' },
  ];

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">2</span>
            Prediction vs Reality
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A prediction on its own is just a number. It only becomes meaningful when we <Highlight color="#6654f5">compare it to reality</Highlight>.
            <br/><br/>
            To figure out how wrong an AI is, we simply measure the distance between what it guessed and what actually happened.
          </p>
          
          <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] grid sm:grid-cols-3 gap-4 text-center font-mono font-bold text-lg mt-8">
            <div>
              <div className="text-sm text-ink/60 mb-1">ACTUAL SCORE</div>
              <div className="text-[#237957] text-2xl">80</div>
            </div>
            <div className="flex items-center justify-center text-ink/30">-</div>
            <div>
              <div className="text-sm text-ink/60 mb-1">PREDICTED</div>
              <div className="text-[#ec5faa] text-2xl">72</div>
            </div>
          </div>
          <div className="text-center font-display font-bold text-2xl mt-4">
            Difference = 8
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Scale className="text-[#ec5faa]" />
          The Difference Meter
        </h2>
        
        <div className="bg-white p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] mb-8 overflow-hidden">
          
          <div className="relative h-24 flex items-end justify-between px-4 mb-8">
            <div className="absolute bottom-4 left-4 right-4 h-1 bg-ink/10 rounded-full" />
            
            {/* Target Marker */}
            <div className="absolute bottom-2 -ml-2" style={{ left: `calc(4vw + ${target} * 0.9vw)` }}>
              <div className="flex flex-col items-center">
                <span className="font-bold text-[#237957] bg-[#dff4e8] px-2 py-1 rounded border-2 border-[#237957] mb-2 text-sm z-10">Target {target}</span>
                <div className="w-4 h-4 bg-[#237957] rounded-full border-2 border-ink z-10 shadow-[2px_2px_0_#17191f]" />
              </div>
            </div>

            {/* Prediction Marker */}
            <div className="absolute bottom-2 -ml-2 transition-all duration-75" style={{ left: `calc(4vw + ${prediction} * 0.9vw)` }}>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-[#ec5faa] rounded-full border-2 border-ink z-20 shadow-[2px_2px_0_#17191f]" />
                <span className="font-bold text-[#ec5faa] bg-[#fbe1eb] px-2 py-1 rounded border-2 border-[#ec5faa] mt-2 text-sm z-20">Pred {prediction}</span>
              </div>
            </div>

            {/* Distance line */}
            {difference > 0 && (
              <div 
                className="absolute bottom-3.5 h-1 bg-ink/40 border-y-2 border-ink border-dashed transition-all duration-75 z-0" 
                style={{ 
                  left: `calc(4vw + ${Math.min(target, prediction)} * 0.9vw + 8px)`,
                  width: `calc(${difference} * 0.9vw)` 
                }} 
              />
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="flex justify-between font-bold mb-2">
                <span>Drag your prediction</span>
                <span className="font-mono text-[#ec5faa]">{prediction}</span>
              </div>
              <input type="range" min="0" max="100" value={prediction} onChange={(e) => setPrediction(parseInt(e.target.value))} className="w-full accent-[#ec5faa]" />
            </div>

            <div className="flex items-center gap-4">
              <div className="font-display font-bold text-xl shrink-0">ERROR</div>
              <div className="flex-1 h-8 bg-ink/5 rounded-full border-2 border-ink/20 overflow-hidden relative">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-[#ec5faa] transition-all duration-75 flex items-center justify-end pr-2 font-bold text-white text-sm"
                  style={{ width: `${Math.min(100, difference * 2)}%` }}
                >
                </div>
              </div>
              <div className="font-mono font-bold text-2xl shrink-0 w-12 text-right">{difference}</div>
            </div>
            
            {difference === 0 && (
              <div className="text-center font-bold text-[#237957] animate-[bounce_1s_infinite]">Perfect Match! 0 Error.</div>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Eye className="text-[#ec5faa]" />
          Which one is worse?
        </h2>

        <div className="bg-[#fffdf8] p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f]">
          <div className="text-center font-bold text-xl mb-8 bg-[#dff4e8] inline-block px-6 py-2 rounded-xl border-2 border-[#237957] mx-auto text-[#237957]">
            Actual Target = 100
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {testCases.map((tc) => (
              <div key={tc.name} className="bg-white p-4 rounded-xl border-2 border-ink flex items-center justify-between">
                <div className="font-bold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: tc.color }}>{tc.name}</span>
                  Prediction →
                </div>
                <div className="font-mono font-bold text-xl" style={{ color: tc.color }}>{tc.pred}</div>
                
                {revealed && (
                  <div className="font-mono font-bold text-ink bg-paper px-3 py-1 border-2 border-ink rounded-lg animate-[fadeIn_0.3s_ease-out]">
                    Diff: {Math.abs(100 - tc.pred)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            {!revealed ? (
              <button onClick={() => setRevealed(true)} className="px-6 py-3 bg-sunshine border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-transform">
                Reveal Differences
              </button>
            ) : (
              <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f] animate-[fadeIn_0.5s_ease-out]">
                Predictions can be wrong by vastly different amounts. Prediction D was off by 60, while Prediction C was only off by 2.
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              During training, an AI model is fed thousands or millions of examples where the "Actual Target" is already known. 
              <br/><br/>
              Every training example gives the model an opportunity to guess, compare its prediction with reality, and measure exactly how far off it was.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
