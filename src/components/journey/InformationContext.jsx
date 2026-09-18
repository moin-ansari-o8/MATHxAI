import React, { useState } from 'react';
import { Network, Link as LinkIcon, EyeOff } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function InformationContext() {
  const [contextA, setContextA] = useState(false); // river
  const [contextB, setContextB] = useState(false); // loan
  const [activeSentence, setActiveSentence] = useState(1);

  const renderContextTree = (type) => {
    if (type === 1) {
      return (
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="text-3xl font-display font-bold text-[#ec5faa] mb-4">BANK</div>
          <div className="flex gap-8 text-ink/40 mb-4">
            <span className="rotate-[-30deg]">↙</span>
            <span className="translate-y-2">↓</span>
            <span className="rotate-[30deg]">↘</span>
          </div>
          <div className="flex gap-6 font-mono font-bold text-lg">
            <span className="bg-white px-4 py-2 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">was</span>
            <span className="bg-[#c9baff] px-4 py-2 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">river</span>
            <span className="bg-white px-4 py-2 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">near</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="text-3xl font-display font-bold text-[#237957] mb-4">BANK</div>
          <div className="flex gap-12 text-ink/40 mb-4">
            <span className="rotate-[-20deg]">↙</span>
            <span className="rotate-[20deg]">↘</span>
          </div>
          <div className="flex gap-8 font-mono font-bold text-lg">
            <span className="bg-white px-4 py-2 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">approved</span>
            <span className="bg-[#dff4e8] px-4 py-2 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">loan</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">1</span>
            Information
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            In the last chapter, we mapped words into geometric space. But language isn't just isolated words.
            <br/><br/>
            Before an AI can truly understand text, it must solve a fundamental problem of information: <Highlight color="#c9baff">Context changes how information is interpreted.</Highlight>
          </p>
        </div>
      </section>

      {/* Interactive 1: Context Changes Meaning */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Network className="text-[#ec5faa]" />
          Context Changes Meaning
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveSentence(1)}
              className={`px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all ${activeSentence === 1 ? 'bg-[#c9baff] shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
            >
              Sentence A
            </button>
            <button 
              onClick={() => setActiveSentence(2)}
              className={`px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all ${activeSentence === 2 ? 'bg-[#dff4e8] shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
            >
              Sentence B
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[300px]">
            <div className="bg-[#fffdf8] p-8 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] text-center font-serif text-2xl h-full flex items-center justify-center leading-relaxed">
              {activeSentence === 1 ? (
                <span>The <Highlight color="#ec5faa">bank</Highlight> was near the river.</span>
              ) : (
                <span>The <Highlight color="#237957">bank</Highlight> approved the loan.</span>
              )}
            </div>
            
            <div className="bg-paper p-8 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] h-full flex items-center justify-center overflow-hidden">
              {renderContextTree(activeSentence)}
            </div>
          </div>
          
          <div className="mt-8 text-center font-bold text-lg opacity-80">
            The exact same word token participates in entirely different relationships depending on its surrounding context.
          </div>
        </div>
      </section>

      {/* Interactive 2: Remove Context */}
      <section>
        <div className="bg-paper rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          <h3 className="font-bold text-sm tracking-widest opacity-60 flex items-center gap-2 mb-6"><EyeOff size={16}/> HANDS-ON EXPERIMENT</h3>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="text-xl font-bold font-display">What does "bank" mean?</div>
              <div className="flex gap-4">
                <button 
                  onClick={() => { setContextA(!contextA); setContextB(false); }}
                  className={`px-4 py-2 rounded font-bold border-2 transition-all ${contextA ? 'bg-[#c9baff] border-ink' : 'bg-white border-ink/20'}`}
                >
                  + river
                </button>
                <button 
                  onClick={() => { setContextB(!contextB); setContextA(false); }}
                  className={`px-4 py-2 rounded font-bold border-2 transition-all ${contextB ? 'bg-[#dff4e8] border-ink' : 'bg-white border-ink/20'}`}
                >
                  + loan
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] text-center min-h-[200px] flex flex-col justify-center transition-all duration-500">
              <div className="text-3xl font-display font-bold mb-4">BANK</div>
              <div className="text-lg font-medium opacity-80 h-16 flex items-center justify-center transition-all">
                {!contextA && !contextB && <span className="italic text-ink/50">High Ambiguity: Could be geography, finance, or turning an airplane...</span>}
                {contextA && <span className="text-[#ec5faa] font-bold animate-in slide-in-from-bottom-2">Low Ambiguity: Geographical river bank.</span>}
                {contextB && <span className="text-[#237957] font-bold animate-in slide-in-from-bottom-2">Low Ambiguity: Financial institution.</span>}
              </div>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <LinkIcon size={24} />
            Real AI Connection
          </h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p className="italic mb-4 text-ink/70">"The animal didn't cross the street because it was tired."</p>
            <p>
              Which surrounding words help the AI interpret what "it" refers to? 
              <br/><br/>
              Modern AI models need a mathematical mechanism to gather context from surrounding words to reduce ambiguity and create <Highlight color="#6654f5">Context-Sensitive Representations</Highlight>.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
