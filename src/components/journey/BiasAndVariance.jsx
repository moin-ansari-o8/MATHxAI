import React, { useState, useEffect } from 'react';
import { RefreshCw, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function BiasAndVariance() {
  const [complexity, setComplexity] = useState(1); // 1 = High Bias, 2 = Good, 3 = High Variance
  const [runs, setRuns] = useState([]);
  
  // Base data distribution pattern (a curve)
  const baseData = [
    {x: 20, y: 30, class: 0}, {x: 50, y: 70, class: 0}, {x: 80, y: 30, class: 0},
    {x: 20, y: 70, class: 1}, {x: 50, y: 90, class: 1}, {x: 80, y: 70, class: 1}
  ];

  // Generate slightly different datasets for each "run"
  const generateRuns = () => {
    const newRuns = [];
    for (let i = 0; i < 5; i++) {
      const noisyData = baseData.map(pt => ({
        x: pt.x + (Math.random() - 0.5) * 15,
        y: pt.y + (Math.random() - 0.5) * 15,
        class: pt.class
      }));
      newRuns.push(noisyData);
    }
    setRuns(newRuns);
  };

  useEffect(() => {
    generateRuns();
  }, []);

  // SVG Paths for different complexities based on the runs
  const getPathForRun = (comp, runIndex) => {
    // We fake the decision boundary based on complexity and a random variation seeded by the run index
    const offsets = [
      {a: 5, b: -5, c: 10}, {a: -10, b: 15, c: -5}, {a: 0, b: -10, c: 5},
      {a: 15, b: 5, c: -15}, {a: -5, b: -15, c: 10}
    ];
    const off = offsets[runIndex % 5];
    
    if (comp === 1) {
      // High Bias (Underfit): Simple horizontal lines that vary very little but miss the curve completely
      const h = 50 + off.a * 0.2; 
      return `M 0 ${h} L 100 ${h}`;
    } else if (comp === 2) {
      // Good fit: Curves that roughly follow the pattern
      return `M 0 ${60 + off.a*0.3} Q 50 ${10 + off.b*0.3} 100 ${60 + off.c*0.3}`;
    } else {
      // High Variance (Overfit): Wild squiggles that vary massively depending on the specific noise
      return `M 0 ${50 + off.a*2} Q 20 ${80 + off.b*2} 40 ${20 + off.c*2} T 70 ${90 + off.a*2} T 100 ${40 + off.b*2}`;
    }
  };

  const labels = ["High Bias (Underfit)", "Low Bias & Low Variance", "High Variance (Overfit)"];
  const descriptions = [
    "Consistently simple. Misses the true pattern every time.",
    "Captures the true pattern well across different samples.",
    "Wildly different every time. Memorizes the specific noise of each sample."
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">6</span>
            Bias & Variance
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#c9baff">Bias</Highlight> and <Highlight color="#ec5faa">Variance</Highlight> describe the two main ways a model can make mistakes when exposed to new data.
          </p>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-display text-3xl font-bold flex items-center gap-3">
            <Target className="text-[#ec5faa]" />
            Repeated Training
          </h2>
          <button 
            onClick={generateRuns}
            className="px-4 py-2 bg-white border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all flex items-center gap-2 text-sm"
          >
            <RefreshCw size={16} /> Resample Data
          </button>
        </div>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="text-center max-w-md mx-auto mb-10">
            <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4">MODEL COMPLEXITY</h3>
            <input 
              type="range" 
              min="1" max="3" step="1" 
              value={complexity} 
              onChange={(e) => setComplexity(parseInt(e.target.value))}
              className="w-full h-4 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#ec5faa]"
            />
            <div className="flex justify-between text-xs font-bold opacity-60 mt-2">
              <span>Too Simple</span>
              <span>Good</span>
              <span>Too Complex</span>
            </div>
          </div>

          <div className="text-center mb-8 h-16">
            <h3 className="font-display text-xl font-bold text-[#ec5faa]">{labels[complexity - 1]}</h3>
            <p className="font-medium opacity-80">{descriptions[complexity - 1]}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {runs.map((runData, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-xs font-bold opacity-60 mb-2">Run {i + 1}</div>
                <div className="w-full aspect-square bg-paper border-2 border-ink rounded-lg overflow-hidden relative shadow-[2px_2px_0_#17191f]">
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <path 
                      d={getPathForRun(complexity, i)} 
                      fill="none" stroke="#17191f" strokeWidth="2"
                      className="transition-all duration-300"
                    />
                    {runData.map((pt, j) => (
                      <circle 
                        key={j} 
                        cx={pt.x} cy={100 - pt.y} r="2.5" 
                        fill={pt.class === 1 ? "#6654f5" : "#237957"} 
                      />
                    ))}
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t-2 border-ink/10">
            <div className="w-48 mx-auto aspect-square bg-[#fffdf8] border-2 border-ink rounded-xl overflow-hidden relative shadow-[4px_4px_0_#ec5faa]">
              <div className="absolute top-2 left-0 w-full text-center text-xs font-bold tracking-widest opacity-60">ALL BOUNDARIES OVERLAID</div>
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="mt-4">
                {runs.map((_, i) => (
                  <path 
                    key={i}
                    d={getPathForRun(complexity, i)} 
                    fill="none" stroke="#ec5faa" strokeWidth="2" opacity="0.6"
                    className="transition-all duration-300"
                  />
                ))}
              </svg>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
