import React, { useState } from 'react';
import { Rocket, Zap, ArrowRight, Play, Database } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function WhyAttentionChangedAI() {
  const [synthStep, setSynthStep] = useState(0);

  const synthSteps = [
    { label: "1. Tokens", desc: "Each word becomes a discrete visual token." },
    { label: "2. Embeddings", desc: "Each token becomes a static vector representation." },
    { label: "3. Q / K / V", desc: "Embeddings project into Queries, Keys, and Values." },
    { label: "4. Attention Scores", desc: "Tokens compare Queries and Keys to find relevance." },
    { label: "5. Attention Weights", desc: "Scores are normalized (softmax) into percentages." },
    { label: "6. Information Flow", desc: "Values flow into tokens based on their weights." },
    { label: "7. Transformer Block", desc: "Add & Norm + Feed-Forward processing." },
    { label: "8. Contextual Representation", desc: "Tokens are now fully aware of their surrounding context." },
    { label: "9. Next-Token Prediction", desc: "The final representation predicts the probability of the next word." }
  ];

  const renderVisuals = () => {
    switch(synthStep) {
      case 0:
        return (
          <div className="flex gap-2">
            {["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "tired"].map(t => (
              <div key={t} className="bg-white px-3 py-2 border-2 border-ink rounded shadow-[2px_2px_0_#17191f] font-mono text-sm font-bold animate-in zoom-in">{t}</div>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="flex gap-2">
            {["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "tired"].map(t => (
              <div key={t} className="bg-[#c9baff] w-12 h-24 border-2 border-ink rounded shadow-[2px_2px_0_#17191f] flex flex-col items-center justify-between py-2 text-[10px] font-mono">
                <span>0.2</span><span>-0.1</span><span>...</span><span>0.8</span>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="flex gap-4">
            <div className="w-12 h-24 bg-[#c9baff] border-2 border-ink rounded shadow-[2px_2px_0_#17191f] flex items-center justify-center font-bold">it</div>
            <ArrowRight className="mt-8 text-ink/50" />
            <div className="flex flex-col gap-2">
              <div className="w-8 h-8 bg-[#ec5faa] text-white font-bold flex items-center justify-center border-2 border-ink rounded">Q</div>
              <div className="w-8 h-8 bg-[#237957] text-white font-bold flex items-center justify-center border-2 border-ink rounded">K</div>
              <div className="w-8 h-8 bg-[#6654f5] text-white font-bold flex items-center justify-center border-2 border-ink rounded">V</div>
            </div>
          </div>
        );
      case 3:
      case 4:
        return (
          <div className="flex flex-col gap-2">
            <div className="font-bold text-[#ec5faa] mb-2 text-xl">Query: "it"</div>
            {["animal", "street", "tired"].map((k, i) => (
              <div key={k} className="flex items-center gap-4">
                <div className="w-20 font-mono font-bold bg-white border border-ink px-2 py-1">{k}</div>
                <div className="w-32 h-4 bg-ink/10 rounded-full overflow-hidden border border-ink">
                  <div className="h-full bg-[#ec5faa]" style={{width: i === 0 ? '80%' : i===1 ? '10%' : '60%'}}></div>
                </div>
                {synthStep === 4 && <div className="font-mono font-bold text-sm">{i===0?'80%':i===1?'10%':'60%'}</div>}
              </div>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold font-display text-[#ec5faa] mb-8">it</div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center -mt-8">
                <div className="h-16 w-1 bg-[#237957] mb-2 relative"><div className="absolute top-0 -left-1 w-3 h-3 bg-[#237957] rounded-full animate-ping"/></div>
                <div className="font-mono text-sm font-bold bg-white px-2 py-1 border border-ink">animal V</div>
              </div>
              <div className="flex flex-col items-center mt-4">
                <div className="h-8 w-1 bg-[#237957] mb-2 relative"><div className="absolute top-0 -left-1 w-3 h-3 bg-[#237957] rounded-full animate-ping"/></div>
                <div className="font-mono text-sm font-bold bg-white px-2 py-1 border border-ink">tired V</div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="w-64 border-4 border-ink border-dashed rounded-[20px] p-6 bg-paper relative flex flex-col items-center shadow-[4px_4px_0_#17191f]">
            <div className="font-bold text-lg mb-4">Transformer Block</div>
            <div className="w-full h-12 bg-[#ec5faa] text-white flex items-center justify-center font-bold border-2 border-ink mb-2">Attention</div>
            <div className="w-full h-12 bg-[#6654f5] text-white flex items-center justify-center font-bold border-2 border-ink">Feed-Forward</div>
          </div>
        );
      case 7:
        return (
          <div className="bg-[#237957] text-white p-8 rounded-[20px] border-[4px] border-ink shadow-[8px_8px_0_#17191f] text-center animate-in zoom-in duration-500">
            <div className="font-display text-5xl font-bold mb-4">it</div>
            <div className="font-bold tracking-widest opacity-80">(Contextual Representation)</div>
            <div className="mt-4 text-sm font-mono">Contains information about "animal" and "tired"</div>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col items-center text-center">
            <div className="text-xl font-serif mb-8 bg-white p-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              "The animal didn't cross the street because it was <span className="bg-[#ec5faa] text-white px-2 py-1 rounded font-bold">...</span>"
            </div>
            <div className="bg-paper p-6 rounded-xl border-2 border-ink flex gap-6 shadow-[4px_4px_0_#17191f]">
              <div className="flex flex-col items-center"><div className="h-24 w-8 bg-[#ec5faa] border-2 border-ink rounded-t-xl mb-2 flex items-end"><div className="w-full bg-white opacity-20" style={{height:'10%'}}/></div><span className="font-bold">tired</span></div>
              <div className="flex flex-col items-center"><div className="h-24 w-8 bg-ink border-2 border-ink rounded-t-xl mb-2 flex items-end"><div className="w-full bg-white opacity-20" style={{height:'80%'}}/></div><span className="font-bold">hungry</span></div>
              <div className="flex flex-col items-center"><div className="h-24 w-8 bg-ink border-2 border-ink rounded-t-xl mb-2 flex items-end"><div className="w-full bg-white opacity-20" style={{height:'95%'}}/></div><span className="font-bold">scared</span></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">8</span>
            Why Attention Changed AI
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            The original Transformer paper (2017) changed everything. But not because of magic. It provided an architecture that allowed for <Highlight color="#6654f5">substantially greater parallelization</Highlight> and direct <Highlight color="#ec5faa">long-range token interactions</Highlight>.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[20px] border-[3px] border-ink shadow-[4px_4px_0_#17191f]">
          <div className="w-12 h-12 bg-[#c9baff] rounded-full border-2 border-ink flex items-center justify-center mb-6 shadow-[2px_2px_0_#17191f]">
            <Network className="text-ink" size={24} />
          </div>
          <h3 className="text-2xl font-display font-bold mb-4">Long-Range Relationships</h3>
          <p className="font-medium text-ink/80 leading-relaxed">
            In older Recurrent networks (RNNs), information had to pass sequentially step-by-step. Word 1 -&gt; Word 2 -&gt; Word 3. 
            <br/><br/>
            Attention allows <strong>direct token-to-token interactions</strong> regardless of distance. Word 10 can look directly at Word 1 in a single math operation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[20px] border-[3px] border-ink shadow-[4px_4px_0_#17191f]">
          <div className="w-12 h-12 bg-[#dff4e8] rounded-full border-2 border-ink flex items-center justify-center mb-6 shadow-[2px_2px_0_#17191f]">
            <Zap className="text-ink" size={24} />
          </div>
          <h3 className="text-2xl font-display font-bold mb-4">Parallel Processing</h3>
          <p className="font-medium text-ink/80 leading-relaxed">
            Because attention over a sequence can be expressed with large matrix operations, Transformers enable substantial parallel computation during training.
            <br/><br/>
            <i>Note: Generating the next word is still sequential, but processing the entire input prompt is highly parallelized.</i>
          </p>
        </div>
      </section>

      {/* Synthesis Component */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Play className="text-[#ec5faa]" fill="currentColor" />
          Watch a Sentence Become Context-Aware
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 min-h-[400px]">
            
            {/* Steps Sidebar */}
            <div className="flex flex-col gap-2 relative">
              {synthSteps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setSynthStep(i)}
                  className={`text-left px-4 py-3 rounded-xl border-2 transition-all font-bold ${synthStep === i ? 'bg-[#17191f] text-white border-ink shadow-[4px_4px_0_#ec5faa] translate-x-2' : 'bg-white border-ink/20 hover:border-ink/50 text-ink/60'}`}
                >
                  {step.label}
                </button>
              ))}
              
              <div className="mt-8 flex justify-between">
                <button onClick={() => setSynthStep(Math.max(0, synthStep - 1))} disabled={synthStep === 0} className="px-4 py-2 bg-paper border-2 border-ink rounded font-bold disabled:opacity-50">Prev</button>
                <button onClick={() => setSynthStep(Math.min(8, synthStep + 1))} disabled={synthStep === 8} className="px-4 py-2 bg-[#ec5faa] text-white border-2 border-ink rounded font-bold disabled:opacity-50 shadow-[2px_2px_0_#17191f]">Next</button>
              </div>
            </div>

            {/* Visualizer Area */}
            <div className="bg-paper rounded-xl border-2 border-ink shadow-[inset_4px_4px_0_rgba(23,25,31,0.05)] p-8 flex flex-col justify-center items-center overflow-hidden">
              <div className="w-full max-w-lg mb-8 bg-white p-4 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f]">
                <div className="font-bold text-[#ec5faa] mb-2">{synthSteps[synthStep].label}</div>
                <div className="font-medium opacity-80">{synthSteps[synthStep].desc}</div>
              </div>
              
              <div className="flex-1 w-full flex items-center justify-center min-h-[200px]">
                {renderVisuals()}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transition to Chapter 10 */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] shadow-[6px_8px_0_#17191f] text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            We've built the pieces.
          </h2>
          <p className="text-xl font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
            We've seen data, algorithms, loss, gradients, vectors, embeddings, and attention. 
            Now, let's put absolutely everything together to see how a modern Language Model is <Highlight color="#fff">Trained</Highlight>.
          </p>
          <div className="inline-block px-8 py-4 bg-ink text-white font-display font-bold text-2xl rounded-xl border-4 border-ink shadow-[8px_8px_0_#fff] animate-bounce">
            CHAPTER 10: TRAIN AI
          </div>
        </div>
      </section>
      
    </div>
  );
}
