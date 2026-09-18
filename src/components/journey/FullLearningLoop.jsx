import React, { useState } from 'react';
import { RefreshCw, PlayCircle, Info } from 'lucide-react';

export function FullLearningLoop() {
  const [activeNode, setActiveNode] = useState(null);
  const [runState, setRunState] = useState('idle'); // idle, running, done
  const [activeStep, setActiveStep] = useState(-1);
  const [stats, setStats] = useState({ loss: 2.45, prediction: 0.12 });
  const [prevStats, setPrevStats] = useState(null);

  const nodes = [
    { id: 'data', label: 'DATA', chap: '02', what: 'The raw information from the real world.', why: 'Models need examples to learn from.' },
    { id: 'rep', label: 'REPRESENTATION', chap: '02', what: 'Turning data into numbers (vectors/embeddings).', why: 'Computers can only do math on numbers.' },
    { id: 'model', label: 'MODEL', chap: '03', what: 'A mathematical equation with adjustable parameters.', why: 'To process representations and output guesses.' },
    { id: 'pred', label: 'PREDICTION', chap: '03', what: 'The model\'s guess for the current input.', why: 'This is the output we actually want.' },
    { id: 'loss', label: 'LOSS', chap: '04', what: 'A math function measuring how wrong the prediction is.', why: 'We need a single number to minimize.' },
    { id: 'grad', label: 'GRADIENTS', chap: '05', what: 'Calculus derivatives pointing towards lower loss.', why: 'They tell the parameters which way to adjust.' },
    { id: 'backprop', label: 'BACKPROPAGATION', chap: '06', what: 'An algorithm to efficiently compute all gradients.', why: 'Without it, training deep networks would take thousands of years.' },
    { id: 'opt', label: 'OPTIMIZER', chap: '06', what: 'The rule for updating weights using gradients (like learning rate).', why: 'To safely take steps down the loss landscape.' },
    { id: 'update', label: 'UPDATED PARAMETERS', chap: '06', what: 'The new weights and biases of the model.', why: 'This makes the model slightly better for the next prediction.' }
  ];

  const runStep = () => {
    if (runState === 'running') return;
    setRunState('running');
    setPrevStats({ ...stats });
    setActiveStep(0);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= nodes.length) {
        clearInterval(interval);
        setStats({ loss: (stats.loss * 0.8).toFixed(2), prediction: Math.min(0.99, stats.prediction + 0.15).toFixed(2) });
        setRunState('done');
        setActiveStep(-1);
      } else {
        setActiveStep(currentStep);
      }
    }, 600);
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">1</span>
            The Full Learning Loop
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Over the last 9 chapters, you've learned every single piece of the modern AI training pipeline. Now it's time to put them all together.
            <br/><br/>
            This is how a model learns, from raw data all the way to an updated intelligence.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <RefreshCw className="text-[#ec5faa]" />
          The Training Pipeline
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
            
            {/* The Flowchart */}
            <div className="relative flex flex-col items-center">
              
              <button 
                onClick={runStep}
                disabled={runState === 'running'}
                className="absolute top-0 right-0 z-10 flex items-center gap-2 px-4 py-2 bg-[#ec5faa] text-white font-bold border-2 border-ink rounded-lg shadow-[2px_2px_0_#17191f] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
              >
                <PlayCircle size={18} /> RUN ONE STEP
              </button>

              <div className="space-y-2 w-full max-w-[280px] mt-12 relative">
                
                {/* Loop back arrow line */}
                <div className="absolute left-[-40px] top-[10px] bottom-[10px] w-10 border-l-[3px] border-t-[3px] border-b-[3px] border-ink border-dashed rounded-l-xl opacity-20" />
                <div className="absolute left-[-48px] top-1/2 -translate-y-1/2 text-[10px] font-bold opacity-30 rotate-[-90deg]">REPEAT</div>

                {nodes.map((node, i) => (
                  <React.Fragment key={node.id}>
                    <button
                      onClick={() => setActiveNode(i)}
                      className={`w-full relative px-4 py-3 rounded-xl border-2 transition-all font-bold tracking-widest text-sm flex justify-between items-center ${activeStep === i ? 'bg-[#c9baff] border-ink shadow-[4px_4px_0_#17191f] scale-105 z-10' : activeNode === i ? 'bg-ink text-white border-ink shadow-[4px_4px_0_#ec5faa]' : 'bg-white border-ink hover:bg-paper'}`}
                    >
                      <span>{node.label}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${activeNode === i ? 'border-white text-white' : 'border-ink text-ink'}`}>CH {node.chap}</span>
                    </button>
                    {i < nodes.length - 1 && (
                      <div className="h-4 w-1 bg-ink mx-auto opacity-20" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Info Panel & Stats */}
            <div className="space-y-6">
              
              {/* Simulation Stats */}
              <div className="bg-paper p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-4">SIMULATION STATS</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-ink text-center">
                    <div className="text-[10px] font-bold opacity-60">PREDICTION</div>
                    <div className="font-mono text-2xl font-bold mt-1 text-[#6654f5]">{stats.prediction}</div>
                    {runState === 'done' && prevStats && (
                      <div className="text-[10px] font-bold text-[#237957] mt-1">was {prevStats.prediction}</div>
                    )}
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-ink text-center">
                    <div className="text-[10px] font-bold opacity-60">LOSS</div>
                    <div className="font-mono text-2xl font-bold mt-1 text-[#e63946]">{stats.loss}</div>
                    {runState === 'done' && prevStats && (
                      <div className="text-[10px] font-bold text-[#237957] mt-1">was {prevStats.loss}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Node Explainer */}
              <div className="bg-[#fffdf8] p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f] h-full min-h-[250px] flex flex-col justify-center">
                {activeNode === null ? (
                  <div className="text-center opacity-60 font-bold tracking-widest flex flex-col items-center gap-2">
                    <Info size={24} />
                    CLICK ANY BLOCK TO LEARN MORE
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-[10px] font-bold px-2 py-1 bg-ink text-white inline-block rounded mb-4 tracking-widest">CHAPTER {nodes[activeNode].chap}</div>
                    <h3 className="font-display font-bold text-2xl mb-4 text-[#ec5faa]">{nodes[activeNode].label}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-bold tracking-widest opacity-60 mb-1">WHAT IS IT?</div>
                        <div className="font-medium text-ink/90">{nodes[activeNode].what}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-widest opacity-60 mb-1">WHY DO WE NEED IT?</div>
                        <div className="font-medium text-ink/90">{nodes[activeNode].why}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
