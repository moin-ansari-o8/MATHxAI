import React, { useState, useEffect, useRef } from 'react';
import { Settings, Play, Pause, RotateCcw, Trophy, Terminal } from 'lucide-react';

export function MiniAITrainer() {
  const [mode, setMode] = useState('llm'); // 'classifier', 'regressor', 'llm'
  const [learningRate, setLearningRate] = useState(0.5);
  const [hiddenNeurons, setHiddenNeurons] = useState(16);
  const [isTraining, setIsTraining] = useState(false);
  const [step, setStep] = useState(0);
  const [loss, setLoss] = useState(2.85);

  const requestRef = useRef();

  // Tiny LLM Data
  const vocab = ["the", "cat", "dog", "sat", "ran", "on", "mat"];
  const initialLogits = [1.2, 0.4, 0.5, 0.8, 0.3, 0.1, 0.1];
  const [logits, setLogits] = useState(initialLogits);
  const [prompt, setPrompt] = useState("the cat");

  const getProbs = (l) => {
    const max = Math.max(...l);
    const exps = l.map(val => Math.exp(val - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sum);
  };

  const probs = getProbs(logits);

  const runLLMTrainingStep = () => {
    setLogits(prev => {
      const p = getProbs(prev);
      const newLogits = [...prev];
      
      // If prompt is "the cat", target is "sat" (index 3) or "ran" (index 4) based on a toy corpus.
      // Let's say target is a mix: 70% sat, 30% ran.
      const targets = [0, 0, 0, 0.7, 0.3, 0, 0];
      
      for (let i = 0; i < newLogits.length; i++) {
        const grad = p[i] - targets[i];
        // Scale by learning rate and hidden neurons (as a proxy for capacity/speed)
        const capacityFactor = hiddenNeurons / 16; 
        newLogits[i] = newLogits[i] - (learningRate * capacityFactor) * grad;
      }
      
      // Approximate loss
      const newP = getProbs(newLogits);
      let l = 0;
      for (let i = 0; i < targets.length; i++) {
        if (targets[i] > 0) l -= targets[i] * Math.log(newP[i]);
      }
      setLoss(l);
      
      return newLogits;
    });
    setStep(s => s + 1);
  };

  const animate = () => {
    if (mode === 'llm') runLLMTrainingStep();
    
    requestRef.current = setTimeout(() => {
      requestRef.current = requestAnimationFrame(animate);
    }, 50);
  };

  useEffect(() => {
    if (isTraining && step < 200) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsTraining(false);
      cancelAnimationFrame(requestRef.current);
      clearTimeout(requestRef.current);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
      clearTimeout(requestRef.current);
    };
  }, [isTraining, step, mode, learningRate, hiddenNeurons]);

  const reset = () => {
    setIsTraining(false);
    setStep(0);
    setLogits(initialLogits);
    setLoss(2.85);
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#ec5faa] text-white shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <Trophy className="text-white" />
            Graduation: Mini AI Trainer
          </h2>
          <p className="text-lg text-white/90 leading-relaxed font-medium mb-6">
            You've spent the whole journey watching AI work. Now it's time to operate a tiny version yourself. Configure the hyperparameters, start the training loop, and watch your model learn to predict the next word live.
          </p>
        </div>
      </section>

      <section>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Controls Sidebar */}
          <div className="bg-paper lg:w-1/3 p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-ink flex flex-col gap-8">
            
            <div>
              <h3 className="font-bold text-xs tracking-widest flex items-center gap-2 mb-4 opacity-60"><Terminal size={16}/> ARCHITECTURE</h3>
              <div className="flex bg-white/50 rounded-lg p-1 border border-ink/20">
                <button 
                  onClick={() => setMode('llm')}
                  className={`flex-1 py-2 text-[10px] font-bold tracking-widest rounded-md transition-colors ${mode === 'llm' ? 'bg-[#ec5faa] text-white border-2 border-ink shadow-[2px_2px_0_#17191f]' : 'hover:bg-white'}`}
                >
                  LANGUAGE MODEL
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xs tracking-widest flex items-center gap-2 mb-4 opacity-60"><Settings size={16}/> HYPERPARAMETERS</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold flex justify-between mb-2">
                    <span>Learning Rate</span>
                    <span className="text-[#ec5faa] font-mono">{learningRate.toFixed(2)}</span>
                  </label>
                  <input 
                    type="range" min="0.01" max="1.5" step="0.01"
                    value={learningRate} onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    disabled={isTraining}
                    className="w-full h-2 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold flex justify-between mb-2">
                    <span>Hidden Neurons (Capacity)</span>
                    <span className="text-[#6654f5] font-mono">{hiddenNeurons}</span>
                  </label>
                  <input 
                    type="range" min="4" max="64" step="4"
                    value={hiddenNeurons} onChange={(e) => setHiddenNeurons(parseInt(e.target.value))}
                    disabled={isTraining}
                    className="w-full h-2 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#6654f5] disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsTraining(!isTraining)}
                  disabled={step >= 200}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-ink font-bold transition-all ${isTraining ? 'bg-[#e63946] text-white shadow-none translate-y-1' : 'bg-[#237957] text-white shadow-[2px_2px_0_#17191f] hover:translate-y-1 hover:shadow-none'} disabled:opacity-50`}
                >
                  {isTraining ? <Pause size={18} /> : <Play size={18} />}
                  {isTraining ? 'PAUSE' : 'TRAIN'}
                </button>
                <button 
                  onClick={reset}
                  className="w-12 flex items-center justify-center rounded-lg border-2 border-ink bg-white hover:bg-paper text-ink shadow-[2px_2px_0_#17191f] hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Training View */}
          <div className="p-6 lg:p-10 lg:w-2/3 flex flex-col gap-8">
            
            <div className="flex justify-between items-center bg-[#fffdf8] p-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="text-center px-4 border-r-2 border-ink/20">
                <div className="text-[10px] font-bold tracking-widest opacity-60 mb-1">STEP</div>
                <div className="font-mono text-2xl font-bold">{step}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-[10px] font-bold tracking-widest opacity-60 mb-1">LOSS</div>
                <div className="font-mono text-2xl font-bold text-[#e63946]">{loss.toFixed(3)}</div>
              </div>
            </div>

            <div className="bg-ink text-white p-6 rounded-xl shadow-[4px_4px_0_#17191f] flex-1 flex flex-col">
              <h3 className="font-bold text-xs tracking-widest opacity-60 mb-2 text-[#ec5faa]">TINY LANGUAGE MODEL LIVE EVALUATION</h3>
              
              <div className="mb-6 flex items-center gap-2">
                <span className="text-sm font-bold opacity-60">Prompt:</span>
                <span className="font-serif text-xl border-b-2 border-white/20 pb-1">{prompt} <span className="animate-pulse text-[#ec5faa]">_</span></span>
              </div>

              <div className="flex-1 space-y-3">
                {vocab.map((word, i) => {
                  const prob = probs[i];
                  return (
                    <div key={word} className="flex items-center gap-4">
                      <div className="w-12 font-mono font-bold text-sm text-right">
                        {word}
                      </div>
                      <div className="flex-1 h-5 bg-white/10 rounded-sm overflow-hidden flex items-center">
                        <div 
                          className="h-full transition-all duration-100"
                          style={{
                            width: `${prob * 100}%`,
                            backgroundColor: i === 3 || i === 4 ? '#237957' : '#ec5faa', // Highlights "sat" and "ran" as the targets
                            opacity: 0.8
                          }}
                        />
                      </div>
                      <div className="w-12 font-mono font-bold text-sm text-right opacity-80">
                        {(prob * 100).toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center text-xs font-bold text-[#ec5faa] tracking-widest">
                {step === 200 ? 'TRAINING COMPLETE! THE MODEL HAS LEARNED THE DISTRIBUTION.' : isTraining ? 'OPTIMIZING PARAMETERS...' : 'AWAITING COMMAND'}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
