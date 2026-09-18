import React, { useState } from 'react';
import { Layers, HelpCircle, SlidersHorizontal } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function AttentionMixer() {
  const [sharpness, setSharpness] = useState(1); // 0.1 (distributed) to 3 (concentrated)
  const [activeStep, setActiveStep] = useState(0); // 0: QK, 1: Scale, 2: Softmax, 3: V

  // Base raw scores (before any scaling/softmax) for "it" attending to:
  const baseScores = {
    'animal': 2.5,
    'street': -1.2,
    'crossed': -0.5,
    'because': -2.0,
    'tired': 1.8
  };

  const calculateWeights = () => {
    // Apply "sharpness" (temperature scaling for educational purpose)
    const scaled = Object.values(baseScores).map(s => s * sharpness);
    
    // Softmax
    const max = Math.max(...scaled); // numerical stability
    const exps = scaled.map(s => Math.exp(s - max));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    const weights = exps.map(e => e / sumExps);
    
    return Object.keys(baseScores).reduce((acc, key, i) => {
      acc[key] = weights[i];
      return acc;
    }, {});
  };

  const weights = calculateWeights();

  const steps = [
    { label: "QKᵀ", title: "Raw Relevance Scores", desc: "Compare each query with each key via Dot Product." },
    { label: "÷ √dₖ", title: "Scaled Scores", desc: "Scale the scores so they don't grow too large (based on dimension)." },
    { label: "softmax", title: "Normalized Weights", desc: "Turn the scores into percentages that sum to 100%." },
    { label: "× V", title: "Weighted Information", desc: "Multiply the weights by the VALUES to mix the final representation." },
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">4</span>
            Attention
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Attention computes weighted interactions between representations. It combines information from multiple words, giving <Highlight color="#ec5faa">more weight to the ones that are more relevant</Highlight>.
          </p>
        </div>
      </section>

      {/* Main Interactive: The Math of Attention */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Layers className="text-[#ec5faa]" />
          The Attention Mixer
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] mb-8 text-center font-serif text-xl sm:text-2xl">
            "The <span className="text-[#ec5faa] font-bold">animal</span> didn't cross the street because <span className="inline-block bg-[#fffdf8] px-3 py-1 rounded border-2 border-ink font-bold text-[#c9baff] shadow-[2px_2px_0_#17191f] mx-1">it</span> was <span className="text-[#237957] font-bold">tired</span>."
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* The Equation Explorer */}
            <div>
              <div className="bg-ink text-white p-6 rounded-xl shadow-[4px_4px_0_#ec5faa] mb-8 font-mono flex items-center justify-center gap-2 text-xl sm:text-3xl">
                <span>Attention = </span>
                {steps.map((step, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`px-2 py-1 rounded border-2 transition-all ${activeStep === i ? 'bg-[#ec5faa] border-white text-white' : 'bg-transparent border-transparent hover:border-white/30'} ${i === 3 ? 'ml-2' : ''}`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
              
              <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] min-h-[160px]">
                <h3 className="font-bold text-xl mb-2 font-display text-[#ec5faa]">{steps[activeStep].title}</h3>
                <p className="font-medium text-ink/80">{steps[activeStep].desc}</p>
              </div>
            </div>

            {/* The Weights Viz */}
            <div className="space-y-6">
              
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 flex items-center gap-2 mb-4"><SlidersHorizontal size={16}/> ATTENTION SHARPNESS (Educational)</h3>
                <input 
                  type="range" min="0.1" max="3" step="0.1"
                  value={sharpness} onChange={(e) => setSharpness(parseFloat(e.target.value))}
                  className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
                />
                <div className="mt-2 flex justify-between text-xs font-bold opacity-60">
                  <span>More Distributed</span>
                  <span>More Concentrated</span>
                </div>
              </div>

              <div className="space-y-3 bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <div className="text-sm font-bold opacity-60 mb-4 tracking-widest">WEIGHTS FOR 'IT'</div>
                
                {Object.entries(weights).map(([word, weight]) => (
                  <div key={word} className="flex items-center gap-4">
                    <div className="w-20 font-mono font-bold">{word}</div>
                    <div className="flex-1 h-6 bg-paper rounded border border-ink/20 overflow-hidden flex items-center">
                      <div 
                        className="h-full bg-ink transition-all duration-300"
                        style={{width: `${weight * 100}%`}}
                      />
                    </div>
                    <div className="w-12 font-mono font-bold text-sm text-right">
                      {(weight * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
                
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
            <HelpCircle size={24} />
            Important Terminology
          </h2>
          <div className="bg-white p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            Do not think of this as: <i>"Attention tells the AI exactly what to think about."</i>
            <br/><br/>
            Instead, think of it as: <b>"Attention computes weighted interactions between representations."</b>
          </div>
        </div>
      </section>

    </div>
  );
}
