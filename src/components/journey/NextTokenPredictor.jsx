import React, { useState } from 'react';
import { AlignLeft, Thermometer, Wand2 } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function NextTokenPredictor() {
  const [sequence, setSequence] = useState(["The", "cat", "sat", "on", "the"]);
  const [temperature, setTemperature] = useState(1.0); // 0.1 to 2.0
  const [showDist, setShowDist] = useState(true);

  // Toy distributions based on the last two words
  const getBaseDist = () => {
    const context = sequence.slice(-2).join(" ").toLowerCase();
    
    if (context === "on the") {
      return { "mat": 4.5, "floor": 2.8, "chair": 1.5, "bed": 0.8, "moon": -2.0 };
    } else if (context === "under the") {
      return { "bed": 4.2, "table": 3.5, "mat": -1.0, "floor": -2.0, "moon": -2.0 };
    } else if (context === "the mat") {
      return { "and": 3.0, "purred": 2.5, "looking": 1.5, ".": 4.0, "mat": -2.0 };
    } else if (context === "the bed") {
      return { "and": 3.0, "hiding": 2.5, ".": 4.0, "mat": -2.0, "bed": -2.0 };
    } else {
      return { ".": 3.0, "and": 2.0, "with": 1.5, "a": 1.0, "very": 0.5 };
    }
  };

  const getProbabilities = () => {
    const base = getBaseDist();
    
    // Apply temperature to raw logits
    const scaled = Object.values(base).map(v => v / temperature);
    
    // Softmax
    const max = Math.max(...scaled);
    const exps = scaled.map(s => Math.exp(s - max));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    const probs = exps.map(e => e / sumExps);
    
    return Object.keys(base).map((word, i) => ({
      word,
      prob: probs[i]
    })).sort((a, b) => b.prob - a.prob);
  };

  const probs = getProbabilities();

  const handleSelectWord = (word) => {
    setSequence([...sequence, word]);
  };

  const handleChangeContext = () => {
    if (sequence.includes("on")) {
      setSequence(["The", "cat", "sat", "under", "the"]);
    } else {
      setSequence(["The", "cat", "sat", "on", "the"]);
    }
  };

  const reset = () => {
    setSequence(["The", "cat", "sat", "on", "the"]);
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">3</span>
            Language Models
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A language model does not "write" a whole sentence at once. It simply learns patterns in token sequences and <Highlight color="#237957">estimates a probability distribution</Highlight> for what token is most likely to come next.
            <br/><br/>
            Then, it samples one word, adds it to the sequence, and repeats the process.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <AlignLeft className="text-[#ec5faa]" />
          Next Token Predictor
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[2fr_1.5fr] gap-12">
            
            {/* The Text & Context */}
            <div className="space-y-8 flex flex-col">
              
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] min-h-[150px] flex items-center flex-wrap gap-2 text-2xl font-serif">
                {sequence.map((word, i) => (
                  <span key={i} className="animate-in fade-in slide-in-from-bottom-2 bg-white px-2 py-1 rounded border border-ink/20 shadow-sm">{word}</span>
                ))}
                <span className="text-[#ec5faa] animate-pulse">_</span>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleChangeContext}
                  className="flex-1 py-3 bg-[#c9baff] font-bold border-2 border-ink rounded-lg shadow-[2px_2px_0_#17191f] hover:-translate-y-1 hover:shadow-[4px_4px_0_#17191f] transition-all"
                >
                  Swap "on" / "under"
                </button>
                <button 
                  onClick={reset}
                  className="px-6 py-3 bg-white font-bold border-2 border-ink rounded-lg hover:bg-paper transition-all"
                >
                  Reset
                </button>
              </div>

              <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink border-dashed mt-auto">
                <div className="text-sm font-bold tracking-widest opacity-60 mb-2">KEY REALIZATION</div>
                <div className="font-medium text-lg leading-relaxed">
                  Changing the context changes the <Highlight color="#6654f5">probability distribution</Highlight> immediately. The model recalculates the odds based on the new surrounding words.
                </div>
              </div>

            </div>

            {/* Probability Distribution & Temperature */}
            <div className="space-y-6">
              
              <div className="bg-ink text-white p-6 rounded-xl shadow-[4px_4px_0_#ec5faa]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xs tracking-widest flex items-center gap-2"><Thermometer size={16}/> TEMPERATURE</h3>
                  <span className="font-mono font-bold text-[#ec5faa]">{temperature.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0.1" max="2.5" step="0.1"
                  value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
                />
                <div className="mt-2 flex justify-between text-[10px] font-bold opacity-60">
                  <span>Confident (Sharp)</span>
                  <span>Creative (Flat)</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-4 flex items-center gap-2"><Wand2 size={16}/> NEXT TOKEN PREDICTION</h3>
                
                <div className="space-y-3">
                  {probs.map((p, i) => (
                    <button 
                      key={p.word}
                      onClick={() => handleSelectWord(p.word)}
                      className="w-full flex items-center gap-4 group text-left hover:bg-paper p-1 rounded transition-colors"
                    >
                      <div className="w-16 font-mono font-bold group-hover:text-[#ec5faa] transition-colors">{p.word}</div>
                      <div className="flex-1 h-5 bg-ink/10 rounded-sm overflow-hidden flex items-center">
                        <div 
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${p.prob * 100}%`,
                            backgroundColor: i === 0 ? '#ec5faa' : i === 1 ? '#c9baff' : '#17191f',
                            opacity: i > 1 ? 0.3 : 1
                          }}
                        />
                      </div>
                      <div className="w-12 font-mono font-bold text-sm text-right">
                        {(p.prob * 100).toFixed(1)}%
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 text-center text-xs font-bold tracking-widest opacity-40">
                  CLICK A WORD TO APPEND IT
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
