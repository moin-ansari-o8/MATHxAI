import React, { useState } from 'react';
import { KeyRound, Search, FileText } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function QKVExplorer() {
  const [activeToken, setActiveToken] = useState('it');

  // Toy data for educational demonstration
  const tokenData = {
    'it': {
      qType: 'Needs noun subject to resolve pronoun',
      keyMatch: { 'animal': 0.9, 'street': 0.1, 'tired': 0.8, 'crossed': 0.2 },
      color: '#ec5faa'
    },
    'animal': {
      qType: 'Needs verb or action context',
      keyMatch: { 'crossed': 0.9, 'tired': 0.7, 'street': 0.3, 'it': 0.4 },
      color: '#c9baff'
    },
    'street': {
      qType: 'Needs preposition or action context',
      keyMatch: { 'crossed': 0.8, 'animal': 0.2, 'tired': 0.1, 'it': 0.1 },
      color: '#237957'
    },
    'tired': {
      qType: 'Needs subject that is exhausted',
      keyMatch: { 'animal': 0.9, 'it': 0.8, 'crossed': 0.1, 'street': 0.0 },
      color: '#6654f5'
    }
  };

  const currentData = tokenData[activeToken];

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">3</span>
            Queries, Keys & Values
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            To figure out which words should pay attention to each other, a Transformer splits every token's vector into three distinct mathematical roles: <Highlight color="#ec5faa">Query</Highlight>, <Highlight color="#237957">Key</Highlight>, and <Highlight color="#6654f5">Value</Highlight>.
          </p>
        </div>
      </section>

      {/* Concept Explainer */}
      <section className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f]">
          <div className="flex items-center gap-2 mb-4 text-[#ec5faa]">
            <Search size={24} />
            <h3 className="font-bold font-display text-xl">QUERY</h3>
          </div>
          <p className="font-medium text-sm text-ink/80">"What information am I looking for?"</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f]">
          <div className="flex items-center gap-2 mb-4 text-[#237957]">
            <KeyRound size={24} />
            <h3 className="font-bold font-display text-xl">KEY</h3>
          </div>
          <p className="font-medium text-sm text-ink/80">"What kind of information do I offer?"</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f]">
          <div className="flex items-center gap-2 mb-4 text-[#6654f5]">
            <FileText size={24} />
            <h3 className="font-bold font-display text-xl">VALUE</h3>
          </div>
          <p className="font-medium text-sm text-ink/80">"What information should I pass along if I am relevant?"</p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Search className="text-[#ec5faa]" />
          The Attention Search Engine
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['it', 'animal', 'street', 'tired'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveToken(t)}
                className={`px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all ${activeToken === t ? 'bg-[#c9baff] shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
              >
                [ {t} ]
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
            
            {/* Query Side */}
            <div className="bg-paper p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f] flex flex-col items-center text-center">
              <h3 className="font-bold text-xs tracking-widest text-[#ec5faa] mb-4">ACTIVE QUERY</h3>
              <div className="text-4xl font-display font-bold mb-6" style={{color: currentData.color}}>{activeToken}</div>
              <div className="bg-white w-full p-4 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f] text-sm font-medium italic opacity-80 mb-6">
                "{currentData.qType}"
              </div>
              
              <div className="text-ink/30 mt-auto animate-bounce">
                ↓ compare with ↓
              </div>
            </div>

            {/* Keys Side */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs tracking-widest text-[#237957] mb-4">AVAILABLE KEYS</h3>
              
              {['animal', 'street', 'crossed', 'tired'].map(k => {
                if (k === activeToken) return null; // Simplified: usually self-attention includes self, but separating for clarity
                const score = currentData.keyMatch[k];
                if (score === undefined) return null;
                
                return (
                  <div key={k} className="bg-white p-4 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f] flex items-center justify-between transition-all duration-500">
                    <div className="font-bold font-display text-lg">{k}</div>
                    
                    <div className="flex items-center gap-4 w-1/2">
                      {/* Visual bar for score */}
                      <div className="flex-1 h-3 bg-ink/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-700 ease-out"
                          style={{width: `${score * 100}%`, backgroundColor: score > 0.6 ? '#ec5faa' : '#c9baff'}}
                        />
                      </div>
                      <div className="font-mono font-bold text-sm min-w-[40px] text-right">
                        {score.toFixed(1)}
                      </div>
                    </div>

                    <div className="text-[10px] font-bold tracking-widest text-[#6654f5] bg-paper px-2 py-1 border border-ink rounded">
                      {score > 0.6 ? 'EXTRACT VALUE' : 'IGNORE VALUE'}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

          <div className="mt-10 bg-[#fffdf8] p-6 rounded-xl border-[3px] border-ink border-dashed text-center">
            <div className="text-sm font-bold opacity-60 tracking-widest mb-2">NEW REPRESENTATION FOR '{activeToken.toUpperCase()}'</div>
            <div className="font-medium">
              Takes its own embedding, and adds the <Highlight color="#6654f5">VALUES</Highlight> of the words it matched with highly, creating a new, context-aware vector.
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
