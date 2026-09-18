import React, { useState, useRef, useEffect } from 'react';
import { Ruler, Layers } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function DistanceExplorer() {
  const [posA, setPosA] = useState({ x: 20, y: 80 });
  const [posB, setPosB] = useState({ x: 70, y: 40 });
  const [dimMode, setDimMode] = useState('2D'); // 2D, 3D, Higher
  const svgRef = useRef(null);

  const [dragging, setDragging] = useState(null); // 'A' or 'B'

  const handlePointerDown = (e, id) => {
    e.preventDefault(); // prevent default touch behavior like scrolling
    setDragging(id);
  };

  const handlePointerMove = (e) => {
    if (!dragging || !svgRef.current) return;
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
    
    const newX = Math.max(0, Math.min(100, svgP.x));
    const newY = Math.max(0, Math.min(100, svgP.y));
    
    if (dragging === 'A') setPosA({ x: newX, y: newY });
    if (dragging === 'B') setPosB({ x: newX, y: newY });
  };

  const handlePointerUp = () => setDragging(null);

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  const dx = posB.x - posA.x;
  const dy = posB.y - posA.y; // visual y is inverted, but math doesn't care for distance
  const distance = Math.sqrt(dx*dx + dy*dy).toFixed(1);

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">3</span>
            Distance
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            While similarity often measures direction, <Highlight color="#237957">Distance</Highlight> measures how far apart two points are in space. 
            <br/><br/>
            The most common measurement is Euclidean distance—which is exactly the same math you use to measure a straight line between two points on a map using right triangles.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Ruler className="text-[#ec5faa]" />
          Distance Explorer
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            {/* Interactive SVG */}
            <div className="w-full flex flex-col items-center">
              <div 
                className="w-full max-w-md aspect-square bg-paper border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden select-none touch-none"
                onPointerMove={handlePointerMove}
              >
                <div className="absolute top-4 left-4 font-bold text-xs opacity-40 tracking-widest pointer-events-none">DRAG THE POINTS</div>
                
                <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                  {/* Grid */}
                  <g opacity="0.1">
                    {Array.from({length: 10}).map((_, i) => (
                      <React.Fragment key={i}>
                        <line x1={0} y1={i*10} x2={100} y2={i*10} stroke="#17191f" strokeWidth="0.5" />
                        <line x1={i*10} y1={0} x2={i*10} y2={100} stroke="#17191f" strokeWidth="0.5" />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* Right Triangle */}
                  {dimMode === '2D' && (
                    <g opacity="0.3">
                      <line x1={posA.x} y1={posA.y} x2={posB.x} y2={posA.y} stroke="#17191f" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1={posB.x} y1={posA.y} x2={posB.x} y2={posB.y} stroke="#17191f" strokeWidth="1" strokeDasharray="2 2" />
                      {/* Triangle labels */}
                      <text x={(posA.x + posB.x)/2} y={posA.y + (posA.y < posB.y ? -2 : 5)} fontSize="4" fontWeight="bold" textAnchor="middle">Δx</text>
                      <text x={posB.x + (posA.x < posB.x ? 2 : -5)} y={(posA.y + posB.y)/2} fontSize="4" fontWeight="bold" alignmentBaseline="middle">Δy</text>
                    </g>
                  )}

                  {/* Direct Line (Distance) */}
                  <line x1={posA.x} y1={posA.y} x2={posB.x} y2={posB.y} stroke="#ec5faa" strokeWidth="2" />
                  
                  {/* Points */}
                  <circle 
                    cx={posA.x} cy={posA.y} r="5" 
                    fill="#237957" stroke="#17191f" strokeWidth="1.5"
                    className={`cursor-grab ${dragging === 'A' ? 'cursor-grabbing' : ''}`}
                    onPointerDown={(e) => handlePointerDown(e, 'A')}
                  />
                  <text x={posA.x + 6} y={posA.y + 2} fontSize="5" fontWeight="bold" className="pointer-events-none">A</text>

                  <circle 
                    cx={posB.x} cy={posB.y} r="5" 
                    fill="#6654f5" stroke="#17191f" strokeWidth="1.5"
                    className={`cursor-grab ${dragging === 'B' ? 'cursor-grabbing' : ''}`}
                    onPointerDown={(e) => handlePointerDown(e, 'B')}
                  />
                  <text x={posB.x + 6} y={posB.y + 2} fontSize="5" fontWeight="bold" className="pointer-events-none">B</text>

                </svg>
              </div>
              
              <div className="mt-6 bg-[#fffdf8] px-6 py-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] text-center w-full max-w-md">
                <div className="text-xs font-bold tracking-widest opacity-60">EUCLIDEAN DISTANCE</div>
                <div className="text-4xl font-mono font-bold text-[#ec5faa] mt-1">{distance}</div>
              </div>
            </div>

            {/* Controls / Dimensions */}
            <div className="space-y-6">
              
              <div className="bg-paper p-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4 flex items-center gap-2"><Layers size={16}/> DIMENSIONS</h3>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setDimMode('2D')}
                    className={`px-4 py-2 rounded-lg font-bold border-2 transition-all text-left ${dimMode === '2D' ? 'bg-[#c9baff] border-ink translate-x-2' : 'bg-white border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    2D Space
                  </button>
                  <button 
                    onClick={() => setDimMode('3D')}
                    className={`px-4 py-2 rounded-lg font-bold border-2 transition-all text-left ${dimMode === '3D' ? 'bg-[#c9baff] border-ink translate-x-2' : 'bg-white border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    3D Space
                  </button>
                  <button 
                    onClick={() => setDimMode('Higher')}
                    className={`px-4 py-2 rounded-lg font-bold border-2 transition-all text-left ${dimMode === 'Higher' ? 'bg-[#c9baff] border-ink translate-x-2' : 'bg-white border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    Higher Dimensions
                  </button>
                </div>
              </div>

              <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink border-dashed font-medium text-sm leading-relaxed">
                {dimMode === '2D' && (
                  <>
                    <p>In <Highlight color="#237957">2D Space</Highlight>, we use the Pythagorean theorem: a² + b² = c². We measure the difference in X and the difference in Y.</p>
                  </>
                )}
                {dimMode === '3D' && (
                  <>
                    <p>In <Highlight color="#6654f5">3D Space</Highlight>, the math is exactly the same, just with one more term! We measure the difference in X, Y, and Z.</p>
                  </>
                )}
                {dimMode === 'Higher' && (
                  <>
                    <p>We cannot easily visualize a 1000-dimensional space. But a computer doesn't need to see it! It simply calculates the differences across all 1000 numbers in the vector using the exact same math.</p>
                  </>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">Important Distinction</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-[#ec5faa] whitespace-nowrap">Distance:</span> 
                <span className="font-medium opacity-80">Smaller usually means closer.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#237957] whitespace-nowrap">Similarity:</span> 
                <span className="font-medium opacity-80">Larger usually means more similar.</span>
              </li>
            </ul>
            <p className="mt-6 text-sm font-medium opacity-60">
              There is no single universal definition of "similar" in machine learning. Different algorithms use different mathematical formulas depending on the shape of their data.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
