import React, { useState, useEffect } from 'react';
import { ArrowLeft, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Backpropagation() {
  const [step, setStep] = useState(0); // 0: Start, 1: Forward, 2: Error, 3: Backprop
  const [w2Enabled, setW2Enabled] = useState(true);

  // Network math (mocked for visualization)
  const prediction = w2Enabled ? 0.72 : 0.65;
  const target = 1.00;
  const loss = Math.pow(target - prediction, 2);
  
  const w1Grad = w2Enabled ? "+0.31" : "+0.12";
  const w2Grad = w2Enabled ? "-0.08" : "DISABLED";
  const w3Grad = w2Enabled ? "+0.14" : "+0.22";

  useEffect(() => {
    // When disabling a weight, reset to see effect
    setStep(0);
  }, [w2Enabled]);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">5</span>
            Backpropagation
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#6654f5">Backpropagation</Highlight> calculates how much each parameter contributed to the final loss by working backward through the network.
            <br/><br/>
            It is the engine that computes the gradients for the optimizer to use.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <ArrowLeft className="text-[#ec5faa]" />
          Error Travels Backward
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          
          {/* Network Vis */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
            
            <div className="flex justify-between items-center w-full max-w-lg mx-auto relative z-10 my-12">
              
              {/* Inputs */}
              <div className="flex flex-col gap-16 relative z-20">
                <div className="bg-paper border-2 border-ink w-12 h-12 flex items-center justify-center rounded-full shadow-[2px_2px_0_#17191f]">
                  <div className="font-mono font-bold text-sm">In₁</div>
                </div>
                <div className="bg-paper border-2 border-ink w-12 h-12 flex items-center justify-center rounded-full shadow-[2px_2px_0_#17191f]">
                  <div className="font-mono font-bold text-sm">In₂</div>
                </div>
              </div>

              {/* Connections (SVG layer behind) */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                {/* W1 */}
                <path d="M 48 24 L 180 88" stroke={step >= 3 ? "#6654f5" : (step >= 1 ? "#ec5faa" : "#000")} strokeWidth={step >= 3 ? 4 : 2} opacity={step >= 1 ? 1 : 0.2} strokeDasharray={step === 3 ? "8 4" : ""} className={step === 3 ? "animate-[dash_1s_linear_infinite]" : ""} />
                
                {/* W2 */}
                {w2Enabled && (
                  <path d="M 48 136 L 180 88" stroke={step >= 3 ? "#6654f5" : (step >= 1 ? "#ec5faa" : "#000")} strokeWidth={step >= 3 ? 2 : 2} opacity={step >= 1 ? 0.6 : 0.2} strokeDasharray={step === 3 ? "8 4" : ""} className={step === 3 ? "animate-[dash_1s_linear_infinite]" : ""} />
                )}

                {/* Hidden to Output */}
                <path d="M 230 88 L 360 88" stroke={step >= 3 ? "#6654f5" : (step >= 1 ? "#ec5faa" : "#000")} strokeWidth={step >= 3 ? 6 : 4} opacity={step >= 1 ? 1 : 0.2} strokeDasharray={step === 3 ? "8 4" : ""} className={step === 3 ? "animate-[dash_1s_linear_infinite]" : ""} />
              </svg>

              {/* Hidden Layer */}
              <div className="relative z-20">
                <div className={`border-2 border-ink w-16 h-16 flex flex-col items-center justify-center rounded-full shadow-[2px_2px_0_#17191f] transition-colors ${step >= 1 ? 'bg-sunshine' : 'bg-white'} ${step >= 3 ? 'border-[#6654f5] border-4 shadow-[#6654f5] bg-[#c9baff]' : ''}`}>
                  <div className="font-mono font-bold text-xs">H₁</div>
                </div>
              </div>

              {/* Output Layer */}
              <div className="relative z-20">
                <div className={`border-2 border-ink w-20 h-20 flex flex-col items-center justify-center rounded-full shadow-[2px_2px_0_#17191f] transition-colors ${step >= 1 ? 'bg-[#dff4e8]' : 'bg-white'} ${step >= 2 ? 'border-[#ec5faa] border-4 shadow-[6px_6px_0_#17191f] bg-[#fbe1eb]' : ''}`}>
                  <div className="font-mono font-bold text-xs">Out</div>
                  {step >= 1 && <div className="font-mono font-bold">{prediction.toFixed(2)}</div>}
                </div>
              </div>

            </div>
            
            {/* Gradients Overlay */}
            {step >= 3 && (
              <div className="absolute inset-0 z-30 pointer-events-none">
                <div className="absolute top-[80px] left-[130px] bg-white border-2 border-[#6654f5] text-[#6654f5] font-mono font-bold px-2 py-1 rounded text-xs shadow-[2px_2px_0_#17191f] rotate-[-15deg]">∇w₁ = {w1Grad}</div>
                {w2Enabled && <div className="absolute top-[220px] left-[130px] bg-white border-2 border-[#6654f5] text-[#6654f5] font-mono font-bold px-2 py-1 rounded text-xs shadow-[2px_2px_0_#17191f] rotate-[15deg]">∇w₂ = {w2Grad}</div>}
                <div className="absolute top-[120px] left-[290px] bg-white border-2 border-[#6654f5] text-[#6654f5] font-mono font-bold px-2 py-1 rounded text-xs shadow-[2px_2px_0_#17191f]">∇w₃ = {w3Grad}</div>
              </div>
            )}

            <style>{`
              @keyframes dash {
                to { stroke-dashoffset: -24; }
              }
            `}</style>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
              <button 
                onClick={() => setStep(1)}
                className={`w-full py-3 border-2 border-ink rounded-xl font-bold transition-all shadow-[4px_4px_0_#17191f] hover:-translate-y-1 ${step === 1 ? 'bg-sunshine' : 'bg-white'}`}
              >
                1. Forward
              </button>
              <button 
                onClick={() => setStep(2)}
                disabled={step < 1}
                className={`w-full py-3 border-2 border-ink rounded-xl font-bold transition-all disabled:opacity-50 ${step === 2 ? 'bg-[#fbe1eb] shadow-[4px_4px_0_#17191f] hover:-translate-y-1' : (step >= 1 ? 'bg-white shadow-[4px_4px_0_#17191f] hover:-translate-y-1' : 'bg-white/50')}`}
              >
                2. Error
              </button>
              <button 
                onClick={() => setStep(3)}
                disabled={step < 2}
                className={`w-full py-3 border-2 border-ink rounded-xl font-bold transition-all disabled:opacity-50 ${step === 3 ? 'bg-[#c9baff] text-ink shadow-[4px_4px_0_#17191f] hover:-translate-y-1' : (step >= 2 ? 'bg-white shadow-[4px_4px_0_#17191f] hover:-translate-y-1' : 'bg-white/50')}`}
              >
                3. Backprop
              </button>
              <button 
                onClick={() => setStep(0)}
                className="w-full py-2 text-sm font-bold opacity-60 hover:opacity-100"
              >
                Reset
              </button>
            </div>

            {step >= 2 && (
              <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                  <span className="font-bold text-sm text-ink/60 tracking-widest">TARGET</span>
                  <span className="font-mono font-bold text-lg">{target.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2 mt-2">
                  <span className="font-bold text-sm text-ink/60 tracking-widest">PREDICTION</span>
                  <span className="font-mono font-bold text-lg">{prediction.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-sm text-[#ec5faa] tracking-widest">LOSS</span>
                  <span className="font-mono font-bold text-xl text-[#ec5faa]">{loss.toFixed(4)}</span>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </section>
      
      <section className="grid md:grid-cols-2 gap-8">
        
        {/* Chain Rule Intro */}
        <div className="bg-[#c9baff] p-8 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f]">
          <h3 className="font-bold text-xl mb-4">The Chain Rule</h3>
          <p className="font-medium mb-6">
            Backpropagation relies on the Chain Rule from calculus. Instead of a scary equation, think of it as multiplying effects together:
          </p>
          <div className="bg-white rounded-xl border-2 border-ink p-4 space-y-2 font-bold font-mono text-sm shadow-[4px_4px_0_#17191f]">
            <div className="flex items-center gap-2">How much does <span className="text-[#ec5faa]">x</span> affect <span className="text-[#6654f5]">z</span>?</div>
            <div className="text-center opacity-40">×</div>
            <div className="flex items-center gap-2">How much does <span className="text-[#6654f5]">z</span> affect <span className="text-[#237957]">y</span>?</div>
            <div className="text-center opacity-40">×</div>
            <div className="flex items-center gap-2">How much does <span className="text-[#237957]">y</span> affect <span className="text-red-500">Loss</span>?</div>
            <div className="text-center">↓</div>
            <div className="bg-paper p-2 rounded text-center">How much does <span className="text-[#ec5faa]">x</span> affect <span className="text-red-500">Loss</span>!</div>
          </div>
        </div>

        {/* Break the Network */}
        <div className="bg-[#fffdf8] p-8 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f]">
          <h3 className="font-bold text-xl mb-4">Break the Network</h3>
          <p className="font-medium mb-6">
            Parameters are interconnected. If we remove a connection, the prediction changes, the loss changes, and the gradients for the <em>other</em> weights change too.
          </p>
          <div className="flex flex-col items-center justify-center h-full pb-8">
            <button 
              onClick={() => setW2Enabled(!w2Enabled)}
              className={`px-6 py-3 border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all ${w2Enabled ? 'bg-white' : 'bg-red-500 text-white'}`}
            >
              {w2Enabled ? 'Disable w₂' : 'Enable w₂'}
            </button>
            {!w2Enabled && <p className="mt-4 text-sm font-bold text-red-500 animate-pulse">Connection Disabled. Run Backprop again!</p>}
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-sunshine text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-ink" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              A common misconception is that "Backpropagation changes the weights."
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              More accurately: Backpropagation efficiently computes the gradients. Then, an <span className="text-[#ec5faa]">Optimizer</span> (like Gradient Descent) uses those gradients to actually update the weights.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
