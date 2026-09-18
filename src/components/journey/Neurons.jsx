import React, { useState } from 'react';
import { ArrowRight, Settings, Activity, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Neurons() {
  const [x1, setX1] = useState(1);
  const [x2, setX2] = useState(0.5);
  const [x3, setX3] = useState(0);
  
  const [w1, setW1] = useState(2.0);
  const [w2, setW2] = useState(-1.0);
  const [w3, setW3] = useState(0.5);
  
  const [bias, setBias] = useState(-0.5);

  const sum1 = x1 * w1;
  const sum2 = x2 * w2;
  const sum3 = x3 * w3;
  
  const weightedSum = sum1 + sum2 + sum3;
  const preActivation = weightedSum + bias;
  
  // Simple Sigmoid activation for demonstration
  const activation = 1 / (1 + Math.exp(-preActivation));

  // Determine line thickness for visual feedback
  const getThickness = (val) => Math.max(1, Math.abs(val) * 3);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">6</span>
            Neurons
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A simple <Highlight color="#d83f97">artificial neuron</Highlight> takes multiple inputs, combines them using weights and a bias, and produces a single output. It's just a slightly bigger version of the prediction equation we just built!
          </p>
          <div className="bg-[#fbe1eb] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] text-center font-bold text-sm lg:text-base">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <span>Inputs</span> <ArrowRight className="text-ink/40" /> 
              <span>Weights</span> <ArrowRight className="text-ink/40" /> 
              <span>Sum + Bias</span> <ArrowRight className="text-ink/40" /> 
              <span>Activation</span> <ArrowRight className="text-ink/40" /> 
              <span>Output</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Activity className="text-[#ec5faa]" />
          Neuron Playground
        </h2>
        
        <div className="bg-white p-4 sm:p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] overflow-x-auto">
          
          <div className="min-w-[800px] grid grid-cols-[200px_60px_1fr_250px] gap-4 items-center">
            
            {/* Inputs & Weights Column */}
            <div className="space-y-6">
              {[
                { id: 1, x: x1, setX: setX1, w: w1, setW: setW1, color: '#4185d9' },
                { id: 2, x: x2, setX: setX2, w: w2, setW: setW2, color: '#ec5faa' },
                { id: 3, x: x3, setX: setX3, w: w3, setW: setW3, color: '#6654f5' }
              ].map((item) => (
                <div key={item.id} className="bg-paper p-4 rounded-xl border-2 border-ink relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm">Input x{item.id}</span>
                    <span className="font-mono text-sm font-bold bg-white px-2 py-1 border border-ink rounded">{item.x.toFixed(1)}</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.1" value={item.x} onChange={(e) => item.setX(parseFloat(e.target.value))} className="w-full mb-3" />
                  
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-ink/60">Weight w{item.id}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: item.color }}>{item.w.toFixed(1)}</span>
                  </div>
                  <input type="range" min="-3" max="3" step="0.1" value={item.w} onChange={(e) => item.setW(parseFloat(e.target.value))} className="w-full" />
                </div>
              ))}
            </div>

            {/* SVG Connections */}
            <div className="h-full w-full relative">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M 0,80 C 30,80 30,220 60,220" fill="none" stroke="#4185d9" strokeWidth={getThickness(w1)} strokeLinecap="round" opacity="0.8" className="transition-all duration-300"/>
                <path d="M 0,220 L 60,220" fill="none" stroke="#ec5faa" strokeWidth={getThickness(w2)} strokeLinecap="round" opacity="0.8" className="transition-all duration-300"/>
                <path d="M 0,360 C 30,360 30,220 60,220" fill="none" stroke="#6654f5" strokeWidth={getThickness(w3)} strokeLinecap="round" opacity="0.8" className="transition-all duration-300"/>
              </svg>
            </div>

            {/* The Neuron (Sum + Bias) */}
            <div className="bg-[#17191f] text-white p-6 rounded-full aspect-square flex flex-col justify-center items-center border-[4px] border-ink shadow-[8px_8px_0_#c9baff] relative z-10 w-64 mx-auto">
              <h3 className="font-display font-bold text-xl mb-4 tracking-widest text-sunshine">NEURON</h3>
              
              <div className="w-full space-y-2 font-mono text-sm mb-4 border-b border-white/20 pb-4">
                <div className="flex justify-between"><span>x₁·w₁</span> <span className="text-[#4185d9]">{sum1.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>x₂·w₂</span> <span className="text-[#ec5faa]">{sum2.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>x₃·w₃</span> <span className="text-[#6654f5]">{sum3.toFixed(2)}</span></div>
              </div>
              
              <div className="w-full flex justify-between font-bold mb-4">
                <span>Sum (Σ)</span>
                <span>{weightedSum.toFixed(2)}</span>
              </div>

              <div className="w-full bg-white/10 p-3 rounded-lg border border-white/20">
                <div className="flex justify-between text-xs text-white/60 mb-1 font-bold">
                  <span>Bias</span>
                  <span>{bias.toFixed(2)}</span>
                </div>
                <input type="range" min="-3" max="3" step="0.1" value={bias} onChange={(e) => setBias(parseFloat(e.target.value))} className="w-full accent-sunshine" />
              </div>
            </div>

            {/* Activation & Output */}
            <div className="space-y-6">
              <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-2 text-sm text-center">PRE-ACTIVATION</h3>
                <div className="font-mono text-center mb-1 text-xs opacity-70">Sum + Bias</div>
                <div className="font-display text-2xl font-bold text-center text-ink">
                  {preActivation.toFixed(2)}
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="text-ink/30" size={32} />
              </div>

              <div className="bg-[#c9baff] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-2 text-sm text-center">FINAL OUTPUT</h3>
                <div className="font-mono text-center mb-1 text-xs opacity-70">After Activation</div>
                <div className="font-display text-4xl font-bold text-center text-ink">
                  {activation.toFixed(3)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              When processing an image, a single neuron might look at multiple pixels (inputs) to ask: <em>"Does this look like an edge?"</em>
              <br/><br/>
              When we combine millions of these neurons into layers, we get a Neural Network capable of understanding incredibly complex patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
