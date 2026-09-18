import React, { useState, useEffect, useRef } from 'react';
import { Network, Play, Pause, RotateCcw, Activity } from 'lucide-react';

export function TrainNeuralNetwork() {
  const [learningRate, setLearningRate] = useState(0.1);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [weights, setWeights] = useState({ w1: Math.random() * 2 - 1, w2: Math.random() * 2 - 1, b: Math.random() * 2 - 1 });
  const [lossHist, setLossHist] = useState([]);
  
  // Toy dataset: two classes (0 and 1) roughly separable
  const data = [
    { x1: 0.2, x2: 0.8, y: 0 },
    { x1: 0.3, x2: 0.7, y: 0 },
    { x1: 0.4, x2: 0.9, y: 0 },
    { x1: 0.7, x2: 0.2, y: 1 },
    { x1: 0.8, x2: 0.3, y: 1 },
    { x1: 0.9, x2: 0.4, y: 1 },
  ];

  const requestRef = useRef();

  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  const runTrainingStep = () => {
    setWeights(prev => {
      let dw1 = 0, dw2 = 0, db = 0;
      let totalLoss = 0;

      // Compute gradients and loss (Binary Cross Entropy)
      data.forEach(pt => {
        const z = prev.w1 * pt.x1 + prev.w2 * pt.x2 + prev.b;
        const pred = sigmoid(z);
        
        // Loss: -[y*log(p) + (1-y)*log(1-p)]
        // Adding epsilon for numerical stability
        const eps = 1e-7;
        totalLoss += -(pt.y * Math.log(pred + eps) + (1 - pt.y) * Math.log(1 - pred + eps));

        // Gradients (simplified for logistic regression)
        const dz = pred - pt.y;
        dw1 += dz * pt.x1;
        dw2 += dz * pt.x2;
        db += dz;
      });

      totalLoss /= data.length;
      
      setLossHist(old => {
        const next = [...old, totalLoss];
        if (next.length > 50) next.shift();
        return next;
      });

      return {
        w1: prev.w1 - learningRate * (dw1 / data.length),
        w2: prev.w2 - learningRate * (dw2 / data.length),
        b: prev.b - learningRate * (db / data.length)
      };
    });
    setStep(s => s + 1);
  };

  const animate = () => {
    runTrainingStep();
    // Throttle speed slightly for visibility
    requestRef.current = setTimeout(() => {
      requestRef.current = requestAnimationFrame(animate);
    }, 50);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
      clearTimeout(requestRef.current);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
      clearTimeout(requestRef.current);
    };
  }, [isRunning, learningRate]);

  const reset = () => {
    setIsRunning(false);
    setWeights({ w1: Math.random() * 2 - 1, w2: Math.random() * 2 - 1, b: Math.random() * 2 - 1 });
    setStep(0);
    setLossHist([]);
  };

  // Calculate boundary line points: w1*x + w2*y + b = 0 => y = (-w1*x - b)/w2
  const getBoundaryY = (x) => (-weights.w1 * x - weights.b) / weights.w2;

  const currentLoss = lossHist.length > 0 ? lossHist[lossHist.length - 1] : 0;

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">2</span>
            Training a Neural Network
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A neural network doesn't memorize the answers. It learns by <strong>repeatedly adjusting its parameters</strong> so its predictions become slightly better, step by step, according to the loss function.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Network className="text-[#ec5faa]" />
          Train a Tiny Network
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
            
            {/* Controls & Metrics */}
            <div className="space-y-8">
              
              <div className="bg-paper p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-4">TRAINING CONTROLS</h3>
                
                <div className="flex flex-col gap-3 mb-6">
                  <label className="text-sm font-bold flex justify-between">
                    <span>Learning Rate</span>
                    <span className="text-[#ec5faa]">{learningRate}</span>
                  </label>
                  <input 
                    type="range" min="0.01" max="2" step="0.01"
                    value={learningRate} onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
                  />
                  <div className="text-[10px] font-bold opacity-50 flex justify-between">
                    <span>Slow & Safe</span>
                    <span>Fast & Unstable</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-ink font-bold transition-all ${isRunning ? 'bg-[#e63946] text-white shadow-none translate-y-1' : 'bg-[#237957] text-white shadow-[2px_2px_0_#17191f]'}`}
                  >
                    {isRunning ? <Pause size={18} /> : <Play size={18} />}
                    {isRunning ? 'PAUSE' : 'TRAIN'}
                  </button>
                  <button 
                    onClick={runTrainingStep}
                    disabled={isRunning}
                    className="flex-1 py-3 rounded-lg border-2 border-ink font-bold bg-white hover:bg-paper disabled:opacity-50"
                  >
                    STEP
                  </button>
                  <button 
                    onClick={reset}
                    className="w-12 flex items-center justify-center rounded-lg border-2 border-ink bg-white hover:bg-paper text-ink"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#fffdf8] p-4 rounded-xl border-2 border-ink flex justify-between items-center shadow-[2px_2px_0_#17191f]">
                  <span className="font-bold text-sm tracking-widest opacity-60">STEP</span>
                  <span className="font-mono font-bold text-2xl">{step}</span>
                </div>
                <div className="bg-[#fffdf8] p-4 rounded-xl border-2 border-ink flex justify-between items-center shadow-[2px_2px_0_#17191f]">
                  <span className="font-bold text-sm tracking-widest opacity-60">LOSS</span>
                  <span className="font-mono font-bold text-2xl text-[#e63946]">
                    {step === 0 ? '--' : currentLoss.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="bg-paper p-4 rounded-xl border-2 border-ink">
                <div className="font-bold text-xs tracking-widest opacity-60 mb-2">LIVE PARAMETERS</div>
                <div className="font-mono text-xs flex flex-col gap-1">
                  <div className="flex justify-between"><span>Weight 1:</span> <span className="font-bold">{weights.w1.toFixed(3)}</span></div>
                  <div className="flex justify-between"><span>Weight 2:</span> <span className="font-bold">{weights.w2.toFixed(3)}</span></div>
                  <div className="flex justify-between"><span>Bias:</span> <span className="font-bold">{weights.b.toFixed(3)}</span></div>
                </div>
              </div>

            </div>

            {/* Visualizations */}
            <div className="space-y-6 flex flex-col">
              
              {/* Decision Boundary Graph */}
              <div className="bg-white aspect-video w-full rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f] overflow-hidden relative">
                <div className="absolute top-2 left-2 text-[10px] font-bold opacity-30 z-10">DECISION BOUNDARY</div>
                
                {/* Background color zones based on prediction (simplified visual) */}
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 pointer-events-none">
                  {/* We just draw a massive line and let SVG clip it */}
                  <line 
                    x1="0" y1={100 - getBoundaryY(0)*100} 
                    x2="100" y2={100 - getBoundaryY(1)*100} 
                    stroke="#ec5faa" strokeWidth="1" strokeDasharray="2 2"
                  />
                  {/* Fill polygon for shading could go here, keeping simple line for clarity */}
                </svg>

                {/* Data Points */}
                <div className="absolute inset-0">
                  {data.map((pt, i) => {
                    const z = weights.w1 * pt.x1 + weights.w2 * pt.x2 + weights.b;
                    const pred = sigmoid(z);
                    const isCorrect = (pred >= 0.5 && pt.y === 1) || (pred < 0.5 && pt.y === 0);

                    return (
                      <div 
                        key={i}
                        className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-ink transition-colors duration-200 ${pt.y === 1 ? 'bg-[#c9baff]' : 'bg-[#dff4e8]'}`}
                        style={{
                          left: `${pt.x1 * 100}%`,
                          top: `${100 - pt.x2 * 100}%`,
                          opacity: isCorrect ? 1 : 0.4
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Live Loss Graph */}
              <div className="bg-[#17191f] text-white p-4 rounded-xl shadow-[4px_4px_0_#ec5faa] flex-1 flex flex-col justify-end relative overflow-hidden h-32">
                <div className="absolute top-2 left-2 text-[10px] font-bold opacity-60 flex items-center gap-1"><Activity size={12}/> LIVE LOSS CURVE</div>
                
                <div className="flex items-end h-16 gap-[2px] opacity-80 w-full mt-4">
                  {lossHist.map((l, i) => {
                    // Normalize height: loss usually starts high (e.g. 1.0) and goes to 0
                    const heightPct = Math.min(100, (l / 1.5) * 100);
                    return (
                      <div 
                        key={i} 
                        className="bg-[#ec5faa] flex-1 rounded-t-sm transition-all duration-100"
                        style={{ height: `${heightPct}%` }}
                      />
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
