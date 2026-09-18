import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Target, Activity } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function GradientDescent() {
  const START_W = -8;
  const [w, setW] = useState(START_W);
  const [learningRate, setLearningRate] = useState(0.1);
  const [history, setHistory] = useState([START_W]);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // f(w) = w^2 / 2 (Loss function)
  const calcLoss = (val) => (val * val) / 2;
  const calcGradient = (val) => val; // derivative of w^2 / 2 is w

  const currentLoss = calcLoss(w);
  const currentGradient = calcGradient(w);

  const step = () => {
    setW(prevW => {
      const grad = calcGradient(prevW);
      const newW = prevW - (learningRate * grad);
      
      // Prevent it from flying off to infinity immediately if diverging
      if (Math.abs(newW) > 20) {
        setIsPlaying(false);
        return prevW > 0 ? 20 : -20;
      }
      
      setHistory(prev => [...prev, newW]);
      return newW;
    });
  };

  const reset = () => {
    setIsPlaying(false);
    setW(START_W);
    setHistory([START_W]);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setW(prevW => {
          if (Math.abs(prevW) < 0.01 || Math.abs(prevW) >= 20) {
            setIsPlaying(false);
            return prevW;
          }
          const grad = calcGradient(prevW);
          const newW = prevW - (learningRate * grad);
          setHistory(prev => [...prev, newW]);
          return newW;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, learningRate]);

  // Handle Preset Clicks
  const setPreset = (lr) => {
    reset();
    setLearningRate(lr);
  };

  // SVG drawing logic
  const svgWidth = 600;
  const svgHeight = 300;
  const padding = 20;

  const domain = [-10, 10];
  const maxLoss = calcLoss(10);

  const mapX = (val) => padding + ((val - domain[0]) / (domain[1] - domain[0])) * (svgWidth - 2 * padding);
  const mapY = (val) => svgHeight - padding - (val / maxLoss) * (svgHeight - 2 * padding);

  let pathD = "";
  for (let vx = domain[0]; vx <= domain[1]; vx += 0.5) {
    const vy = calcLoss(vx);
    const px = mapX(vx);
    const py = mapY(vy);
    if (vx === domain[0]) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">7</span>
            Gradient Descent
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            We finally have all the pieces. We know the Loss, and we know the Gradient (which direction increases the loss).
            <br/><br/>
            By stepping in the <em>opposite</em> direction of the gradient, we can slowly adjust our model's parameters until we reach the bottom of the bowl. This is called <Highlight color="#6654f5">Gradient Descent</Highlight>.
          </p>

          <div className="bg-[#17191f] text-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#6654f5] mt-8 text-center">
            <div className="font-mono text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <span>w<sub className="text-sm">new</sub></span>
              <span className="text-[#ec5faa]">=</span>
              <span>w<sub className="text-sm">old</sub></span>
              <span className="text-[#ec5faa]">-</span>
              <span className="text-[#237957] bg-white/10 px-2 rounded">η</span>
              <span className="text-[#ec5faa]">×</span>
              <span>∇L</span>
            </div>
            <div className="text-sm font-bold opacity-80 uppercase tracking-widest flex justify-center gap-8 text-center mt-4">
              <div><span className="text-[#237957] text-lg block">η</span> Learning Rate</div>
              <div><span className="text-white text-lg block">∇L</span> Gradient</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Activity className="text-[#ec5faa]" />
          Watch the Model Learn
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Graph Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative flex flex-col justify-center h-full overflow-hidden">
            
            <div className="absolute top-4 left-4 right-4 flex justify-between font-bold text-sm tracking-widest opacity-60 z-10">
              <span>LOSS CURVE</span>
              <span>STEP {history.length - 1}</span>
            </div>

            <div className="relative w-full aspect-[2/1] min-h-[250px] bg-paper rounded-xl border-2 border-ink overflow-hidden mt-6">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                
                {/* Curve */}
                <path d={pathD} fill="none" stroke="#6654f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Minimum indicator */}
                <line x1={mapX(0)} y1={mapY(0)} x2={mapX(0)} y2={svgHeight} stroke="#00000020" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* History paths */}
                {history.map((hw, idx) => {
                  if (idx === 0) return null;
                  const prevW = history[idx-1];
                  // If it diverged out of bounds, don't draw crazy lines
                  if (Math.abs(prevW) > 10 || Math.abs(hw) > 10) return null;
                  return (
                    <line 
                      key={`line-${idx}`}
                      x1={mapX(prevW)} y1={mapY(calcLoss(prevW))}
                      x2={mapX(hw)} y2={mapY(calcLoss(hw))}
                      stroke="#ec5faa" strokeWidth="2" strokeDasharray="4 4" opacity="0.6"
                    />
                  );
                })}

                {/* History dots */}
                {history.map((hw, idx) => {
                  if (Math.abs(hw) > 10) return null; // out of bounds
                  const isLast = idx === history.length - 1;
                  return (
                    <circle 
                      key={`dot-${idx}`}
                      cx={mapX(hw)} 
                      cy={mapY(calcLoss(hw))} 
                      r={isLast ? "8" : "4"} 
                      fill={isLast ? "#17191f" : "#ec5faa"} 
                      stroke="#fff" 
                      strokeWidth={isLast ? "2" : "1"} 
                      className="transition-all duration-300"
                    />
                  );
                })}

              </svg>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => isPlaying ? setIsPlaying(false) : setIsPlaying(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-ink font-bold transition-all shadow-[4px_4px_0_#17191f] hover:-translate-y-1 ${isPlaying ? 'bg-[#ec5faa] text-white' : 'bg-sunshine'}`}
              >
                {isPlaying ? 'Pause' : <><Play size={18} /> Play</>}
              </button>
              <button 
                onClick={step}
                className="flex-1 py-3 rounded-xl border-2 border-ink font-bold transition-all shadow-[4px_4px_0_#17191f] hover:-translate-y-1 bg-white"
              >
                Step
              </button>
              <button 
                onClick={reset}
                className="px-4 py-3 rounded-xl border-2 border-ink font-bold transition-all shadow-[4px_4px_0_#17191f] hover:-translate-y-1 bg-paper flex items-center justify-center"
              >
                <RotateCcw size={18} />
              </button>
            </div>

          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              
              <div className="space-y-2">
                <div className="text-xs font-bold opacity-60 tracking-widest text-[#237957]">LEARNING RATE (η)</div>
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={() => setPreset(0.05)} className={`py-2 px-3 text-sm font-bold rounded-lg border-2 border-ink text-left transition-colors ${learningRate === 0.05 ? 'bg-[#237957] text-white shadow-[2px_2px_0_#17191f]' : 'bg-white hover:bg-ink/5'}`}>Too Small (0.05)</button>
                  <button onClick={() => setPreset(0.3)} className={`py-2 px-3 text-sm font-bold rounded-lg border-2 border-ink text-left transition-colors ${learningRate === 0.3 ? 'bg-[#237957] text-white shadow-[2px_2px_0_#17191f]' : 'bg-white hover:bg-ink/5'}`}>Just Right (0.3)</button>
                  <button onClick={() => setPreset(1.05)} className={`py-2 px-3 text-sm font-bold rounded-lg border-2 border-ink text-left transition-colors ${learningRate === 1.05 ? 'bg-[#237957] text-white shadow-[2px_2px_0_#17191f]' : 'bg-white hover:bg-ink/5'}`}>Too Large (1.05)</button>
                </div>
              </div>
              
              <div className="border-t-2 border-ink/10 pt-4">
                <div className="text-xs font-bold opacity-60 tracking-widest mb-1">STATUS</div>
                {learningRate < 0.1 && <div className="font-bold text-sm text-[#ec5faa]">Learning is very slow...</div>}
                {learningRate >= 0.1 && learningRate <= 0.9 && <div className="font-bold text-sm text-[#237957]">Smooth convergence!</div>}
                {learningRate > 0.9 && <div className="font-bold text-sm text-[#ec5faa]">Overshooting! Divergence!</div>}
              </div>

            </div>
            
            <div className="bg-white p-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-[10px] font-bold opacity-60 tracking-widest mb-1 text-ink">LOSS</div>
                <div className="font-mono font-bold text-lg">{Math.min(currentLoss, 999).toFixed(2)}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold opacity-60 tracking-widest mb-1 text-ink">GRADIENT</div>
                <div className="font-mono font-bold text-lg">{currentGradient.toFixed(2)}</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#17191f] text-white shadow-[6px_8px_0_#6654f5]">
          <h2 className="font-display text-2xl font-bold mb-8 text-[#ec5faa] flex items-center justify-center gap-2">
            The Complete Picture
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 font-bold text-center">
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-ink/50 relative">
              <div className="text-sm opacity-60 mb-2 tracking-widest">CHAPTER 3</div>
              <div className="text-[#fbe1eb] text-xl">PREDICT</div>
              <div className="mt-4 text-sm font-medium">Model takes inputs and makes a prediction based on its parameters.</div>
              <ArrowPlay direction="right" className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-white/30" />
              <ArrowPlay direction="down" className="md:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 text-white/30" />
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-ink/50 relative">
              <div className="text-sm opacity-60 mb-2 tracking-widest">CHAPTER 4</div>
              <div className="text-[#c9baff] text-xl">ERROR</div>
              <div className="mt-4 text-sm font-medium">Prediction is compared to reality to calculate a Loss score.</div>
              <ArrowPlay direction="right" className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-white/30" />
              <ArrowPlay direction="down" className="md:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 text-white/30" />
            </div>
            
            <div className="bg-[#6654f5] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#ec5faa]">
              <div className="text-sm text-white/60 mb-2 tracking-widest">CHAPTER 5</div>
              <div className="text-white text-xl">LEARN</div>
              <div className="mt-4 text-sm font-medium">Gradient Descent uses calculus to update parameters and lower the Loss.</div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

const ArrowPlay = ({ className, direction = "right" }) => {
  const rotation = direction === "down" ? "rotate-90" : "";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${rotation}`}>
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
};
