import React, { useState } from 'react';
import { Grid3X3, Eye, EyeOff } from 'lucide-react';

export function SelfAttentionMatrix() {
  const [causal, setCausal] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const tokens = ["The", "cat", "sat", "on", "the", "mat"];
  
  // Toy attention weights (values 0-1)
  const fullAttention = [
    [0.6, 0.1, 0.1, 0.1, 0.1, 0.0], // The
    [0.1, 0.5, 0.4, 0.0, 0.0, 0.0], // cat
    [0.0, 0.4, 0.5, 0.1, 0.0, 0.0], // sat
    [0.0, 0.0, 0.1, 0.4, 0.2, 0.3], // on
    [0.0, 0.0, 0.0, 0.1, 0.5, 0.4], // the
    [0.0, 0.0, 0.2, 0.3, 0.4, 0.1], // mat
  ];

  // Apply causal masking (upper triangle becomes 0, rows re-normalized)
  const getCausalAttention = () => {
    return fullAttention.map((row, i) => {
      const maskedRow = row.map((val, j) => (j > i ? 0 : val));
      const sum = maskedRow.reduce((a, b) => a + b, 0);
      return maskedRow.map(val => (sum === 0 ? 0 : val / sum));
    });
  };

  const matrix = causal ? getCausalAttention() : fullAttention;

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">5</span>
            Self-Attention
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            In <strong>Self-Attention</strong>, the Queries, Keys, and Values are all generated from the <i>exact same input sequence</i>. This means every token in a sentence gets to "look around" at the other tokens in the same sentence to build context.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Grid3X3 className="text-[#ec5faa]" />
          The Attention Matrix
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button 
              onClick={() => setCausal(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all ${!causal ? 'bg-[#c9baff] shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
            >
              <Eye size={18} /> FULL SELF-ATTENTION
            </button>
            <button 
              onClick={() => setCausal(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all ${causal ? 'bg-[#237957] text-white shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
            >
              <EyeOff size={18} /> CAUSAL / MASKED
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center overflow-x-auto">
            
            {/* The Matrix */}
            <div className="flex flex-col items-center min-w-max mx-auto">
              {/* Column Headers (Keys) */}
              <div className="flex mb-2 ml-24">
                {tokens.map((t, i) => (
                  <div key={i} className="w-12 text-center font-bold font-mono text-sm tracking-widest text-[#237957] rotate-[-45deg] origin-bottom-left h-12 flex items-end justify-center">
                    {t}
                  </div>
                ))}
              </div>

              {/* Rows (Queries) */}
              <div className="flex flex-col gap-1">
                {matrix.map((row, i) => (
                  <div 
                    key={i} 
                    className="flex gap-1 items-center"
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <div className={`w-20 text-right pr-4 font-bold font-mono text-sm tracking-widest transition-colors ${hoveredRow === i ? 'text-[#ec5faa]' : 'text-ink'}`}>
                      {tokens[i]}
                    </div>
                    {row.map((val, j) => (
                      <div 
                        key={j}
                        className="w-12 h-12 rounded border border-ink/10 transition-all duration-300 flex items-center justify-center relative group"
                        style={{
                          backgroundColor: val > 0 ? `rgba(102, 84, 245, ${val})` : 'transparent',
                          border: val === 0 ? '1px dashed rgba(23,25,31,0.1)' : 'none',
                          transform: hoveredRow === i ? 'scale(1.05)' : 'scale(1)',
                          zIndex: hoveredRow === i ? 10 : 1
                        }}
                      >
                        {val === 0 && causal && j > i && (
                          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(23,25,31,0.1)_2px,rgba(23,25,31,0.1)_4px)] rounded" />
                        )}
                        <span className="opacity-0 group-hover:opacity-100 font-mono text-[10px] font-bold text-white drop-shadow-md">
                          {val > 0 ? (val * 100).toFixed(0) : 0}%
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation / Context View */}
            <div className="bg-paper p-6 rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f] max-w-xs h-full flex flex-col justify-center">
              <h3 className="font-bold text-xs tracking-widest opacity-60 mb-4">
                {hoveredRow !== null ? `ATTENTION FOR: ${tokens[hoveredRow].toUpperCase()}` : "HOVER A ROW"}
              </h3>
              
              <div className="flex flex-wrap gap-2 text-xl font-serif">
                {tokens.map((t, i) => {
                  const isActive = hoveredRow !== null;
                  const weight = isActive ? matrix[hoveredRow][i] : 0;
                  const highlightOpacity = 0.2 + (weight * 0.8);
                  
                  return (
                    <span 
                      key={i} 
                      className="px-1 rounded transition-all duration-300"
                      style={{
                        backgroundColor: weight > 0 ? `rgba(102, 84, 245, ${highlightOpacity})` : 'transparent',
                        color: weight > 0 ? '#fff' : 'inherit',
                        fontWeight: weight > 0 ? 'bold' : 'normal',
                        textShadow: weight > 0 ? '1px 1px 0 rgba(23,25,31,0.5)' : 'none'
                      }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>

              <div className="mt-8 text-sm font-medium leading-relaxed opacity-80">
                {causal ? (
                  "In autoregressive generation (like ChatGPT), tokens are masked so they can only look at themselves and words that came BEFORE them. They cannot look into the future."
                ) : (
                  "In full self-attention, every token can look at both the past and the future of the sequence to understand its full context."
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
      
    </div>
  );
}
