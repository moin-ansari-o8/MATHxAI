import React, { useState, useEffect, useRef } from 'react';
import { Flag, Play, RotateCcw } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function OptimizationAlgorithms() {
  const [activeOpt, setActiveOpt] = useState('gd'); // 'gd', 'momentum', 'adam'
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  
  const [paths, setPaths] = useState({
    gd: [{x: -4, y: 3}],
    momentum: [{x: -4, y: 3}],
    adam: [{x: -4, y: 3}]
  });

  // Himmelblau's function (simplified narrow valley approximation)
  // Or just a skewed quadratic: f(x,y) = 0.5 * x^2 + 10 * y^2
  // We'll use a skewed quadratic to show momentum/adam helping in narrow valleys.
  const calcLoss = (x, y) => (x * x) / 2 + 10 * (y * y);
  const calcGrad = (x, y) => ({ dx: x, dy: 20 * y });

  const stateRef = useRef({
    gd: { x: -4, y: 3 },
    momentum: { x: -4, y: 3, vx: 0, vy: 0 },
    adam: { x: -4, y: 3, mdx: 0, mdy: 0, vdx: 0, vdy: 0 }
  });

  const MAX_STEPS = 60;

  useEffect(() => {
    let timer;
    if (isPlaying && step < MAX_STEPS) {
      timer = setTimeout(() => {
        setStep(s => s + 1);
        
        const lr_gd = 0.08;
        const lr_adam = 0.3; // Adam usually uses larger nominal LR here for viz
        
        const sRef = stateRef.current;
        
        // GD
        let {x: gx, y: gy} = sRef.gd;
        const gGrad = calcGrad(gx, gy);
        gx -= lr_gd * gGrad.dx;
        gy -= lr_gd * gGrad.dy;
        sRef.gd = {x: gx, y: gy};
        
        // Momentum
        let {x: mx, y: my, vx, vy} = sRef.momentum;
        const mGrad = calcGrad(mx, my);
        vx = 0.8 * vx - lr_gd * mGrad.dx;
        vy = 0.8 * vy - lr_gd * mGrad.dy;
        mx += vx;
        my += vy;
        sRef.momentum = {x: mx, y: my, vx, vy};
        
        // Adam
        let {x: ax, y: ay, mdx, mdy, vdx, vdy} = sRef.adam;
        const aGrad = calcGrad(ax, ay);
        const b1 = 0.9, b2 = 0.999, eps = 1e-8;
        mdx = b1 * mdx + (1-b1) * aGrad.dx;
        mdy = b1 * mdy + (1-b1) * aGrad.dy;
        vdx = b2 * vdx + (1-b2) * aGrad.dx * aGrad.dx;
        vdy = b2 * vdy + (1-b2) * aGrad.dy * aGrad.dy;
        // Bias correction simplified for viz
        const stepNum = step + 1;
        const mdx_hat = mdx / (1 - Math.pow(b1, stepNum));
        const mdy_hat = mdy / (1 - Math.pow(b1, stepNum));
        const vdx_hat = vdx / (1 - Math.pow(b2, stepNum));
        const vdy_hat = vdy / (1 - Math.pow(b2, stepNum));
        ax -= lr_adam * mdx_hat / (Math.sqrt(vdx_hat) + eps);
        ay -= lr_adam * mdy_hat / (Math.sqrt(vdy_hat) + eps);
        sRef.adam = {x: ax, y: ay, mdx, mdy, vdx, vdy};

        setPaths(prev => ({
          gd: [...prev.gd, {x: gx, y: gy}],
          momentum: [...prev.momentum, {x: mx, y: my}],
          adam: [...prev.adam, {x: ax, y: ay}]
        }));

      }, 100);
    } else if (step >= MAX_STEPS) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  const reset = () => {
    setIsPlaying(false);
    setStep(0);
    stateRef.current = {
      gd: { x: -4, y: 3 },
      momentum: { x: -4, y: 3, vx: 0, vy: 0 },
      adam: { x: -4, y: 3, mdx: 0, mdy: 0, vdx: 0, vdy: 0 }
    };
    setPaths({
      gd: [{x: -4, y: 3}],
      momentum: [{x: -4, y: 3}],
      adam: [{x: -4, y: 3}]
    });
  };

  // SVG Drawing 2D Contour
  const svgWidth = 400;
  const svgHeight = 400;
  
  const mapX = (x) => (x + 5) / 10 * svgWidth; // Domain -5 to 5
  const mapY = (y) => svgHeight - ((y + 4) / 8 * svgHeight); // Domain -4 to 4

  const renderPath = (path, color, dash) => {
    if (path.length < 2) return null;
    let d = `M ${mapX(path[0].x)} ${mapY(path[0].y)} `;
    for (let i=1; i<path.length; i++) {
      d += `L ${mapX(path[i].x)} ${mapY(path[i].y)} `;
    }
    return <path d={d} fill="none" stroke={color} strokeWidth="3" strokeDasharray={dash} strokeLinecap="round" strokeLinejoin="round" />;
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">7</span>
            Optimization Algorithms
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Gradient descent is a family of methods, not the only possible strategy.
            <br/><br/>
            Different <Highlight color="#237957">Optimization Algorithms</Highlight> (Optimizers) use the same gradients but apply different mathematical tricks to update the parameters more efficiently.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Flag className="text-[#ec5faa]" />
          The Optimizer Race
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative">
            <div className="absolute top-6 left-6 font-bold text-sm tracking-widest opacity-40 z-10">
              NARROW VALLEY LANDSCAPE
            </div>
            
            <div className="w-full aspect-square relative mt-8">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet" className="bg-[#f0f4f8] border-2 border-ink rounded-xl overflow-hidden">
                
                {/* Simplified Contours for a Narrow Valley (x^2/2 + 10y^2) */}
                <ellipse cx={mapX(0)} cy={mapY(0)} rx={200} ry={60} fill="none" stroke="#000" strokeWidth="2" strokeOpacity="0.1" />
                <ellipse cx={mapX(0)} cy={mapY(0)} rx={120} ry={35} fill="none" stroke="#000" strokeWidth="2" strokeOpacity="0.1" />
                <ellipse cx={mapX(0)} cy={mapY(0)} rx={60} ry={15} fill="none" stroke="#000" strokeWidth="2" strokeOpacity="0.1" />
                
                <circle cx={mapX(0)} cy={mapY(0)} r="8" fill="#237957" />
                <text x={mapX(0)} y={mapY(0) + 20} fontSize="12" fontWeight="bold" fill="#237957" textAnchor="middle">MINIMUM</text>

                {/* Paths */}
                {activeOpt === 'gd' && renderPath(paths.gd, '#17191f', '1')}
                {activeOpt === 'momentum' && renderPath(paths.momentum, '#ec5faa', '4 4')}
                {activeOpt === 'adam' && renderPath(paths.adam, '#6654f5', '8 4')}

                {/* Heads */}
                {activeOpt === 'gd' && <circle cx={mapX(paths.gd[paths.gd.length-1].x)} cy={mapY(paths.gd[paths.gd.length-1].y)} r="6" fill="#17191f" />}
                {activeOpt === 'momentum' && <circle cx={mapX(paths.momentum[paths.momentum.length-1].x)} cy={mapY(paths.momentum[paths.momentum.length-1].y)} r="6" fill="#ec5faa" />}
                {activeOpt === 'adam' && <circle cx={mapX(paths.adam[paths.adam.length-1].x)} cy={mapY(paths.adam[paths.adam.length-1].y)} r="6" fill="#6654f5" />}
                
              </svg>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button onClick={() => { setIsPlaying(!isPlaying); }} className="px-6 py-3 bg-sunshine border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all flex items-center gap-2">
                <Play size={18} /> {isPlaying ? 'Pause' : 'Start Race'}
              </button>
              <button onClick={reset} className="px-4 py-3 bg-white border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-4">
              <h3 className="font-bold border-b-2 border-ink/10 pb-2 text-sm text-ink/60 tracking-widest">CHOOSE OPTIMIZER</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => {setActiveOpt('gd'); reset();}}
                  className={`w-full py-2 border-2 rounded-xl font-bold transition-all text-left px-4 flex justify-between items-center ${activeOpt === 'gd' ? 'bg-ink text-white border-ink' : 'bg-white border-ink shadow-[2px_2px_0_#17191f] hover:-translate-y-1'}`}
                >
                  Gradient Descent
                  <div className="w-4 h-4 rounded-full bg-ink border-2 border-white"></div>
                </button>
                <button 
                  onClick={() => {setActiveOpt('momentum'); reset();}}
                  className={`w-full py-2 border-2 rounded-xl font-bold transition-all text-left px-4 flex justify-between items-center ${activeOpt === 'momentum' ? 'bg-[#ec5faa] text-white border-[#ec5faa]' : 'bg-white border-ink shadow-[2px_2px_0_#17191f] hover:-translate-y-1'}`}
                >
                  Momentum
                  <div className="w-4 h-4 rounded-full bg-[#ec5faa] border-2 border-white"></div>
                </button>
                <button 
                  onClick={() => {setActiveOpt('adam'); reset();}}
                  className={`w-full py-2 border-2 rounded-xl font-bold transition-all text-left px-4 flex justify-between items-center ${activeOpt === 'adam' ? 'bg-[#6654f5] text-white border-[#6654f5]' : 'bg-white border-ink shadow-[2px_2px_0_#17191f] hover:-translate-y-1'}`}
                >
                  Adam
                  <div className="w-4 h-4 rounded-full bg-[#6654f5] border-2 border-white"></div>
                </button>
              </div>

              <div className="p-4 rounded-xl border-2 border-ink border-dashed mt-4 text-sm font-bold opacity-80 leading-relaxed bg-white">
                {activeOpt === 'gd' && "Basic GD bounces back and forth across the steep walls, making slow progress toward the minimum."}
                {activeOpt === 'momentum' && "Uses information from previous updates to build up speed along the flat valley, reducing the bouncing."}
                {activeOpt === 'adam' && "Adapts the learning rate for each direction separately, finding the minimum efficiently without severe bouncing."}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Remember: Backpropagation computes the gradients. The Optimizer decides how to use them.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              In practice, almost no one uses vanilla Gradient Descent to train Large Language Models. Modern AI predominantly uses optimizers like <strong className="text-[#6654f5]">Adam</strong> (or AdamW) because they handle complex loss landscapes much better.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
