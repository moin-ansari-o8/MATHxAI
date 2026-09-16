import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Brain, 
  RefreshCw, 
  Play, 
  Pause, 
  CheckCircle2, 
  RotateCw, 
  Target, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  ArrowDown
} from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function HowDoesAILearn() {
  // Dataset: Hours studied -> Exam score
  const dataset = [
    { hours: 1, score: 42 },
    { hours: 2, score: 49 },
    { hours: 3, score: 57 },
    { hours: 4, score: 65 },
    { hours: 5, score: 74 }
  ];

  // Learning steps progression matching the text perfectly
  const trainingSteps = [
    {
      step: 0,
      title: "Step 0: Initial Guess",
      slope: 2.0,
      intercept: 42.0,
      description: "Initially the model's line is terrible.",
      badgeColor: "bg-[#ffdede] text-[#c92a2a]"
    },
    {
      step: 1,
      title: "Step 1: First Adjustment",
      slope: 4.2,
      intercept: 39.5,
      description: "The model calculates error and adjusts.",
      badgeColor: "bg-[#fff3bf] text-[#e67700]"
    },
    {
      step: 2,
      title: "Step 2: Refining",
      slope: 6.2,
      intercept: 37.0,
      description: "The line moves closer.",
      badgeColor: "bg-[#dcecff] text-[#1971c2]"
    },
    {
      step: 3,
      title: "Step 3: Best Fit",
      slope: 8.0,
      intercept: 33.8,
      description: "Model converged!",
      badgeColor: "bg-[#dff4e8] text-[#237957]"
    }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPointIndex, setSelectedPointIndex] = useState(4); // Default to 5 hr
  const timerRef = useRef(null);

  const currentConfig = trainingSteps[currentStepIndex];

  // Calculate prediction for a given study hour
  const getPrediction = (hours, slope, intercept) => {
    return Math.round((slope * hours + intercept) * 10) / 10;
  };

  // Calculate stats for current step
  const currentPredictions = dataset.map((d) => {
    const pred = getPrediction(d.hours, currentConfig.slope, currentConfig.intercept);
    const error = Math.round((d.score - pred) * 10) / 10;
    const absError = Math.abs(error);
    return { ...d, pred, error, absError };
  });

  const totalError = Math.round(
    currentPredictions.reduce((sum, item) => sum + item.absError, 0) * 10
  ) / 10;

  const selectedItem = currentPredictions[selectedPointIndex];

  // Auto-play loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= trainingSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, trainingSteps.length]);

  const handleStepForward = () => {
    if (currentStepIndex < trainingSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // SVG coordinate transformation
  const svgWidth = 480;
  const svgHeight = 280;
  const padLeft = 40;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 40;

  const toSvgX = (hours) => padLeft + (hours / 6) * (svgWidth - padLeft - padRight);
  const toSvgY = (score) => svgHeight - padBottom - (score / 100) * (svgHeight - padTop - padBottom);

  const lineX1 = 0.5;
  const lineY1 = getPrediction(lineX1, currentConfig.slope, currentConfig.intercept);
  const lineX2 = 5.8;
  const lineY2 = getPrediction(lineX2, currentConfig.slope, currentConfig.intercept);

  // Active step in the learning cycle
  const cycleSteps = [
    { id: 'examples', label: '1. EXAMPLES', desc: 'Study hours & scores' },
    { id: 'model', label: '2. MODEL', desc: 'Initial guess line' },
    { id: 'prediction', label: '3. PREDICTION', desc: 'Guesses score' },
    { id: 'compare', label: '4. COMPARE WITH ANSWER', desc: 'Prediction vs Reality' },
    { id: 'error', label: '5. ERROR', desc: 'Residual distance' },
    { id: 'update', label: '6. UPDATE MODEL', desc: 'Adjust slope & intercept' }
  ];

  const activeCycleStage = currentStepIndex === 0 
    ? 2 // Prediction & Error
    : currentStepIndex === 3 
      ? 5 // Converged / Completed
      : 4; // Update

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      
      {/* 1. Core Idea & Learning Loop */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6">The Learning Loop</h2>
        <p className="text-lg text-ink/80 leading-relaxed font-medium mb-8">
          A beginner should understand this before seeing equations: <Highlight color="#c9baff">the feedback loop</Highlight>.
        </p>

        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-white shadow-[6px_8px_0_#17191f]">
          {/* Loop Diagram Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {cycleSteps.map((step, idx) => {
              const isHighlight = idx === activeCycleStage;
              return (
                <div 
                  key={step.id}
                  className={`p-3 rounded-xl border-2 border-ink transition-all flex flex-col justify-between ${
                    isHighlight 
                      ? 'bg-sunshine shadow-[4px_4px_0_#17191f] -translate-y-1 scale-105' 
                      : 'bg-[#faf8f4] shadow-[2px_2px_0_#17191f]'
                  }`}
                >
                  <div>
                    <h4 className="font-display font-bold text-sm text-ink mb-2">
                      {step.label}
                    </h4>
                  </div>
                  <p className="text-[11px] font-medium text-ink/70 leading-snug">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-xl border-2 border-ink bg-[#f4f5f8] text-base font-semibold flex items-center gap-3 text-ink/80 text-center justify-center">
            <RotateCw className="shrink-0 text-violetPop animate-spin-slow" size={20} />
            <span>
              <strong>Repeat this many times.</strong> That's the foundation for everything coming later.
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization: Watch a Model Learn */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#c9baff] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">3</span>
                Watch a Model Learn
              </h2>
              <p className="text-ink/70 text-sm font-medium mt-2">
                Input: <strong className="text-ink font-bold">Hours studied</strong> → <strong className="text-ink font-bold">Exam score</strong>
              </p>
            </div>

            {/* Current Step Pill */}
            <div className={`px-4 py-2 rounded-xl border-2 border-ink font-bold text-sm shadow-[3px_3px_0_#17191f] ${currentConfig.badgeColor} flex items-center gap-2 shrink-0 self-start md:self-auto`}>
              <Sparkles size={16} />
              <span>{currentConfig.title}</span>
            </div>
          </div>

          {/* Graph & Stats Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Graph Column */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* Outer Graph Frame */}
              <div className="w-full relative bg-white border-[3px] border-ink rounded-2xl shadow-[5px_6px_0_#17191f] p-4 select-none">
                
                {/* SVG Plot */}
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
                  {/* Background Grid Lines */}
                  {[20, 40, 60, 80, 100].map((val) => (
                    <line key={`grid-y-${val}`} x1={padLeft} y1={toSvgY(val)} x2={svgWidth - padRight} y2={toSvgY(val)} stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
                  ))}
                  {[1, 2, 3, 4, 5].map((val) => (
                    <line key={`grid-x-${val}`} x1={toSvgX(val)} y1={padTop} x2={toSvgX(val)} y2={svgHeight - padBottom} stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
                  ))}

                  {/* Main Axes */}
                  <line x1={padLeft} y1={svgHeight - padBottom} x2={svgWidth - padRight} y2={svgHeight - padBottom} stroke="#17191f" strokeWidth="3" />
                  <line x1={padLeft} y1={padTop} x2={padLeft} y2={svgHeight - padBottom} stroke="#17191f" strokeWidth="3" />

                  {/* Residual Error Lines */}
                  {currentPredictions.map((d, i) => {
                    const ptX = toSvgX(d.hours);
                    const actualY = toSvgY(d.score);
                    const predY = toSvgY(d.pred);
                    const isSelected = selectedPointIndex === i;

                    return (
                      <g key={`res-${i}`} className="transition-all duration-500">
                        <line x1={ptX} y1={actualY} x2={ptX} y2={predY} stroke="#ff4d4f" strokeWidth={isSelected ? "3.5" : "2"} strokeDasharray="4 3" strokeLinecap="round" />
                        <rect x={ptX + 4} y={(actualY + predY) / 2 - 8} width="26" height="16" rx="4" fill="#ffe3e3" stroke="#17191f" strokeWidth="1.5" />
                        <text x={ptX + 17} y={(actualY + predY) / 2 + 4} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#cf1322">
                          {Math.round(d.absError)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Model Prediction Line */}
                  <line x1={toSvgX(lineX1)} y1={toSvgY(lineY1)} x2={toSvgX(lineX2)} y2={toSvgY(lineY2)} stroke="#6655f2" strokeWidth="4" strokeLinecap="round" className="transition-all duration-700 ease-out" />

                  {/* Data Points */}
                  {currentPredictions.map((d, i) => {
                    const ptX = toSvgX(d.hours);
                    const ptY = toSvgY(d.score);
                    const isSelected = selectedPointIndex === i;

                    return (
                      <g key={`pt-${i}`} onClick={() => setSelectedPointIndex(i)} className="cursor-pointer group">
                        {isSelected && <circle cx={ptX} cy={ptY} r="14" fill="#ffda45" opacity="0.5" className="animate-pulse" />}
                        <circle cx={ptX} cy={ptY} r="8" fill={isSelected ? "#ec5faa" : "#17191f"} stroke="#ffffff" strokeWidth="2.5" className="transition-transform duration-200 group-hover:scale-125" />
                        <circle cx={ptX} cy={ptY} r="3" fill="#ffffff" />
                      </g>
                    );
                  })}

                  {/* Axis Tick Numbers */}
                  {[1, 2, 3, 4, 5].map((hr) => (
                    <text key={`x-label-${hr}`} x={toSvgX(hr)} y={svgHeight - padBottom + 18} fontSize="11" fontWeight="bold" fill="#17191f" textAnchor="middle">{hr}h</text>
                  ))}
                  {[20, 40, 60, 80, 100].map((sc) => (
                    <text key={`y-label-${sc}`} x={padLeft - 8} y={toSvgY(sc) + 4} fontSize="10" fontWeight="bold" fill="#17191f" textAnchor="end">{sc}</text>
                  ))}
                </svg>

                {/* Outside Axis Labels */}
                <div className="flex justify-between items-center px-6 mt-2 text-xs font-bold text-ink/75">
                  <span>0 hrs (No study)</span>
                  <span className="font-display uppercase tracking-wider text-ink font-black">Study Hours →</span>
                  <span>6 hrs</span>
                </div>
                <div className="absolute -top-3.5 left-6 bg-[#fffdf8] px-2.5 py-0.5 border-2 border-ink rounded-md text-[11px] font-bold text-ink shadow-[2px_2px_0_#17191f]">
                  ↑ Exam Score
                </div>
              </div>

              {/* Controls bar */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-5">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={currentStepIndex === trainingSteps.length - 1 && !isPlaying}
                    className={`flex-1 sm:flex-none px-4 py-3 rounded-xl border-2 border-ink font-bold text-sm flex items-center justify-center gap-2 shadow-[3px_3px_0_#17191f] transition-all active:translate-y-0.5 active:shadow-none ${
                      isPlaying ? 'bg-[#ffe3ec] text-[#d83f97]' : 'bg-white text-ink hover:bg-gray-50'
                    }`}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    <span>{isPlaying ? "Pause" : "Auto Learn"}</span>
                  </button>

                  <button 
                    onClick={handleStepForward}
                    disabled={currentStepIndex >= trainingSteps.length - 1 || isPlaying}
                    className={`flex-1 sm:flex-none px-6 py-3 rounded-xl border-2 border-ink font-bold text-lg flex items-center justify-center gap-2 shadow-[4px_4px_0_#17191f] transition-all active:translate-y-1 active:shadow-none ${
                      currentStepIndex >= trainingSteps.length - 1 || isPlaying
                        ? 'bg-gray-100 text-gray-400 border-gray-300 shadow-none cursor-not-allowed'
                        : 'bg-sunshine text-ink hover:bg-[#ffcf54]'
                    }`}
                  >
                    <span>LEARN</span>
                  </button>
                </div>

                <button 
                  onClick={handleReset}
                  className="px-3.5 py-3 bg-white border-2 border-ink rounded-xl font-bold text-sm text-ink/80 flex items-center justify-center gap-2 shadow-[2px_2px_0_#17191f] hover:bg-black/5 active:translate-y-0.5 active:shadow-none transition-all w-full sm:w-auto"
                >
                  <RefreshCw size={15} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Explanation & Live Stats Column */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-5 rounded-2xl border-2 border-ink bg-[#faf8f4] shadow-[4px_5px_0_#17191f]">
                {currentStepIndex === 0 ? (
                  <h3 className="font-bold text-ink mb-4 pb-2 border-b-2 border-ink/10">Initially the model's line is terrible:</h3>
                ) : (
                  <h3 className="font-bold text-ink mb-4 pb-2 border-b-2 border-ink/10">The user sees the line move:</h3>
                )}

                <div className="space-y-3 font-mono text-base">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border-2 border-ink">
                    <span className="text-ink/70 font-sans font-bold">Prediction:</span>
                    <span className="font-bold text-violetPop text-lg">{selectedItem.pred}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border-2 border-ink">
                    <span className="text-ink/70 font-sans font-bold">Actual:</span>
                    <span className="font-bold text-ink text-lg">{selectedItem.score}</span>
                  </div>

                  <div className="flex justify-between items-center bg-[#ffe3e3] p-2.5 rounded-lg border-2 border-[#cf1322]">
                    <span className="text-[#cf1322] font-sans font-bold flex items-center gap-1.5">
                      <AlertCircle size={15} /> Error:
                    </span>
                    <span className="font-bold text-[#cf1322] text-lg">
                      {selectedItem.absError}
                    </span>
                  </div>
                </div>

                {/* Step progression matching the user text */}
                <div className="mt-5 pt-4 border-t-2 border-ink/10 flex flex-col items-center">
                  <div className="font-mono font-bold text-sm flex flex-col items-center gap-1">
                    {trainingSteps.slice(0, currentStepIndex + 1).map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className={`px-3 py-1 rounded-md border-2 border-ink ${idx === currentStepIndex ? 'bg-sunshine shadow-[2px_2px_0_#17191f] text-ink' : 'bg-white text-ink/60'}`}>
                          Prediction: {getPrediction(selectedItem.hours, step.slope, step.intercept)}
                        </div>
                        {idx < currentStepIndex && <ArrowDown className="text-ink/30" size={16} />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Error Metric */}
              <div className="p-5 rounded-2xl border-2 border-ink bg-white shadow-[4px_5px_0_#17191f]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-ink/70">
                    Total System Error
                  </span>
                </div>
                
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-black text-ink">
                    {totalError}
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-100 rounded-full border-2 border-ink overflow-hidden mt-3">
                  <div 
                    className="h-full bg-gradient-to-r from-[#ec5faa] to-sunshine transition-all duration-500 ease-out"
                    style={{ width: `${Math.max(5, Math.min(100, 100 - (totalError / 80) * 100))}%` }}
                  />
                </div>
              </div>

            </div>
          </div>
          
          {currentStepIndex === 3 && (
            <div className="mt-8 p-6 bg-[#dff4e8] rounded-xl border-[3px] border-ink shadow-[4px_4px_0_#17191f] text-ink text-center">
              <p className="font-bold text-lg mb-2">
                Now the learner has physically experienced:
              </p>
              <div className="font-display font-black text-[#237957] text-xl mb-1 flex items-center justify-center flex-wrap gap-2">
                <span>PREDICTION</span> <ArrowRight className="inline" size={18}/> 
                <span>ERROR</span> <ArrowRight className="inline" size={18}/> 
                <span>ADJUSTMENT</span> <ArrowRight className="inline" size={18}/> 
                <span>IMPROVEMENT</span>
              </div>
              <p className="font-medium text-ink/70">before you've introduced gradient descent.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Real AI Connection: Image Recognition */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-2xl font-bold flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#c9baff] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">4</span>
            The Real AI Connection
          </h2>
          <div className="h-0.5 bg-ink/10 flex-1 rounded-full"></div>
        </div>
        
        <div className="p-6 md:p-10 rounded-[24px] border-[3px] border-ink bg-[#fffdf8] shadow-[8px_10px_0_#17191f] relative overflow-hidden">
          
          {/* Subtle background texture */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(201,186,255,0.2),transparent_70%)] pointer-events-none" />

          <p className="text-lg text-ink/80 font-medium mb-12 max-w-2xl relative z-10">
            This exact same loop powers the most advanced AI models in the world. Instead of predicting a test score based on hours studied, let's look at how an AI learns to recognize a cat.
          </p>
          
          <div className="relative max-w-4xl mx-auto mt-4 mb-8 z-10">
            
            {/* The Loop Path (Desktop) - Drawn with an SVG behind the cards */}
            <div className="hidden md:block absolute inset-0 pointer-events-none -m-4">
               <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                 {/* Forward path */}
                 <path d="M 120 70 L 680 70" stroke="#17191f" strokeWidth="4" strokeDasharray="8 8" fill="none" className="opacity-15" />
                 {/* Down path */}
                 <path d="M 680 70 Q 750 70 750 140 Q 750 210 680 210" stroke="#17191f" strokeWidth="4" strokeDasharray="8 8" fill="none" className="opacity-15" />
                 {/* Backward path */}
                 <path d="M 680 210 L 120 210" stroke="#17191f" strokeWidth="4" strokeDasharray="8 8" fill="none" className="opacity-15" />
                 {/* Up path */}
                 <path d="M 120 210 Q 50 210 50 140 Q 50 70 120 70" stroke="#17191f" strokeWidth="4" strokeDasharray="8 8" fill="none" className="opacity-15" />
               </svg>
            </div>

            {/* Row 1: Forward Pass (Input -> Model -> Output) */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative z-10">
              
              {/* Card 1: Input */}
              <div className="bg-white p-5 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] text-center flex flex-col items-center justify-center relative transform hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-[#f4f5f8] rounded-full border-2 border-ink mb-3 flex items-center justify-center text-3xl shadow-[2px_2px_0_#17191f]">🐱</div>
                <h4 className="font-display font-bold text-lg mb-1">1. Input</h4>
                <p className="text-xs font-bold text-ink/50 uppercase tracking-wider">Raw Image Pixels</p>
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 hidden md:block text-ink/40"><ArrowRight strokeWidth={3} /></div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:hidden text-ink/40"><ArrowDown strokeWidth={3} /></div>
              </div>

              {/* Card 2: Model */}
              <div className="bg-sunshine p-5 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] text-center flex flex-col items-center justify-center relative transform hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-white rounded-full border-2 border-ink mb-3 flex items-center justify-center text-ink shadow-[2px_2px_0_#17191f]">
                  <Brain size={28} strokeWidth={2.5} />
                </div>
                <h4 className="font-display font-bold text-lg mb-1">2. Model</h4>
                <p className="text-xs font-bold text-ink/50 uppercase tracking-wider">Neural Network</p>
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 hidden md:block text-ink/40"><ArrowRight strokeWidth={3} /></div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:hidden text-ink/40"><ArrowDown strokeWidth={3} /></div>
              </div>

              {/* Card 3: Prediction */}
              <div className="bg-white p-5 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] text-center flex flex-col items-center justify-center relative transform hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-violetPop/10 rounded-full border-2 border-ink mb-3 flex items-center justify-center font-mono font-bold text-xl text-violetPop shadow-[2px_2px_0_#17191f]">62%</div>
                <h4 className="font-display font-bold text-lg mb-1">3. Prediction</h4>
                <p className="text-xs font-bold text-ink/50 uppercase tracking-wider">"It's a cat"</p>
                {/* Arrow down to truth */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden md:block text-ink/40"><ArrowDown strokeWidth={3} /></div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:hidden text-ink/40"><ArrowDown strokeWidth={3} /></div>
              </div>

            </div>

            {/* Row 2: Backward Pass (Update <- Error <- Truth) */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-4 mt-6 md:mt-12 relative z-10">
              
              {/* Card 6: Update Model (Leftmost on desktop) */}
              <div className="bg-[#dcecff] p-5 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] text-center flex flex-col items-center justify-center relative order-3 md:order-1 transform hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-white rounded-full border-2 border-ink mb-3 flex items-center justify-center text-[#1971c2] shadow-[2px_2px_0_#17191f]">
                  <RefreshCw size={28} strokeWidth={2.5} />
                </div>
                <h4 className="font-display font-bold text-lg mb-1 text-[#1971c2]">6. Update</h4>
                <p className="text-xs font-bold text-[#1971c2]/50 uppercase tracking-wider">Tweak Weights</p>
                {/* Arrow up to Input (loop) */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden md:block text-ink/40"><ArrowDown strokeWidth={3} className="rotate-180" /></div>
              </div>

              {/* Card 5: Error (Middle) */}
              <div className="bg-[#ffdede] p-5 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] text-center flex flex-col items-center justify-center relative order-2 md:order-2 transform hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-white rounded-full border-2 border-ink mb-3 flex items-center justify-center text-[#c92a2a] shadow-[2px_2px_0_#17191f]">
                  <AlertCircle size={28} strokeWidth={2.5} />
                </div>
                <h4 className="font-display font-bold text-lg mb-1 text-[#c92a2a]">5. Error</h4>
                <p className="text-xs font-bold text-[#c92a2a]/50 uppercase tracking-wider">Calculate Loss</p>
                {/* Arrow Left to Update */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 hidden md:block text-ink/40"><ArrowRight strokeWidth={3} className="rotate-180" /></div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:hidden text-ink/40"><ArrowDown strokeWidth={3} /></div>
              </div>

              {/* Card 4: Truth (Rightmost on desktop) */}
              <div className="bg-[#dff4e8] p-5 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] text-center flex flex-col items-center justify-center relative order-1 md:order-3 transform hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 bg-white rounded-full border-2 border-ink mb-3 flex items-center justify-center text-[#237957] shadow-[2px_2px_0_#17191f]">
                  <Target size={28} strokeWidth={2.5} />
                </div>
                <h4 className="font-display font-bold text-lg mb-1 text-[#237957]">4. Truth</h4>
                <p className="text-xs font-bold text-[#237957]/50 uppercase tracking-wider">Label is "Cat"</p>
                {/* Arrow Left to Error */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 hidden md:block text-ink/40"><ArrowRight strokeWidth={3} className="rotate-180" /></div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 md:hidden text-ink/40"><ArrowDown strokeWidth={3} /></div>
              </div>

            </div>

          </div>

          <div className="mt-16 p-6 rounded-[16px] border-[3px] border-ink bg-violetPop text-white shadow-[4px_5px_0_#17191f] flex items-center gap-4 relative z-10">
             <div className="w-12 h-12 bg-white rounded-full border-2 border-ink flex items-center justify-center text-ink shrink-0 rotate-12 shadow-[2px_2px_0_#17191f]">
               <Sparkles size={24} />
             </div>
             <div>
               <p className="font-bold text-lg leading-tight">
                 You have just seen the <strong className="font-black text-sunshine underline decoration-2 underline-offset-4">basic learning loop</strong> behind machine learning.
               </p>
               <p className="text-white/80 text-sm mt-1 font-medium">
                 This cycle (Predict &rarr; Calculate Error &rarr; Update) is how AI "learns" from data.
               </p>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}
