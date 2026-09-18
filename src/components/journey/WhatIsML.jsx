import React, { useState, useEffect } from 'react';
import { ArrowRight, Brain, RefreshCw, UserPlus, Play, CheckCircle2 } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function WhatIsML() {
  const initialPoints = [
    { id: 1, x: 2, y: 30, pass: false },
    { id: 2, x: 3, y: 50, pass: false },
    { id: 3, x: 4, y: 40, pass: false },
    { id: 4, x: 6, y: 80, pass: true },
    { id: 5, x: 7, y: 70, pass: true },
    { id: 6, x: 8, y: 90, pass: true },
  ];

  const [points, setPoints] = useState(initialPoints);
  const [angle, setAngle] = useState(135);
  const [offset, setOffset] = useState(0);
  const [isTrained, setIsTrained] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  // Evaluate accuracy based on current line
  useEffect(() => {
    const theta = (angle * Math.PI) / 180;
    // Normal vector to the line
    const nX = -Math.sin(theta);
    const nY = Math.cos(theta);
    
    let correct = 0;
    points.forEach(p => {
      // Normalize X to match 0-100 scale of Y
      const px = p.x * 10;
      const py = p.y;
      // Distance from center (50,50) along normal
      const dist = nX * (px - 50) + nY * (py - 50);
      
      const isAbove = dist > offset;
      if ((isAbove && p.pass) || (!isAbove && !p.pass)) {
        correct++;
      }
    });
    
    const bestCorrect = Math.max(correct, points.length - correct);
    setAccuracy(Math.round((bestCorrect / points.length) * 100));
  }, [angle, offset, points]);

  const handleTrain = () => {
    const passes = points.filter(p => p.pass);
    const fails = points.filter(p => !p.pass);
    
    if (!passes.length || !fails.length) return;

    const Px = passes.reduce((s, p) => s + p.x * 10, 0) / passes.length;
    const Py = passes.reduce((s, p) => s + p.y, 0) / passes.length;
    const Fx = fails.reduce((s, p) => s + p.x * 10, 0) / fails.length;
    const Fy = fails.reduce((s, p) => s + p.y, 0) / fails.length;

    const dx = Px - Fx;
    const dy = Py - Fy;

    const targetTheta = Math.atan2(dy, dx) + Math.PI / 2; 
    let targetAngle = (targetTheta * 180) / Math.PI;

    const midX = (Px + Fx) / 2;
    const midY = (Py + Fy) / 2;

    const nX = -Math.sin(targetTheta);
    const nY = Math.cos(targetTheta);
    const targetOffset = nX * (midX - 50) + nY * (midY - 50);

    setAngle(targetAngle);
    setOffset(targetOffset);
    setIsTrained(true);
  };

  const addStudent = () => {
    const isPass = Math.random() > 0.5;
    const newX = isPass ? 5 + Math.random() * 4 : 1 + Math.random() * 4;
    const newY = isPass ? 50 + Math.random() * 40 : 10 + Math.random() * 40;
    
    setPoints([...points, {
      id: Date.now(),
      x: newX,
      y: newY,
      pass: isPass
    }]);
    setIsTrained(false);
  };

  const reset = () => {
    setPoints(initialPoints);
    setAngle(135);
    setOffset(0);
    setIsTrained(false);
  };

  // Compute transform for the SVG line group
  const theta = (angle * Math.PI) / 180;
  const px = 50 + offset * -Math.sin(theta);
  const py = 50 + offset * Math.cos(theta);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Explanation */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6">AI vs Machine Learning</h2>
        <p className="text-lg text-ink/80 leading-relaxed font-medium mb-8">
          <Highlight color="#62a9ff">Machine Learning</Highlight> is a way of building AI systems where the system learns patterns from data instead of being explicitly programmed with every rule.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional */}
          <div className="p-6 rounded-[20px] border-[3px] border-ink bg-white shadow-[6px_8px_0_#17191f]">
            <h3 className="font-bold text-xl mb-6 text-center">Traditional Programming</h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex-1 bg-sunshine/50 p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">RULES</div>
                <div className="flex-1 bg-[#dcecff] p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">DATA</div>
              </div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-ink" strokeWidth={3} /></div>
              <div className="bg-[#ec5faa] text-ink p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">PROGRAM</div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-ink" strokeWidth={3} /></div>
              <div className="bg-[#dff4e8] p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">OUTPUT</div>
            </div>
          </div>

          {/* Machine Learning */}
          <div className="p-6 rounded-[20px] border-[3px] border-ink bg-white shadow-[6px_8px_0_#17191f]">
            <h3 className="font-bold text-xl mb-6 text-center text-[#6654f5]">Machine Learning</h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex-1 bg-[#dcecff] p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">DATA</div>
                <div className="flex-1 bg-[#dff4e8] p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">ANSWERS</div>
              </div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-[#6654f5]" strokeWidth={3} /></div>
              <div className="bg-sunshine p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">LEARNING ALGORITHM</div>
              <div className="flex justify-center"><ArrowRight className="rotate-90 text-[#6654f5]" strokeWidth={3} /></div>
              <div className="bg-[#62a9ff] text-ink p-3 rounded-lg border-2 border-ink text-center font-bold shadow-[2px_2px_0_#17191f]">MODEL / RULES</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. Interactive Visualization & Experiment */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#c9baff] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">2</span>
            Teach the Machine
          </h2>
          <p className="text-lg font-medium mb-8 text-ink/80">
            Can you draw a boundary that separates the students who <Highlight color="#65c99a">Passed</Highlight> from those who <Highlight color="#f58ab4">Failed</Highlight>?
          </p>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Plot wrapper with axes labels outside */}
            <div className="relative pl-8 pb-8">
              {/* Axes labels */}
              <div className="absolute bottom-0 left-8 right-0 text-center font-bold text-ink/50 text-sm tracking-widest uppercase">Study Hours →</div>
              <div className="absolute top-0 bottom-8 left-0 flex items-center justify-center w-8">
                <div className="-rotate-90 font-bold text-ink/50 text-sm tracking-widest uppercase whitespace-nowrap">Exam Score →</div>
              </div>

              {/* Plot */}
              <div className="relative w-full h-full aspect-square sm:aspect-video lg:aspect-square bg-white rounded-xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] overflow-hidden">
                {/* The Plot SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid */}
                <g stroke="#f0f0f0" strokeWidth="0.5">
                  {[20, 40, 60, 80].map(v => (
                    <React.Fragment key={v}>
                      <line x1={0} y1={v} x2={100} y2={v} />
                      <line x1={v} y1={0} x2={v} y2={100} />
                    </React.Fragment>
                  ))}
                </g>

                {/* Flip Y axis so 0 is bottom */}
                <g transform="translate(0, 100) scale(1, -1)">
                  {/* Decision Boundary Line */}
                  <g style={{ transform: `translate(${px}px, ${py}px) rotate(${angle}deg)`, transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                    {/* Shadow for neo-brutalist style */}
                    <line x1="-150" y1="-1" x2="150" y2="-1" stroke="#17191f" strokeWidth="2.5" strokeDasharray={isTrained ? "none" : "4 4"} />
                    <line x1="-150" y1="0" x2="150" y2="0" stroke={isTrained ? "#6654f5" : "#ec5faa"} strokeWidth="1.5" strokeDasharray={isTrained ? "none" : "4 4"} />
                  </g>

                  {/* Data Points */}
                  {points.map(p => (
                    <circle 
                      key={p.id} 
                      cx={p.x * 10} 
                      cy={p.y} 
                      r="3" 
                      fill={p.pass ? "#65c99a" : "#f58ab4"}
                      stroke="#17191f"
                      strokeWidth="1.5"
                      className="animate-in zoom-in duration-300 drop-shadow-[1px_2px_0_rgba(23,25,31,1)]"
                    />
                  ))}
                </g>
              </svg>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#f4f5f8] p-5 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold mb-4">Your Boundary</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-ink/70 flex justify-between">
                      Angle <span>{Math.round(angle)}°</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" max="360" 
                      value={angle} 
                      onChange={(e) => { setAngle(Number(e.target.value)); setIsTrained(false); }}
                      className="w-full accent-ink"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-ink/70 flex justify-between">
                      Position <span>{Math.round(offset)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="-50" max="50" 
                      value={offset} 
                      onChange={(e) => { setOffset(Number(e.target.value)); setIsTrained(false); }}
                      className="w-full accent-ink"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-bold text-sm text-ink/70">Accuracy</span>
                  <div className={`font-display font-bold text-xl ${accuracy === 100 ? 'text-[#237957]' : 'text-ink'}`}>
                    {accuracy}%
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={addStudent}
                  className="px-4 py-3 bg-white border-2 border-ink rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#dcecff] transition-colors shadow-[2px_2px_0_#17191f] active:translate-y-1 active:shadow-none"
                >
                  <UserPlus size={18} /> Add Student
                </button>
                <button 
                  onClick={handleTrain}
                  className="px-4 py-3 bg-sunshine border-2 border-ink rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ffcf54] transition-colors shadow-[2px_2px_0_#17191f] active:translate-y-1 active:shadow-none"
                >
                  <Brain size={18} /> Train Model
                </button>
                <button 
                  onClick={reset}
                  className="px-4 py-3 bg-white border-2 border-ink rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-colors shadow-[2px_2px_0_#17191f] active:translate-y-1 active:shadow-none"
                >
                  <RefreshCw size={18} /> Reset
                </button>
              </div>
            </div>
          </div>
          
          {isTrained && (
            <div className="mt-8 p-4 bg-[#dff4e8] rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f] text-[#237957] font-bold flex items-center justify-center gap-3 animate-in slide-in-from-bottom duration-500 max-w-3xl mx-auto">
              <CheckCircle2 className="shrink-0" />
              <span>The model automatically found the mathematical pattern that best separates the data!</span>
            </div>
          )}
        </div>
      </section>

      {/* 4. Real AI Example */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dcecff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-8">Real AI Example: Spam Detection</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#d83f97] mb-3 border-b-2 border-ink/20 pb-2">Instead of manually writing:</h3>
              <div className="font-mono text-sm bg-white/60 border-2 border-ink p-4 rounded-lg shadow-[2px_2px_0_#17191f] font-bold leading-relaxed">
                IF message.contains("FREE") <br/>
                &nbsp;&nbsp;THEN return SPAM <br/>
                ELSE IF message.contains("$$$") <br/>
                &nbsp;&nbsp;THEN return SPAM
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-[#237957] mb-3 border-b-2 border-ink/20 pb-2">A model learns statistical patterns:</h3>
              <div className="text-sm bg-white/60 border-2 border-ink p-4 rounded-lg shadow-[2px_2px_0_#17191f] font-bold leading-relaxed">
                By seeing thousands of labelled examples (Data + Answers), the model calculates a <Highlight color="#65c99a">decision boundary</Highlight> across hundreds of features simultaneously.
              </div>
            </div>
          </div>

          <div className="mt-8 text-center font-display text-xl font-bold">
            Machine learning is <span className="text-ink">pattern learning</span> from data.
          </div>
        </div>
      </section>
    </div>
  );
}
