import React, { useState } from 'react';
import { MousePointerClick, Info, ArrowRight } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function ForwardPass() {
  const [x1, setX1] = useState(0.8);
  const x2 = 0.4;
  const x3 = 0.7;

  // Fixed weights
  const w1 = 0.7;
  const w2 = 0.2;
  const w3 = 0.9;
  const bias = 0.1;

  const hiddenSum = x1 * w1 + x2 * w2 + x3 * w3 + bias;
  const hiddenActivation = Math.max(0, hiddenSum); // ReLU

  const outW = 0.8;
  const outBias = -0.2;
  
  const outSum = hiddenActivation * outW + outBias;
  const prediction = 1 / (1 + Math.exp(-outSum)); // Sigmoid

  const [inspectedNode, setInspectedNode] = useState(null); // 'hidden' or 'output'

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">3</span>
            Forward Pass
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A <Highlight color="#237957">forward pass</Highlight> is simply the process of sending input data through the network from start to finish to produce a prediction.
            It's called "forward" because information flows in one direction: from inputs, through hidden layers, to the output.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <ArrowRight className="text-[#ec5faa]" />
          Data Through the Network
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          
          {/* Network Vis */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-4 left-6 text-sm font-bold opacity-40 tracking-widest">
              CLICK A NEURON TO INSPECT
            </div>

            <div className="flex justify-between items-center w-full max-w-lg mx-auto relative z-10 mt-8">
              
              {/* Inputs */}
              <div className="flex flex-col gap-8 relative z-20">
                <div className="bg-paper border-2 border-ink p-2 rounded-xl text-center shadow-[2px_2px_0_#17191f]">
                  <div className="text-[10px] font-bold opacity-60">INPUT x₁</div>
                  <div className="font-mono font-bold text-lg text-[#ec5faa]">{x1.toFixed(2)}</div>
                </div>
                <div className="bg-paper border-2 border-ink p-2 rounded-xl text-center shadow-[2px_2px_0_#17191f]">
                  <div className="text-[10px] font-bold opacity-60">INPUT x₂</div>
                  <div className="font-mono font-bold text-lg">{x2.toFixed(2)}</div>
                </div>
                <div className="bg-paper border-2 border-ink p-2 rounded-xl text-center shadow-[2px_2px_0_#17191f]">
                  <div className="text-[10px] font-bold opacity-60">INPUT x₃</div>
                  <div className="font-mono font-bold text-lg">{x3.toFixed(2)}</div>
                </div>
              </div>

              {/* Connections (SVG layer behind) */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                {/* Inputs to Hidden */}
                <path d="M 80 15 L 250 115" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.2"/>
                <path d="M 80 115 L 250 115" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.2"/>
                <path d="M 80 215 L 250 115" stroke="#000" strokeWidth="2" strokeDasharray="4 4" opacity="0.2"/>
                {/* Hidden to Output */}
                <path d="M 330 115 L 450 115" stroke="#000" strokeWidth="4" opacity="0.3"/>
              </svg>

              {/* Hidden Layer */}
              <button 
                onClick={() => setInspectedNode('hidden')}
                className={`relative z-20 w-24 h-24 rounded-full border-4 border-ink flex flex-col items-center justify-center transition-all hover:scale-110 focus:outline-none ${inspectedNode === 'hidden' ? 'bg-[#c9baff] shadow-[6px_6px_0_#17191f]' : 'bg-white shadow-[4px_4px_0_#17191f]'}`}
              >
                <div className="text-[10px] font-bold opacity-60">HIDDEN</div>
                <div className="font-mono font-bold text-xl">{hiddenActivation.toFixed(2)}</div>
              </button>

              {/* Output Layer */}
              <button 
                onClick={() => setInspectedNode('output')}
                className={`relative z-20 w-24 h-24 rounded-full border-4 border-ink flex flex-col items-center justify-center transition-all hover:scale-110 focus:outline-none ${inspectedNode === 'output' ? 'bg-[#dff4e8] shadow-[6px_6px_0_#17191f]' : 'bg-white shadow-[4px_4px_0_#17191f]'}`}
              >
                <div className="text-[10px] font-bold opacity-60">PREDICT</div>
                <div className="font-mono font-bold text-xl text-[#237957]">{prediction.toFixed(2)}</div>
              </button>

            </div>

          </div>

          {/* Controls & Inspector */}
          <div className="space-y-6">
            
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="flex justify-between font-bold mb-2 text-sm text-[#ec5faa]">
                <span>Change Input x₁</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.1" value={x1} 
                onChange={(e) => setX1(parseFloat(e.target.value))} 
                className="w-full accent-[#ec5faa]" 
              />
              <p className="text-xs font-bold opacity-60 mt-4 leading-relaxed">
                Watch the ripple effect: modifying the input changes the hidden activation, which changes the final prediction.
              </p>
            </div>

            {inspectedNode ? (
               <div className={`p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] ${inspectedNode === 'hidden' ? 'bg-[#c9baff]' : 'bg-[#dff4e8]'}`}>
                 <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm tracking-widest">
                   {inspectedNode === 'hidden' ? 'HIDDEN NEURON' : 'OUTPUT NEURON'}
                 </h3>
                 
                 {inspectedNode === 'hidden' ? (
                   <div className="space-y-3 font-mono text-sm font-bold bg-white/50 p-4 rounded-lg">
                     <div className="flex justify-between opacity-80"><span>{x1.toFixed(2)} × {w1.toFixed(1)} (w₁)</span><span>{(x1*w1).toFixed(2)}</span></div>
                     <div className="flex justify-between opacity-80"><span>{x2.toFixed(2)} × {w2.toFixed(1)} (w₂)</span><span>{(x2*w2).toFixed(2)}</span></div>
                     <div className="flex justify-between opacity-80 border-b-2 border-ink/20 pb-2"><span>{x3.toFixed(2)} × {w3.toFixed(1)} (w₃)</span><span>{(x3*w3).toFixed(2)}</span></div>
                     <div className="flex justify-between opacity-80 pt-1 text-xs"><span>+ BIAS</span><span>{bias.toFixed(2)}</span></div>
                     <div className="flex justify-between text-base pt-2"><span>SUM =</span><span>{hiddenSum.toFixed(2)}</span></div>
                     <div className="flex justify-between text-[#6654f5] pt-2 border-t-2 border-ink/20"><span>RELU ACTIVATION =</span><span>{hiddenActivation.toFixed(2)}</span></div>
                   </div>
                 ) : (
                   <div className="space-y-3 font-mono text-sm font-bold bg-white/50 p-4 rounded-lg">
                     <div className="flex justify-between opacity-80 border-b-2 border-ink/20 pb-2"><span>{hiddenActivation.toFixed(2)} × {outW.toFixed(1)} (w)</span><span>{(hiddenActivation*outW).toFixed(2)}</span></div>
                     <div className="flex justify-between opacity-80 pt-1 text-xs"><span>+ BIAS</span><span>{outBias.toFixed(2)}</span></div>
                     <div className="flex justify-between text-base pt-2"><span>SUM =</span><span>{outSum.toFixed(2)}</span></div>
                     <div className="flex justify-between text-[#237957] pt-2 border-t-2 border-ink/20"><span>SIGMOID PRED =</span><span>{prediction.toFixed(2)}</span></div>
                   </div>
                 )}
               </div>
            ) : (
              <div className="bg-white p-6 rounded-xl border-2 border-ink border-dashed text-center opacity-60">
                <MousePointerClick className="mx-auto mb-2" />
                <p className="font-bold text-sm">Click a circle to see its math.</p>
              </div>
            )}

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-sunshine text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Info className="text-ink" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              When you ask ChatGPT a question, you are essentially providing inputs that ripple through billions of connections.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              The forward pass is just a massive wave of multiplications and additions moving from the start to the finish to give you an answer.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
