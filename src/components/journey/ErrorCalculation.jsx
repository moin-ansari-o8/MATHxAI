import React, { useState } from 'react';
import { Target, Search } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function ErrorCalculation() {
  const [w1, setW1] = useState(0.5);
  
  // Fixed inputs and other weights
  const x1 = 1.0;
  const x2 = 0.5;
  const w2 = -0.4;
  
  const hidden1 = x1 * w1;
  const hidden2 = x2 * w2;
  
  const outW1 = 0.8;
  const outW2 = 1.2;
  
  const sum = hidden1 * outW1 + hidden2 * outW2;
  const prediction = 1 / (1 + Math.exp(-sum)); // Sigmoid
  
  const target = 1.0;
  const loss = Math.pow(target - prediction, 2);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">4</span>
            Error
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            We know what Loss is (from Chapter 04). Now we need to ask: <Highlight color="#6654f5">Where did the mistake come from?</Highlight>
            <br/><br/>
            How does the network's output error become information that can be sent backward to fix the parameters?
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Search className="text-[#ec5faa]" />
          Finding the Culprits
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          
          {/* Network Vis */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
            
            <div className="flex justify-between items-center w-full max-w-lg mx-auto relative z-10">
              
              {/* Inputs */}
              <div className="flex flex-col gap-12 relative z-20">
                <div className="bg-paper border-2 border-ink w-12 h-12 flex items-center justify-center rounded-full shadow-[2px_2px_0_#17191f]">
                  <div className="font-mono font-bold text-sm">x₁</div>
                </div>
                <div className="bg-paper border-2 border-ink w-12 h-12 flex items-center justify-center rounded-full shadow-[2px_2px_0_#17191f]">
                  <div className="font-mono font-bold text-sm">x₂</div>
                </div>
              </div>

              {/* Connections (SVG layer behind) */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                {/* W1 */}
                <path d="M 48 40 L 180 40" stroke="#6654f5" strokeWidth="4" />
                <text x="110" y="30" fontSize="12" fontWeight="bold" fill="#6654f5">w₁</text>
                
                {/* W2 */}
                <path d="M 48 136 L 180 136" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
                <text x="110" y="126" fontSize="12" fontWeight="bold" fill="#000" opacity="0.4">w₂</text>

                {/* Hidden to Output */}
                <path d="M 230 40 L 360 88" stroke="#000" strokeWidth="2" opacity="0.3"/>
                <path d="M 230 136 L 360 88" stroke="#000" strokeWidth="2" opacity="0.3"/>
              </svg>

              {/* Hidden Layer */}
              <div className="flex flex-col gap-12 relative z-20">
                <div className="bg-white border-2 border-ink w-16 h-16 flex flex-col items-center justify-center rounded-full shadow-[2px_2px_0_#17191f]">
                  <div className="font-mono font-bold text-sm">{hidden1.toFixed(2)}</div>
                </div>
                <div className="bg-white border-2 border-ink w-16 h-16 flex flex-col items-center justify-center rounded-full shadow-[2px_2px_0_#17191f]">
                  <div className="font-mono font-bold text-sm">{hidden2.toFixed(2)}</div>
                </div>
              </div>

              {/* Output Layer */}
              <div className="relative z-20">
                <div className="bg-[#fbe1eb] border-4 border-[#ec5faa] w-24 h-24 flex flex-col items-center justify-center rounded-full shadow-[6px_6px_0_#17191f] animate-pulse">
                  <div className="text-[10px] font-bold opacity-60 text-[#ec5faa]">ERROR!</div>
                  <div className="font-mono font-bold text-xl">{prediction.toFixed(2)}</div>
                </div>
              </div>

            </div>

            <div className="mt-12 bg-[#fbe1eb]/50 p-4 rounded-xl border-2 border-[#ec5faa] border-dashed text-center font-bold text-sm text-[#ec5faa]">
              Which internal parameters contributed to this error?
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
              <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                <span className="font-bold text-sm text-ink/60 tracking-widest">TARGET</span>
                <span className="font-mono font-bold text-lg">{target.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                <span className="font-bold text-sm text-ink/60 tracking-widest">PREDICTION</span>
                <span className="font-mono font-bold text-lg">{prediction.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#ec5faa] tracking-widest">LOSS</span>
                <span className="font-mono font-bold text-xl text-[#ec5faa]">{loss.toFixed(4)}</span>
              </div>
            </div>

            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="flex justify-between font-bold mb-2 text-sm text-[#6654f5]">
                <span>Change Weight w₁</span>
              </div>
              <input 
                type="range" min="-2" max="2" step="0.1" value={w1} 
                onChange={(e) => setW1(parseFloat(e.target.value))} 
                className="w-full accent-[#6654f5]" 
              />
              <div className="text-center font-mono font-bold text-lg mt-2 text-[#6654f5]">{w1.toFixed(1)}</div>
              
              <p className="text-xs font-bold opacity-60 mt-4 leading-relaxed">
                As you tweak this single weight, watch how it changes the prediction, and ultimately, the loss.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Different parameters affect the final loss differently. If we change <span className="text-[#6654f5] font-mono">w₁</span>, the loss might go down, but if we change <span className="text-ink/50 font-mono">w₂</span>, it might go up.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              To fix the model, we need to know exactly how much <em>every single parameter</em> contributed to the mistake. That is the problem Backpropagation solves efficiently.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
