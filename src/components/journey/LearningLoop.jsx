import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, RotateCcw, ChevronRight } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function LearningLoop() {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(0); // 0: Start/Params, 1: Forward, 2: Pred/Loss, 3: Backprop, 4: Update
  const [isAuto, setIsAuto] = useState(false);
  
  // Dummy simulation state
  const [prediction, setPrediction] = useState(0.12);
  const target = 1.0;
  const [loss, setLoss] = useState(0.77);
  const [param, setParam] = useState(0.2);

  const stages = [
    { id: 0, name: "PARAMETERS", color: "bg-paper border-ink" },
    { id: 1, name: "FORWARD PASS", color: "bg-sunshine border-ink" },
    { id: 2, name: "PREDICTION & LOSS", color: "bg-[#fbe1eb] border-[#ec5faa] text-[#ec5faa]" },
    { id: 3, name: "BACKPROPAGATION", color: "bg-[#c9baff] border-[#6654f5] text-[#6654f5]" },
    { id: 4, name: "UPDATE", color: "bg-[#dff4e8] border-[#237957] text-[#237957]" }
  ];

  const advanceStage = () => {
    setStage(prev => {
      const next = (prev + 1) % 5;
      if (next === 0) {
        // Complete cycle, update stats
        setStep(s => s + 1);
        setParam(p => {
          const np = p + (target - prediction) * 0.3; // fake update
          return np;
        });
      }
      return next;
    });
  };

  useEffect(() => {
    // When param changes (at end of cycle), update prediction and loss for next cycle
    if (stage === 0 && step > 0) {
      const newPred = Math.min(0.99, prediction + (target - prediction) * (Math.random() * 0.2 + 0.1));
      setPrediction(newPred);
      const newLoss = Math.pow(target - newPred, 2);
      setLoss(newLoss);
    }
  }, [step, stage]);

  useEffect(() => {
    let timer;
    if (isAuto) {
      timer = setTimeout(() => {
        advanceStage();
        if (step >= 20) setIsAuto(false);
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [isAuto, stage, step]);

  const reset = () => {
    setIsAuto(false);
    setStep(0);
    setStage(0);
    setPrediction(0.12);
    setLoss(0.77);
    setParam(0.2);
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">2</span>
            The Learning Loop
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A model learns by repeatedly making predictions, measuring loss, calculating gradients, and updating its parameters.
            <br/><br/>
            This continuous cycle is the beating heart of every neural network in existence.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <RefreshCw className="text-[#ec5faa]" />
          The Training Cycle
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Loop Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-8 flex flex-col items-center justify-center min-h-[400px] relative">
            
            <div className="absolute top-6 left-6 font-bold text-sm tracking-widest opacity-40">
              TRAINING STEP {step}
            </div>

            <div className="relative w-full max-w-[350px] aspect-square flex items-center justify-center">
              
              {/* Circular Path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#00000010" strokeWidth="4" strokeDasharray="4 4" />
                {/* Active Segment indicator (rough approx) */}
                <circle 
                  cx="50" cy="50" r="40" fill="none" stroke="#ec5faa" strokeWidth="6" 
                  strokeDasharray={`${(stage/5)*251} 251`} 
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-500"
                />
              </svg>

              {/* Central Stats */}
              <div className="relative z-10 bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center border-4 border-ink shadow-[4px_4px_0_#17191f]">
                <div className="text-xs font-bold opacity-60 tracking-widest">LOSS</div>
                <div className="text-3xl font-mono font-bold text-[#ec5faa] transition-all">{loss.toFixed(2)}</div>
              </div>

              {/* Stage nodes positioned in a circle roughly */}
              {stages.map((s, i) => {
                const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                const r = 140; // distance from center for labels
                // For a responsive layout, absolute positioning might be tricky, let's use a simpler list representation or absolute if careful.
                // We'll use CSS transform origin for a true circular layout, but let's stick to a cleaner vertical stack if screen is small. 
                // Actually, the spec asks for a circular flow. Let's position them around the circle.
                return (
                  <div 
                    key={s.id}
                    className={`absolute text-center whitespace-nowrap transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 font-bold text-xs tracking-widest px-3 py-1.5 rounded-lg border-2 ${s.color} ${stage === s.id ? 'scale-110 shadow-[4px_4px_0_#17191f] opacity-100 z-20' : 'opacity-40 grayscale scale-90 z-10'}`}
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * r}px)`,
                      top: `calc(50% + ${Math.sin(angle) * r}px)`,
                    }}
                  >
                    {s.name}
                  </div>
                );
              })}

            </div>
          </div>

          {/* Controls & Feedback */}
          <div className="space-y-6">
            
            <div className="flex gap-4">
              <button 
                onClick={advanceStage}
                disabled={isAuto}
                className="flex-1 py-3 bg-sunshine border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Step <ChevronRight size={18} />
              </button>
              
              <button 
                onClick={() => setIsAuto(!isAuto)}
                className={`flex-1 py-3 border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 ${isAuto ? 'bg-ink text-white' : 'bg-white text-ink'}`}
              >
                {isAuto ? 'Pause' : <><Play size={18} /> Auto</>}
              </button>
            </div>

            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4 relative">
              <button onClick={reset} className="absolute top-4 right-4 text-ink/40 hover:text-ink"><RotateCcw size={16}/></button>
              
              <h3 className="font-bold border-b-2 border-ink/10 pb-2 text-sm text-ink/60 tracking-widest">CURRENT STATE</h3>
              
              <div className="space-y-3 font-mono font-bold text-sm">
                <div className={`flex justify-between p-2 rounded transition-colors ${stage === 2 ? 'bg-[#fbe1eb]' : ''}`}>
                  <span>Prediction:</span>
                  <span>{prediction.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between p-2 rounded transition-colors ${stage === 2 ? 'bg-[#fbe1eb] text-[#ec5faa]' : ''}`}>
                  <span>Target:</span>
                  <span>{target.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between p-2 rounded transition-colors ${stage === 4 ? 'bg-[#dff4e8] text-[#237957]' : ''}`}>
                  <span>Parameter:</span>
                  <span>{param.toFixed(3)}</span>
                </div>
              </div>

            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="font-bold text-sm text-[#6654f5] tracking-widest mb-2 opacity-80">ACTIVE STAGE</div>
              <div className="font-bold text-lg">
                {stage === 0 && "Loading current parameters..."}
                {stage === 1 && "Data flows through network."}
                {stage === 2 && "Calculating how wrong it is."}
                {stage === 3 && "Gradients flow backward."}
                {stage === 4 && "Weights are updated!"}
              </div>
            </div>

          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              This is the basic training loop underlying every neural network.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              When you hear about an AI training for months on supercomputers, it is just running this exact same loop millions or billions of times across massive amounts of data.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
