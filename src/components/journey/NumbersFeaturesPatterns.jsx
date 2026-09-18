import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Home, 
  Sliders, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  Search,
  HelpCircle,
  BarChart3
} from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

// Housing dataset
const HOUSES_DATA = [
  { id: 1, name: "Cozy Studio", area: 800, beds: 2, age: 10, metro: 3.5, price: 35 },
  { id: 2, name: "Urban Flat", area: 1000, beds: 2, age: 7, metro: 2.0, price: 42 },
  { id: 3, name: "Family Home", area: 1200, beds: 3, age: 5, metro: 1.5, price: 55 },
  { id: 4, name: "Spacious Villa", area: 1500, beds: 3, age: 3, metro: 1.0, price: 68 },
  { id: 5, name: "Luxury Estate", area: 1800, beds: 4, age: 2, metro: 0.8, price: 82 },
];

// Student performance dataset for Signal vs Noise
const STUDENT_POINTS = [
  { study: 1.5, attendance: 65, sleep: 5.5, lucky: 7, score: 45 },
  { study: 2.0, attendance: 70, sleep: 6.0, lucky: 2, score: 50 },
  { study: 3.0, attendance: 75, sleep: 7.0, lucky: 9, score: 58 },
  { study: 3.5, attendance: 78, sleep: 7.5, lucky: 4, score: 64 },
  { study: 4.0, attendance: 82, sleep: 6.5, lucky: 1, score: 68 },
  { study: 5.0, attendance: 88, sleep: 8.0, lucky: 8, score: 76 },
  { study: 6.0, attendance: 92, sleep: 7.5, lucky: 3, score: 84 },
  { study: 7.0, attendance: 95, sleep: 8.5, lucky: 6, score: 91 },
  { study: 8.0, attendance: 98, sleep: 7.0, lucky: 5, score: 95 },
];

