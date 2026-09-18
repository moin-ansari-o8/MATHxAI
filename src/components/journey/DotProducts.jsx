import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, MoveUpRight, Info, Plus } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function DotProducts() {
  const [vectorA, setVectorA] = useState({ x: 3, y: 8 });
  const [vectorB, setVectorB] = useState({ x: 8, y: 2 });
  const [activePoint, setActivePoint] = useState(null);
  
  const svgRef = useRef(null);

  const handlePointerDown = (e, pointId) => {
    e.preventDefault();
    setActivePoint(pointId);
  };

  const handlePointerUp = () => {
    setActivePoint(null);
  };

  const handlePointerMove = (e) => {
    if (!activePoint || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(-10, Math.min(10, Math.round(((e.clientX - rect.left) / rect.width) * 20 - 10)));
    const y = Math.max(-10, Math.min(10, 10 - Math.round(((e.clientY - rect.top) / rect.height) * 20)));

    if (activePoint === 'A') setVectorA({ x, y });
    else if (activePoint === 'B') setVectorB({ x, y });
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  const renderGrid = () => {
    const lines = [];
    for (let i = 0; i <= 20; i++) {
      // Horizontal
      lines.push(<line key={`h-${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#17191f" strokeWidth={i === 10 ? "1" : "0.5"} strokeOpacity={i === 10 ? "0.3" : "0.1"} />);
      // Vertical
      lines.push(<line key={`v-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="#17191f" strokeWidth={i === 10 ? "1" : "0.5"} strokeOpacity={i === 10 ? "0.3" : "0.1"} />);
    }
    return lines;
  };

  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
  
  // Calculate projection of A onto B
  const magBSq = vectorB.x * vectorB.x + vectorB.y * vectorB.y;
  let projX = 0;
  let projY = 0;
  if (magBSq > 0) {
    projX = (dotProduct / magBSq) * vectorB.x;
    projY = (dotProduct / magBSq) * vectorB.y;
  }

  // Determine angle and similarity score (normalized dot product / cosine similarity)
  const magA = Math.sqrt(vectorA.x * vectorA.x + vectorA.y * vectorA.y);
  const magB = Math.sqrt(magBSq);
  const cosSim = (magA > 0 && magB > 0) ? (dotProduct / (magA * magB)) : 0;
  
  // Similarity color map
  let simColor = "#fffdf8"; // neutral
  if (cosSim > 0.8) simColor = "#dff4e8"; // highly similar (green)
  else if (cosSim > 0.3) simColor = "#dcecff"; // somewhat similar (blue)
  else if (cosSim > -0.3) simColor = "#fff4d9"; // orthogonal / unrelated (yellow)
  else if (cosSim > -0.8) simColor = "#fbe1eb"; // somewhat opposite (pink)
  else simColor = "#ffda45"; // opposite

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">7</span>
            Measuring Similarity
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            The <Highlight color="#f58ab4">dot product</Highlight> is a fundamental operation that multiplies two vectors to produce a single number. In AI, it is primarily used to measure <Highlight color="#62a9ff">how much two vectors point in the same direction</Highlight>.
          </p>
          <div className="bg-[#fff4d9] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] text-center font-bold">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-lg">
              <span className="font-mono text-[#d83f97]">[x₁, y₁]</span>
              <span className="text-2xl text-ink/50">·</span>
              <span className="font-mono text-[#4185d9]">[x₂, y₂]</span>
              <ArrowRight className="hidden sm:block text-ink/40" />
              <ArrowRight className="sm:hidden text-ink/40 rotate-90 my-2" />
              <span className="font-mono text-ink bg-white px-3 py-1 border-2 border-ink rounded">(x₁ × x₂) + (y₁ × y₂)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - Similarity Lab */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <MoveUpRight className="text-[#6654f5]" />
          Similarity Lab
        </h2>
        
        <div className="p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-white shadow-[6px_8px_0_#17191f] mb-8 grid md:grid-cols-[1fr_250px] gap-8">
          
          <div className="flex justify-center flex-col items-center">
            <div className="relative w-full max-w-[400px] aspect-square bg-white border-2 border-ink shadow-[4px_4px_0_#17191f] rounded-lg overflow-hidden">
              <svg 
                ref={svgRef}
                viewBox="0 0 100 100" 
                className="w-full h-full touch-none"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerUp}
              >
                {renderGrid()}
                
                {/* Projection of A onto B */}
                <line 
                  x1="50" y1="50" 
                  x2={50 + projX * 5} y2={50 - projY * 5} 
                  stroke="#237957" strokeWidth="4" strokeLinecap="round"
                />
                
                {/* Dashed line connecting A to Projection */}
                <line 
                  x1={50 + vectorA.x * 5} y1={50 - vectorA.y * 5} 
                  x2={50 + projX * 5} y2={50 - projY * 5} 
                  stroke="#237957" strokeWidth="1.5" strokeDasharray="3 3"
                />

                {/* Vector A */}
                <line 
                  x1="50" y1="50" 
                  x2={50 + vectorA.x * 5} y2={50 - vectorA.y * 5} 
                  stroke="#d83f97" strokeWidth="2.5" strokeLinecap="round" 
                />
                
                {/* Vector B */}
                <line 
                  x1="50" y1="50" 
                  x2={50 + vectorB.x * 5} y2={50 - vectorB.y * 5} 
                  stroke="#4185d9" strokeWidth="2.5" strokeLinecap="round" 
                />

                {/* Points */}
                <circle cx={50 + vectorA.x * 5} cy={50 - vectorA.y * 5} r="4" fill="#f58ab4" stroke="#17191f" strokeWidth="1.5" className="cursor-pointer hover:stroke-[2.5px] transition-all" onPointerDown={(e) => handlePointerDown(e, 'A')} />
                <circle cx={50 + vectorB.x * 5} cy={50 - vectorB.y * 5} r="4" fill="#62a9ff" stroke="#17191f" strokeWidth="1.5" className="cursor-pointer hover:stroke-[2.5px] transition-all" onPointerDown={(e) => handlePointerDown(e, 'B')} />
              </svg>
            </div>
            
            <div className="mt-6 font-bold text-ink/60 text-center text-sm flex items-center gap-2 bg-paper px-4 py-2 rounded-lg border-2 border-ink/10">
              <Info size={16}/> Drag points A and B to see how the dot product changes
            </div>
          </div>

          <div className="flex flex-col gap-4">
            
            <div className="p-4 rounded-xl border-2 border-ink bg-white shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold text-sm text-ink/50 uppercase tracking-widest mb-3">Math</h3>
              
              <div className="space-y-2 font-mono font-bold text-sm bg-paper p-3 rounded border border-ink/20">
                <div className="flex items-center gap-2">
                  <span className="text-[#d83f97]">A</span> = [{vectorA.x}, {vectorA.y}]
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4185d9]">B</span> = [{vectorB.x}, {vectorB.y}]
                </div>
              </div>

              <div className="mt-3 font-mono font-bold text-sm space-y-1">
                <div>({vectorA.x} × {vectorB.x}) + ({vectorA.y} × {vectorB.y})</div>
                <div>= {vectorA.x * vectorB.x} + {vectorA.y * vectorB.y}</div>
              </div>
              
              <div className="mt-3 text-2xl font-bold bg-[#fff4d9] px-3 py-2 rounded-lg border-2 border-ink text-center shadow-inner">
                {dotProduct}
              </div>
            </div>

            <div className="p-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] transition-colors duration-500" style={{ backgroundColor: simColor }}>
              <h3 className="font-bold text-sm text-ink/50 uppercase tracking-widest mb-3">Alignment</h3>
              <div className="text-xl font-bold">
                {cosSim > 0.8 ? "Highly Similar" :
                 cosSim > 0.3 ? "Similar" :
                 cosSim > -0.3 ? "Orthogonal (Unrelated)" :
                 cosSim > -0.8 ? "Opposite" :
                 "Highly Opposite"}
              </div>
              
              <div className="mt-3 text-sm font-medium text-ink/80 border-t-2 border-ink/10 pt-3">
                <span className="text-[#237957] font-bold">Green line</span> shows the "projection" — how much of A goes in the direction of B.
              </div>
            </div>
            
          </div>

        </div>
      </section>

      {/* 3. Real AI Connection */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How this connects to real AI</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-ink p-5 rounded-xl shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold text-lg mb-2 text-[#4185d9]">Search & Similarity</h3>
              <p className="font-medium text-ink/80">When you search for something, AI turns your search into a vector, and uses the dot product to find documents with similar meaning.</p>
            </div>
            <div className="bg-white border-2 border-ink p-5 rounded-xl shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold text-lg mb-2 text-[#d83f97]">Neural Connections</h3>
              <p className="font-medium text-ink/80">Inside a neural network, a dot product determines how strongly an input matches what a neuron is looking for.</p>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed text-center bg-white/50 p-6 rounded-xl border-2 border-ink border-dashed">
            The dot product is the <Highlight color="#fffdf8">engine of AI</Highlight>. If an AI system is doing math, it is probably doing billions of dot products.
          </div>
        </div>
      </section>
    </div>
  );
}
