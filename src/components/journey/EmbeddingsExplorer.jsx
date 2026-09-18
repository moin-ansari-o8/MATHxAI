import React, { useState, useEffect } from 'react';
import { Search, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function EmbeddingsExplorer() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [neighbors, setNeighbors] = useState([]);

  // Toy embedding data
  const data = [
    { id: 1, name: "dog", x: 20, y: 30, emb: [0.21, -0.43, 0.78, 0.11, -0.92], color: '#ec5faa' },
    { id: 2, name: "puppy", x: 25, y: 35, emb: [0.22, -0.40, 0.81, 0.15, -0.95], color: '#ec5faa' },
    { id: 3, name: "cat", x: 30, y: 15, emb: [0.18, -0.38, 0.65, 0.41, -0.72], color: '#c9baff' },
    { id: 4, name: "kitten", x: 35, y: 20, emb: [0.19, -0.35, 0.68, 0.45, -0.75], color: '#c9baff' },
    { id: 5, name: "airplane", x: 80, y: 80, emb: [-0.81, 0.73, -0.18, -0.51, 0.42], color: '#237957' },
    { id: 6, name: "jet", x: 85, y: 75, emb: [-0.85, 0.78, -0.15, -0.55, 0.45], color: '#237957' },
    { id: 7, name: "car", x: 70, y: 60, emb: [-0.61, 0.53, -0.28, -0.31, 0.32], color: '#6654f5' },
    { id: 8, name: "apple", x: 20, y: 80, emb: [0.91, 0.13, -0.88, 0.81, 0.12], color: '#e63946' },
    { id: 9, name: "banana", x: 25, y: 85, emb: [0.88, 0.15, -0.85, 0.85, 0.15], color: '#e63946' },
  ];

  const getCosineSim = (a, b) => {
    let dot = 0, normA = 0, normB = 0;
    for(let i=0; i<a.length; i++) {
      dot += a[i]*b[i];
      normA += a[i]*a[i];
      normB += b[i]*b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  };

  const handleSearch = () => {
    if (!selectedNode || isSearching) return;
    setIsSearching(true);
    setNeighbors([]);
    
    // Animate search delay
    setTimeout(() => {
      const target = data.find(d => d.id === selectedNode);
      const results = data
        .filter(d => d.id !== selectedNode)
        .map(d => ({ ...d, sim: getCosineSim(target.emb, d.emb) }))
        .sort((a, b) => b.sim - a.sim)
        .slice(0, 3); // top 3
      
      setNeighbors(results);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">5</span>
            Embeddings
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            An <Highlight color="#237957">Embedding</Highlight> is a learned numerical representation. Instead of a human manually scoring genres, an AI model learns to assign vectors to concepts such that useful relationships are preserved as geometry.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Zap className="text-[#ec5faa]" />
          Embedding Explorer
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            {/* Visual Space */}
            <div className="w-full aspect-square bg-paper border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                
                {/* Search Animation Waves */}
                {isSearching && selectedNode && (
                  <g className="animate-ping" style={{ animationDuration: '1.5s' }}>
                    <circle 
                      cx={data.find(d=>d.id===selectedNode).x} 
                      cy={data.find(d=>d.id===selectedNode).y} 
                      r="15" fill="none" stroke="#6654f5" strokeWidth="1" opacity="0.5" 
                    />
                  </g>
                )}

                {/* Draw connections to neighbors */}
                {neighbors.length > 0 && selectedNode && neighbors.map(n => {
                  const target = data.find(d => d.id === selectedNode);
                  return (
                    <line 
                      key={`l${n.id}`} 
                      x1={target.x} y1={target.y} 
                      x2={n.x} y2={n.y} 
                      stroke="#ec5faa" strokeWidth="1" 
                      className="animate-in fade-in"
                    />
                  );
                })}

                {/* Draw Points */}
                {data.map(d => {
                  const isHovered = hoveredNode === d.id;
                  const isSelected = selectedNode === d.id;
                  const isNeighbor = neighbors.find(n => n.id === d.id);
                  
                  return (
                    <g 
                      key={d.id}
                      onMouseEnter={() => setHoveredNode(d.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => { setSelectedNode(d.id); setNeighbors([]); setIsSearching(false); }}
                      className="cursor-pointer transition-all duration-300"
                    >
                      <circle 
                        cx={d.x} cy={d.y} 
                        r={isSelected ? "6" : isNeighbor ? "5" : "4"} 
                        fill={d.color} 
                        stroke="#17191f" 
                        strokeWidth={isSelected ? "2" : "1.5"} 
                        opacity={isSearching && !isSelected ? "0.3" : "1"}
                      />
                      <text 
                        x={d.x + 6} y={d.y + 2} 
                        fontSize="5" fontWeight="bold" fill="#17191f"
                        opacity={isSearching && !isSelected ? "0.3" : "1"}
                      >
                        {d.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              
              <div className="bg-[#1e1e1e] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] text-white min-h-[160px]">
                <h3 className="font-bold text-xs tracking-widest text-white/50 mb-4">HOVER INSPECT</h3>
                {hoveredNode ? (
                  <div className="animate-in fade-in">
                    <div className="text-xl font-bold uppercase" style={{color: data.find(d=>d.id===hoveredNode).color}}>
                      {data.find(d=>d.id===hoveredNode).name}
                    </div>
                    <div className="mt-4 font-mono text-xs break-all leading-relaxed text-sunshine">
                      [ {data.find(d=>d.id===hoveredNode).emb.join(', ')} ... ]
                    </div>
                  </div>
                ) : (
                  <div className="text-white/30 text-sm font-mono italic">
                    Hover over a point to see its raw embedding array.
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-2">NEAREST NEIGHBOR SEARCH</h3>
                
                {selectedNode ? (
                  <div className="space-y-4">
                    <div className="text-lg font-bold font-display flex items-center gap-2">
                      Selected: <span style={{color: data.find(d=>d.id===selectedNode).color}}>{data.find(d=>d.id===selectedNode).name}</span>
                    </div>
                    <button 
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="w-full py-3 bg-[#6654f5] text-white font-bold rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Search size={18} className={isSearching ? "animate-spin" : ""} />
                      {isSearching ? 'SEARCHING SPACE...' : 'FIND SIMILAR'}
                    </button>

                    {neighbors.length > 0 && (
                      <div className="pt-4 border-t-2 border-ink/10 space-y-3">
                        {neighbors.map((n, i) => (
                          <div key={i} className="flex justify-between items-center text-sm font-bold bg-[#fffdf8] p-2 rounded border border-ink/20">
                            <span style={{color: n.color}}>{n.name}</span>
                            <span className="font-mono text-xs opacity-50">Sim: {n.sim.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm font-medium opacity-60 italic">
                    Click a point on the map first.
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
