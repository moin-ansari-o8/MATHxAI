import React, { useState } from 'react';
import { ArrowRight, Type, Binary, GitBranch, Layers, Sparkles } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block px-1">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function TokenToPrediction() {
  const [context, setContext] = useState('tired'); // 'tired' or 'hungry'
  
  const pipeline = [
    { id: 'text', icon: Type, title: 'TEXT', desc: 'Raw input string' },
    { id: 'tokens', icon: Binary, title: 'TOKENS & IDs', desc: 'Cut into chunks and converted to integers' },
    { id: 'embed', icon: Layers, title: 'EMBEDDINGS', desc: 'Integers become static vectors in semantic space' },
    { id: 'attn', icon: GitBranch, title: 'ATTENTION', desc: 'Tokens look at each other to gather context' },
    { id: 'context', icon: Layers, title: 'CONTEXTUAL REP.', desc: 'Static vectors become dynamic, context-aware vectors' },
    { id: 'pred', icon: Sparkles, title: 'PREDICTION', desc: 'Final vector mapped to token probabilities' }
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">5</span>
            Token → Embedding → Attention → Prediction
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            This is one of the most important concepts to grasp. You now know enough to trace the exact mathematical journey a word takes from the moment it enters an AI until it predicts the next word.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <GitBranch className="text-[#ec5faa]" />
          Follow One Token
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* The Pipeline Menu (Left Side) */}
            <div className="lg:w-1/3 relative border-l-[3px] border-ink border-dashed ml-6 pl-8 py-4 flex flex-col gap-8">
              {pipeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="relative group">
                    <div className="absolute -left-[50px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-[3px] border-ink flex items-center justify-center shadow-[2px_2px_0_#17191f] z-10 group-hover:scale-110 transition-transform">
                      <Icon size={14} className="text-[#ec5faa]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-widest">{step.title}</h4>
                      <p className="text-xs font-medium text-ink/60 mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The Visualization (Right Side) */}
            <div className="lg:w-2/3 space-y-6">
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setContext(context === 'tired' ? 'hungry' : 'tired')}
                  className="w-full py-3 bg-[#c9baff] font-bold border-2 border-ink rounded-lg shadow-[2px_2px_0_#17191f] hover:-translate-y-1 hover:shadow-[4px_4px_0_#17191f] transition-all"
                >
                  Change context word: "{context}"
                </button>
              </div>

              <div className="bg-paper p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f] space-y-8">
                
                {/* 1 & 2. Text -> Tokens -> IDs */}
                <div>
                  <div className="text-[10px] font-bold opacity-60 tracking-widest mb-3">1 & 2. TOKENS & IDs</div>
                  <div className="flex flex-wrap gap-2 text-sm font-mono font-bold">
                    {["The", "animal", "was", "tired", "because", "it"].map((w, i) => (
                      <div key={i} className={`px-2 py-1 rounded border-2 border-ink bg-white ${w === context ? 'bg-[#c9baff]' : w === 'it' ? 'border-[#ec5faa] bg-[#ec5faa]/10' : ''}`}>
                        <div className="text-xs opacity-50 mb-1">{[481, 2731, 92, 771, 421, 18][i]}</div>
                        {w === 'tired' ? context : w}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Embeddings */}
                <div className="flex items-center gap-4">
                  <ArrowRight size={24} className="opacity-30 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold opacity-60 tracking-widest mb-2">3. STATIC EMBEDDING FOR "it"</div>
                    <div className="bg-white p-3 rounded-lg border-2 border-ink font-mono text-xs overflow-hidden flex gap-1">
                      [0.21, -0.43, 0.78, 0.11, -0.92, 0.33, ...]
                    </div>
                  </div>
                </div>

                {/* 4. Attention */}
                <div className="flex items-center gap-4">
                  <ArrowRight size={24} className="opacity-30 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold opacity-60 tracking-widest mb-2">4. ATTENTION (Querying context)</div>
                    <div className="bg-white p-4 rounded-lg border-2 border-[#ec5faa] shadow-[2px_2px_0_#ec5faa] relative">
                      <div className="text-sm font-bold mb-3 flex items-center justify-between">
                        <span>"it" <span className="opacity-50 text-xs">(Query)</span></span>
                        <span>Looks for: <span className="text-[#ec5faa]">{context === 'tired' ? 'Sleeper' : 'Eater'}</span></span>
                      </div>
                      <div className="flex gap-2 text-xs font-mono">
                        <div className="flex-1 bg-[#dff4e8] p-2 rounded text-center border border-ink/20 relative overflow-hidden">
                          <div className="absolute inset-x-0 bottom-0 bg-[#237957]/20 h-[80%]" />
                          <span className="relative z-10 font-bold">animal (80%)</span>
                        </div>
                        <div className="flex-1 bg-[#c9baff]/30 p-2 rounded text-center border border-ink/20">
                          {context} (15%)
                        </div>
                        <div className="flex-1 bg-paper p-2 rounded text-center border border-ink/20 opacity-50">
                          was (5%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 & 6. Contextual & Prediction */}
                <div className="flex items-center gap-4">
                  <ArrowRight size={24} className="opacity-30 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold opacity-60 tracking-widest mb-2">5 & 6. DYNAMIC VECTOR → PREDICTION</div>
                    <div className="bg-ink text-white p-4 rounded-lg shadow-[4px_4px_0_#17191f]">
                      <div className="text-xs mb-3 opacity-80">
                        The vector for "it" is now mixed with "animal" and "{context}". 
                        <br/>Passed through the output layer, it predicts:
                      </div>
                      <div className="space-y-2 font-mono text-sm">
                        {context === 'tired' ? (
                          <>
                            <div className="flex justify-between items-center bg-white/10 p-2 rounded">
                              <span className="font-bold text-[#ec5faa]">slept</span>
                              <span>68.4%</span>
                            </div>
                            <div className="flex justify-between items-center px-2 opacity-60">
                              <span>yawned</span>
                              <span>18.2%</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between items-center bg-white/10 p-2 rounded">
                              <span className="font-bold text-[#ec5faa]">ate</span>
                              <span>72.1%</span>
                            </div>
                            <div className="flex justify-between items-center px-2 opacity-60">
                              <span>hunted</span>
                              <span>12.5%</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink border-dashed">
                <div className="font-medium text-sm leading-relaxed">
                  Notice how changing one word ("tired" to "hungry") fundamentally alters the attention pattern. The word "it" absorbs different context, becoming a different vector, which mathematically guarantees a different next-token prediction.
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
