import React, { useState } from 'react';
import { 
  ArrowRight, 
  Compass, 
  Box, 
  Maximize2, 
  Sparkles, 
  RotateCw, 
  HelpCircle,
  Move,
  Layers,
  Zap,
  Target
} from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function VectorsTensors() {
  // 2D Vector Point interactive state
  const [pointX, setPointX] = useState(4); // 0 to 10
  const [pointY, setPointY] = useState(70); // 0 to 100

  // Dot product vectors (angles in degrees)
  const [angleA, setAngleA] = useState(25);
  const [angleB, setAngleB] = useState(45);

  // Tensor explorer active rank
  const [activeRank, setActiveRank] = useState("tensor"); // "scalar" | "vector" | "matrix" | "tensor"

  // Compute Vector A & Vector B coordinates (lengths fixed to 5 for clean intuition)
  const radA = (angleA * Math.PI) / 180;
  const radB = (angleB * Math.PI) / 180;
  
  const Ax = Math.round(Math.cos(radA) * 5 * 10) / 10;
  const Ay = Math.round(Math.sin(radA) * 5 * 10) / 10;
  
  const Bx = Math.round(Math.cos(radB) * 5 * 10) / 10;
  const By = Math.round(Math.sin(radB) * 5 * 10) / 10;

  // Dot Product = (Ax * Bx) + (Ay * By)
  const dotProduct = Math.round((Ax * Bx + Ay * By) * 10) / 10;
  
  // Angle difference between A and B
  const angleDiff = Math.abs(angleA - angleB) % 360;
  const effectiveAngle = angleDiff > 180 ? 360 - angleDiff : angleDiff;
  const cosSimilarity = Math.round(Math.cos((effectiveAngle * Math.PI) / 180) * 100) / 100;

  // Vector magnitude for the 2D point
  const magnitude = Math.round(Math.sqrt(pointX * pointX + (pointY / 10) * (pointY / 10)) * 10) / 10;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">6</span>
            Vectors: The Language of Space & Meaning
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Forget intimidating textbook definitions like <em>"an element of a normed vector space."</em> In applied AI, <Highlight color="#62a9ff">a vector is simply an organized list of numbers that represents something in space</Highlight>.
          </p>

          <div className="bg-[#dcecff] rounded-2xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f]">
            <h3 className="font-display font-bold text-lg mb-4 text-ink">From Profile to Vector:</h3>
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div className="bg-white p-5 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f]">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/50 block mb-2">Student Record</span>
                <ul className="space-y-2 text-sm font-semibold">
                  <li className="flex justify-between border-b border-ink/10 pb-1">
                    <span>Study Hours:</span> <span className="font-mono text-ink">5 hrs</span>
                  </li>
                  <li className="flex justify-between border-b border-ink/10 pb-1">
                    <span>Exam Score:</span> <span className="font-mono text-ink">82 %</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Attendance:</span> <span className="font-mono text-ink">91 %</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2">3-Dimensional Vector</span>
                <div className="font-mono text-2xl sm:text-3xl font-black text-ink bg-white px-6 py-4 rounded-xl border-2 border-ink shadow-[3px_3px_0_#17191f] tracking-wider mb-2">
                  [5, 82, 91]
                </div>
                <span className="text-xs font-bold text-[#6654f5]">
                  3 numbers = 3 spatial dimensions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization: Vector as a Point & Arrow */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#fbe1eb] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">
              <Move size={16} />
            </span>
            Turn a Vector into a Point in Space
          </h2>
          <p className="text-sm font-medium text-ink/70 mb-6">
            Every list of numbers is also a location in geometric space. Adjust the sliders or watch how vector coordinates correspond to physical coordinates.
          </p>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
            {/* 2D Coordinate Plane */}
            <div className="relative pl-8 pb-8">
              {/* Axes labels */}
              <div className="absolute bottom-0 left-8 right-0 text-center font-bold text-ink/60 text-xs uppercase tracking-wider">
                Study Hours (x₁) →
              </div>
              <div className="absolute top-0 bottom-8 left-0 flex items-center justify-center w-8">
                <div className="-rotate-90 font-bold text-ink/60 text-xs uppercase tracking-wider whitespace-nowrap">
                  Exam Score (x₂) →
                </div>
              </div>

              <div className="relative w-full aspect-square bg-white rounded-xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full select-none" preserveAspectRatio="none">
                  {/* Grid */}
                  <g stroke="#f0f0f0" strokeWidth="0.5">
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(v => (
                      <React.Fragment key={v}>
                        <line x1={0} y1={v} x2={100} y2={v} />
                        <line x1={v} y1={0} x2={v} y2={100} />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* Flip Y axis so 0,0 is bottom-left */}
                  <g transform="translate(0, 100) scale(1, -1)">
                    {/* Fixed Reference Point: Student A [2, 45] */}
                    <circle cx={20} cy={45} r="3" fill="#65c99a" stroke="#17191f" strokeWidth="1.5" />
                    <text x={24} y={-47} transform="scale(1, -1)" className="text-[7px] font-bold font-mono fill-ink/70">
                      Student A [2, 45]
                    </text>

                    {/* Fixed Reference Point: Student B [7, 85] */}
                    <circle cx={70} cy={85} r="3" fill="#62a9ff" stroke="#17191f" strokeWidth="1.5" />
                    <text x={74} y={-87} transform="scale(1, -1)" className="text-[7px] font-bold font-mono fill-ink/70">
                      Student B [7, 85]
                    </text>

                    {/* Vector Arrow from Origin (0,0) to User's Point */}
                    <line
                      x1={0}
                      y1={0}
                      x2={pointX * 10}
                      y2={pointY}
                      stroke="#17191f"
                      strokeWidth="3"
                    />
                    <line
                      x1={0}
                      y1={0}
                      x2={pointX * 10}
                      y2={pointY}
                      stroke="#ffda45"
                      strokeWidth="1.8"
                    />

                    {/* User's Dynamic Point */}
                    <circle
                      cx={pointX * 10}
                      cy={pointY}
                      r="5"
                      fill="#ec5faa"
                      stroke="#17191f"
                      strokeWidth="2"
                      className="transition-transform duration-75 cursor-pointer"
                    />
                  </g>
                </svg>
              </div>
            </div>

            {/* Controls & Math Readout */}
            <div className="space-y-6">
              <div className="bg-[#f4f5f8] p-5 rounded-2xl border-2 border-ink">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-ink/70 mb-4">
                  Adjust Vector Coordinates
                </h4>

                {/* X1 Slider */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Dimension 1 (Study Hours):</span>
                    <span className="font-mono text-ink font-bold">{pointX} hrs</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={pointX}
                    onChange={(e) => setPointX(Number(e.target.value))}
                    className="w-full accent-violetPop cursor-pointer"
                  />
                </div>

                {/* X2 Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Dimension 2 (Exam Score):</span>
                    <span className="font-mono text-ink font-bold">{pointY} pts</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={pointY}
                    onChange={(e) => setPointY(Number(e.target.value))}
                    className="w-full accent-violetPop cursor-pointer"
                  />
                </div>
              </div>

              {/* Vector Output Box */}
              <div className="p-5 bg-sunshine/30 rounded-2xl border-2 border-ink border-dashed text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/60 block mb-1">
                  Active 2D Vector:
                </span>
                <div className="font-mono text-3xl font-black text-ink mb-2">
                  [{pointX}, {pointY}]
                </div>
                <div className="text-xs font-bold text-ink/70">
                  Length (Magnitude): <span className="font-mono text-[#6654f5]">~{magnitude}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-ink/20 text-xs font-medium text-ink/70 text-center">
                <strong>Big Takeaway:</strong> A vector is simultaneously a list of numbers, a point in space, and an arrow from the origin.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dot Product Interactive: Measuring Similarity */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">
              <Compass size={16} />
            </span>
            The Dot Product: How AI Measures Similarity
          </h2>
          <p className="text-sm font-medium text-ink/70 mb-6">
            How does an AI know if two words, two users, or two images are similar? It takes the <Highlight color="#65c99a">dot product</Highlight> of their vectors.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Visual Vector Compass */}
            <div className="flex flex-col items-center">
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-white rounded-2xl border-[3px] border-ink shadow-[5px_6px_0_#17191f] p-4 flex items-center justify-center">
                <svg viewBox="-60 -60 120 120" className="w-full h-full overflow-visible">
                  {/* Concentric Circles & Axes */}
                  <circle cx="0" cy="0" r="50" fill="none" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="-55" y1="0" x2="55" y2="0" stroke="#17191f" strokeWidth="0.8" strokeOpacity="0.3" />
                  <line x1="0" y1="-55" x2="0" y2="55" stroke="#17191f" strokeWidth="0.8" strokeOpacity="0.3" />

                  {/* Vector A (Purple) */}
                  <g transform={`rotate(${-angleA})`}>
                    <line x1="0" y1="0" x2="48" y2="0" stroke="#17191f" strokeWidth="4" strokeLinecap="round" />
                    <line x1="0" y1="0" x2="48" y2="0" stroke="#6654f5" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="48" cy="0" r="3.5" fill="#ffda45" stroke="#17191f" strokeWidth="1.5" />
                    <text x="54" y="4" className="text-[8px] font-black font-display fill-[#6654f5]">A</text>
                  </g>

                  {/* Vector B (Pink) */}
                  <g transform={`rotate(${-angleB})`}>
                    <line x1="0" y1="0" x2="48" y2="0" stroke="#17191f" strokeWidth="4" strokeLinecap="round" />
                    <line x1="0" y1="0" x2="48" y2="0" stroke="#ec5faa" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="48" cy="0" r="3.5" fill="#65c99a" stroke="#17191f" strokeWidth="1.5" />
                    <text x="54" y="4" className="text-[8px] font-black font-display fill-[#ec5faa]">B</text>
                  </g>

                  {/* Center origin */}
                  <circle cx="0" cy="0" r="4" fill="#17191f" />
                </svg>
              </div>

              {/* Sliders for rotation */}
              <div className="w-full max-w-[320px] mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#6654f5] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6654f5]" /> Vector A Angle:
                    </span>
                    <span className="font-mono">{angleA}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angleA}
                    onChange={(e) => setAngleA(Number(e.target.value))}
                    className="w-full accent-violetPop cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#ec5faa] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ec5faa]" /> Vector B Angle:
                    </span>
                    <span className="font-mono">{angleB}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angleB}
                    onChange={(e) => setAngleB(Number(e.target.value))}
                    className="w-full accent-pink cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Math & Similarity Meter */}
            <div className="space-y-6">
              {/* Formula Card */}
              <div className="p-6 bg-[#f4f5f8] rounded-2xl border-2 border-ink shadow-[3px_3px_0_#17191f]">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink/60 mb-3">
                  Step-by-Step Calculation
                </h4>

                <div className="space-y-2 font-mono text-xs sm:text-sm font-bold">
                  <div className="flex justify-between text-[#6654f5]">
                    <span>Vector A:</span>
                    <span>[{Ax}, {Ay}]</span>
                  </div>
                  <div className="flex justify-between text-[#ec5faa]">
                    <span>Vector B:</span>
                    <span>[{Bx}, {By}]</span>
                  </div>
                  <div className="border-t-2 border-ink/20 pt-2 text-ink">
                    <div className="text-xs font-sans text-ink/60 mb-1">Dot Product Formula: (Ax × Bx) + (Ay × By)</div>
                    <div className="bg-white p-2 rounded-lg border border-ink/20">
                      ({Ax} × {Bx}) + ({Ay} × {By}) = <strong className="font-black text-lg text-ink">{dotProduct}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similarity Meter */}
              <div className="p-6 bg-white rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
                    Directional Alignment
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border border-ink ${
                    cosSimilarity > 0.7
                      ? "bg-[#dff4e8] text-[#237957]"
                      : cosSimilarity < -0.3
                      ? "bg-[#ffdede] text-[#c92a2a]"
                      : "bg-sunshine/40 text-ink"
                  }`}>
                    {cosSimilarity > 0.7 ? "High Similarity" : cosSimilarity < -0.3 ? "Opposing Directions" : "Uncorrelated"}
                  </span>
                </div>

                {/* Progress bar meter */}
                <div className="h-5 w-full bg-[#f4f5f8] rounded-full border-2 border-ink overflow-hidden p-0.5 mb-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-150 ${
                      cosSimilarity > 0.7 ? "bg-[#65c99a]" : cosSimilarity < -0.3 ? "bg-[#f58ab4]" : "bg-sunshine"
                    }`}
                    style={{ width: `${Math.max(5, ((cosSimilarity + 1) / 2) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-bold text-ink/50">
                  <span>Opposite (-1.0)</span>
                  <span>Orthogonal (0.0)</span>
                  <span>Identical (+1.0)</span>
                </div>

                <div className="mt-4 pt-4 border-t border-ink/10 text-xs font-medium text-ink/75 leading-relaxed">
                  In modern LLMs like ChatGPT and Gemini, the <Highlight color="#ffda45">Attention mechanism</Highlight> computes millions of dot products every second to decide which words in a sentence relate to each other!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tensors: Scaling Up Dimensions */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#dff4e8] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">
              <Box size={16} />
            </span>
            Scaling Up: What is a Tensor?
          </h2>
          <p className="text-sm font-medium text-ink/70 mb-6">
            AI doesn't stop at 1D vectors or 2D tables. A <Highlight color="#62a9ff">tensor</Highlight> is the universal container for numbers across any number of dimensions.
          </p>

          {/* Dimension Rank Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { id: "scalar", label: "0D: Scalar", subtitle: "Single number", icon: "•" },
              { id: "vector", label: "1D: Vector", subtitle: "List of numbers", icon: "→" },
              { id: "matrix", label: "2D: Matrix", subtitle: "Table of numbers", icon: "⊞" },
              { id: "tensor", label: "3D+: Tensor", subtitle: "Multi-dim cube", icon: "🧊" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveRank(item.id)}
                className={`p-3.5 rounded-xl border-2 border-ink text-left font-bold transition-all shadow-[2px_2px_0_#17191f] ${
                  activeRank === item.id
                    ? "bg-sunshine -translate-y-1 scale-102"
                    : "bg-white hover:bg-black/5"
                }`}
              >
                <div className="text-lg mb-1">{item.icon}</div>
                <div className="text-xs font-display font-bold text-ink">{item.label}</div>
                <div className="text-[11px] font-normal text-ink/60">{item.subtitle}</div>
              </button>
            ))}
          </div>

          {/* Active Rank Presentation */}
          <div className="p-6 bg-white rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f]">
            {activeRank === "scalar" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">Rank 0 Tensor: Scalar</h3>
                  <span className="font-mono text-xs px-2.5 py-1 bg-[#f4f5f8] rounded border border-ink font-bold">Shape: ( )</span>
                </div>
                <p className="text-sm font-medium text-ink/80">A single standalone number with magnitude but no direction.</p>
                <div className="bg-[#fff4d9] p-4 rounded-xl border-2 border-ink text-center font-mono font-black text-3xl text-ink">
                  42.0
                </div>
                <div className="text-xs font-semibold text-ink/60 bg-[#f4f5f8] p-3 rounded-lg">
                  Real AI Example: A loss function score (e.g., Error = 0.34) or learning rate (e.g., 0.001).
                </div>
              </div>
            )}

            {activeRank === "vector" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">Rank 1 Tensor: Vector</h3>
                  <span className="font-mono text-xs px-2.5 py-1 bg-[#f4f5f8] rounded border border-ink font-bold">Shape: (4)</span>
                </div>
                <p className="text-sm font-medium text-ink/80">A one-dimensional sequence or ordered array of numbers.</p>
                <div className="bg-[#dcecff] p-4 rounded-xl border-2 border-ink text-center font-mono font-black text-xl sm:text-2xl text-ink tracking-wider">
                  [ 1200, 3, 5, 1.5 ]
                </div>
                <div className="text-xs font-semibold text-ink/60 bg-[#f4f5f8] p-3 rounded-lg">
                  Real AI Example: A single house's feature vector or a token embedding vector in a language model.
                </div>
              </div>
            )}

            {activeRank === "matrix" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">Rank 2 Tensor: Matrix</h3>
                  <span className="font-mono text-xs px-2.5 py-1 bg-[#f4f5f8] rounded border border-ink font-bold">Shape: (3, 4)</span>
                </div>
                <p className="text-sm font-medium text-ink/80">A two-dimensional grid of numbers arranged in rows and columns.</p>
                <div className="bg-[#fbe1eb] p-4 rounded-xl border-2 border-ink text-center font-mono font-bold text-sm text-ink space-y-1">
                  <div>[ 1200, 3, 5, 1.5 ]  ← House 1</div>
                  <div>[ 1500, 4, 2, 0.8 ]  ← House 2</div>
                  <div>[  850, 2, 9, 3.2 ]  ← House 3</div>
                </div>
                <div className="text-xs font-semibold text-ink/60 bg-[#f4f5f8] p-3 rounded-lg">
                  Real AI Example: A batch of data points, a grayscale image (height × width), or neural network layer weights.
                </div>
              </div>
            )}

            {activeRank === "tensor" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">Rank 3+ Tensor: Multi-Dimensional</h3>
                  <span className="font-mono text-xs px-2.5 py-1 bg-sunshine rounded border border-ink font-bold">
                    Shape: (224, 224, 3)
                  </span>
                </div>
                <p className="text-sm font-medium text-ink/80">
                  A stack or cube of matrices. An RGB color image has height, width, and 3 color channels (Red, Green, Blue).
                </p>
                
                {/* 3D Visual Slice Demonstration */}
                <div className="grid sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#ffdede] rounded-xl border-2 border-ink">
                    <span className="text-xs font-bold text-[#c92a2a] block mb-1">Red Channel</span>
                    <span className="font-mono text-xs font-bold">[224 × 224]</span>
                  </div>
                  <div className="p-3 bg-[#dff4e8] rounded-xl border-2 border-ink">
                    <span className="text-xs font-bold text-[#237957] block mb-1">Green Channel</span>
                    <span className="font-mono text-xs font-bold">[224 × 224]</span>
                  </div>
                  <div className="p-3 bg-[#dcecff] rounded-xl border-2 border-ink">
                    <span className="text-xs font-bold text-[#1971c2] block mb-1">Blue Channel</span>
                    <span className="font-mono text-xs font-bold">[224 × 224]</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-ink/60 bg-[#f4f5f8] p-3 rounded-lg">
                  Real AI Example: PyTorch and TensorFlow process all data as tensors: videos are 4D (Frames × H × W × C), and training batches are 4D (Batch Size × H × W × C).
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Chapter 01 Finale / Synthesis Card */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-violetPop text-white shadow-[6px_8px_0_#17191f]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sunshine text-ink border-2 border-ink flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-widest text-white/70">Chapter 01 Complete</span>
              <h2 className="font-display text-2xl font-bold">You've Mastered the Foundations!</h2>
            </div>
          </div>

          <p className="text-white/90 text-base font-medium leading-relaxed mb-8">
            Take a moment to appreciate what you just explored. You started with zero assumptions, watched how computers see pixels as matrices, saw how features distinguish signal from noise, and learned how vectors and dot products measure meaning.
          </p>

          <div className="bg-white/10 rounded-xl p-5 border-2 border-white/20 mb-8 backdrop-blur-sm">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-sunshine mb-3">
              The Path You Just Walked:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-white">
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">01. What is AI?</div>
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">02. What is ML?</div>
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">03. The Learning Loop</div>
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">04. Data Representation</div>
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">05. Features & Patterns</div>
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">06. Vectors & Tensors</div>
            </div>
          </div>

          <div className="text-center font-bold text-lg text-white">
            Next Up: <span className="text-sunshine underline decoration-2 underline-offset-4">02. TRANSLATE</span> — Diving deeper into turning images, text, and audio into matrices!
          </div>
        </div>
      </section>
    </div>
  );
}