export function NumbersFeaturesPatterns() {
  // Feature checkboxes for House Predictor
  const [selectedFeatures, setSelectedFeatures] = useState({
    area: true,
    beds: true,
    age: false,
    metro: false
  });

  // Sliders for custom house test
  const [customHouse, setCustomHouse] = useState({
    area: 1350,
    beds: 3,
    age: 4,
    metro: 1.5
  });

  // Signal vs Noise feature selector
  const [selectedScatterFeature, setSelectedScatterFeature] = useState("study");
  const [showTrendline, setShowTrendline] = useState(true);

  // Toggle feature
  const toggleFeature = (feat) => {
    setSelectedFeatures(prev => {
      const activeCount = Object.values(prev).filter(Boolean).length;
      if (activeCount === 1 && prev[feat]) return prev; // Keep at least one feature
      return { ...prev, [feat]: !prev[feat] };
    });
  };

  // Model formula calculation based on active features
  const predictedPrice = useMemo(() => {
    // Base intercept
    let price = 10;
    if (selectedFeatures.area) {
      price += (customHouse.area * 0.032);
    } else {
      price += (1200 * 0.032); // average default assumption
    }
    if (selectedFeatures.beds) {
      price += (customHouse.beds * 4.5);
    }
    if (selectedFeatures.age) {
      price -= (customHouse.age * 0.9);
    }
    if (selectedFeatures.metro) {
      price -= (customHouse.metro * 2.2);
    }
    return Math.max(20, Math.round(price * 10) / 10);
  }, [selectedFeatures, customHouse]);

  // Scatter plot metadata
  const scatterConfig = {
    study: {
      label: "Study Hours (per day)",
      unit: "hrs",
      min: 0,
      max: 10,
      getValue: (p) => p.study,
      trend: "positive",
      correlation: "+0.96",
      isSignal: true,
      desc: "Strong positive correlation: more study hours directly predict higher exam scores."
    },
    attendance: {
      label: "Attendance Rate",
      unit: "%",
      min: 50,
      max: 100,
      getValue: (p) => p.attendance,
      trend: "positive",
      correlation: "+0.91",
      isSignal: true,
      desc: "Strong signal: consistent class presence provides clear predictive power."
    },
    sleep: {
      label: "Sleep Duration",
      unit: "hrs",
      min: 4,
      max: 10,
      getValue: (p) => p.sleep,
      trend: "moderate",
      correlation: "+0.68",
      isSignal: true,
      desc: "Moderate signal: adequate sleep supports academic performance."
    },
    lucky: {
      label: "Lucky Number (1–10)",
      unit: "#",
      min: 0,
      max: 10,
      getValue: (p) => p.lucky,
      trend: "none",
      correlation: "+0.04",
      isSignal: false,
      desc: "Pure noise! A student's favorite or lucky number has zero relationship to their exam score."
    }
  }[selectedScatterFeature];

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">5</span>
            Numbers, Features & Patterns
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Now you might ask: <Highlight color="#62a9ff">"What do those numbers actually describe?"</Highlight> In machine learning, the measurable attributes of any real-world object are called <Highlight color="#65c99a">features</Highlight>.
          </p>

          <div className="bg-[#fbe1eb] rounded-2xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f]">
            <h3 className="font-display font-bold text-lg mb-4 text-ink">From Real Object to Feature Vector:</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Object Card */}
              <div className="bg-white p-5 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f]">
                <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
                  <Home className="text-[#ec5faa]" /> Real Object: House
                </div>
                <ul className="space-y-2 text-sm font-medium text-ink/80">
                  <li className="flex justify-between border-b border-ink/10 pb-1">
                    <span>Floor Area:</span> <strong className="font-bold text-ink">1,200 sq ft</strong>
                  </li>
                  <li className="flex justify-between border-b border-ink/10 pb-1">
                    <span>Bedrooms:</span> <strong className="font-bold text-ink">3 rooms</strong>
                  </li>
                  <li className="flex justify-between border-b border-ink/10 pb-1">
                    <span>Building Age:</span> <strong className="font-bold text-ink">5 years</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Distance to Metro:</span> <strong className="font-bold text-ink">1.5 km</strong>
                  </li>
                </ul>
              </div>

              {/* Vector Representation */}
              <div className="bg-[#fffdf8] p-5 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f] flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/50 mb-2">Feature Vector (1D Array)</span>
                <div className="font-mono text-xl sm:text-2xl font-black text-[#6654f5] bg-white p-4 rounded-lg border-2 border-ink shadow-inner text-center mb-3">
                  [1200, 3, 5, 1.5]
                </div>
                <p className="text-xs font-medium text-ink/70 text-center">
                  Each slot in the vector represents one specific, measurable property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization: House Price Predictor */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#c9baff] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">
              <Sliders size={16} />
            </span>
            Interactive Experiment: Choose Your Features
          </h2>
          <p className="text-sm font-medium text-ink/70 mb-6">
            Toggle features on and off to see how incorporating more relevant data sharpens the model's price prediction.
          </p>

          {/* Dataset Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full text-left border-collapse border-2 border-ink rounded-xl overflow-hidden shadow-[3px_3px_0_#17191f]">
              <thead>
                <tr className="bg-[#f4f5f8] border-b-2 border-ink font-display text-xs uppercase tracking-wider text-ink">
                  <th className="p-3">Sample House</th>
                  <th className={`p-3 ${selectedFeatures.area ? "bg-sunshine/40" : ""}`}>Area</th>
                  <th className={`p-3 ${selectedFeatures.beds ? "bg-sunshine/40" : ""}`}>Beds</th>
                  <th className={`p-3 ${selectedFeatures.age ? "bg-sunshine/40" : ""}`}>Age</th>
                  <th className={`p-3 ${selectedFeatures.metro ? "bg-sunshine/40" : ""}`}>Metro</th>
                  <th className="p-3 bg-[#dff4e8] font-bold">Actual Price</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-medium">
                {HOUSES_DATA.map((h, idx) => (
                  <tr key={h.id} className={idx % 2 === 0 ? "bg-white" : "bg-[#faf8f4]"}>
                    <td className="p-3 font-bold border-t border-ink/10">{h.name}</td>
                    <td className={`p-3 border-t border-ink/10 font-mono ${selectedFeatures.area ? "bg-sunshine/20 font-bold" : "text-ink/50"}`}>{h.area} sq ft</td>
                    <td className={`p-3 border-t border-ink/10 font-mono ${selectedFeatures.beds ? "bg-sunshine/20 font-bold" : "text-ink/50"}`}>{h.beds}</td>
                    <td className={`p-3 border-t border-ink/10 font-mono ${selectedFeatures.age ? "bg-sunshine/20 font-bold" : "text-ink/50"}`}>{h.age} yrs</td>
                    <td className={`p-3 border-t border-ink/10 font-mono ${selectedFeatures.metro ? "bg-sunshine/20 font-bold" : "text-ink/50"}`}>{h.metro} km</td>
                    <td className="p-3 border-t border-ink/10 bg-[#dff4e8]/50 font-bold text-[#237957]">₹{h.price} Lakhs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Feature Toggles & Live Custom House Predictor */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            {/* Left: Toggles and Sliders */}
            <div className="space-y-6">
              {/* Feature checkboxes */}
              <div>
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ink/70 mb-3">
                  Step 1: Select Features to Train On
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: "area", label: "Area (sq ft)", icon: "📐" },
                    { key: "beds", label: "Bedrooms", icon: "🛏️" },
                    { key: "age", label: "Building Age", icon: "⏳" },
                    { key: "metro", label: "Metro Distance", icon: "🚇" }
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => toggleFeature(f.key)}
                      className={`p-3 rounded-xl border-2 border-ink text-left font-bold text-xs transition-all shadow-[2px_2px_0_#17191f] flex flex-col justify-between min-h-[70px] ${
                        selectedFeatures[f.key]
                          ? "bg-sunshine -translate-y-0.5"
                          : "bg-white text-ink/50 hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{f.icon}</span>
                        <div className={`w-4 h-4 rounded border border-ink flex items-center justify-center ${
                          selectedFeatures[f.key] ? "bg-ink text-white" : "bg-white"
                        }`}>
                          {selectedFeatures[f.key] && <CheckCircle2 size={12} strokeWidth={3} />}
                        </div>
                      </div>
                      <span className="mt-2 text-ink">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders for Test House */}
              <div className="bg-[#f4f5f8] p-5 rounded-2xl border-2 border-ink">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ink/70 mb-4">
                  Step 2: Adjust Test House Values
                </h4>

                <div className="space-y-4">
                  {/* Area Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={selectedFeatures.area ? "text-ink" : "text-ink/40"}>Area</span>
                      <span className="font-mono">{customHouse.area} sq ft</span>
                    </div>
                    <input
                      type="range"
                      min="600"
                      max="2400"
                      step="50"
                      value={customHouse.area}
                      onChange={(e) => setCustomHouse({ ...customHouse, area: Number(e.target.value) })}
                      className="w-full accent-violetPop cursor-pointer"
                    />
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={selectedFeatures.beds ? "text-ink" : "text-ink/40"}>Bedrooms</span>
                      <span className="font-mono">{customHouse.beds} BHK</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={customHouse.beds}
                      onChange={(e) => setCustomHouse({ ...customHouse, beds: Number(e.target.value) })}
                      className="w-full accent-violetPop cursor-pointer"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={selectedFeatures.age ? "text-ink" : "text-ink/40"}>Building Age</span>
                      <span className="font-mono">{customHouse.age} years old</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={customHouse.age}
                      onChange={(e) => setCustomHouse({ ...customHouse, age: Number(e.target.value) })}
                      className="w-full accent-violetPop cursor-pointer"
                    />
                  </div>

                  {/* Metro */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={selectedFeatures.metro ? "text-ink" : "text-ink/40"}>Distance to Metro</span>
                      <span className="font-mono">{customHouse.metro} km</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={customHouse.metro}
                      onChange={(e) => setCustomHouse({ ...customHouse, metro: Number(e.target.value) })}
                      className="w-full accent-violetPop cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Prediction Card */}
            <div className="p-6 bg-white rounded-2xl border-[3px] border-ink shadow-[5px_6px_0_#17191f] text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-2">
                  Model Output
                </span>
                <h3 className="font-display font-bold text-xl mb-4">Predicted Value</h3>
                
                <div className="py-6 px-4 bg-sunshine/30 rounded-xl border-2 border-ink border-dashed mb-4">
                  <div className="font-display font-black text-4xl sm:text-5xl text-ink tracking-tight">
                    ₹{predictedPrice}L
                  </div>
                  <span className="text-xs font-bold text-ink/60 mt-1 block">
                    {Object.values(selectedFeatures).filter(Boolean).length} feature(s) active
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-left bg-[#faf8f4] p-3 rounded-xl border border-ink/20 text-xs font-medium text-ink/80">
                <div className="flex justify-between">
                  <span>Using Area only:</span>
                  <span className="font-bold">~₹57.2L</span>
                </div>
                <div className="flex justify-between">
                  <span>Area + Bedrooms:</span>
                  <span className="font-bold">~₹61.5L</span>
                </div>
                <div className="flex justify-between">
                  <span>Area + Beds + Age:</span>
                  <span className="font-bold">~₹63.8L</span>
                </div>
                <div className="flex justify-between text-[#237957] font-bold border-t border-ink/10 pt-1">
                  <span>All 4 Features:</span>
                  <span>~₹65.2L</span>
                </div>
              </div>

              <p className="text-[11px] font-semibold text-ink/50 mt-4 leading-tight">
                More high-quality features allow the algorithm to distinguish subtle nuances and avoid guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Signal vs. Noise: Useful vs Useless Features */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#dff4e8] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">
                  <BarChart3 size={16} />
                </span>
                Spotting the Pattern: Signal vs. Noise
              </h2>
              <p className="text-sm font-medium text-ink/70 mt-1">
                Not every number is useful. Pick different candidate features to see which ones contain true patterns versus pure random noise.
              </p>
            </div>
            
            <button
              onClick={() => setShowTrendline(!showTrendline)}
              className={`px-3 py-1.5 rounded-lg border-2 border-ink text-xs font-bold transition-all shadow-[2px_2px_0_#17191f] ${
                showTrendline ? "bg-violetPop text-white" : "bg-white text-ink"
              }`}
            >
              {showTrendline ? "Hide Trendline" : "Show Trendline"}
            </button>
          </div>

          {/* Feature Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: "study", label: "Study Hours", type: "Signal" },
              { id: "attendance", label: "Attendance %", type: "Signal" },
              { id: "sleep", label: "Sleep Duration", type: "Signal" },
              { id: "lucky", label: "Lucky Number", type: "Noise" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedScatterFeature(tab.id)}
                className={`px-4 py-2 rounded-xl border-2 border-ink text-xs font-bold transition-all shadow-[2px_2px_0_#17191f] flex items-center gap-2 ${
                  selectedScatterFeature === tab.id
                    ? tab.type === "Signal"
                      ? "bg-sunshine -translate-y-0.5"
                      : "bg-[#f58ab4] text-white -translate-y-0.5"
                    : "bg-white hover:bg-black/5"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  tab.type === "Signal" ? "bg-white/60 border-ink/20" : "bg-black/20 border-white/40"
                }`}>
                  {tab.type}
                </span>
              </button>
            ))}
          </div>

          {/* Scatter Plot */}
          <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-center">
            <div className="relative pl-8 pb-8">
              {/* Axis labels */}
              <div className="absolute bottom-0 left-8 right-0 text-center font-bold text-ink/60 text-xs uppercase tracking-wider">
                {scatterConfig.label} ({scatterConfig.unit}) →
              </div>
              <div className="absolute top-0 bottom-8 left-0 flex items-center justify-center w-8">
                <div className="-rotate-90 font-bold text-ink/60 text-xs uppercase tracking-wider whitespace-nowrap">
                  Exam Score (0–100) →
                </div>
              </div>

              {/* Chart SVG */}
              <div className="relative w-full aspect-video sm:aspect-[2/1] bg-white rounded-xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <g stroke="#f0f0f0" strokeWidth="0.5">
                    {[20, 40, 60, 80].map(v => (
                      <React.Fragment key={v}>
                        <line x1={0} y1={v} x2={100} y2={v} />
                        <line x1={v} y1={0} x2={v} y2={100} />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* Inverted Y-axis */}
                  <g transform="translate(0, 100) scale(1, -1)">
                    {/* Trendline */}
                    {showTrendline && (
                      <line
                        x1="10"
                        y1={scatterConfig.isSignal ? "38" : "68"}
                        x2="90"
                        y2={scatterConfig.isSignal ? "95" : "68"}
                        stroke={scatterConfig.isSignal ? "#6654f5" : "#ec5faa"}
                        strokeWidth="2.5"
                        strokeDasharray={scatterConfig.isSignal ? "none" : "3 3"}
                        className="transition-all duration-500"
                      />
                    )}

                    {/* Scatter Points */}
                    {STUDENT_POINTS.map((pt, i) => {
                      const val = scatterConfig.getValue(pt);
                      const normX = ((val - scatterConfig.min) / (scatterConfig.max - scatterConfig.min)) * 80 + 10;
                      const normY = pt.score;

                      return (
                        <circle
                          key={i}
                          cx={normX}
                          cy={normY}
                          r="3"
                          fill={scatterConfig.isSignal ? "#65c99a" : "#f58ab4"}
                          stroke="#17191f"
                          strokeWidth="1.5"
                          className="transition-all duration-500 hover:scale-125 cursor-pointer"
                        />
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>

            {/* Analysis card */}
            <div className={`p-5 rounded-xl border-2 border-ink shadow-[3px_4px_0_#17191f] ${
              scatterConfig.isSignal ? "bg-[#dff4e8]" : "bg-[#ffdede]"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {scatterConfig.isSignal ? (
                  <CheckCircle2 className="text-[#237957]" size={20} strokeWidth={2.5} />
                ) : (
                  <AlertTriangle className="text-[#c92a2a]" size={20} strokeWidth={2.5} />
                )}
                <h4 className="font-display font-bold text-base text-ink">
                  {scatterConfig.isSignal ? "Informative Feature" : "Noisy / Useless"}
                </h4>
              </div>

              <div className="mb-3">
                <span className="text-xs uppercase font-bold text-ink/60 block">Statistical Correlation</span>
                <span className="font-mono font-black text-2xl text-ink">{scatterConfig.correlation}</span>
              </div>

              <p className="text-xs font-medium text-ink/80 leading-relaxed">
                {scatterConfig.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Real AI Connection: Handcrafted vs Learned Features */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How Real AI Discovers Features</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/70 rounded-xl border-2 border-ink shadow-[3px_3px_0_#17191f]">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-1">Traditional ML</span>
              <h3 className="font-display font-bold text-lg mb-3">Feature Engineering</h3>
              <p className="text-sm font-medium text-ink/80 leading-relaxed mb-4">
                Human engineers manually designed algorithms to compute edges, color histograms, or word frequencies. If humans chose bad features, the model failed.
              </p>
              <div className="text-xs font-bold bg-white px-3 py-2 rounded-lg border border-ink text-center">
                Human intuition &rarr; Features &rarr; Simple Model
              </div>
            </div>

            <div className="p-6 bg-white/70 rounded-xl border-2 border-ink shadow-[3px_3px_0_#17191f]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6654f5] block mb-1">Modern Deep Learning</span>
              <h3 className="font-display font-bold text-lg mb-3">Representation Learning</h3>
              <p className="text-sm font-medium text-ink/80 leading-relaxed mb-4">
                Deep neural networks automatically discover hierarchical features directly from raw pixels or text:
              </p>
              <div className="text-xs font-bold bg-sunshine px-3 py-2 rounded-lg border border-ink text-center">
                Raw Data &rarr; Low-level Edges &rarr; Shapes &rarr; Objects
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-ink/20 text-center font-bold text-lg leading-relaxed">
            Machine learning is all about separating <Highlight color="#fffdf8">true patterns</Highlight> from random noise.<br/>
            The better the features, the easier it is for mathematics to predict the future.
          </div>
        </div>
      </section>
    </div>
  );
}
