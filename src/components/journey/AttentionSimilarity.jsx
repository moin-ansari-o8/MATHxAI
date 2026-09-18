import React, { useState } from 'react';
import { Target, Search } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function AttentionSimilarity() {
  const [queryAngle, setQueryAngle] = useState(45); // degrees 0-180

  // Toy Key Vectors for educational purposes
  // Let's place them at specific angles:
  // animal: 40 deg
  // street: 160 deg (far)
  // tired: 60 deg
  // crossed: 130 deg
  
  const keys = [
    { word: 'animal', angle: 40, color: '#ec5faa' },
    { word: 'tired', angle: 60, color: '#237957' },
    { word: 'crossed', angle: 130, color: '#6654f5' },
    { word: 'street', angle: 160, color: '#17191f' },
  ];

  const getDotProduct = (angle1, angle2) => {
    // normalized dot product is just cosine of difference
    const diff = (angle1 - angle2) * (Math.PI / 180);
    return Math.cos(diff);
  };

  const getLabel = (score) => {
    if (score > 0.8) return 'High';
    if (score > 0.3) return 'Medium';
    if (score > -0.3) return 'Low';
    return 'Negative';
  };

  const qRad = queryAngle * (Math.PI / 180);
  const qx = Math.cos(qRad) * 40;
  const qy = -Math.sin(qRad) * 40; // SVG Y is inverted

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">2</span>
            Similarity & Relevance
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If a model needs to gather context, it needs a way to mathematically score how relevant one word's representation is to another. 
            <br/><br/>
            Remember <Highlight color="#237957">Cosine Similarity</Highlight> and the <Highlight color="#6654f5">Dot Product</Highlight> from the previous chapters? Attention uses exactly that math to compute a Relevance Score between words.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Target className="text-[#ec5faa]" />
          Who Matches Whom?
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] mb-8 text-center font-serif text-xl sm:text-2xl">
            "The animal crossed the street because <span className="inline-block bg-[#fffdf8] px-3 py-1 rounded border-2 border-ink font-bold text-[#ec5faa] shadow-[2px_2px_0_#17191f] mx-1">it</span> was tired."
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Visual Space */}
            <div className="w-full aspect-square bg-[#fffdf8] border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden">
              <div className="absolute top-2 left-2 text-[10px] font-bold opacity-30">TOY VECTOR PROJECTION</div>
              
              <svg width="100%" height="100%" viewBox="-50 -50 100 100" className="absolute inset-0">
                <circle cx="0" cy="0" r="40" fill="none" stroke="#17191f" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2"/>
                <line x1="-50" y1="0" x2="50" y2="0" stroke="#17191f" strokeWidth="0.5" opacity="0.3"/>
                <line x1="0" y1="-50" x2="0" y2="50" stroke="#17191f" strokeWidth="0.5" opacity="0.3"/>
                
                {/* Draw Key Vectors */}
                {keys.map(k => {
                  const rad = k.angle * (Math.PI / 180);
                  const x = Math.cos(rad) * 40;
                  const y = -Math.sin(rad) * 40;
                  return (
                    <g key={k.word} opacity="0.8">
                      <line x1="0" y1="0" x2={x} y2={y} stroke={k.color} strokeWidth="1" strokeDasharray="1 2" />
                      <circle cx={x} cy={y} r="2" fill={k.color} />
                      <text x={x + (x>0?3:-12)} y={y + (y>0?4:-2)} fontSize="5" fontWeight="bold" fill={k.color}>{k.word}</text>
                    </g>
                  );
                })}

                {/* Draw Query Vector */}
                <g>
                  <line x1="0" y1="0" x2={qx} y2={qy} stroke="#17191f" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx={qx} cy={qy} r="4" fill="#ec5faa" stroke="#17191f" strokeWidth="1" />
                  <text x={qx + (qx>0?5:-15)} y={qy + (qy>0?6:-4)} fontSize="6" fontWeight="bold" fill="#17191f">Query: it</text>
                </g>
              </svg>
            </div>

            {/* Controls and Scores */}
            <div className="space-y-6">
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 flex items-center gap-2 mb-4"><Search size={16}/> ROTATE THE QUERY ("it")</h3>
                <input 
                  type="range" min="0" max="180" 
                  value={queryAngle} onChange={(e) => setQueryAngle(parseInt(e.target.value))}
                  className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
                />
                <div className="mt-2 text-xs font-bold opacity-60 text-center">Move the vector to see who it matches best.</div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-2">RELEVANCE SCORES (DOT PRODUCT)</h3>
                
                {keys.map(k => {
                  const score = getDotProduct(queryAngle, k.angle);
                  const label = getLabel(score);
                  return (
                    <div key={k.word} className="flex justify-between items-center bg-white p-3 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f] transition-all duration-300">
                      <div className="font-bold font-mono" style={{color: k.color}}>Key: {k.word}</div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-bold">{score.toFixed(2)}</div>
                        <div className="text-[10px] font-bold tracking-widest" style={{color: score > 0.5 ? '#ec5faa' : 'inherit', opacity: score > 0.5 ? 1 : 0.4}}>{label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#e63946] text-white shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-xl font-bold mb-4">Key Transition</h2>
          <p className="text-lg font-medium leading-relaxed">
            In modern attention mechanisms, the model compares a <Highlight color="#fff">QUERY</Highlight> against all available <Highlight color="#fff">KEYS</Highlight> to generate these exact mathematical scores.
          </p>
        </div>
      </section>

    </div>
  );
}
