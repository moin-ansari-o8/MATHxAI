import React, { useState } from 'react';
import { ArrowRight, Settings, MoveVertical, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Bias() {
  const [slope, setSlope] = useState(10);
  const [bias, setBias] = useState(0);

  // Data points are perfectly linear but shifted up by 50.
  // Equation of points: y = 10x + 50
  const points = [
    { id: 1, x: 1, y: 60 },
    { id: 2, x: 2, y: 70 },
    { id: 3, x: 3, y: 80 },
    { id: 4, x: 4, y: 90 },
  ];

  // SVG Mapping logic
  const svgWidth = 400;
  const svgHeight = 300;
  const mapX = (x) => (x / 5) * svgWidth;
  const mapY = (y) => svgHeight - (y / 100) * svgHeight;

  let totalError = 0;
  points.forEach(p => {
    const predictedY = slope * p.x + bias;
    totalError += Math.abs(predictedY - p.y);
  });

  const isSolved = totalError === 0;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">4</span>
            Bias
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If weights control the <em>slope</em> or strength of a prediction, <Highlight color="#237957">bias</Highlight> gives the model a baseline offset. 
            <br/><br/>
            Sometimes, even if all your inputs are exactly zero, the prediction shouldn't be zero. Bias shifts the entire prediction up or down independently of the inputs.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <MoveVertical className="text-[#ec5faa]" />
          Shift the Line
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Plot */}
          <div className={`bg-white rounded-[20px] border-[3px] shadow-[6px_8px_0_#17191f] p-6 relative overflow-hidden flex justify-center transition-colors ${isSolved ? 'border-[#237957]' : 'border-ink'}`}>
            
            {isSolved && (
              <div className="absolute top-4 right-4 bg-[#dff4e8] text-[#237957] font-bold px-3 py-1 border-2 border-[#237957] rounded-lg animate-[bounce_1s_infinite]">
                PERFECT FIT!
              </div>
            )}

            <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="max-w-[400px]">
              {/* Grid Lines */}
              {[20, 40, 60, 80, 100].map(y => (
                <line key={`g-y-${y}`} x1="0" y1={mapY(y)} x2={svgWidth} y2={mapY(y)} stroke="#00000015" strokeDasharray="4 4" />
              ))}
              {[1, 2, 3, 4].map(x => (
                <line key={`g-x-${x}`} x1={mapX(x)} y1="0" x2={mapX(x)} y2={svgHeight} stroke="#00000015" strokeDasharray="4 4" />
              ))}

              {/* Error Segments */}
              {points.map(p => {
                const predictedY = slope * p.x + bias;
                return (
                  <line 
                    key={`err-${p.id}`}
                    x1={mapX(p.x)} 
                    y1={mapY(p.y)} 
                    x2={mapX(p.x)} 
                    y2={mapY(predictedY)} 
                    stroke="#ec5faa" 
                    strokeWidth="3" 
                    strokeDasharray="4 4"
                    opacity="0.8"
                  />
                );
              })}

              {/* The Line */}
              <line 
                x1={mapX(0)} 
                y1={mapY(bias)} 
                x2={mapX(5)} 
                y2={mapY(slope * 5 + bias)} 
                stroke="#62a9ff" 
                strokeWidth="5" 
                className="transition-all duration-75"
              />

              {/* Y-Intercept dot */}
              <circle 
                cx={mapX(0)}
                cy={mapY(bias)}
                r="6"
                fill="#237957"
                stroke="#fff"
                strokeWidth="2"
              />

              {/* Points */}
              {points.map(p => (
                <circle 
                  key={p.id}
                  cx={mapX(p.x)}
                  cy={mapY(p.y)}
                  r="7"
                  fill="#17191f"
                />
              ))}
            </svg>
            
            <div className="absolute bottom-2 right-4 font-bold text-sm text-ink/50">Input (x) →</div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm uppercase">Experiment</h3>
              <p className="text-sm font-medium mb-6">
                Notice that the Slope is already correct, but the line is starting at zero! Try adjusting the <strong className="text-[#237957]">Bias</strong> to shift the baseline up to the points.
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-bold mb-2 text-sm">
                    <label>Slope (Rotation)</label>
                    <span className="font-mono text-[#4185d9]">{slope.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-10" max="30" step="1" value={slope} 
                    onChange={(e) => setSlope(parseFloat(e.target.value))}
                    className="w-full accent-[#4185d9]"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between font-bold mb-2 text-sm">
                    <label>Bias (Vertical Shift)</label>
                    <span className="font-mono text-[#237957]">{bias.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-20" max="100" step="1" value={bias} 
                    onChange={(e) => setBias(parseFloat(e.target.value))}
                    className="w-full accent-[#237957]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="flex justify-between font-bold">
                <span>Total Error:</span>
                <span className="font-mono text-[#ec5faa]">{totalError.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Imagine a model predicting house prices based on the number of bedrooms. 
              <br/><br/>
              Even a house with 0 bedrooms (like a studio apartment) isn't free. It has a base cost just for the land and structure. Bias provides that exact base cost before any features are multiplied by their weights.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
