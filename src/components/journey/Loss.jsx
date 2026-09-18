import React, { useState } from 'react';
import { Target, AlertTriangle, ArrowRight, Activity } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Loss() {
  const [prediction, setPrediction] = useState(65);
  const target = 80;
  
  const error = target - prediction;
  const loss = Math.abs(error); // In this simple introductory case, absolute error is the loss
  
  // For visual representation
  const maxLoss = 100;
  const lossPercentage = (loss / maxLoss) * 100;
  
  // Calculate vertical positions (y-axis)
  // Let's say 100 is top (0px), 0 is bottom (300px)
  const mapY = (val) => 300 - (val * 3);
  
  const targetY = mapY(target);
  const predY = mapY(prediction);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">3</span>
            Loss
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            We know how to find the difference between a prediction and reality. In AI, this numerical measure of "wrongness" has a specific name: <Highlight color="#d83f97">Loss</Highlight>.
          </p>
          
          <div className="flex justify-center my-8">
            <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] font-bold text-center text-lg flex items-center gap-4 flex-wrap justify-center">
              <span>Prediction</span> <ArrowRight className="text-ink/30" /> 
              <span>Compare with Target</span> <ArrowRight className="text-ink/30" /> 
              <span className="text-[#ec5faa] text-2xl font-display px-4 py-2 bg-white rounded-lg border-2 border-ink">Loss</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <AlertTriangle className="text-[#ec5faa]" />
          The Loss Meter
        </h2>
        
        <div className="bg-white p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] mb-8">
          
          <div className="grid sm:grid-cols-[1fr_200px] gap-8 items-center max-w-2xl mx-auto">
            
            {/* Visualizer */}
            <div className="relative h-[300px] bg-paper rounded-xl border-2 border-ink shadow-inner flex justify-center w-full">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none p-4">
                {[100, 75, 50, 25, 0].map(val => (
                  <div key={val} className="border-b-2 border-ink border-dashed w-full" />
                ))}
              </div>
              
              <div className="relative w-32 h-full">
                
                {/* Target Dot */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 w-full"
                  style={{ top: `${targetY}px` }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#237957] border-2 border-ink shadow-[2px_2px_0_#17191f] z-20 shrink-0" />
                  <span className="font-bold text-[#237957] bg-[#dff4e8] px-2 py-1 rounded border border-[#237957] text-xs">Target</span>
                </div>

                {/* Error Line */}
                <div 
                  className="absolute left-1/2 w-2 -translate-x-1/2 bg-[#ec5faa]/30 border-x-2 border-[#ec5faa]/50 transition-all duration-75 z-10"
                  style={{ 
                    top: `${Math.min(targetY, predY) + 12}px`, 
                    height: `${Math.abs(targetY - predY)}px` 
                  }}
                />

                {/* Prediction Dot */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 w-full transition-all duration-75"
                  style={{ top: `${predY}px` }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#ec5faa] border-2 border-ink shadow-[2px_2px_0_#17191f] z-20 shrink-0" />
                  <span className="font-bold text-[#ec5faa] bg-[#fbe1eb] px-2 py-1 rounded border border-[#ec5faa] text-xs">Pred</span>
                </div>
              </div>
            </div>

            {/* Readouts & Controls */}
            <div className="space-y-6">
              <div className="space-y-2 font-mono font-bold text-lg text-right">
                <div className="flex justify-between">
                  <span className="text-ink/60">Prediction</span>
                  <span className="text-[#ec5faa]">{prediction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/60">Target</span>
                  <span className="text-[#237957]">{target}</span>
                </div>
                <div className="h-0.5 bg-ink/20 my-2" />
                <div className="flex justify-between items-center bg-[#fbe1eb] p-2 rounded-lg border-2 border-[#ec5faa]">
                  <span className="text-[#ec5faa] font-display text-xl">Loss</span>
                  <span className="text-[#ec5faa] text-2xl">{loss}</span>
                </div>
              </div>

              <div>
                <div className="font-bold mb-2 text-sm text-center">Drag your prediction</div>
                <input 
                  type="range" min="0" max="100" value={prediction} 
                  onChange={(e) => setPrediction(parseInt(e.target.value))} 
                  className="w-full accent-[#ec5faa]" 
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Activity className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Instead of simply saying "wrong", loss gives the model a numerical signal describing how undesirable the prediction was.
            </p>
            <div className="bg-[#17191f] text-white p-6 rounded-xl mt-6 border-2 border-ink shadow-[4px_4px_0_#ec5faa] font-mono text-sm sm:text-base flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="text-center">MODEL<br/>↓<br/>PREDICTION</div>
              <ArrowRight className="hidden md:block text-[#ec5faa]" />
              <div className="text-center text-[#ec5faa]">LOSS</div>
              <ArrowRight className="hidden md:block text-sunshine" />
              <div className="text-center text-sunshine">LEARNING<br/>(Chapter 05)</div>
            </div>
            <p className="mt-6 text-base font-medium opacity-80">
              The entire goal of training an AI is to adjust the model's internal weights until this Loss score is as close to zero as possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
