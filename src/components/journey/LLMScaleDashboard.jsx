import React, { useState } from 'react';
import { Database, Cpu, Layers, HardDrive, Maximize, AlertCircle } from 'lucide-react';

export function LLMScaleDashboard() {
  const [activeModel, setActiveModel] = useState('small'); // 'small' or 'large'

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">4</span>
            Large Language Models
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            An LLM is a language model trained and operated at <strong>massive scale</strong>. It is not a fundamentally different mathematical species. "Large" refers to the scaling of several dimensions simultaneously.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Maximize className="text-[#ec5faa]" />
          Scale Dashboard
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* The Dimensions */}
            <div className="space-y-6">
              
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-6 flex items-center gap-2">THE DIMENSIONS OF SCALE</h3>
                
                <div className="space-y-6">
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-sm flex items-center gap-2"><Layers size={16}/> Model Parameters</div>
                      <div className="text-[10px] font-bold opacity-60 uppercase">The Brain's Size</div>
                    </div>
                    <div className="h-4 bg-ink/10 rounded-sm overflow-hidden flex">
                      <div className="bg-[#ec5faa] w-[85%] h-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-sm flex items-center gap-2"><Database size={16}/> Training Data</div>
                      <div className="text-[10px] font-bold opacity-60 uppercase">What it reads</div>
                    </div>
                    <div className="h-4 bg-ink/10 rounded-sm overflow-hidden flex">
                      <div className="bg-[#6654f5] w-[95%] h-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-sm flex items-center gap-2"><Cpu size={16}/> Training Compute</div>
                      <div className="text-[10px] font-bold opacity-60 uppercase">Processing Power</div>
                    </div>
                    <div className="h-4 bg-ink/10 rounded-sm overflow-hidden flex">
                      <div className="bg-[#237957] w-[90%] h-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-sm flex items-center gap-2"><HardDrive size={16}/> Context Length</div>
                      <div className="text-[10px] font-bold opacity-60 uppercase">Working Memory</div>
                    </div>
                    <div className="h-4 bg-ink/10 rounded-sm overflow-hidden flex">
                      <div className="bg-[#fb8b24] w-[60%] h-full" />
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-[#fffdf8] p-4 rounded-xl border-2 border-ink border-dashed flex gap-4">
                <AlertCircle className="text-[#ec5faa] shrink-0" />
                <p className="text-sm font-medium">
                  There is no single universal parameter threshold that magically turns a model into an "LLM". It is a broad descriptive term for models operating at the frontiers of these dimensions.
                </p>
              </div>

            </div>

            {/* Capacity Experiment */}
            <div className="space-y-6">
              
              <div className="bg-ink text-white p-6 rounded-xl shadow-[4px_4px_0_#ec5faa] h-full flex flex-col">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-4 text-[#ec5faa]">TOY EXPERIMENT: CAPACITY</h3>
                
                <div className="flex bg-white/10 rounded-lg p-1 mb-8">
                  <button 
                    onClick={() => setActiveModel('small')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${activeModel === 'small' ? 'bg-white text-ink' : 'hover:bg-white/10'}`}
                  >
                    SMALL MODEL
                  </button>
                  <button 
                    onClick={() => setActiveModel('large')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${activeModel === 'large' ? 'bg-[#ec5faa] text-white' : 'hover:bg-white/10'}`}
                  >
                    LARGER MODEL
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-8">
                  
                  <div>
                    <div className="text-[10px] font-bold opacity-60 tracking-widest mb-2">CAPACITY</div>
                    <div className="flex gap-1 flex-wrap">
                      {Array.from({ length: activeModel === 'small' ? 12 : 48 }).map((_, i) => (
                        <div key={i} className={`w-3 h-3 rounded-sm ${activeModel === 'large' ? 'bg-[#ec5faa]' : 'bg-white'}`} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold opacity-60 tracking-widest mb-2">PREDICTION BEHAVIOR</div>
                    <div className="font-mono text-sm bg-black/50 p-3 rounded border border-white/20">
                      {activeModel === 'small' 
                        ? '"The cat sat on the ... [mat/floor]" (Basic grammatical completion, high loss on nuance)'
                        : '"The calico cat sat on the ... [windowsill]" (Captures detailed nuance and longer range context, lower loss)'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold opacity-60 tracking-widest mb-2">TRAINING LOSS LIMIT</div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${activeModel === 'small' ? 'w-[40%] bg-white' : 'w-[15%] bg-[#ec5faa]'}`} />
                      </div>
                      <div className="font-mono text-sm">{activeModel === 'small' ? '~ 2.45' : '~ 1.12'}</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
