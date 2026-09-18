import React, { useState } from 'react';
import { Target, Maximize2 } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Change() {
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(5);
  
  // Let's use a simple function y = x^2 for a nice curve, or y = 2x
  // Spec asks for y=2x as intro, then asks them to drag. Let's stick to y=x^2 to make the slope change visibly later, or just y=2x for simplicity. 
  // Wait, let's use y = x^2 / 2 so the numbers stay reasonable.
  // Actually, a simple curve is better. y = x^2 / 4
  const func = (x) => (x * x) / 2;
  
  const y1 = func(x1);
  const y2 = func(x2);
  
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // SVG drawing logic
  const svgWidth = 500;
  const svgHeight = 350;
  const padding = 30;

  const maxDomain = 10;
  const maxRange = func(maxDomain);

  const mapX = (x) => padding + (x / maxDomain) * (svgWidth - 2 * padding);
  const mapY = (y) => svgHeight - padding - (y / maxRange) * (svgHeight - 2 * padding);

  let pathD = "";
  for (let x = 0; x <= maxDomain; x += 0.5) {
    const y = func(x);
    const px = mapX(x);
    const py = mapY(y);
    if (x === 0) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }

  const p1x = mapX(x1);
  const p1y = mapY(y1);
  
  const p2x = mapX(x2);
  const p2y = mapY(y2);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">2</span>
            Change
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If a model is just a function, then we can ask an important question: <Highlight color="#4185d9">what happens to the output when we change the input?</Highlight>
            <br/><br/>
            We use the greek letter Delta (Δ) to represent "change in".
          </p>
          
          <div className="flex justify-center gap-8 text-center font-mono font-bold text-lg mt-8">
            <div className="bg-[#fbe1eb] border-2 border-[#ec5faa] rounded-xl p-4 shadow-[4px_4px_0_#17191f]">
              <div className="text-[#ec5faa] text-sm mb-2">Change in x</div>
              <div className="text-2xl">Δx</div>
            </div>
            <div className="bg-[#dff4e8] border-2 border-[#237957] rounded-xl p-4 shadow-[4px_4px_0_#17191f]">
              <div className="text-[#237957] text-sm mb-2">Change in y</div>
              <div className="text-2xl">Δy</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Maximize2 className="text-[#ec5faa]" />
          Change Explorer
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Graph Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                {/* Axes */}
                <line x1={mapX(0)} y1={mapY(0)} x2={mapX(10)} y2={mapY(0)} stroke="#00000020" strokeWidth="2" />
                <line x1={mapX(0)} y1={mapY(0)} x2={mapX(0)} y2={mapY(maxRange)} stroke="#00000020" strokeWidth="2" />
                
                {/* Curve */}
                <path d={pathD} fill="none" stroke="#c9baff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Delta lines */}
                {x1 !== x2 && (
                  <>
                    <line x1={p1x} y1={p1y} x2={p2x} y2={p1y} stroke="#ec5faa" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
                    <line x1={p2x} y1={p1y} x2={p2x} y2={p2y} stroke="#237957" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
                    
                    <text x={(p1x + p2x) / 2} y={p1y + 20} fontSize="14" fontWeight="bold" fill="#ec5faa" textAnchor="middle">Δx</text>
                    <text x={p2x + 15} y={(p1y + p2y) / 2} fontSize="14" fontWeight="bold" fill="#237957">Δy</text>
                  </>
                )}

                {/* Secant line */}
                <line x1={p1x} y1={p1y} x2={p2x} y2={p2y} stroke="#17191f" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="4 4" />

                {/* Points */}
                <circle cx={p1x} cy={p1y} r="8" fill="#17191f" stroke="#fff" strokeWidth="2" />
                <circle cx={p2x} cy={p2y} r="8" fill="#17191f" stroke="#fff" strokeWidth="2" />
                
                <text x={p1x - 15} y={p1y - 15} fontSize="14" fontWeight="bold" fill="#17191f">A</text>
                <text x={p2x + 15} y={p2y - 15} fontSize="14" fontWeight="bold" fill="#17191f">B</text>
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              
              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <span>Point A (x)</span>
                  <span className="font-mono text-ink">{x1.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="0.5" value={x1} 
                  onChange={(e) => setX1(parseFloat(e.target.value))} 
                  className="w-full accent-ink" 
                />
                <div className="text-right text-xs font-mono font-bold text-[#237957] mt-1">y = {y1.toFixed(1)}</div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <span>Point B (x)</span>
                  <span className="font-mono text-ink">{x2.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0" max="10" step="0.5" value={x2} 
                  onChange={(e) => setX2(parseFloat(e.target.value))} 
                  className="w-full accent-ink" 
                />
                <div className="text-right text-xs font-mono font-bold text-[#237957] mt-1">y = {y2.toFixed(1)}</div>
              </div>

              <div className="border-t-2 border-ink/10 pt-6 space-y-4">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[#ec5faa]">Change in x (Δx)</span>
                  <span className="font-mono bg-white px-3 py-1 rounded border-2 border-[#ec5faa]">
                    {deltaX > 0 ? '+' : ''}{deltaX.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[#237957]">Change in y (Δy)</span>
                  <span className="font-mono bg-white px-3 py-1 rounded border-2 border-[#237957]">
                    {deltaY > 0 ? '+' : ''}{deltaY.toFixed(1)}
                  </span>
                </div>
              </div>

            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/10 pb-2 mb-4 text-sm text-ink/60 tracking-widest">THINK ABOUT IT</h3>
              <ul className="space-y-3 font-bold text-sm">
                <li>How much did x change?</li>
                <li>How much did y change?</li>
                <li className="text-[#6654f5] pt-2 border-t-2 border-ink/10">How quickly did y change compared with x?</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              In machine learning, we don't just care about the output. We care about <Highlight color="#6654f5">how the output changes when model parameters change</Highlight>.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              If I change a weight by +0.1, will the loss go up or down? And by how much? That is exactly what measuring "change" allows us to answer.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
