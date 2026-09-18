import React, { useState } from 'react';
import { TrendingUp, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Slope() {
  const [slope, setSlope] = useState(1);
  
  // y = mx
  const calcY = (x, m) => m * x;

  // SVG drawing logic
  const svgWidth = 400;
  const svgHeight = 300;
  
  const mapX = (x) => (svgWidth / 2) + (x * 20);
  const mapY = (y) => (svgHeight / 2) - (y * 20);

  const x1 = -10;
  const y1 = calcY(x1, slope);
  
  const x2 = 10;
  const y2 = calcY(x2, slope);

  let directionText = "Increasing (Positive)";
  let directionColor = "#237957";
  if (slope === 0) {
    directionText = "Flat (Zero)";
    directionColor = "#17191f";
  } else if (slope < 0) {
    directionText = "Decreasing (Negative)";
    directionColor = "#ec5faa";
  }

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">3</span>
            Slope
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If we know how much <code className="bg-[#fbe1eb] text-[#ec5faa] px-2 py-0.5 rounded font-bold">x</code> changed, and we know how much <code className="bg-[#dff4e8] text-[#237957] px-2 py-0.5 rounded font-bold">y</code> changed, we can divide them to find the <Highlight color="#6654f5">Slope</Highlight>.
            <br/><br/>
            Slope simply tells us how much the output changes for a given change in the input.
          </p>
          
          <div className="bg-paper p-6 rounded-xl border-2 border-ink text-center shadow-[4px_4px_0_#17191f] font-mono font-bold max-w-md mx-auto">
            <div className="text-2xl flex items-center justify-center gap-4">
              <span>Slope =</span>
              <div className="flex flex-col items-center">
                <span className="text-[#237957] border-b-2 border-ink w-12 pb-1">Δy</span>
                <span className="text-[#ec5faa] pt-1 w-12">Δx</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="text-[#ec5faa]" />
          The Slope Slider
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Graph Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative overflow-hidden">
            <div className="absolute top-4 left-4 bg-paper px-3 py-1 rounded-lg border-2 border-ink font-bold text-sm shadow-[2px_2px_0_#17191f] z-10">
              y = <span style={{ color: directionColor }}>{slope.toFixed(1)}</span>x
            </div>
            
            <div className="relative w-full aspect-[4/3] bg-[#f4f5f8] rounded-xl border-2 border-ink overflow-hidden">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                {/* Grid */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00000010" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Axes */}
                <line x1="0" y1={svgHeight/2} x2={svgWidth} y2={svgHeight/2} stroke="#00000030" strokeWidth="2" />
                <line x1={svgWidth/2} y1="0" x2={svgWidth/2} y2={svgHeight} stroke="#00000030" strokeWidth="2" />
                
                {/* Line */}
                <line 
                  x1={mapX(x1)} y1={mapY(y1)} 
                  x2={mapX(x2)} y2={mapY(y2)} 
                  stroke={directionColor} strokeWidth="4" strokeLinecap="round" 
                  className="transition-all duration-75"
                />
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="flex justify-between font-bold mb-4 text-sm">
                <span>Adjust Slope</span>
                <span className="font-mono" style={{ color: directionColor }}>{slope.toFixed(1)}</span>
              </div>
              <input 
                type="range" min="-3" max="3" step="0.5" value={slope} 
                onChange={(e) => setSlope(parseFloat(e.target.value))} 
                className="w-full mb-6" 
              />
              
              <div className="bg-white p-4 rounded-lg border-2 border-ink text-center">
                <div className="text-xs font-bold opacity-60 mb-1 tracking-widest">DIRECTION OF CHANGE</div>
                <div className="font-bold text-lg" style={{ color: directionColor }}>
                  {directionText}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/10 pb-2 mb-4 text-sm text-ink/60 tracking-widest">THINK ABOUT IT</h3>
              <p className="font-bold text-sm leading-relaxed">
                The sign (+ or -) tells us the <strong className="text-[#ec5faa]">direction</strong> of change. <br/><br/>
                The number tells us the <strong className="text-[#6654f5]">speed</strong> or sensitivity of that change.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              In machine learning, the rate at which a quantity changes tells us how sensitive the <strong className="text-[#ec5faa]">Loss</strong> is to a small change in a <strong className="text-[#6654f5]">Parameter</strong>.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              If the slope is very steep, a tiny nudge to the parameter will cause a massive change in the error. If the slope is flat (0), changing the parameter does nothing!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
