import React, { useState } from 'react';
import { Target, Compass } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Similarity() {
  const [selectedPoint, setSelectedPoint] = useState(0); // index of selected point
  const [angle, setAngle] = useState(45); // degrees, 0 to 180

  // Points for the "Who is most similar" map
  const points = [
    { id: 0, name: 'Dog', x: 25, y: 80, color: '#ec5faa' },
    { id: 1, name: 'Wolf', x: 30, y: 90, color: '#c9baff' },
    { id: 2, name: 'Cat', x: 10, y: 60, color: '#237957' },
    { id: 3, name: 'Car', x: 85, y: 20, color: '#6654f5' },
    { id: 4, name: 'Bus', x: 90, y: 30, color: '#17191f' },
  ];

  const getEuclideanDist = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

  // Sort other points by Euclidean distance (as a proxy for similarity in this 2D map)
  const getRankings = () => {
    const target = points[selectedPoint];
    const rankings = points.filter(p => p.id !== target.id).map(p => {
      return { ...p, dist: getEuclideanDist(target, p) };
    });
    rankings.sort((a, b) => a.dist - b.dist);
    return rankings;
  };

  const rankings = getRankings();

  // Cosine Similarity Calculations for the Vector Angle interactive
  // A is fixed at (1, 0) -> Angle 0
  // B is rotated by 'angle'
  const rad = angle * (Math.PI / 180);
  const bx = Math.cos(rad) * 40; // radius 40 for visual
  const by = Math.sin(rad) * 40;
  
  // cosine similarity is just cos(angle) in this normalized case
  const cosSim = Math.cos(rad).toFixed(2);
  let simWord = "High";
  if (Math.abs(cosSim) < 0.2) simWord = "Near Zero (Unrelated)";
  else if (cosSim < -0.5) simWord = "Negative (Opposite)";
  else if (cosSim < 0.5) simWord = "Low";

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">2</span>
            Similarity
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#ec5faa">Similarity</Highlight> measures how alike two representations are according to a chosen mathematical formula. Once objects are mapped as points or vectors in space, we can simply ask the math: "Which one is closest?"
          </p>
        </div>
      </section>

      {/* Interactive 1: Neighborhood */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Target className="text-[#ec5faa]" />
          Who Is Most Similar?
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            <div className="w-full aspect-square bg-paper border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden">
              <div className="absolute top-4 left-4 font-bold text-xs opacity-40 tracking-widest">CLICK A POINT</div>
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                {/* Draw connecting lines from selected to others */}
                {points.map((pt) => {
                  if (pt.id === selectedPoint) return null;
                  const isClosest = pt.id === rankings[0].id;
                  return (
                    <line 
                      key={`l${pt.id}`} 
                      x1={points[selectedPoint].x} y1={100 - points[selectedPoint].y} 
                      x2={pt.x} y2={100 - pt.y} 
                      stroke={isClosest ? "#ec5faa" : "#17191f"} 
                      strokeWidth={isClosest ? "1" : "0.5"} 
                      strokeDasharray={isClosest ? "" : "2 2"}
                      opacity={isClosest ? "0.6" : "0.2"}
                      className="transition-all duration-300"
                    />
                  );
                })}
                {/* Draw points */}
                {points.map((pt) => (
                  <g 
                    key={`p${pt.id}`} 
                    onClick={() => setSelectedPoint(pt.id)}
                    className="cursor-pointer"
                  >
                    {pt.id === selectedPoint && (
                      <circle cx={pt.x} cy={100 - pt.y} r="8" fill="none" stroke="#ec5faa" strokeWidth="1" className="animate-ping opacity-50" />
                    )}
                    <circle cx={pt.x} cy={100 - pt.y} r={pt.id === selectedPoint ? "5" : "4"} fill={pt.color} stroke="#17191f" strokeWidth="1.5" className="transition-all duration-300" />
                    <text x={pt.x + 6} y={100 - pt.y + 3} fontSize="5" fontWeight="bold" fill="#17191f" style={{pointerEvents: 'none'}}>{pt.name}</text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              <div>
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-2">SELECTED</h3>
                <div className="text-2xl font-bold font-display" style={{color: points[selectedPoint].color}}>
                  {points[selectedPoint].name}
                </div>
              </div>
              
              <div className="border-t-2 border-ink/10 pt-4 space-y-4">
                <h3 className="font-bold text-xs tracking-widest opacity-60">SIMILARITY RANKING</h3>
                {rankings.map((pt, i) => (
                  <div key={i} className="flex items-center justify-between font-bold text-sm bg-white p-3 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">
                    <div className="flex items-center gap-2">
                      <span className="opacity-40 w-4">{i+1}.</span>
                      <span style={{color: pt.color}}>{pt.name}</span>
                    </div>
                    <span className="text-[10px] opacity-40 font-mono">DIST: {pt.dist.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive 2: Cosine Similarity */}
      <section>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] shadow-[6px_8px_0_#17191f] flex flex-col justify-center h-full">
            <h2 className="font-display text-2xl font-bold mb-6">Cosine Similarity</h2>
            <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
              Instead of just asking how far apart two points are, <Highlight color="#6654f5">Cosine Similarity</Highlight> compares the <strong>direction</strong> of two vectors. 
              <br/><br/>
              It asks: Are these vectors pointing the exact same way (highly similar), completely perpendicular (unrelated), or in opposite directions?
            </p>
          </div>

          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
            <h3 className="font-bold text-sm tracking-widest opacity-60 mb-6 flex items-center gap-2"><Compass size={18}/> VECTOR ANGLE</h3>
            
            <div className="w-full aspect-square bg-paper border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden mb-8">
              {/* Polar Grid */}
              <svg width="100%" height="100%" viewBox="-50 -50 100 100" className="absolute inset-0">
                <circle cx="0" cy="0" r="40" fill="none" stroke="#17191f" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2"/>
                <circle cx="0" cy="0" r="20" fill="none" stroke="#17191f" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2"/>
                <line x1="-50" y1="0" x2="50" y2="0" stroke="#17191f" strokeWidth="0.5" opacity="0.3"/>
                <line x1="0" y1="-50" x2="0" y2="50" stroke="#17191f" strokeWidth="0.5" opacity="0.3"/>
                
                {/* Vector A (fixed at angle 0) */}
                <line x1="0" y1="0" x2="40" y2="0" stroke="#17191f" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="40,0 35,-3 35,3" fill="#17191f" />
                <text x="45" y="3" fontSize="6" fontWeight="bold">A</text>
                
                {/* Vector B (Rotatable, note SVG Y is down, so we subtract Y to make angle visual counter-clockwise up) */}
                <line x1="0" y1="0" x2={bx} y2={-by} stroke="#ec5faa" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points={`${bx},${-by} ${bx - Math.cos(rad - 0.2)*5},${-(by - Math.sin(rad - 0.2)*5)} ${bx - Math.cos(rad + 0.2)*5},${-(by - Math.sin(rad + 0.2)*5)}`} fill="#ec5faa" />
                <text x={bx + (bx>0?5:-10)} y={-by + (by>0?-2:5)} fontSize="6" fontWeight="bold" fill="#ec5faa">B</text>

                {/* Angle Arc */}
                {angle > 0 && (
                  <path 
                    d={`M 15 0 A 15 15 0 ${angle > 180 ? 1 : 0} 0 ${Math.cos(rad)*15} ${-Math.sin(rad)*15}`} 
                    fill="none" stroke="#6654f5" strokeWidth="1" opacity="0.8"
                  />
                )}
              </svg>
            </div>

            <div className="space-y-6">
              <input 
                type="range" 
                min="0" max="180" step="1" 
                value={angle} 
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#6654f5]"
              />
              <div className="flex justify-between items-center bg-[#fffdf8] p-4 rounded-xl border-2 border-ink font-bold">
                <div className="text-center">
                  <div className="text-xs opacity-60">ANGLE</div>
                  <div className="text-xl font-mono">{angle}°</div>
                </div>
                <div className="w-1 h-8 bg-ink/10"></div>
                <div className="text-center">
                  <div className="text-xs opacity-60">COSINE SIMILARITY</div>
                  <div className="text-xl font-mono text-[#ec5faa]">{cosSim}</div>
                  <div className="text-[10px] text-[#ec5faa] uppercase tracking-widest">{simWord}</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
      
    </div>
  );
}
