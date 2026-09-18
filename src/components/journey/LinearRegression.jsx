import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Settings, Calculator, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function LinearRegression() {
  const [slope, setSlope] = useState(2);
  const [intercept, setIntercept] = useState(20);
  const [isAutoFitting, setIsAutoFitting] = useState(false);
  
  const autoFitInterval = useRef(null);

  // Data points: (Hours Studied, Exam Score)
  const points = [
    { id: 1, x: 1, y: 42 },
    { id: 2, x: 2, y: 49 },
    { id: 3, x: 3, y: 57 },
    { id: 4, x: 4, y: 65 },
    { id: 5, x: 5, y: 74 },
  ];

  const optimalSlope = 8;
  const optimalIntercept = 33;

  // Calculate total error
  let totalError = 0;
  points.forEach(p => {
    const predictedY = slope * p.x + intercept;
    totalError += Math.abs(predictedY - p.y);
  });
  
  // SVG Mapping logic
  const svgWidth = 400;
  const svgHeight = 300;
  const mapX = (x) => (x / 6) * svgWidth;
  const mapY = (y) => svgHeight - (y / 100) * svgHeight;

  const handleAutoFit = () => {
    if (isAutoFitting) return;
    setIsAutoFitting(true);
    
    let currentS = slope;
    let currentI = intercept;
    
    autoFitInterval.current = setInterval(() => {
      let sDone = false;
      let iDone = false;
      
      if (Math.abs(currentS - optimalSlope) < 0.2) {
        currentS = optimalSlope;
        sDone = true;
      } else {
        currentS += (optimalSlope - currentS) * 0.1;
      }
      
      if (Math.abs(currentI - optimalIntercept) < 0.5) {
        currentI = optimalIntercept;
        iDone = true;
      } else {
        currentI += (optimalIntercept - currentI) * 0.1;
      }
      
      setSlope(parseFloat(currentS.toFixed(1)));
      setIntercept(parseFloat(currentI.toFixed(1)));
      
      if (sDone && iDone) {
        clearInterval(autoFitInterval.current);
        setIsAutoFitting(false);
      }
    }, 50);
  };

  useEffect(() => {
    return () => clearInterval(autoFitInterval.current);
  }, []);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">2</span>
            Linear Regression
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#62a9ff">Linear regression</Highlight> is one of the simplest examples of a model learning a relationship from data. It tries to describe a relationship between variables using a straight line.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Calculator className="text-[#ec5faa]" />
          Build the Best-Fit Line
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Plot */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative overflow-hidden flex justify-center">
            <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="max-w-[400px]">
              {/* Grid Lines */}
              {[20, 40, 60, 80].map(y => (
                <line key={`g-y-${y}`} x1="0" y1={mapY(y)} x2={svgWidth} y2={mapY(y)} stroke="#00000015" strokeDasharray="4 4" />
              ))}
              {[1, 2, 3, 4, 5].map(x => (
                <line key={`g-x-${x}`} x1={mapX(x)} y1="0" x2={mapX(x)} y2={svgHeight} stroke="#00000015" strokeDasharray="4 4" />
              ))}

              {/* Error Segments */}
              {points.map(p => {
                const predictedY = slope * p.x + intercept;
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
                y1={mapY(intercept)} 
                x2={mapX(6)} 
                y2={mapY(slope * 6 + intercept)} 
                stroke="#62a9ff" 
                strokeWidth="5" 
                className="transition-all duration-75"
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
            
            {/* Axis labels */}
            <div className="absolute bottom-2 right-4 font-bold text-sm text-ink/50">Hours →</div>
            <div className="absolute top-4 left-2 font-bold text-sm text-ink/50 -rotate-90 origin-left">Score</div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4">CONTROLS</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-bold mb-2 text-sm">
                    <label>Slope (w)</label>
                    <span className="font-mono text-[#d83f97]">{slope.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-10" max="25" step="0.5" value={slope} 
                    onChange={(e) => { setSlope(parseFloat(e.target.value)); clearInterval(autoFitInterval.current); setIsAutoFitting(false); }}
                    className="w-full accent-[#d83f97]"
                    disabled={isAutoFitting}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between font-bold mb-2 text-sm">
                    <label>Intercept (b)</label>
                    <span className="font-mono text-[#4185d9]">{intercept.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="80" step="1" value={intercept} 
                    onChange={(e) => { setIntercept(parseFloat(e.target.value)); clearInterval(autoFitInterval.current); setIsAutoFitting(false); }}
                    className="w-full accent-[#4185d9]"
                    disabled={isAutoFitting}
                  />
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleAutoFit}
                    disabled={isAutoFitting}
                    className={`w-full font-bold px-4 py-3 border-2 border-ink rounded-lg transition-transform active:translate-y-1 ${isAutoFitting ? 'bg-ink/10 opacity-50' : 'bg-sunshine shadow-[4px_4px_0_#17191f]'}`}
                  >
                    {isAutoFitting ? 'Fitting...' : 'LET THE MODEL TRY'}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Display */}
            <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-2 text-sm">CURRENT MODEL</h3>
              <div className="font-mono font-bold text-lg mb-4 text-[#237957]">
                y = {slope.toFixed(1)}x + {intercept.toFixed(1)}
              </div>
              
              <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-2 text-sm">TOTAL ERROR (Red Lines)</h3>
              <div className="font-display text-4xl font-bold text-[#ec5faa]">
                {totalError.toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Connections</h2>
          <div className="font-bold text-lg leading-relaxed bg-white/50 p-6 rounded-xl border-2 border-ink/20 text-center text-xl my-8 font-mono">
            y = w<span className="text-xs">x</span> + b
          </div>
          <p className="text-lg font-medium leading-relaxed mt-4">
            The equation of our line introduces two extremely important concepts that power almost all AI today: 
            <Highlight color="#62a9ff">Weights (w)</Highlight> and <Highlight color="#d83f97">Bias (b)</Highlight>. Let's explore what they actually do.
          </p>
        </div>
      </section>
    </div>
  );
}
