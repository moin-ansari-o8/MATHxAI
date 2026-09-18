import React, { useState } from 'react';
import { Target, Zap, Play, Eye } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Generalization() {
  const [phase, setPhase] = useState(0); // 0: Start, 1: Trained, 2: Tested

  const trainData = [
    {x: 25, y: 75, class: 0}, {x: 35, y: 85, class: 0}, {x: 45, y: 65, class: 0},
    {x: 65, y: 35, class: 1}, {x: 75, y: 25, class: 1}, {x: 85, y: 45, class: 1}
  ];

  const testData = [
    {x: 15, y: 90, class: 0}, {x: 20, y: 60, class: 0}, {x: 50, y: 80, class: 0},
    {x: 90, y: 15, class: 1}, {x: 60, y: 20, class: 1}, {x: 80, y: 50, class: 1},
    {x: 40, y: 50, class: 0}, {x: 55, y: 45, class: 1} // slightly tricky middle points
  ];

  const trainModel = () => setPhase(1);
  const testGeneralization = () => setPhase(2);
  const reset = () => setPhase(0);

  // Smooth good fit boundary
  const boundaryPath = "M 0 70 Q 50 50 100 30";

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">8</span>
            Generalization
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#ec5faa">Generalization</Highlight> is the ultimate goal. It is the ability of a trained model to perform well on new, unseen data.
            <br/><br/>
            A model hasn't truly learned a useful pattern unless that pattern continues to work in the real world, beyond the examples it memorized during training.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Target className="text-[#ec5faa]" />
          Did It Actually Learn?
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
            
            {/* Controls & Metrics */}
            <div className="space-y-8">
              
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
                <button 
                  onClick={trainModel} disabled={phase >= 1}
                  className={`w-full py-4 rounded-xl font-bold transition-all shadow-[4px_4px_0_#17191f] flex justify-center items-center gap-2 ${phase >= 1 ? 'bg-sunshine opacity-50 border-2 border-ink' : 'bg-sunshine border-2 border-ink hover:-translate-y-1'}`}
                >
                  <Zap size={20}/> Train Model
                </button>
                
                <button 
                  onClick={testGeneralization} disabled={phase !== 1}
                  className={`w-full py-4 rounded-xl font-bold transition-all shadow-[4px_4px_0_#17191f] flex justify-center items-center gap-2 ${phase === 1 ? 'bg-[#c9baff] border-2 border-ink hover:-translate-y-1' : 'bg-[#c9baff] opacity-50 border-2 border-ink'}`}
                >
                  <Eye size={20}/> Test Generalization
                </button>
              </div>

              <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
                <div>
                  <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2 mb-2">
                    <span className="font-bold text-[10px] tracking-widest opacity-60">TRAIN ACCURACY</span>
                    <span className={`font-mono font-bold text-2xl ${phase >= 1 ? 'text-[#237957]' : 'opacity-20'}`}>
                      {phase >= 1 ? '100%' : '---'}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center border-b-2 border-ink/10 pb-2 mb-2">
                    <span className="font-bold text-[10px] tracking-widest opacity-60">TEST ACCURACY</span>
                    <span className={`font-mono font-bold text-2xl ${phase >= 2 ? 'text-[#ec5faa]' : 'opacity-20'}`}>
                      {phase >= 2 ? '87%' : '---'}
                    </span>
                  </div>
                </div>
                
                {phase >= 2 && (
                  <button onClick={reset} className="w-full text-center text-xs font-bold opacity-40 hover:opacity-100 mt-4">
                    Reset Experiment
                  </button>
                )}
              </div>

            </div>

            {/* Plot */}
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] relative">
              <div className="w-full aspect-square relative bg-white border-2 border-ink rounded-xl overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                  
                  {/* Boundary */}
                  {phase >= 1 && (
                    <g className="animate-in fade-in duration-500">
                      <path d={`${boundaryPath} L 100 0 L 0 0 Z`} fill="#237957" opacity="0.1" />
                      <path d={`${boundaryPath} L 100 100 L 0 100 Z`} fill="#6654f5" opacity="0.1" />
                      <path d={boundaryPath} fill="none" stroke="#17191f" strokeWidth="1.5" strokeDasharray="4 2" />
                    </g>
                  )}

                  {/* Training Data */}
                  {trainData.map((pt, i) => (
                    <circle 
                      key={`tr-${i}`} 
                      cx={pt.x} cy={100 - pt.y} r="3" 
                      fill={pt.class === 1 ? "#6654f5" : "#237957"} 
                      stroke="#fff" strokeWidth="1"
                    />
                  ))}

                  {/* Test Data (drops in when tested) */}
                  {phase >= 2 && testData.map((pt, i) => {
                    // Quick check if it's on the wrong side of our simple curve (just visual approximation)
                    // curve goes from (0,70) to (50,50) to (100,30). Roughly y = -0.4x + 70
                    const curveY = -0.4 * pt.x + 70;
                    const isBelow = pt.y < curveY; // below means lower y, which is higher SVG cy
                    const predClass = isBelow ? 1 : 0;
                    const isWrong = predClass !== pt.class;

                    return (
                      <g key={`te-${i}`} className="animate-in zoom-in slide-in-from-top-10 fade-in duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                        <circle cx={pt.x} cy={100 - pt.y} r="3" fill={pt.class === 1 ? "#6654f5" : "#237957"} stroke="#fff" strokeWidth="1" />
                        {isWrong && (
                          <circle cx={pt.x} cy={100 - pt.y} r="6" fill="none" stroke="#ec5faa" strokeWidth="1.5" className="animate-ping" />
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>

              {phase >= 2 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 p-4 border-2 border-ink rounded-xl shadow-[4px_4px_0_#17191f] font-bold text-center text-sm animate-in fade-in zoom-in w-3/4">
                  The model scored 100% on its training data, but it made a mistake on unseen test data! That is the true measure of what it learned.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Chapter Synthesis Visual */}
      <section>
        <div className="bg-[#dff4e8] rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-8 lg:p-12 text-center">
          <h2 className="font-display text-3xl font-bold mb-10">The Big Picture</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-white border-2 border-ink rounded-full shadow-[4px_4px_0_#17191f] flex flex-col items-center justify-center font-bold">
                TRAINING<br/>DATA
                <span className="text-[10px] opacity-60 mt-1">Learn a pattern</span>
              </div>
            </div>

            <Play className="text-ink/30 rotate-90 md:rotate-0" size={32} fill="currentColor"/>

            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-sunshine border-2 border-ink rounded-full shadow-[4px_4px_0_#17191f] flex flex-col items-center justify-center font-bold">
                VALIDATE
                <span className="text-[10px] opacity-60 mt-1">Choose settings</span>
              </div>
            </div>

            <Play className="text-ink/30 rotate-90 md:rotate-0" size={32} fill="currentColor"/>

            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-[#c9baff] border-2 border-ink rounded-full shadow-[4px_4px_0_#17191f] flex flex-col items-center justify-center font-bold">
                TEST
                <span className="text-[10px] opacity-60 mt-1">Check unseen data</span>
              </div>
            </div>

            <Play className="text-[#ec5faa] rotate-90 md:rotate-0" size={32} fill="currentColor"/>

            <div className="flex flex-col items-center gap-2">
              <div className="w-36 h-36 bg-white border-4 border-[#ec5faa] rounded-xl shadow-[6px_6px_0_#17191f] flex flex-col items-center justify-center font-bold text-lg rotate-3 hover:rotate-0 transition-transform">
                GENERALIZE
                <span className="text-[10px] opacity-60 mt-1 text-center px-4">Did it actually learn something useful?</span>
              </div>
            </div>

          </div>
          
          <p className="mt-12 text-lg font-bold max-w-2xl mx-auto text-ink/80 leading-relaxed">
            Learning is not just fitting the training data. The real goal is to learn patterns that continue to work on new data.
          </p>
        </div>
      </section>
      
    </div>
  );
}
