import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Zap, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function TestData() {
  const [phase, setPhase] = useState(0); // 0: Start, 1: Trained, 2: Locked/Revealed, 3: Tested

  const trainData = [
    {x: 20, y: 70, class: 0}, {x: 25, y: 80, class: 0}, {x: 35, y: 75, class: 0},
    {x: 75, y: 25, class: 1}, {x: 85, y: 35, class: 1}, {x: 70, y: 15, class: 1}
  ];

  const testData = [
    {x: 10, y: 90, class: 0}, {x: 45, y: 55, class: 0}, {x: 40, y: 85, class: 0},
    {x: 90, y: 10, class: 1}, {x: 60, y: 45, class: 1}, {x: 55, y: 15, class: 1},
    // Adding some tricky ones that might be misclassified by a perfect linear fit
    {x: 50, y: 50, class: 0}, {x: 50, y: 30, class: 1} 
  ];

  // A hardcoded boundary for visualization that fits train perfectly but misses a couple test points
  const boundary = { w1: 1, w2: 1, b: -100 }; // x + y - 100 = 0 (y = -x + 100)
  
  const getAcc = (data) => {
    let correct = 0;
    data.forEach(p => {
      const score = boundary.w1 * p.x + boundary.w2 * p.y + boundary.b;
      const pred = score > 0 ? 1 : 0;
      if (pred === p.class) correct++;
    });
    return ((correct / data.length) * 100).toFixed(0);
  };

  const trainAcc = getAcc(trainData);
  const testAcc = getAcc(testData);

  const drawBoundary = () => {
    if (phase === 0) return null;
    return (
      <g>
        <polygon points="0,0 100,0 100,0 0,100" fill="#237957" opacity="0.1" />
        <polygon points="0,100 100,100 100,0 100,0" fill="#6654f5" opacity="0.1" />
        <line x1="0" y1="100" x2="100" y2="0" stroke="#17191f" strokeWidth="1" strokeDasharray="2 2" />
      </g>
    );
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">2</span>
            Test Data
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#6654f5">Test Data</Highlight> is unseen data used to evaluate how well the trained model performs.
            <br/><br/>
            A high score on the training data just means the model successfully memorized the answers you gave it. The real question is: Does it work on examples it hasn't seen?
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Eye className="text-[#ec5faa]" />
          Seen vs Unseen
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center relative">
            
            {/* TRAINING DATA */}
            <div className="w-full max-w-sm flex flex-col">
              <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4 text-center">TRAINING DATA (SEEN)</h3>
              <div className="aspect-square bg-paper border-2 border-ink rounded-xl overflow-hidden relative shadow-[4px_4px_0_#17191f]">
                {phase >= 2 && (
                  <div className="absolute inset-0 bg-ink/5 z-20 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="bg-white border-2 border-ink px-4 py-2 rounded-lg font-bold shadow-[2px_2px_0_#17191f] flex items-center gap-2">
                      <Lock size={16}/> LOCKED
                    </div>
                  </div>
                )}
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  {drawBoundary()}
                  {trainData.map((pt, i) => (
                    <circle key={`tr${i}`} cx={pt.x} cy={100 - pt.y} r="2.5" fill={pt.class === 1 ? "#6654f5" : "#237957"} stroke="#fff" strokeWidth="0.5" />
                  ))}
                </svg>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button 
                  onClick={() => setPhase(1)} disabled={phase >= 1}
                  className={`w-full py-3 rounded-xl font-bold border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center items-center gap-2 transition-all ${phase >= 1 ? 'bg-sunshine opacity-50' : 'bg-sunshine hover:-translate-y-1'}`}
                >
                  <Zap size={18}/> Train Model
                </button>
                <div className={`p-3 rounded-lg border-2 border-ink bg-white font-bold text-center flex justify-between px-6 transition-opacity ${phase >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                  <span>Train Acc:</span>
                  <span className="text-[#ec5faa] font-mono">{trainAcc}%</span>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="hidden lg:flex w-2 h-64 bg-ink/10 rounded-full"></div>

            {/* TEST DATA */}
            <div className="w-full max-w-sm flex flex-col">
              <h3 className="font-bold text-sm tracking-widest opacity-60 mb-4 text-center">TEST DATA (UNSEEN)</h3>
              <div className="aspect-square bg-paper border-2 border-ink rounded-xl overflow-hidden relative shadow-[4px_4px_0_#17191f]">
                {phase < 2 && (
                  <div className="absolute inset-0 bg-ink/10 z-20 flex items-center justify-center backdrop-blur-sm">
                    <EyeOff size={32} className="opacity-20"/>
                  </div>
                )}
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  {phase >= 3 && drawBoundary()}
                  {phase >= 2 && testData.map((pt, i) => {
                    const score = boundary.w1 * pt.x + boundary.w2 * pt.y + boundary.b;
                    const pred = score > 0 ? 1 : 0;
                    const isCorrect = pred === pt.class;
                    return (
                      <g key={`te${i}`}>
                        <circle cx={pt.x} cy={100 - pt.y} r="2.5" fill={pt.class === 1 ? "#6654f5" : "#237957"} stroke="#fff" strokeWidth="0.5" />
                        {phase >= 3 && !isCorrect && (
                          <circle cx={pt.x} cy={100 - pt.y} r="5" fill="none" stroke="#ec5faa" strokeWidth="1" className="animate-ping" />
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {phase < 2 ? (
                  <button 
                    onClick={() => setPhase(2)} disabled={phase < 1}
                    className={`w-full py-3 rounded-xl font-bold border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center items-center gap-2 transition-all ${phase >= 1 ? 'bg-[#c9baff] hover:-translate-y-1' : 'bg-[#c9baff] opacity-50'}`}
                  >
                    <Eye size={18}/> Reveal Test Data
                  </button>
                ) : (
                  <button 
                    onClick={() => setPhase(3)} disabled={phase >= 3}
                    className={`w-full py-3 rounded-xl font-bold border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center items-center gap-2 transition-all ${phase === 2 ? 'bg-[#dff4e8] hover:-translate-y-1' : 'bg-[#dff4e8] opacity-50'}`}
                  >
                    <Target size={18}/> Test Model
                  </button>
                )}
                
                <div className={`p-3 rounded-lg border-2 border-ink bg-white font-bold text-center flex justify-between px-6 transition-opacity ${phase >= 3 ? 'opacity-100' : 'opacity-20'}`}>
                  <span>Test Acc:</span>
                  <span className="text-[#ec5faa] font-mono">{testAcc}%</span>
                </div>
              </div>
            </div>

          </div>

          {phase >= 3 && (
            <div className="mt-12 bg-[#fffdf8] p-6 rounded-xl border-2 border-ink border-dashed font-bold text-center animate-in fade-in zoom-in slide-in-from-bottom-4">
              <p className="text-lg">What does the gap between training ({trainAcc}%) and test ({testAcc}%) performance tell you?</p>
              <p className="opacity-60 text-sm mt-2">The model isn't perfect. It learned a slightly skewed boundary from the training data that doesn't perfectly apply to the rest of the world.</p>
              <button onClick={() => setPhase(0)} className="mt-6 text-sm underline opacity-40 hover:opacity-100">Reset Experiment</button>
            </div>
          )}

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              When a company releases a new AI model, they don't brag about how well it did on the data it trained on (that's easy—it just memorizes it!).
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              They evaluate it on entirely new benchmark datasets it has never seen before to prove that it learned the underlying concepts. A useful AI system needs to work beyond the exact examples it was given.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
