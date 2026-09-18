import React, { useState, useEffect, useRef } from 'react';
import { Target, TrendingDown, Play, RotateCcw } from 'lucide-react';

export function TrainingAnLLM() {
  const [isTraining, setIsTraining] = useState(false);
  const [step, setStep] = useState(0);
  
  // Toy vocabulary and distribution for "the cat sat on the ___"
  // Target is "mat"
  const vocab = ["mat", "floor", "dog", "ran", "the", "cat"];
  const initialLogits = [0.1, 0.2, 0.5, 0.8, 1.2, 0.4];
  const [logits, setLogits] = useState(initialLogits);
  const [loss, setLoss] = useState(3.45);
  
  const requestRef = useRef();

  const getProbs = (l) => {
    const max = Math.max(...l);
    const exps = l.map(val => Math.exp(val - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / sum);
  };

  const probs = getProbs(logits);

  const runTrainingStep = () => {
    setLogits(prev => {
      const p = getProbs(prev);
      const newLogits = [...prev];
      
      // Target is index 0 ("mat").
      // Gradient of cross-entropy for softmax is (p - y)
      // So we want to decrease logit where p > y, increase where p < y.
      // y is 1 for target, 0 for others.
      const lr = 0.5;
      for (let i = 0; i < newLogits.length; i++) {
        const y = i === 0 ? 1 : 0;
        const grad = p[i] - y;
        newLogits[i] = newLogits[i] - lr * grad;
      }
      
      // Calculate new loss: -log(p[target])
      const newP = getProbs(newLogits);
      setLoss(-Math.log(newP[0]));
      
      return newLogits;
    });
    setStep(s => s + 1);
  };

  const animate = () => {
    runTrainingStep();
    requestRef.current = setTimeout(() => {
      requestRef.current = requestAnimationFrame(animate);
    }, 100);
  };

  useEffect(() => {
    if (isTraining && step < 50) {
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
  }, [isTraining, step]);

  const reset = () => {
    setIsTraining(false);
    setStep(0);
    setLogits(initialLogits);
    setLoss(3.45);
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">6</span>
            Training an LLM
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            We know how it generates, but how does it <em>learn</em> to generate? 
            <br/><br/>
            During standard training, the model learns from thousands of known documents by trying to predict the next token, comparing its guess to the actual text, and updating its parameters to do better next time.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Target className="text-[#ec5faa]" />
          One Training Example
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
            
            {/* The Setup */}
            <div className="space-y-6">
              
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <div className="text-xs font-bold tracking-widest opacity-60 mb-2">INPUT SEQUENCE</div>
                <div className="font-serif text-xl mb-6">"The cat sat on the"</div>
                
                <div className="text-xs font-bold tracking-widest opacity-60 mb-2">TARGET TOKEN</div>
                <div className="font-serif text-xl font-bold text-[#237957] bg-[#dff4e8] inline-block px-3 py-1 rounded border-2 border-[#237957]">
                  "mat"
                </div>
              </div>

              <div className="bg-[#fffdf8] p-6 rounded-xl border-[3px] border-ink flex flex-col gap-4 shadow-[4px_4px_0_#17191f]">
                
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border-2 border-ink">
                  <span className="font-bold text-sm tracking-widest opacity-60">STEP</span>
                  <span className="font-mono font-bold text-2xl">{step} / 50</span>
                </div>
                
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border-2 border-ink">
                  <span className="font-bold text-sm tracking-widest opacity-60 flex items-center gap-2"><TrendingDown size={16}/> LOSS</span>
                  <span className="font-mono font-bold text-2xl text-[#e63946]">{loss.toFixed(3)}</span>
                </div>

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => setIsTraining(!isTraining)}
                    disabled={step >= 50}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-ink font-bold transition-all ${isTraining ? 'bg-ink text-white' : 'bg-[#ec5faa] text-white shadow-[2px_2px_0_#17191f] hover:translate-y-1 hover:shadow-none'} disabled:opacity-50`}
                  >
                    <Play size={18} /> {isTraining ? 'PAUSE' : 'TRAIN'}
                  </button>
                  <button 
                    onClick={reset}
                    className="w-12 flex items-center justify-center rounded-lg border-2 border-ink bg-white hover:bg-paper text-ink"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>

            </div>

            {/* The Distribution View */}
            <div className="bg-ink text-white p-6 rounded-xl shadow-[4px_4px_0_#ec5faa] flex flex-col">
              <h3 className="font-bold text-xs tracking-widest opacity-60 mb-6 text-[#ec5faa]">MODEL PREDICTION DISTRIBUTION</h3>
              
              <div className="flex-1 space-y-4 flex flex-col justify-center">
                {vocab.map((word, i) => {
                  const isTarget = i === 0;
                  const prob = probs[i];
                  return (
                    <div key={word} className="flex items-center gap-4 group">
                      <div className={`w-16 font-mono font-bold text-sm ${isTarget ? 'text-[#237957] bg-[#dff4e8] px-1 rounded text-center' : ''}`}>
                        {word}
                      </div>
                      <div className="flex-1 h-6 bg-white/10 rounded-sm overflow-hidden flex items-center border border-white/5">
                        <div 
                          className="h-full transition-all duration-200"
                          style={{
                            width: `${prob * 100}%`,
                            backgroundColor: isTarget ? '#237957' : '#ec5faa',
                            opacity: isTarget ? 1 : 0.6
                          }}
                        />
                      </div>
                      <div className="w-12 font-mono font-bold text-sm text-right opacity-80">
                        {(prob * 100).toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-xs font-medium text-white/60 bg-white/5 p-4 rounded text-center border border-white/10">
                Notice how the optimizer forces the target probability ("mat") up, which mathematically forces the other probabilities down.
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
