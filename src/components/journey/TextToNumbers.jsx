import React, { useState } from 'react';
import { ArrowRight, Type, Hash, Brackets } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

// Simple mock tokenizer function
const tokenize = (text, useSubwords) => {
  if (!text.trim()) return [];
  
  if (!useSubwords) {
    // Simple word splitting
    const words = text.split(/([\s\.,!?]+)/).filter(w => w.trim().length > 0 || w.match(/[\.,!?]/));
    return words.map(word => {
      // Create a deterministic mock ID based on string content
      let hash = 0;
      for (let i = 0; i < word.length; i++) hash = (hash << 5) - hash + word.charCodeAt(i);
      return { token: word, id: Math.abs(hash % 10000) + 100 };
    });
  } else {
    // Mock subword splitting (just break words longer than 4 chars)
    const words = text.split(/([\s\.,!?]+)/).filter(w => w.trim().length > 0 || w.match(/[\.,!?]/));
    let tokens = [];
    words.forEach(word => {
      if (word.match(/[\.,!?]/) || word.length <= 4) {
        let hash = 0;
        for (let i = 0; i < word.length; i++) hash = (hash << 5) - hash + word.charCodeAt(i);
        tokens.push({ token: word, id: Math.abs(hash % 10000) + 100 });
      } else {
        const p1 = word.slice(0, 3);
        const p2 = word.slice(3);
        let h1 = 0, h2 = 0;
        for (let i = 0; i < p1.length; i++) h1 = (h1 << 5) - h1 + p1.charCodeAt(i);
        for (let i = 0; i < p2.length; i++) h2 = (h2 << 5) - h2 + p2.charCodeAt(i);
        tokens.push({ token: p1, id: Math.abs(h1 % 10000) + 100 });
        tokens.push({ token: "##" + p2, id: Math.abs(h2 % 10000) + 100 });
      }
    });
    return tokens;
  }
};

export function TextToNumbers() {
  const [inputText, setInputText] = useState("The cat is sleeping.");
  const [useSubwords, setUseSubwords] = useState(false);

  const tokens = tokenize(inputText, useSubwords);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">2</span>
            Language into Numbers
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Language models do not directly process raw text as human-readable words. Text is split into <Highlight color="#d83f97">tokens</Highlight> and represented numerically.
          </p>
          <div className="bg-[#fbe1eb] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center text-center font-bold">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-lg">
              <span>Text</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Tokens</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Token IDs</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Numbers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - Tokenizer Playground */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Type className="text-[#6654f5]" />
          Tokenizer Playground
        </h2>
        
        <div className="p-4 sm:p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-white shadow-[6px_8px_0_#17191f] mb-8">
          
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-bold text-xl">Type any sentence:</h3>
            <div className="flex gap-2 bg-paper p-1.5 rounded-lg border-2 border-ink/10 text-sm">
              <button 
                onClick={() => setUseSubwords(false)} 
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${!useSubwords ? 'bg-white shadow-[2px_2px_0_#17191f] border-2 border-ink' : 'text-ink/60 hover:text-ink border-2 border-transparent'}`}
              >
                Whole words
              </button>
              <button 
                onClick={() => setUseSubwords(true)} 
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${useSubwords ? 'bg-white shadow-[2px_2px_0_#17191f] border-2 border-ink' : 'text-ink/60 hover:text-ink border-2 border-transparent'}`}
              >
                Subwords
              </button>
            </div>
          </div>

          <div className="mb-8">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 p-4 rounded-xl border-[3px] border-ink font-body text-xl font-medium focus:outline-none focus:ring-4 focus:ring-[#c9baff] resize-none shadow-inner"
              placeholder="Type something here..."
            />
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => setInputText("AI is amazing!")}
                className="text-sm font-bold text-ink/50 hover:text-[#d83f97] underline decoration-2 underline-offset-4"
              >
                Reset Example
              </button>
            </div>
          </div>

          {tokens.length > 0 && (
            <div className="space-y-6">
              <div>
                <div className="font-bold text-sm text-ink/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Brackets size={16} /> Tokens
                </div>
                <div className="flex flex-wrap gap-2">
                  {tokens.map((t, i) => (
                    <div key={`t-${i}`} className="px-3 py-2 bg-[#dff4e8] border-2 border-ink rounded-lg font-bold shadow-[2px_3px_0_#17191f]">
                      {t.token}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-bold text-sm text-ink/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Hash size={16} /> Token IDs
                </div>
                <div className="flex flex-wrap gap-2">
                  {tokens.map((t, i) => (
                    <div key={`id-${i}`} className="px-3 py-2 bg-[#fff4d9] border-2 border-ink rounded-lg font-mono font-bold shadow-[2px_3px_0_#17191f]">
                      {t.id}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 3. Real AI Connection */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How this connects to real AI</h2>
          
          <div className="bg-white/80 border-2 border-ink p-6 rounded-xl shadow-[4px_4px_0_#17191f] mb-6 font-mono font-bold text-sm sm:text-base overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              <span>"How are you?"</span> <ArrowRight size={16} /> 
              <span className="text-[#d83f97]">Tokens</span> <ArrowRight size={16} />
              <span className="text-[#6654f5]">Numbers</span> <ArrowRight size={16} />
              <span className="bg-ink text-white px-3 py-1 rounded">AI model</span>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed">
            Large language models process numerical representations of tokens. Later, those token representations are transformed into richer vectors called <Highlight color="#fffdf8">embeddings</Highlight>. (We'll see this in Chapter 08!)
          </div>
        </div>
      </section>
    </div>
  );
}
