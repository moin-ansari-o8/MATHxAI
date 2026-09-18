import React, { useState } from 'react';
import { Database, Plus, RotateCcw, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function TrainingData() {
  // 0 = A (Green), 1 = B (Purple)
  const initialData = [
    {x: 20, y: 80, class: 0}, {x: 30, y: 70, class: 0}, {x: 25, y: 60, class: 0},
    {x: 70, y: 30, class: 1}, {x: 80, y: 20, class: 1}, {x: 60, y: 25, class: 1}
  ];

  const [data, setData] = useState(initialData);
  const [modelTrained, setModelTrained] = useState(false);
  const [boundary, setBoundary] = useState({ w1: 0, w2: 0, b: 0 }); // w1*x + w2*y + b = 0

  const addPoint = (cls) => {
    // Generate roughly in their clusters, but some noise
    const baseX = cls === 0 ? 25 : 75;
    const baseY = cls === 0 ? 70 : 25;
    const nx = Math.min(95, Math.max(5, baseX + (Math.random() - 0.5) * 40));
    const ny = Math.min(95, Math.max(5, baseY + (Math.random() - 0.5) * 40));
    setData([...data, { x: nx, y: ny, class: cls }]);
    setModelTrained(false); // require retraining
  };

  const trainModel = () => {
    // Simple mock logistic regression step for vis
    // Instead of full iteration, just analytically find a decent dividing line between the two class centroids
    let c0x = 0, c0y = 0, c0cnt = 0;
    let c1x = 0, c1y = 0, c1cnt = 0;
    
    data.forEach(p => {
      if (p.class === 0) { c0x += p.x; c0y += p.y; c0cnt++; }
      else { c1x += p.x; c1y += p.y; c1cnt++; }
    });

    if (c0cnt === 0 || c1cnt === 0) return;

    c0x /= c0cnt; c0y /= c0cnt;
    c1x /= c1cnt; c1y /= c1cnt;

    // Midpoint
    const mx = (c0x + c1x) / 2;
    const my = (c0y + c1y) / 2;

    // Normal vector points from C0 to C1
    const dx = c1x - c0x;
    const dy = c1y - c0y;
    
    // Line: dx*(x - mx) + dy*(y - my) = 0
    // w1*x + w2*y + b = 0
    const w1 = dx;
    const w2 = dy;
    const b = -(dx * mx + dy * my);

    setBoundary({ w1, w2, b });
    setModelTrained(true);
  };

  const getAccuracy = () => {
    if (!modelTrained) return 0;
    let correct = 0;
    data.forEach(p => {
      const score = boundary.w1 * p.x + boundary.w2 * p.y + boundary.b;
      const pred = score > 0 ? 1 : 0;
      if (pred === p.class) correct++;
    });
    return (correct / data.length) * 100;
  };

  const reset = () => {
    setData(initialData);
    setModelTrained(false);
  };

  const drawBoundary = () => {
    if (!modelTrained) return null;
    const { w1, w2, b } = boundary;
    if (Math.abs(w2) < 0.001) return null;
    
    // y = (-w1*x - b) / w2
    const y0 = (-w1 * 0 - b) / w2;
    const y100 = (-w1 * 100 - b) / w2;

    return (
      <g>
        <polygon points={`0,0 100,0 100,${y100} 0,${y0}`} fill="#237957" opacity="0.1" />
        <polygon points={`0,100 100,100 100,${y100} 0,${y0}`} fill="#6654f5" opacity="0.1" />
        <line x1="0" y1={y0} x2="100" y2={y100} stroke="#17191f" strokeWidth="1" strokeDasharray="2 2" />
      </g>
    );
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">1</span>
            Training Data
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#237957">Training Data</Highlight> is the data a model uses to learn its parameters.
            <br/><br/>
            During training, the model adjusts its internal weights (via backpropagation and gradient descent) to find patterns that separate the different classes in the examples you provided.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Database className="text-[#ec5faa]" />
          Teach the Model
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          
          {/* Plot */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative">
            <div className="absolute top-6 left-6 font-bold text-sm tracking-widest opacity-40 z-10">
              TRAINING SET
            </div>
            
            <div className="w-full aspect-square relative mt-8">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="bg-paper border-2 border-ink rounded-xl overflow-hidden">
                {drawBoundary()}
                {data.map((pt, i) => (
                  <circle 
                    key={i} 
                    cx={pt.x} 
                    cy={100 - pt.y} 
                    r="2.5" 
                    fill={pt.class === 1 ? "#6654f5" : "#237957"} 
                    stroke="#fff" strokeWidth="0.5"
                  />
                ))}
              </svg>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-bold opacity-60">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#237957]"></div> Class A</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#6654f5]"></div> Class B</div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
              <button 
                onClick={() => addPoint(0)}
                className="w-full py-3 bg-[#dff4e8] border-2 border-[#237957] text-[#237957] rounded-xl font-bold transition-all shadow-[2px_2px_0_#237957] hover:-translate-y-1 flex justify-center items-center gap-2"
              >
                <Plus size={16}/> Add Class A
              </button>
              <button 
                onClick={() => addPoint(1)}
                className="w-full py-3 bg-[#c9baff] border-2 border-[#6654f5] text-[#6654f5] rounded-xl font-bold transition-all shadow-[2px_2px_0_#6654f5] hover:-translate-y-1 flex justify-center items-center gap-2"
              >
                <Plus size={16}/> Add Class B
              </button>
              
              <div className="pt-4 border-t-2 border-ink/10">
                <button 
                  onClick={trainModel}
                  className="w-full py-4 bg-sunshine border-2 border-ink rounded-xl font-bold text-lg transition-all shadow-[4px_4px_0_#17191f] hover:-translate-y-1 flex justify-center items-center gap-2"
                >
                  <Zap size={20}/> Train Model
                </button>
              </div>
            </div>
            
            <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
              <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2">
                <span className="font-bold text-[10px] tracking-widest opacity-60">EXAMPLES</span>
                <span className="font-mono font-bold text-xl">{data.length}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-[10px] tracking-widest opacity-60">ACCURACY</span>
                <span className={`font-mono font-bold text-2xl ${modelTrained ? 'text-[#ec5faa]' : 'opacity-40'}`}>
                  {modelTrained ? `${getAccuracy().toFixed(1)}%` : '---'}
                </span>
              </div>
              <button onClick={reset} className="w-full text-center text-xs font-bold opacity-40 hover:opacity-100 flex items-center justify-center gap-1 mt-4 pt-4 border-t-2 border-ink/10">
                <RotateCcw size={12}/> Reset
              </button>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              An image classifier uses thousands of labeled images as its training data.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              When it looks at those examples over and over (the learning loop), it tweaks its billions of parameters to draw complex mathematical boundaries that separate "dogs" from "cats".
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
