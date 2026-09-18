import React, { useState } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Overfitting() {
  const [complexity, setComplexity] = useState(5); // 1 to 10

  // Dataset with some noise
  const trainData = [
    {x: 10, y: 70, class: 0}, {x: 20, y: 80, class: 0}, {x: 30, y: 75, class: 0}, {x: 40, y: 85, class: 0},
    // Noisy train points
    {x: 55, y: 70, class: 1}, {x: 65, y: 20, class: 0}, 
    {x: 60, y: 30, class: 1}, {x: 75, y: 25, class: 1}, {x: 85, y: 35, class: 1}, {x: 95, y: 20, class: 1},
  ];

  // Test data follows the general pattern but lacks the specific noise
  const getMetrics = (comp) => {
    // Train goes up
    const train = Math.min(100, 75 + (comp - 1) * 3);
    // Test peaks around 4-5
    let test;
    if (comp <= 4) test = 70 + (comp - 1) * 4;
    else test = 82 - (comp - 4) * 6;
    return { train, test };
  };

  const { train, test } = getMetrics(complexity);

  // SVG Paths for different complexities
  const getPath = (comp) => {
    if (comp < 3) {
      // Underfit: Straight line missing the bend
      return "M 0 50 L 100 50"; 
    } else if (comp < 7) {
      // Good fit: Smooth curve separating the main clusters
      return "M 0 60 Q 50 60 50 50 T 100 40";
    } else {
      // Overfit: Wildly squiggly to capture noise
      // Tries to put (55,70 class 1) below the line and (65,20 class 0) above the line
      return "M 0 65 Q 20 65 35 60 T 45 80 T 55 50 T 65 10 T 75 40 T 100 35";
    }
  };

  const getBackgroundColor = (comp) => {
    if (comp < 3) return "#237957"; // Underfit is flat line, we will use polygons in rendering
    return "#237957";
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">4</span>
            Overfitting
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#ec5faa">Overfitting</Highlight> happens when a model fits the training data <em>too closely</em>. It memorizes the noise, outliers, and quirks of the training set rather than learning the actual underlying pattern.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="text-[#ec5faa]" />
          Watch a Model Memorize
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          
          {/* Plot */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative overflow-hidden">
            <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4 text-center">TRAINING DATA (WITH NOISE)</h3>
            
            <div className="w-full aspect-square relative bg-paper border-2 border-ink rounded-xl overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 transition-all duration-500">
                
                {/* We use a large stroke to act as a visual boundary separation, since drawing perfect polygons for complex squiggles in React SVG without a lib is tricky. 
                    Alternatively, fill the top half with green and bottom with purple using a path that closes. */}
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

            {complexity >= 7 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 p-4 border-2 border-ink rounded-xl shadow-[4px_4px_0_#ec5faa] font-bold text-center text-sm animate-in zoom-in spin-in-2 w-3/4">
                <AlertTriangle className="mx-auto text-[#ec5faa] mb-2" size={24}/>
                The boundary is bending backward just to capture a single noisy point! This won't generalize well.
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              <h3 className="font-bold text-sm tracking-widest opacity-60 text-center">COMPLEXITY</h3>
              
              <input 
                type="range" 
                min="1" max="10" step="1" 
                value={complexity} 
                onChange={(e) => setComplexity(parseInt(e.target.value))}
                className="w-full h-4 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
              />
              <div className="flex justify-between text-xs font-bold opacity-60">
                <span>Simple</span>
                <span>Complex</span>
              </div>
            </div>
            
            <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              <div>
                <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2 mb-2">
                  <span className="font-bold text-[10px] tracking-widest opacity-60">TRAIN ACCURACY</span>
                  <span className="font-mono font-bold text-2xl text-[#237957]">{train}%</span>
                </div>
                <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#237957] transition-all duration-300" style={{ width: `${train}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2 mb-2">
                  <span className="font-bold text-[10px] tracking-widest opacity-60">TEST ACCURACY</span>
                  <span className={`font-mono font-bold text-2xl transition-colors ${test < 70 ? 'text-[#ec5faa]' : 'text-[#c9baff]'}`}>{test}%</span>
                </div>
                <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${test < 70 ? 'bg-[#ec5faa]' : 'bg-[#c9baff]'}`} style={{ width: `${test}%` }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
