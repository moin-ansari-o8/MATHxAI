import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, MoveUpRight, Info } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Vectors() {
  const [vectorA, setVectorA] = useState({ x: 3, y: 6 });
  const [vectorB, setVectorB] = useState({ x: 7, y: 2 });
  const [activePoint, setActivePoint] = useState(null);
  
  const [experimentMode, setExperimentMode] = useState('single'); // 'single', 'add'
  const [expVectorA, setExpVectorA] = useState({ x: 2, y: 4 });
  const [expVectorB, setExpVectorB] = useState({ x: 5, y: 1 });
  const [expActivePoint, setExpActivePoint] = useState(null);

  const svgRef1 = useRef(null);
  const svgRef2 = useRef(null);

  const handlePointerDown = (e, pointId, isExperiment = false) => {
    e.preventDefault(); // prevent text selection
    if (isExperiment) setExpActivePoint(pointId);
    else setActivePoint(pointId);
  };

  const handlePointerUp = () => {
    setActivePoint(null);
    setExpActivePoint(null);
  };

  const handlePointerMove = (e, svgRef, isExperiment = false) => {
    const active = isExperiment ? expActivePoint : activePoint;
    if (!active || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(10, Math.round(((e.clientX - rect.left) / rect.width) * 10)));
    const y = Math.max(0, Math.min(10, 10 - Math.round(((e.clientY - rect.top) / rect.height) * 10)));

    if (isExperiment) {
      if (active === 'A') setExpVectorA({ x, y });
      else if (active === 'B') setExpVectorB({ x, y });
    } else {
      if (active === 'A') setVectorA({ x, y });
      else if (active === 'B') setVectorB({ x, y });
    }
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  const renderGrid = () => {
    const lines = [];
    for (let i = 0; i <= 10; i++) {
      // Horizontal
      lines.push(<line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#17191f" strokeWidth="0.5" strokeOpacity="0.1" />);
      // Vertical
      lines.push(<line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#17191f" strokeWidth="0.5" strokeOpacity="0.1" />);
    }
    return lines;
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">6</span>
            Points in Space
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A <Highlight color="#237957">vector</Highlight> is an ordered collection of numbers that can represent something or describe a direction.
          </p>
          <div className="bg-[#dff4e8] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] flex flex-col md:flex-row items-center gap-6 font-bold">
            <div className="text-center md:text-left flex-1">
              <div className="text-xl font-display mb-2">Student</div>
              <ul className="text-ink/80 space-y-1">
                <li>Hours Studied: <span className="text-ink">5</span></li>
                <li>Attendance: <span className="text-ink">92</span></li>
                <li>Previous Score: <span className="text-ink">78</span></li>
              </ul>
            </div>
            <ArrowRight className="hidden md:block text-ink/40 scale-150" />
            <ArrowRight className="md:hidden text-ink/40 scale-150 rotate-90" />
            <div className="flex-1 flex justify-center">
              <div className="font-mono text-2xl bg-white px-4 py-3 border-2 border-ink shadow-[4px_4px_0_#17191f] rounded-xl">
                [5, 92, 78]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - Vector Space */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <MoveUpRight className="text-[#65c99a]" />
          Vector Space
        </h2>
        
        <div className="p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] shadow-[6px_8px_0_#17191f] mb-8 grid md:grid-cols-[1fr_250px] gap-8">
          
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[400px] aspect-square bg-white border-l-[4px] border-b-[4px] border-t border-r border-ink shadow-[-4px_4px_0_#17191f] rounded-bl-lg">
              
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 font-bold tracking-widest text-sm text-ink/60">SCORE</div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold tracking-widest text-sm text-ink/60">HOURS STUDIED</div>
              
              <svg 
                ref={svgRef1}
                viewBox="0 0 100 100" 
                className="w-full h-full overflow-visible touch-none"
                onPointerMove={(e) => handlePointerMove(e, svgRef1, false)}
                onPointerLeave={handlePointerUp}
              >
                {renderGrid()}
                
                {/* Vector Lines */}
                <line x1="0" y1="100" x2={vectorA.x * 10} y2={100 - (vectorA.y * 10)} stroke="#d83f97" strokeWidth="1.5" strokeDasharray="4 2" />
                <line x1="0" y1="100" x2={vectorB.x * 10} y2={100 - (vectorB.y * 10)} stroke="#4185d9" strokeWidth="1.5" strokeDasharray="4 2" />

                {/* Vector Points */}
                <circle 
                  cx={vectorA.x * 10} cy={100 - (vectorA.y * 10)} r="4" 
                  fill="#f58ab4" stroke="#17191f" strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[2.5px] transition-all"
                  onPointerDown={(e) => handlePointerDown(e, 'A', false)}
                />
                <circle 
                  cx={vectorB.x * 10} cy={100 - (vectorB.y * 10)} r="4" 
                  fill="#62a9ff" stroke="#17191f" strokeWidth="1.5"
                  className="cursor-pointer hover:stroke-[2.5px] transition-all"
                  onPointerDown={(e) => handlePointerDown(e, 'B', false)}
                />
              </svg>
            </div>
            <div className="mt-10 font-bold text-ink/60 text-center text-sm flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg border-2 border-ink/10">
              <Info size={16}/> Drag the points to update the vectors
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div className="p-4 rounded-xl border-2 border-ink bg-white shadow-[4px_4px_0_#17191f] flex flex-col justify-center relative transition-transform hover:-translate-y-1">
              <div className="absolute w-4 h-4 rounded-full bg-[#f58ab4] border-2 border-ink -left-2 -top-2"></div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">Student A</h3>
              <div className="font-mono font-bold text-xl text-center bg-paper p-2 rounded border border-ink/20">
                [{vectorA.x}, {vectorA.y}]
              </div>
            </div>

            <div className="p-4 rounded-xl border-2 border-ink bg-white shadow-[4px_4px_0_#17191f] flex flex-col justify-center relative transition-transform hover:-translate-y-1">
              <div className="absolute w-4 h-4 rounded-full bg-[#62a9ff] border-2 border-ink -left-2 -top-2"></div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">Student B</h3>
              <div className="font-mono font-bold text-xl text-center bg-paper p-2 rounded border border-ink/20">
                [{vectorB.x}, {vectorB.y}]
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Hands-on Experiment */}
      <section>
        <div className="p-8 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h3 className="font-display font-bold text-2xl mb-4">Adding Vectors</h3>
          <p className="font-medium mb-8 text-ink/80">Vector addition has a clear geometric intuition. Drag A and B below to see how they add up.</p>
          
          <div className="grid md:grid-cols-[1fr_250px] gap-8">
            <div className="flex justify-center">
               <div className="relative w-full max-w-[350px] aspect-square bg-white border-l-[4px] border-b-[4px] border-t border-r border-ink shadow-[-4px_4px_0_#17191f] rounded-bl-lg">
                <svg 
                  ref={svgRef2}
                  viewBox="0 0 100 100" 
                  className="w-full h-full overflow-visible touch-none"
                  onPointerMove={(e) => handlePointerMove(e, svgRef2, true)}
                  onPointerLeave={handlePointerUp}
                >
                  {renderGrid()}
                  
                  {/* Origin to A */}
                  <line x1="0" y1="100" x2={expVectorA.x * 10} y2={100 - (expVectorA.y * 10)} stroke="#d83f97" strokeWidth="2.5" />
                  
                  {/* Origin to B */}
                  <line x1="0" y1="100" x2={expVectorB.x * 10} y2={100 - (expVectorB.y * 10)} stroke="#4185d9" strokeWidth="2.5" />
                  
                  {/* A to Result (Parallel to B) */}
                  <line 
                    x1={expVectorA.x * 10} y1={100 - (expVectorA.y * 10)} 
                    x2={(expVectorA.x + expVectorB.x) * 10} y2={100 - ((expVectorA.y + expVectorB.y) * 10)} 
                    stroke="#4185d9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" 
                  />
                  
                  {/* B to Result (Parallel to A) */}
                  <line 
                    x1={expVectorB.x * 10} y1={100 - (expVectorB.y * 10)} 
                    x2={(expVectorA.x + expVectorB.x) * 10} y2={100 - ((expVectorA.y + expVectorB.y) * 10)} 
                    stroke="#d83f97" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" 
                  />

                  {/* Origin to Result */}
                  <line 
                    x1="0" y1="100" 
                    x2={(expVectorA.x + expVectorB.x) * 10} y2={100 - ((expVectorA.y + expVectorB.y) * 10)} 
                    stroke="#237957" strokeWidth="3" 
                  />

                  {/* Points */}
                  <circle cx={expVectorA.x * 10} cy={100 - (expVectorA.y * 10)} r="5" fill="#f58ab4" stroke="#17191f" strokeWidth="1.5" className="cursor-pointer" onPointerDown={(e) => handlePointerDown(e, 'A', true)} />
                  <circle cx={expVectorB.x * 10} cy={100 - (expVectorB.y * 10)} r="5" fill="#62a9ff" stroke="#17191f" strokeWidth="1.5" className="cursor-pointer" onPointerDown={(e) => handlePointerDown(e, 'B', true)} />
                  <circle cx={(expVectorA.x + expVectorB.x) * 10} cy={100 - ((expVectorA.y + expVectorB.y) * 10)} r="5" fill="#65c99a" stroke="#17191f" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="p-3 bg-white border-2 border-[#f58ab4] rounded-lg font-mono font-bold text-center">
                A = [{expVectorA.x}, {expVectorA.y}]
              </div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-ink/30" /></div>
              <div className="p-3 bg-white border-2 border-[#62a9ff] rounded-lg font-mono font-bold text-center">
                B = [{expVectorB.x}, {expVectorB.y}]
              </div>
              <div className="w-full h-px bg-ink/30 my-2"></div>
              <div className="p-4 bg-[#dff4e8] border-2 border-ink rounded-lg font-mono font-bold text-xl text-center shadow-[2px_2px_0_#17191f]">
                A+B = [{expVectorA.x + expVectorB.x}, {expVectorA.y + expVectorB.y}]
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Real AI Connection */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How this connects to real AI</h2>
          
          <div className="bg-white/80 border-2 border-ink p-6 rounded-xl shadow-[4px_4px_0_#17191f] mb-6 font-mono font-bold text-sm sm:text-base overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              <span>Object</span> <ArrowRight size={16} /> 
              <span className="text-[#4185d9]">Features</span> <ArrowRight size={16} />
              <span className="text-[#65c99a]">Vector</span> <ArrowRight size={16} />
              <span className="bg-ink text-white px-3 py-1 rounded">Model</span>
            </div>
          </div>

          <div className="bg-white/80 border-2 border-ink p-6 rounded-xl shadow-[4px_4px_0_#17191f] mb-6 font-mono font-bold text-sm sm:text-base overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              <span>Word</span> <ArrowRight size={16} /> 
              <span className="bg-sunshine border-2 border-ink px-3 py-1 rounded">Embedding vector</span>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed">
            Vectors give AI a numerical way to represent objects, examples, and directions. Soon, we will see how words are turned into <Highlight color="#fffdf8">Embedding vectors</Highlight> to represent their meaning.
          </div>
        </div>
      </section>
    </div>
  );
}
