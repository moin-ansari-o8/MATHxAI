import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Target, ChevronRight } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function PuttingItTogether() {
  const [step, setStep] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const [activeAction, setActiveAction] = useState(""); // For animation text

  // Dataset: Blue vs Orange (Simple linear separation, w1*x + w2*y + b > 0)
  const dataset = [
    { x: 2, y: 8, class: 0 }, { x: 3, y: 7, class: 0 }, { x: 2.5, y: 6, class: 0 },
    { x: 7, y: 3, class: 1 }, { x: 8, y: 2, class: 1 }, { x: 6, y: 2.5, class: 1 }
  ];

  const [w1, setW1] = useState(-0.5);
  const [w2, setW2] = useState(0.8);
  const [b, setB] = useState(-2);
  const [lossHistory, setLossHistory] = useState([0.82]);

  const lr = 0.05;

  const MAX_STEPS = 50;

  const doStep = () => {
    setStep(s => s + 1);
    
    setActiveAction("Forward Pass -> Prediction -> Loss -> Backprop -> Update");

    // Compute Gradients (simplified MSE for logistic regression over batch)
    let gw1 = 0, gw2 = 0, gb = 0;
    let totalLoss = 0;

    dataset.forEach(pt => {
      const z = w1 * pt.x + w2 * pt.y + b;
      const pred = 1 / (1 + Math.exp(-z));
      const loss = Math.pow(pt.class - pred, 2);
      totalLoss += loss;

      const dz = 2 * (pred - pt.class) * pred * (1 - pred);
      gw1 += dz * pt.x;
      gw2 += dz * pt.y;
      gb += dz;
    });

    totalLoss /= dataset.length;
    gw1 /= dataset.length;
    gw2 /= dataset.length;
    gb /= dataset.length;

    setW1(prev => prev - lr * gw1);
    setW2(prev => prev - lr * gw2);
    setB(prev => prev - lr * gb);
    
    setLossHistory(prev => [...prev, totalLoss]);

    setTimeout(() => setActiveAction(""), 300); // clear action text
  };

  useEffect(() => {
    let timer;
    if (isAuto && step < MAX_STEPS) {
      timer = setTimeout(doStep, 200);
    } else if (step >= MAX_STEPS) {
      setIsAuto(false);
    }
    return () => clearTimeout(timer);
  }, [isAuto, step, w1, w2, b]);

  const reset = () => {
    setIsAuto(false);
    setStep(0);
    setW1(-0.5);
    setW2(0.8);
    setB(-2);
    setLossHistory([0.82]);
    setActiveAction("");
  };

  // --- SVG Drawing Helpers ---

  // 1. Dataset Boundary (Domain 0-10)
  const drawBoundary = () => {
    // We want the line where w1*x + w2*y + b = 0 => y = (-w1*x - b) / w2
    if (Math.abs(w2) < 0.001) return null; // avoid div by 0
    const y0 = (-w1 * 0 - b) / w2;
    const y10 = (-w1 * 10 - b) / w2;
    
    // map to SVG (0-100)
    const svgY0 = 100 - (y0 * 10);
    const svgY10 = 100 - (y10 * 10);
    
    return (
      <g>
        {/* Background shading (approx) */}
        <polygon points={`0,0 100,0 100,${svgY10} 0,${svgY0}`} fill="#237957" opacity="0.1" />
        <polygon points={`0,100 100,100 100,${svgY10} 0,${svgY0}`} fill="#6654f5" opacity="0.1" />
        <line x1="0" y1={svgY0} x2="100" y2={svgY10} stroke="#17191f" strokeWidth="2" strokeDasharray="4 2" />
      </g>
    );
  };

  // 2. Loss Graph
  const drawLossCurve = () => {
    const maxLoss = 1.0;
    let pathD = "";
    lossHistory.forEach((l, i) => {
      const px = (i / MAX_STEPS) * 100;
      const py = 100 - (l / maxLoss) * 100;
      if (i === 0) pathD += `M ${px} ${py} `;
      else pathD += `L ${px} ${py} `;
    });
    return pathD;
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">8</span>
            Putting It Together
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            You've learned every piece of the puzzle. Now let's train a tiny neural network from scratch and watch every part of the learning process happen in real-time.
          </p>
        </div>
      </section>

      <section>
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="font-display text-2xl font-bold flex items-center gap-2">
              <Target className="text-[#ec5faa]" /> Mini AI Trainer
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={doStep} disabled={isAuto || step >= MAX_STEPS}
                className="px-4 py-2 bg-sunshine border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all disabled:opacity-50"
              >
                +1 Step
              </button>
              <button 
                onClick={() => setIsAuto(!isAuto)} disabled={step >= MAX_STEPS}
                className={`px-4 py-2 border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all disabled:opacity-50 ${isAuto ? 'bg-ink text-white' : 'bg-white'}`}
              >
                {isAuto ? 'Stop' : 'Auto Train'}
              </button>
              <button 
                onClick={reset}
                className="px-4 py-2 bg-white border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Column 1: Dataset & Boundary */}
            <div className="bg-paper p-4 rounded-xl border-2 border-ink">
              <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4">DATASET</h3>
              <div className="aspect-square bg-white border-2 border-ink rounded-lg relative overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {drawBoundary()}
                  {dataset.map((pt, i) => (
                    <circle 
                      key={i} 
                      cx={pt.x * 10} 
                      cy={100 - (pt.y * 10)} 
                      r="3" 
                      fill={pt.class === 1 ? "#6654f5" : "#237957"} 
                      stroke="#fff" strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>
              <p className="text-xs font-bold opacity-60 mt-4 text-center">Watch the boundary line adapt to separate the colors.</p>
            </div>

            {/* Column 2: The Network */}
            <div className="bg-white p-4 rounded-xl border-2 border-ink flex flex-col justify-center relative overflow-hidden">
              <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4 absolute top-4 left-4">NETWORK</h3>
              
              <div className="flex justify-between items-center w-full px-4 mt-8">
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-bold text-xs bg-paper">x</div>
                  <div className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-bold text-xs bg-paper">y</div>
                </div>
                
                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                  {/* Active Animation lines based on activeAction */}
                  <path d="M 45 110 L 170 140" stroke={activeAction ? "#ec5faa" : "#000"} strokeWidth={activeAction ? 3 : 1} opacity={activeAction ? 0.8 : 0.2} strokeDasharray={activeAction ? "4 4" : ""} className={activeAction ? "animate-[dash_0.5s_linear_infinite]" : ""} />
                  <path d="M 45 160 L 170 140" stroke={activeAction ? "#ec5faa" : "#000"} strokeWidth={activeAction ? 3 : 1} opacity={activeAction ? 0.8 : 0.2} strokeDasharray={activeAction ? "4 4" : ""} className={activeAction ? "animate-[dash_0.5s_linear_infinite]" : ""} />
                </svg>

                <div className="w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center font-bold text-sm bg-sunshine relative z-10 shadow-[2px_2px_0_#17191f]">
                  Out
                </div>
              </div>

              <div className="mt-8 text-center min-h-[40px]">
                {activeAction ? (
                  <span className="text-xs font-bold text-[#ec5faa] animate-pulse">{activeAction}</span>
                ) : (
                  <span className="text-xs font-bold opacity-40">Idle</span>
                )}
              </div>
            </div>

            {/* Column 3: Loss History */}
            <div className="bg-paper p-4 rounded-xl border-2 border-ink">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm tracking-widest opacity-60">LOSS</h3>
                <span className="font-mono font-bold text-lg text-[#ec5faa]">{lossHistory[lossHistory.length - 1].toFixed(4)}</span>
              </div>
              <div className="aspect-square bg-white border-2 border-ink rounded-lg relative p-2">
                <svg viewBox="0 0 100 100" className="w-full h-full preserveAspectRatio-none">
                  <path d={drawLossCurve()} fill="none" stroke="#ec5faa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={(step/MAX_STEPS)*100} cy={100 - (lossHistory[lossHistory.length-1]/1.0)*100} r="3" fill="#17191f" />
                </svg>
              </div>
              <div className="text-center font-mono font-bold text-xs mt-4 opacity-60">Step {step} / {MAX_STEPS}</div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">Chapter Complete!</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              You've now seen the complete training mechanism for an AI model.
            </p>
            <div className="my-4 font-mono text-sm bg-white p-4 rounded-lg border-2 border-ink/20">
              DATA ➔ FORWARD PASS ➔ PREDICTION ➔ LOSS ➔ BACKPROPAGATION ➔ GRADIENTS ➔ OPTIMIZER ➔ PARAMETER UPDATE ➔ REPEAT
            </div>
            <p className="mt-4 text-base font-medium opacity-80">
              The model can now learn. But did it actually learn the underlying pattern — or did it simply memorize the training data? We'll explore that next.
            </p>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -16; }
        }
      `}</style>

    </div>
  );
}
