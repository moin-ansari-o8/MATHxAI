import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, RotateCcw } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function LearningRateNetwork() {
  const [lrMode, setLrMode] = useState('good'); // 'small', 'good', 'large'
  const [customLr, setCustomLr] = useState(0.01);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [lossHistory, setLossHistory] = useState([0.9]);
  
  // Real network state simulation
  // Simple 1 parameter optimization: f(w) = w^2 (min at w=0)
  // Loss = w^2. Grad = 2w. Update: w = w - lr * 2w
  const wRef = useRef(0.95);
  const MAX_STEPS = 50;

  useEffect(() => {
    let timer;
    if (isPlaying && step < MAX_STEPS) {
      timer = setTimeout(() => {
        setStep(s => s + 1);
        
        let lr = 0.01;
        if (lrMode === 'small') lr = 0.002;
        if (lrMode === 'good') lr = 0.08;
        if (lrMode === 'large') lr = 1.05; // > 1 will cause oscillation/divergence for w - 2*lr*w
        if (lrMode === 'custom') lr = customLr;

        const w = wRef.current;
        const grad = 2 * w;
        let nextW = w - (lr * grad);
        
        // Prevent infinity in JS for visualization
        if (nextW > 2) nextW = 2;
        if (nextW < -2) nextW = -2;

        wRef.current = nextW;
        
        const nextLoss = Math.pow(nextW, 2);
        
        setLossHistory(prev => [...prev, nextLoss]);

      }, 100);
    } else if (step >= MAX_STEPS) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, lrMode, customLr]);

  const reset = () => {
    setIsPlaying(false);
    setStep(0);
    wRef.current = 0.95;
    setLossHistory([0.9]);
  };

  const handleModeSelect = (mode) => {
    setLrMode(mode);
    reset();
  };

  // SVG Drawing
  const svgWidth = 500;
  const svgHeight = 300;
  const padding = 40;

  // X goes from 0 to MAX_STEPS
  const mapX = (s) => padding + (s / MAX_STEPS) * (svgWidth - 2 * padding);
  // Y goes from 0 to 4 (max loss)
  const mapY = (l) => svgHeight - padding - (l / 1.5) * (svgHeight - 2 * padding);

  let pathD = "";
  lossHistory.forEach((l, i) => {
    const px = mapX(i);
    const py = mapY(l);
    if (i === 0) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  });

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">6</span>
            Learning Rate
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            We saw learning rates in Chapter 05. Now let's see how they affect the stability of an actual neural network over time.
            <br/><br/>
            The <Highlight color="#237957">Learning Rate</Highlight> controls how large each parameter update is. If it's too small, training takes forever. If it's too large, the model might never converge.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Activity className="text-[#ec5faa]" />
          Training Stability
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Plot */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative">
            <div className="absolute top-6 left-6 font-bold text-sm tracking-widest opacity-40">
              LOSS CURVE
            </div>
            
            <div className="w-full aspect-[4/3] relative mt-8">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet" className="bg-paper border-2 border-ink rounded-xl overflow-hidden">
                {/* Axes */}
                <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#00000020" strokeWidth="2" strokeDasharray="4 4" />
                <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#00000020" strokeWidth="2" />
                
                <text x={padding - 10} y={padding + 10} fontSize="12" fontWeight="bold" fill="#000" opacity="0.4" textAnchor="end">Loss</text>
                <text x={svgWidth - padding} y={svgHeight - padding + 20} fontSize="12" fontWeight="bold" fill="#000" opacity="0.4" textAnchor="end">Steps</text>

                {/* Curve */}
                <path d={pathD} fill="none" stroke={lrMode === 'large' ? '#ec5faa' : '#6654f5'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Current Point */}
                {lossHistory.length > 0 && (
                   <circle cx={mapX(step)} cy={mapY(lossHistory[lossHistory.length - 1])} r="5" fill="#17191f" />
                )}
              </svg>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button onClick={() => { setIsPlaying(!isPlaying); }} className="px-6 py-3 bg-[#c9baff] border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all flex items-center gap-2">
                <Play size={18} /> {isPlaying ? 'Pause' : 'Train Model'}
              </button>
              <button onClick={reset} className="px-4 py-3 bg-white border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
              <h3 className="font-bold border-b-2 border-ink/10 pb-2 text-sm text-ink/60 tracking-widest">PRESETS</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleModeSelect('small')}
                  className={`w-full py-2 border-2 rounded-xl font-bold transition-all ${lrMode === 'small' ? 'bg-ink text-white border-ink' : 'bg-white border-ink shadow-[2px_2px_0_#17191f] hover:-translate-y-1'}`}
                >
                  Too Small
                </button>
                <button 
                  onClick={() => handleModeSelect('good')}
                  className={`w-full py-2 border-2 rounded-xl font-bold transition-all ${lrMode === 'good' ? 'bg-[#237957] text-white border-[#237957]' : 'bg-white border-ink shadow-[2px_2px_0_#17191f] hover:-translate-y-1'}`}
                >
                  Good
                </button>
                <button 
                  onClick={() => handleModeSelect('large')}
                  className={`w-full py-2 border-2 rounded-xl font-bold transition-all ${lrMode === 'large' ? 'bg-[#ec5faa] text-white border-[#ec5faa]' : 'bg-white border-ink shadow-[2px_2px_0_#17191f] hover:-translate-y-1'}`}
                >
                  Too Large
                </button>
              </div>

              <div className="p-4 rounded-xl border-2 border-ink border-dashed mt-4 text-sm font-bold opacity-80 text-center">
                {lrMode === 'small' && "Learning is slow. It takes many steps to converge."}
                {lrMode === 'good' && "Smooth convergence. Efficient learning."}
                {lrMode === 'large' && "The model overshoots the minimum and diverges!"}
                {lrMode === 'custom' && "Custom tuning in progress."}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="flex justify-between font-bold mb-2 text-sm text-ink/60 tracking-widest">
                <span>CUSTOM LR</span>
                <span>{customLr.toFixed(3)}</span>
              </div>
              <input 
                type="range" min="0.001" max="1.1" step="0.001" value={customLr} 
                onChange={(e) => {
                  setCustomLr(parseFloat(e.target.value));
                  handleModeSelect('custom');
                }} 
                className="w-full accent-ink" 
              />
            </div>
            
            <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-between items-center">
              <div>
                <div className="font-bold text-[10px] tracking-widest opacity-60">STEP</div>
                <div className="font-mono font-bold text-2xl">{step}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[10px] tracking-widest opacity-60 text-[#ec5faa]">LOSS</div>
                <div className="font-mono font-bold text-2xl text-[#ec5faa]">{lossHistory[lossHistory.length-1]?.toFixed(4)}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-sunshine text-ink shadow-[6px_8px_0_#17191f]">
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              The learning rate does <strong className="text-[#ec5faa]">not</strong> tell the model how intelligent it should be. It strictly controls the size of its parameter updates.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
