import React, { useState } from 'react';
import { Compass, Target, ArrowUp, ArrowDown } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Gradients() {
  const [w1, setW1] = useState(2);
  const [w2, setW2] = useState(-3);
  
  // f(w1, w2) = w1^2 + w2^2
  const loss = (w1 * w1) + (w2 * w2);
  
  // Gradient: [2*w1, 2*w2]
  const grad_w1 = 2 * w1;
  const grad_w2 = 2 * w2;
  
  // Normalizing the vector for display purposes so the arrow doesn't get ridiculously long or short
  const magnitude = Math.sqrt((grad_w1 * grad_w1) + (grad_w2 * grad_w2));
  const normalized_w1 = magnitude === 0 ? 0 : grad_w1 / magnitude;
  const normalized_w2 = magnitude === 0 ? 0 : grad_w2 / magnitude;

  // Actions
  const handleFollow = () => {
    // Step in the direction of the gradient (uphill)
    setW1(prev => Math.min(5, Math.max(-5, prev + normalized_w1 * 0.5)));
    setW2(prev => Math.min(5, Math.max(-5, prev + normalized_w2 * 0.5)));
  };

  const handleOpposite = () => {
    // Step in the opposite direction of the gradient (downhill)
    setW1(prev => Math.min(5, Math.max(-5, prev - normalized_w1 * 0.5)));
    setW2(prev => Math.min(5, Math.max(-5, prev - normalized_w2 * 0.5)));
  };

  // SVG drawing logic
  const svgSize = 300;
  const mapCoord = (val) => (svgSize / 2) + (val * 25);
  
  const currentPx = mapCoord(w1);
  const currentPy = mapCoord(-w2); // standard cartesian

  const contours = [];
  for (let r = 1; r <= 10; r++) {
    contours.push(
      <circle 
        key={r} 
        cx={svgSize/2} 
        cy={svgSize/2} 
        r={r * 15} 
        fill="none" 
        stroke="#17191f" 
        strokeWidth="1.5" 
        strokeOpacity={0.05 + (r * 0.05)}
      />
    );
  }

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">6</span>
            Gradients
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If we calculate the partial derivative for <em>every</em> parameter and bundle them together into a list, we get a <Highlight color="#6654f5">Gradient</Highlight>.
            <br/><br/>
            Because it combines the slopes from every direction, the Gradient forms a vector (an arrow) that always points directly towards the steepest uphill climb.
          </p>
          
          <div className="bg-paper p-6 rounded-xl border-2 border-ink text-center shadow-[4px_4px_0_#17191f] font-mono font-bold max-w-sm mx-auto">
            <div className="text-xl flex flex-col gap-2 text-left w-fit mx-auto">
              <span className="text-ink">∇L = [</span>
              <span className="text-[#ec5faa] pl-8">∂L / ∂w₁,</span>
              <span className="text-[#237957] pl-8">∂L / ∂w₂</span>
              <span className="text-ink">]</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Compass className="text-[#ec5faa]" />
          Which Way Is Up?
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Contour Map */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-[300px] aspect-square bg-[#fffdf8] rounded-full border-4 border-[#6654f5] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] overflow-hidden mx-auto">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgSize} ${svgSize}`} preserveAspectRatio="xMidYMid meet">
                
                {contours}
                
                {/* Axes */}
                <line x1={0} y1={svgSize/2} x2={svgSize} y2={svgSize/2} stroke="#00000020" strokeWidth="2" />
                <line x1={svgSize/2} y1={0} x2={svgSize/2} y2={svgSize} stroke="#00000020" strokeWidth="2" />

                {/* Point */}
                <circle cx={currentPx} cy={currentPy} r="6" fill="#17191f" stroke="#fff" strokeWidth="2" className="transition-all duration-300" />
                
                {/* Gradient Arrow */}
                {magnitude > 0 && (
                  <line 
                    x1={currentPx} y1={currentPy} 
                    x2={currentPx + (normalized_w1 * 40)} y2={currentPy - (normalized_w2 * 40)} 
                    stroke="#ec5faa" strokeWidth="4" markerEnd="url(#arrowhead-grad)"
                    className="transition-all duration-300"
                  />
                )}

                <defs>
                  <marker id="arrowhead-grad" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <polygon points="0 0, 5 2.5, 0 5" fill="#ec5faa" />
                  </marker>
                </defs>
              </svg>
            </div>
            
            <div className="mt-6 w-full space-y-3">
              <button 
                onClick={handleFollow}
                disabled={magnitude === 0}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#fbe1eb] border-2 border-[#ec5faa] text-[#ec5faa] rounded-xl font-bold hover:bg-[#ec5faa] hover:text-white transition-colors disabled:opacity-50"
              >
                <ArrowUp size={20} />
                Follow Gradient (Uphill)
              </button>
              
              <button 
                onClick={handleOpposite}
                disabled={magnitude === 0}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#dff4e8] border-2 border-[#237957] text-[#237957] rounded-xl font-bold shadow-[4px_4px_0_#237957] hover:-translate-y-1 transition-all disabled:opacity-50"
              >
                <ArrowDown size={20} />
                Go Opposite (Downhill)
              </button>
            </div>

          </div>

          {/* Controls & Feedback */}
          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
              
              <div className="bg-white p-3 rounded-lg border-2 border-ink text-center flex justify-between items-center px-4">
                <span className="font-bold text-xs opacity-60 tracking-widest">LOSS</span>
                <span className="font-mono font-bold text-2xl text-[#6654f5] transition-all">{loss.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border-2 border-[#ec5faa] text-center">
                  <span className="font-bold text-[10px] opacity-60 tracking-widest block text-[#ec5faa]">w₁</span>
                  <span className="font-mono font-bold">{w1.toFixed(1)}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-[#237957] text-center">
                  <span className="font-bold text-[10px] opacity-60 tracking-widest block text-[#237957]">w₂</span>
                  <span className="font-mono font-bold">{w2.toFixed(1)}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-ink">
                <div className="text-xs font-bold opacity-60 tracking-widest mb-2">GRADIENT VECTOR</div>
                <div className="font-mono font-bold text-sm text-ink/80 flex justify-between">
                  <span>∂L/∂w₁</span>
                  <span className="text-[#ec5faa]">{grad_w1.toFixed(1)}</span>
                </div>
                <div className="font-mono font-bold text-sm text-ink/80 flex justify-between mt-1">
                  <span>∂L/∂w₂</span>
                  <span className="text-[#237957]">{grad_w2.toFixed(1)}</span>
                </div>
              </div>

            </div>
            
            <div className="bg-[#6654f5] text-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="font-bold text-lg leading-snug">
                <span className="opacity-80">Gradient says:</span>
                <br />
                <span className="text-[#fbe1eb]">"UPHILL → THIS WAY."</span>
                <br /><br />
                <span className="opacity-80">Gradient descent says:</span>
                <br />
                <span className="text-[#dff4e8]">"Cool. Let's go the other way."</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              By finding the gradient, we figure out exactly which combination of parameter tweaks will increase the model's error the fastest. 
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              Once the AI knows the direction to make things worse, it simply subtracts the gradient to walk in the exact opposite direction. That makes the loss lower!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
