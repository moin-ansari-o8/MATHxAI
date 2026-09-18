import React, { useState } from 'react';
import { Box, Network, Fingerprint, Layers, Cpu } from 'lucide-react';

export function TransformerArchitecture() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const components = {
    'input': {
      title: 'Input & Positional Information',
      desc: 'Plain vectors don\'t know if a word came first or last ("A B C" vs "C B A"). Transformers add positional information into the embedding so the model understands the order of the sequence.',
      icon: <Fingerprint />
    },
    'attention': {
      title: 'Multi-Head Self-Attention',
      desc: 'Instead of just one attention mechanism, a Transformer uses multiple "heads" in parallel. Different heads can learn different interaction patterns between words.',
      icon: <Network />
    },
    'addnorm1': {
      title: 'Add & Normalize',
      desc: 'A residual connection ("Add") bypasses the attention layer and adds the original input back in, helping information flow smoothly. "Normalize" keeps the numbers mathematically stable.',
      icon: <Layers />
    },
    'ffn': {
      title: 'Feed-Forward Network',
      desc: 'A standard neural network applied to each token individually. After attention mixes information between words, the FFN processes that mixed information for each word.',
      icon: <Cpu />
    },
    'addnorm2': {
      title: 'Add & Normalize',
      desc: 'Another residual connection and normalization step to stabilize the output before passing it to the next Transformer block.',
      icon: <Layers />
    }
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">7</span>
            Transformers
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Attention is an incredibly powerful mechanism, but it is <strong>not the entire Transformer architecture</strong>. A Transformer block surrounds the attention mechanism with neural networks and stability layers to create a complete, trainable system.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Box className="text-[#ec5faa]" />
          Build a Transformer
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
            
            {/* The Architecture Diagram */}
            <div className="flex flex-col items-center">
              
              {/* Input */}
              <button 
                onClick={() => { setIsExpanded(true); setActiveComponent('input'); }}
                className={`w-48 py-3 rounded-xl border-[3px] border-ink font-bold shadow-[4px_4px_0_#17191f] transition-all hover:-translate-y-1 ${activeComponent === 'input' ? 'bg-[#c9baff]' : 'bg-white'}`}
              >
                Inputs + Positional
              </button>
              
              <div className="h-8 w-1 bg-ink my-2" />

              {!isExpanded ? (
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="w-64 py-8 rounded-xl border-[3px] border-ink font-display text-xl font-bold bg-ink text-white shadow-[6px_6px_0_#ec5faa] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  EXPAND TRANSFORMER BLOCK
                </button>
              ) : (
                <div className="w-full max-w-sm border-[3px] border-ink border-dashed rounded-[20px] p-6 bg-paper relative flex flex-col items-center animate-in zoom-in duration-500">
                  <div className="absolute -top-3 -left-3 bg-[#ec5faa] text-white px-3 py-1 font-bold text-xs rounded border-2 border-ink tracking-widest shadow-[2px_2px_0_#17191f]">TRANSFORMER BLOCK</div>
                  
                  {/* Attention */}
                  <button 
                    onClick={() => setActiveComponent('attention')}
                    className={`w-full py-4 rounded-xl border-[3px] border-ink font-bold shadow-[4px_4px_0_#17191f] transition-all hover:-translate-y-1 ${activeComponent === 'attention' ? 'bg-[#ec5faa] text-white' : 'bg-white'}`}
                  >
                    Multi-Head Attention
                  </button>
                  
                  <div className="h-6 w-1 bg-ink my-2" />
                  
                  {/* Add & Norm 1 */}
                  <button 
                    onClick={() => setActiveComponent('addnorm1')}
                    className={`w-48 py-2 rounded border-[2px] border-ink font-bold text-sm shadow-[2px_2px_0_#17191f] transition-all ${activeComponent === 'addnorm1' ? 'bg-[#237957] text-white' : 'bg-white'}`}
                  >
                    Add & Normalize
                  </button>

                  <div className="h-6 w-1 bg-ink my-2" />

                  {/* FFN */}
                  <button 
                    onClick={() => setActiveComponent('ffn')}
                    className={`w-full py-4 rounded-xl border-[3px] border-ink font-bold shadow-[4px_4px_0_#17191f] transition-all hover:-translate-y-1 ${activeComponent === 'ffn' ? 'bg-[#6654f5] text-white' : 'bg-white'}`}
                  >
                    Feed-Forward Network
                  </button>

                  <div className="h-6 w-1 bg-ink my-2" />
                  
                  {/* Add & Norm 2 */}
                  <button 
                    onClick={() => setActiveComponent('addnorm2')}
                    className={`w-48 py-2 rounded border-[2px] border-ink font-bold text-sm shadow-[2px_2px_0_#17191f] transition-all ${activeComponent === 'addnorm2' ? 'bg-[#237957] text-white' : 'bg-white'}`}
                  >
                    Add & Normalize
                  </button>
                </div>
              )}

              {isExpanded && (
                <>
                  <div className="h-8 w-1 bg-ink my-2" />
                  <div className="w-48 py-3 rounded-xl border-[3px] border-ink font-bold shadow-[4px_4px_0_#17191f] bg-[#fffdf8] text-center">
                    Output
                  </div>
                </>
              )}

            </div>

            {/* Explanations */}
            <div className="bg-paper p-6 lg:p-8 rounded-[20px] border-[3px] border-ink shadow-[4px_4px_0_#17191f] h-full flex flex-col justify-center min-h-[300px]">
              {!isExpanded ? (
                <div className="text-center opacity-60 font-bold tracking-widest text-lg">
                  CLICK EXPAND TO LOOK INSIDE
                </div>
              ) : !activeComponent ? (
                <div className="text-center opacity-60 font-bold tracking-widest text-lg animate-pulse text-[#ec5faa]">
                  CLICK A COMPONENT TO LEARN MORE
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="text-[#ec5faa] mb-4">
                    {components[activeComponent].icon}
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4">{components[activeComponent].title}</h3>
                  <p className="text-lg font-medium leading-relaxed text-ink/80">
                    {components[activeComponent].desc}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
