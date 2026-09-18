import React, { useState, useEffect } from 'react';
import { Settings2, Target, Wand2 } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Optimization() {
  const [param, setParam] = useState(8);
  const [isAuto, setIsAuto] = useState(false);
  
  // f(x) = (x - 2)^2 + 3 (minimum is at x=2, y=3)
  const calcLoss = (x) => Math.pow(x - 2, 2) + 3;
  // derivative = 2(x - 2)
  const calcGradient = (x) => 2 * (x - 2);
  
  const currentLoss = calcLoss(param);

  useEffect(() => {
    let interval;
    if (isAuto) {
      interval = setInterval(() => {
        setParam((prev) => {
          const grad = calcGradient(prev);
          const next = prev - (grad * 0.1);
          // stop if we're very close
          if (Math.abs(grad) < 0.05) {
            setIsAuto(false);
            return 2; 
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAuto]);

  // SVG drawing logic
  const svgWidth = 500;
  const svgHeight = 350;
  const padding = 40;

  const domain = [-6, 10];
  const maxLoss = calcLoss(domain[0]);

  const mapX = (val) => padding + ((val - domain[0]) / (domain[1] - domain[0])) * (svgWidth - 2 * padding);
  const mapY = (val) => svgHeight - padding - (val / maxLoss) * (svgHeight - 2 * padding);

  let pathD = "";
  for (let vx = domain[0]; vx <= domain[1]; vx += 0.5) {
    const vy = calcLoss(vx);
    const px = mapX(vx);
    const py = mapY(vy);
    if (vx === domain[0]) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }

  const isSuccess = currentLoss <= 5;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">1</span>
            Optimization
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If we know the model is wrong, how do we make it less wrong? 
            <br/><br/>
            <Highlight color="#6654f5">Optimization</Highlight> is simply the process of finding the parameter values that make a model perform better (by reducing its Loss).
          </p>
          
          <div className="flex justify-center my-8">
            <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-[#ec5faa] shadow-[4px_4px_0_#17191f] font-bold text-center text-lg">
              LOSS ➔ GRADIENT ➔ DIRECTION ➔ <strong className="text-[#6654f5] bg-white px-3 py-1 rounded-md border-2 border-ink inline-block ml-2">OPTIMIZE PARAMETERS</strong>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Settings2 className="text-[#ec5faa]" />
          Find the Lowest Point
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Graph Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6">
            
            <div className="relative w-full aspect-[4/3] bg-paper rounded-xl border-2 border-ink overflow-hidden">
              {isSuccess && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#237957] text-white px-4 py-1 rounded-full font-bold text-sm tracking-widest animate-[bounce_1s_infinite]">
                  SUCCESS!
                </div>
              )}
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                
                {/* Axes */}
                <line x1={mapX(0)} y1={padding} x2={mapX(0)} y2={svgHeight - padding} stroke="#00000020" strokeWidth="2" strokeDasharray="4 4" />
                <line x1={padding} y1={mapY(0)} x2={svgWidth - padding} y2={mapY(0)} stroke="#00000020" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Curve */}
                <path d={pathD} fill="none" stroke="#6654f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Current Point */}
                <line 
                  x1={mapX(param)} y1={mapY(currentLoss)} 
                  x2={mapX(param)} y2={mapY(0)} 
                  stroke="#ec5faa" strokeWidth="2" strokeDasharray="4 4" 
                />
                <circle 
                  cx={mapX(param)} 
                  cy={mapY(currentLoss)} 
                  r="8" fill="#17191f" stroke="#fff" strokeWidth="2" 
                />
                
                {/* Target Zone */}
                <line x1={padding} y1={mapY(5)} x2={svgWidth - padding} y2={mapY(5)} stroke="#237957" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
                <rect x={padding} y={mapY(5)} width={svgWidth - 2 * padding} height={mapY(0) - mapY(5)} fill="#dff4e8" opacity="0.3" />
                <text x={svgWidth - padding - 10} y={mapY(5) + 15} fontSize="12" fontWeight="bold" fill="#237957" textAnchor="end">TARGET ZONE (Loss &lt; 5)</text>
              </svg>
            </div>
            
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              
              <div className="bg-white p-4 rounded-lg border-2 border-ink grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="font-bold text-[10px] tracking-widest opacity-60 block text-[#ec5faa]">PARAMETER</span>
                  <span className="font-mono font-bold text-xl">{param.toFixed(1)}</span>
                </div>
                <div>
                  <span className="font-bold text-[10px] tracking-widest opacity-60 block text-[#6654f5]">LOSS</span>
                  <span className="font-mono font-bold text-xl">{currentLoss.toFixed(1)}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <span>Manual Search</span>
                </div>
                <input 
                  type="range" min="-6" max="10" step="0.1" value={param} 
                  onChange={(e) => {
                    setIsAuto(false);
                    setParam(parseFloat(e.target.value));
                  }} 
                  className="w-full accent-ink" 
                  disabled={isAuto}
                />
              </div>

              <div className="text-center font-bold text-sm tracking-widest opacity-40">OR</div>

              <button 
                onClick={() => setIsAuto(!isAuto)}
                className={`w-full py-3 rounded-xl border-2 border-ink font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 ${isAuto ? 'bg-ink text-white' : 'bg-[#c9baff] text-ink'}`}
              >
                {isAuto ? 'Stop Auto-Train' : <><Wand2 size={18} /> Use Gradient</>}
              </button>

            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/10 pb-2 mb-4 text-sm text-ink/60 tracking-widest">YOUR CHALLENGE</h3>
              <p className="font-bold text-sm leading-relaxed text-[#237957]">
                Get the loss below 5. 
              </p>
              <p className="font-medium text-sm mt-3 opacity-80">
                You can drag the slider manually to find it, or use the gradient to automatically walk downhill.
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
              A real Neural Network has millions or billions of parameters. We can't drag a slider manually for every single one of them.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              Training a model is largely an optimization problem: we rely on mathematics (gradients) to automatically adjust all those parameters simultaneously until the loss is as low as possible.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
