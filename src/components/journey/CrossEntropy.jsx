import React, { useState } from 'react';
import { Target, Activity, Flame } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function CrossEntropy() {
  const [catProb, setCatProb] = useState(70);
  const [dogProb, setDogProb] = useState(20);
  
  const rabbitProb = Math.max(0, 100 - (catProb + dogProb));
  const normalizedCat = catProb;
  const normalizedDog = Math.min(dogProb, 100 - catProb);
  
  const handleCatChange = (val) => {
    setCatProb(val);
    if (val + dogProb > 100) setDogProb(100 - val);
  };
  
  const handleDogChange = (val) => {
    setDogProb(val);
    if (val + catProb > 100) setCatProb(100 - val);
  };

  // Cross entropy loss = -log(prob_of_true_class)
  // To avoid -log(0) resulting in infinity, we cap at a very small number like 0.01
  const pCat = Math.max(0.01, normalizedCat / 100);
  const crossEntropy = -Math.log(pCat);

  // SVG drawing logic for the curve
  const svgWidth = 400;
  const svgHeight = 250;
  
  const maxLossY = 5; // -log(0.01) is ~4.6
  
  const mapX = (x) => (x / 100) * svgWidth;
  const mapY = (y) => svgHeight - (y / maxLossY) * (svgHeight - 20) - 10;

  let pathD = "";
  for (let x = 1; x <= 100; x += 1) {
    const p = Math.max(0.01, x / 100);
    const y = -Math.log(p);
    const px = mapX(x);
    const py = mapY(y);
    if (x === 1) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }
  
  const currentPx = mapX(normalizedCat);
  const currentPy = mapY(crossEntropy);

  const isConfidentlyWrong = normalizedCat < 20;
  const isConfidentRight = normalizedCat > 80;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">6</span>
            Cross-Entropy
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            While Mean Squared Error is great for predicting numbers, what if we want to classify things? For classification, we use <Highlight color="#6654f5">Cross-Entropy</Highlight>.
            <br/><br/>
            Cross-Entropy evaluates how well predicted probabilities match the actual class.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Flame className={isConfidentlyWrong ? "text-[#ec5faa] animate-pulse" : "text-ink/30"} />
          Don't Be Confidently Wrong
        </h2>
        
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          
          {/* Controls */}
          <div className="bg-white p-6 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] space-y-6">
            <div className="bg-[#dff4e8] p-3 rounded-lg border-2 border-[#237957] font-bold text-center text-[#237957]">
              ACTUAL CLASS: CAT ✅
            </div>
            
            <h3 className="font-bold border-b-2 border-ink/20 pb-2 text-sm text-ink/70">ALLOCATE PROBABILITY</h3>
            
            <div>
              <div className="flex justify-between font-bold mb-2 text-sm">
                <span>Cat</span>
                <span className="font-mono text-[#ec5faa]">{normalizedCat}%</span>
              </div>
              <input type="range" min="0" max="100" value={normalizedCat} onChange={(e) => handleCatChange(parseInt(e.target.value))} className="w-full accent-[#ec5faa]" />
            </div>
            
            <div>
              <div className="flex justify-between font-bold mb-2 text-sm">
                <span>Dog</span>
                <span className="font-mono text-[#4185d9]">{normalizedDog}%</span>
              </div>
              <input type="range" min="0" max="100" value={normalizedDog} onChange={(e) => handleDogChange(parseInt(e.target.value))} className="w-full accent-[#4185d9]" />
            </div>

            <div className="pt-4 border-t-2 border-ink/10">
              <div className="flex justify-between font-bold mb-2 text-sm">
                <span>Rabbit (Remaining)</span>
                <span className="font-mono text-[#6654f5]">{rabbitProb}%</span>
              </div>
            </div>

            <div className="bg-paper p-4 rounded-xl border-2 border-ink text-center">
              <div className="text-sm font-bold opacity-60 mb-1">Cross-Entropy Loss</div>
              <div className="font-mono font-bold text-3xl text-ink">{crossEntropy.toFixed(2)}</div>
            </div>
          </div>

          {/* Curve Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 h-full flex flex-col">
            <div className="font-bold text-center mb-4 opacity-50 text-sm tracking-widest">LOSS VS TRUE CLASS PROBABILITY</div>
            
            <div className="relative w-full flex-1 min-h-[250px] overflow-hidden bg-paper rounded-xl border-2 border-ink">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                {/* Axes */}
                <line x1="0" y1={mapY(0)} x2={svgWidth} y2={mapY(0)} stroke="#00000020" strokeWidth="2" />
                <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={svgHeight} stroke="#00000020" strokeWidth="2" />
                
                {/* Center marker */}
                <text x={mapX(100)} y={mapY(0) - 5} textAnchor="end" fontSize="10" fill="#17191f" opacity="0.5" fontWeight="bold">100%</text>

                {/* Curve */}
                <path d={pathD} fill="none" stroke="#6654f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Current Dot */}
                <circle cx={currentPx} cy={currentPy} r="8" fill={isConfidentlyWrong ? "#ec5faa" : "#237957"} stroke="#17191f" strokeWidth="2" className="transition-all duration-75" />
                
                {/* Dashed lines to axes */}
                <line x1={currentPx} y1={currentPy} x2={currentPx} y2={mapY(0)} stroke="#17191f" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                <line x1={currentPx} y1={currentPy} x2={mapX(0)} y2={currentPy} stroke="#17191f" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
              </svg>
              
              <div className="absolute top-2 left-2 text-xs font-bold opacity-50 -rotate-90 origin-left translate-y-16 bg-white/80 px-1 rounded">Loss Score</div>
              <div className="absolute bottom-2 right-2 text-xs font-bold opacity-50 bg-white/80 px-1 rounded">Prob of Actual Class →</div>
            </div>

            <div className="mt-6 text-center font-bold text-lg min-h-[3rem]">
              {isConfidentlyWrong && (
                <span className="text-[#ec5faa] animate-pulse">If you give the correct class a tiny probability, the loss SKYROCKETS. Confidently wrong is heavily penalized.</span>
              )}
              {isConfidentRight && (
                <span className="text-[#237957]">High probability on the correct class results in very low loss.</span>
              )}
              {!isConfidentlyWrong && !isConfidentRight && (
                <span className="opacity-80">Giving it 50/50 odds gives a moderate loss penalty.</span>
              )}
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#17191f] text-white shadow-[6px_8px_0_#ec5faa] flex flex-col md:flex-row items-center gap-8">
          <div className="bg-white/10 p-6 rounded-xl border-2 border-white/20 font-mono text-xl shrink-0">
            L = -log(P<span className="text-sm">true</span>)
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-[#ec5faa] mb-2">The Mathematics</h3>
            <p className="text-lg leading-relaxed font-medium opacity-90">
              The negative logarithm causes the loss to explode towards infinity as the probability approaches 0%. This forces the model to never completely rule out the correct answer.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
