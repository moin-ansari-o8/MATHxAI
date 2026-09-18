import React, { useState } from 'react';
import { TrendingDown } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Underfitting() {
  const [complexity, setComplexity] = useState(1); // 1 to 5 (focus on simple)

  // Dataset with a clear curve
  const trainData = [
    {x: 10, y: 70, class: 0}, {x: 20, y: 65, class: 0}, {x: 30, y: 55, class: 0}, {x: 40, y: 40, class: 0}, {x: 50, y: 20, class: 0},
    {x: 20, y: 85, class: 1}, {x: 30, y: 80, class: 1}, {x: 40, y: 75, class: 1}, {x: 50, y: 65, class: 1}, {x: 60, y: 50, class: 1},
    {x: 70, y: 30, class: 1}, {x: 80, y: 15, class: 1}
  ];

  const getMetrics = (comp) => {
    // Train goes up from very bad
    const train = Math.min(95, 60 + (comp - 1) * 9);
    // Test also goes up since we aren't overfitting yet in this limited range
    const test = Math.min(92, 55 + (comp - 1) * 9);
    return { train, test };
  };

  const { train, test } = getMetrics(complexity);

  // SVG Paths for different complexities (focusing on underfit)
  const getPath = (comp) => {
    if (comp === 1) {
      // Very underfit: Horizontal line
      return "M 0 50 L 100 50"; 
    } else if (comp === 2) {
      // Still underfit: Slanted but straight
      return "M 0 60 L 100 20";
    } else if (comp === 3) {
      // Better: slight curve
      return "M 0 70 Q 50 60 100 10";
    } else {
      // Good fit
      return "M 0 80 Q 40 70 50 50 T 100 0";
    }
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">5</span>
            Underfitting
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If overfitting is memorizing too much, <Highlight color="#237957">Underfitting</Highlight> is learning too little. It happens when a model is simply too basic to capture the obvious patterns in the data.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <TrendingDown className="text-[#ec5faa]" />
          Too Simple vs Just Enough
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          
          {/* Plot */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative overflow-hidden">
            <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4 text-center">TRAINING DATA (CURVED PATTERN)</h3>
            
            <div className="w-full aspect-square relative bg-paper border-2 border-ink rounded-xl overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 transition-all duration-500">
                
                {/* Visual areas */}
                <path 
                  d={`${getPath(complexity)} L 100 0 L 0 0 Z`} 
                  fill="#237957" opacity="0.1" 
                  className="transition-all duration-500"
                />
                <path 
                  d={`${getPath(complexity)} L 100 100 L 0 100 Z`} 
                  fill="#6654f5" opacity="0.1" 
                  className="transition-all duration-500"
                />
                <path 
                  d={getPath(complexity)} 
                  fill="none" stroke="#17191f" strokeWidth="1" strokeDasharray="2 2"
                  className="transition-all duration-500"
                />

                {trainData.map((pt, i) => (
                  <circle 
                    key={i} 
                    cx={pt.x} 
                    cy={100 - pt.y} 
                    r="3" 
                    fill={pt.class === 1 ? "#6654f5" : "#237957"} 
                    stroke="#fff" strokeWidth="1"
                    className="transition-all duration-500 hover:r-4"
                  />
                ))}
              </svg>
            </div>

            {complexity < 3 && (
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 bg-[#fffdf8] p-3 border-2 border-ink rounded-xl shadow-[4px_4px_0_#ec5faa] font-bold text-center text-sm animate-in zoom-in w-3/4">
                This straight line completely misses the obvious curve of the data!
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              <h3 className="font-bold text-sm tracking-widest opacity-60 text-center">COMPLEXITY</h3>
              
              <input 
                type="range" 
                min="1" max="5" step="1" 
                value={complexity} 
                onChange={(e) => setComplexity(parseInt(e.target.value))}
                className="w-full h-4 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
              />
              <div className="flex justify-between text-xs font-bold opacity-60">
                <span>Underfit</span>
                <span>Good Fit</span>
              </div>
            </div>
            
            <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              <div>
                <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2 mb-2">
                  <span className="font-bold text-[10px] tracking-widest opacity-60">TRAIN ACCURACY</span>
                  <span className={`font-mono font-bold text-2xl transition-colors ${train < 80 ? 'text-[#ec5faa]' : 'text-[#237957]'}`}>{train}%</span>
                </div>
                <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${train < 80 ? 'bg-[#ec5faa]' : 'bg-[#237957]'}`} style={{ width: `${train}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2 mb-2">
                  <span className="font-bold text-[10px] tracking-widest opacity-60">TEST ACCURACY</span>
                  <span className={`font-mono font-bold text-2xl transition-colors ${test < 80 ? 'text-[#ec5faa]' : 'text-[#c9baff]'}`}>{test}%</span>
                </div>
                <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${test < 80 ? 'bg-[#ec5faa]' : 'bg-[#c9baff]'}`} style={{ width: `${test}%` }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
