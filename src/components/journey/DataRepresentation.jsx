import React, { useState } from 'react';
import { 
  ArrowRight, 
  Grid3X3, 
  Binary, 
  Image as ImageIcon, 
  Type, 
  Volume2, 
  Sparkles, 
  Palette, 
  RotateCcw,
  Eye,
  Sliders,
  Check
} from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

// 8x8 Grayscale Presets (Values 0 = ink, 255 = paper/white, in-between = shades)
const PRESETS = {
  cat: {
    name: "Cat Face",
    grid: [
      [255,   0, 255, 255, 255, 255,   0, 255],
      [  0,   0,   0, 255, 255,   0,   0,   0],
      [  0, 255,   0, 255, 255,   0, 255,   0],
      [  0, 255, 255, 255, 255, 255, 255,   0],
      [  0,   0, 255, 255, 255, 255,   0,   0],
      [  0, 255, 255,   0,   0, 255, 255,   0],
      [  0, 255,   0, 255, 255,   0, 255,   0],
      [255,   0,   0,   0,   0,   0,   0, 255],
    ]
  },
  heart: {
    name: "Heart",
    grid: [
      [255, 255, 255, 255, 255, 255, 255, 255],
      [255,   0,   0, 255, 255,   0,   0, 255],
      [  0,   0,   0,   0,   0,   0,   0,   0],
      [  0,   0,   0,   0,   0,   0,   0,   0],
      [255,   0,   0,   0,   0,   0,   0, 255],
      [255, 255,   0,   0,   0,   0, 255, 255],
      [255, 255, 255,   0,   0, 255, 255, 255],
      [255, 255, 255, 255, 255, 255, 255, 255],
    ]
  },
  smiley: {
    name: "Smiley",
    grid: [
      [255, 255,   0,   0,   0,   0, 255, 255],
      [255,   0, 255, 255, 255, 255,   0, 255],
      [  0, 255,   0, 255, 255,   0, 255,   0],
      [  0, 255, 255, 255, 255, 255, 255,   0],
      [  0, 255,   0, 255, 255,   0, 255,   0],
      [  0, 255, 255,   0,   0, 255, 255,   0],
      [255,   0, 255, 255, 255, 255,   0, 255],
      [255, 255,   0,   0,   0,   0, 255, 255],
    ]
  },
  digit7: {
    name: "Digit '7'",
    grid: [
      [255, 255, 255, 255, 255, 255, 255, 255],
      [255,   0,   0,   0,   0,   0,   0, 255],
      [255, 255, 255, 255, 255,   0,   0, 255],
      [255, 255, 255, 255,   0,   0, 255, 255],
      [255, 255, 255,   0,   0, 255, 255, 255],
      [255, 255,   0,   0, 255, 255, 255, 255],
      [255, 255,   0,   0, 255, 255, 255, 255],
      [255, 255, 255, 255, 255, 255, 255, 255],
    ]
  }
};

const TEXT_SAMPLES = [
  {
    sentence: "The cute cat sat on the mat",
    tokens: [
      { word: "The", id: 464, vector: [0.12, -0.45, 0.88, 0.05, -0.29, 0.71, 0.33, -0.14] },
      { word: "cute", id: 10423, vector: [0.78, 0.34, -0.12, 0.91, -0.04, 0.65, -0.51, 0.42] },
      { word: "cat", id: 3797, vector: [0.89, 0.45, -0.21, 0.95, -0.12, 0.72, -0.63, 0.55] },
      { word: "sat", id: 3348, vector: [-0.15, 0.02, 0.43, -0.38, 0.62, 0.19, 0.08, -0.27] },
      { word: "on", id: 319, vector: [0.05, -0.18, 0.31, 0.12, -0.08, 0.44, 0.21, -0.09] },
      { word: "the", id: 262, vector: [0.11, -0.42, 0.85, 0.04, -0.27, 0.69, 0.31, -0.12] },
      { word: "mat", id: 5612, vector: [0.32, -0.11, 0.49, 0.22, 0.15, -0.31, 0.48, -0.05] }
    ]
  },
  {
    sentence: "Artificial intelligence is pure math",
    tokens: [
      { word: "Artificial", id: 19883, vector: [0.65, 0.72, -0.41, 0.58, 0.33, -0.24, 0.81, -0.19] },
      { word: "intelligence", id: 8945, vector: [0.71, 0.69, -0.38, 0.62, 0.29, -0.18, 0.85, -0.15] },
      { word: "is", id: 318, vector: [0.02, -0.05, 0.14, 0.09, -0.02, 0.18, 0.07, -0.04] },
      { word: "pure", id: 6241, vector: [0.44, 0.21, 0.59, -0.11, 0.38, 0.52, -0.23, 0.34] },
      { word: "math", id: 7490, vector: [0.82, 0.55, -0.19, 0.74, 0.41, -0.08, 0.92, -0.31] }
    ]
  }
];

export function DataRepresentation() {
  const [activePreset, setActivePreset] = useState("cat");
  const [grid, setGrid] = useState(PRESETS.cat.grid);
  const [hoveredCell, setHoveredCell] = useState({ r: 2, c: 2 });
  const [viewFormat, setViewFormat] = useState("grayscale"); // "grayscale" | "normalized" | "binary"
  const [activeBrush, setActiveBrush] = useState(0); // 0 = ink black, 255 = paper white, 128 = gray
  const [displayMode, setDisplayMode] = useState("split"); // "split" | "image" | "matrix"

  // Text tokenizer state
  const [selectedTextIndex, setSelectedTextIndex] = useState(0);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(2); // default to "cat"

  const handleSelectPreset = (key) => {
    setActivePreset(key);
    setGrid(PRESETS[key].grid.map(row => [...row]));
  };

  const handleCellClick = (r, c) => {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = next[r][c] === activeBrush ? (activeBrush === 0 ? 255 : 0) : activeBrush;
      return next;
    });
    setHoveredCell({ r, c });
  };

  const formatCellValue = (val) => {
    if (viewFormat === "normalized") {
      return (val / 255).toFixed(1);
    }
    if (viewFormat === "binary") {
      return val < 128 ? "1" : "0";
    }
    return val;
  };

  const activeSentence = TEXT_SAMPLES[selectedTextIndex];
  const activeToken = activeSentence.tokens[selectedTokenIndex] || activeSentence.tokens[0];

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">4</span>
            The Great Translation
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Computers cannot directly work with <Highlight color="#f58ab4">"cats"</Highlight>, <Highlight color="#62a9ff">"houses"</Highlight>, <Highlight color="#65c99a">"voices"</Highlight>, or <Highlight color="#ffda45">"sentences"</Highlight> as concepts. They only understand electricity, circuits, and arithmetic.
          </p>
          
          <div className="bg-[#fff4d9] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f]">
            <h3 className="font-display font-bold text-lg mb-4 text-ink">Before an AI can think, reality must become numbers:</h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center font-display font-bold">
              <div className="bg-white px-5 py-3 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f] w-full sm:w-auto">
                <span className="text-xs text-ink/50 uppercase block mb-1">REAL WORLD</span>
                Objects, Sound & Ideas
              </div>
              <ArrowRight className="hidden sm:block text-ink shrink-0" strokeWidth={3} />
              <div className="sm:hidden text-ink rotate-90" strokeWidth={3}>↓</div>
              <div className="bg-violetPop text-white px-5 py-3 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f] w-full sm:w-auto">
                <span className="text-xs text-white/70 uppercase block mb-1">REPRESENTATION</span>
                Grids, Tokens, Features
              </div>
              <ArrowRight className="hidden sm:block text-ink shrink-0" strokeWidth={3} />
              <div className="sm:hidden text-ink rotate-90" strokeWidth={3}>↓</div>
              <div className="bg-white px-5 py-3 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f] w-full sm:w-auto">
                <span className="text-xs text-ink/50 uppercase block mb-1">NUMBERS</span>
                Matrices & Vectors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization: Image -> Pixels -> Matrix */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#dcecff] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">
                  <ImageIcon size={16} />
                </span>
                Visualizing an Image as a Matrix
              </h2>
              <p className="text-sm font-medium text-ink/70 mt-1">
                Hover or click any pixel on the left canvas to watch its number illuminate in the mathematical matrix on the right.
              </p>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map(key => (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`px-3 py-1.5 rounded-lg border-2 border-ink text-xs font-bold transition-all shadow-[2px_2px_0_#17191f] ${
                    activePreset === key ? "bg-sunshine -translate-y-0.5" : "bg-white hover:bg-black/5"
                  }`}
                >
                  {PRESETS[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Controls Bar */}
          <div className="bg-[#f4f5f8] p-4 rounded-xl border-2 border-ink mb-6 flex flex-wrap items-center justify-between gap-4">
            {/* View Format */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Number Format:</span>
              <div className="flex bg-white rounded-lg border-2 border-ink p-0.5 shadow-[1px_2px_0_#17191f]">
                <button
                  onClick={() => setViewFormat("grayscale")}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    viewFormat === "grayscale" ? "bg-violetPop text-white" : "text-ink hover:bg-black/5"
                  }`}
                >
                  0–255 (Grayscale)
                </button>
                <button
                  onClick={() => setViewFormat("normalized")}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    viewFormat === "normalized" ? "bg-violetPop text-white" : "text-ink hover:bg-black/5"
                  }`}
                >
                  0.0–1.0 (Normalized)
                </button>
                <button
                  onClick={() => setViewFormat("binary")}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    viewFormat === "binary" ? "bg-violetPop text-white" : "text-ink hover:bg-black/5"
                  }`}
                >
                  0 / 1 (Binary)
                </button>
              </div>
            </div>

            {/* Brush selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Brush:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveBrush(0)}
                  className={`w-7 h-7 rounded-md border-2 border-ink shadow-[1px_1px_0_#17191f] bg-[#17191f] ${activeBrush === 0 ? "ring-2 ring-violetPop scale-110" : ""}`}
                  title="Black (Ink, 0)"
                />
                <button
                  onClick={() => setActiveBrush(128)}
                  className={`w-7 h-7 rounded-md border-2 border-ink shadow-[1px_1px_0_#17191f] bg-[#808080] ${activeBrush === 128 ? "ring-2 ring-violetPop scale-110" : ""}`}
                  title="Gray (128)"
                />
                <button
                  onClick={() => setActiveBrush(255)}
                  className={`w-7 h-7 rounded-md border-2 border-ink shadow-[1px_1px_0_#17191f] bg-white ${activeBrush === 255 ? "ring-2 ring-violetPop scale-110" : ""}`}
                  title="White (Paper, 255)"
                />
              </div>
              <button
                onClick={() => setGrid(Array(8).fill(null).map(() => Array(8).fill(255)))}
                className="ml-2 p-1.5 bg-white border-2 border-ink rounded-lg text-ink/70 hover:text-ink hover:bg-sunshine shadow-[1px_1px_0_#17191f] transition-all"
                title="Clear canvas"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Interactive Dual Grid Area */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Visual Canvas */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-[320px] mb-2 px-1">
                <span className="font-display font-bold text-sm text-ink flex items-center gap-1.5">
                  <Eye size={16} className="text-[#6654f5]" /> Image View (8×8 Pixels)
                </span>
                <span className="text-xs font-semibold text-ink/50">Click pixels to paint</span>
              </div>
              
              <div className="p-3 bg-white rounded-2xl border-[3px] border-ink shadow-[5px_6px_0_#17191f] inline-block">
                <div 
                  className="grid grid-cols-8 gap-1 w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] select-none cursor-pointer"
                  onMouseLeave={() => {}}
                >
                  {grid.map((row, r) => 
                    row.map((val, c) => {
                      const isHovered = hoveredCell.r === r && hoveredCell.c === c;
                      return (
                        <div
                          key={`${r}-${c}`}
                          onMouseEnter={() => setHoveredCell({ r, c })}
                          onClick={() => handleCellClick(r, c)}
                          style={{ backgroundColor: `rgb(${val}, ${val}, ${val})` }}
                          className={`rounded-md border transition-transform duration-100 ${
                            isHovered 
                              ? "border-violetPop ring-4 ring-sunshine scale-110 z-10 shadow-[2px_2px_0_#17191f]" 
                              : "border-ink/20 hover:border-ink/60"
                          }`}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right: Matrix View */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-[340px] mb-2 px-1">
                <span className="font-display font-bold text-sm text-ink flex items-center gap-1.5">
                  <Binary size={16} className="text-[#237957]" /> Matrix View (8×8 Numbers)
                </span>
                <span className="text-xs font-semibold text-ink/50">
                  {viewFormat === "grayscale" ? "Integer 0–255" : viewFormat === "normalized" ? "Float 0.0–1.0" : "Binary bits"}
                </span>
              </div>

              <div className="p-3 bg-[#fdfaf2] rounded-2xl border-[3px] border-ink shadow-[5px_6px_0_#17191f] inline-block w-full max-w-[340px] overflow-hidden">
                <div className="grid grid-cols-8 gap-1 select-none">
                  {grid.map((row, r) =>
                    row.map((val, c) => {
                      const isHovered = hoveredCell.r === r && hoveredCell.c === c;
                      return (
                        <div
                          key={`m-${r}-${c}`}
                          onMouseEnter={() => setHoveredCell({ r, c })}
                          onClick={() => handleCellClick(r, c)}
                          className={`h-7 sm:h-8 flex items-center justify-center rounded text-[10px] sm:text-[11px] font-mono font-bold transition-all cursor-pointer ${
                            isHovered
                              ? "bg-sunshine text-ink font-black scale-110 border-2 border-ink z-10 shadow-[2px_2px_0_#17191f]"
                              : val < 128
                              ? "bg-ink/80 text-white hover:bg-ink"
                              : "bg-white text-ink/80 border border-ink/10 hover:border-ink/30"
                          }`}
                        >
                          {formatCellValue(val)}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Active Pixel Telemetry Banner */}
          <div className="mt-8 p-4 rounded-xl border-2 border-ink bg-[#dcecff] shadow-[3px_4px_0_#17191f] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]"
                style={{ 
                  backgroundColor: `rgb(${grid[hoveredCell.r][hoveredCell.c]}, ${grid[hoveredCell.r][hoveredCell.c]}, ${grid[hoveredCell.r][hoveredCell.c]})` 
                }}
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Selected Pixel</span>
                <div className="font-display font-bold text-base">
                  Coordinate: Row {hoveredCell.r}, Col {hoveredCell.c}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-sm">
              <div>
                <span className="block text-[11px] font-sans font-bold text-ink/50 uppercase">Brightness</span>
                <span className="font-bold text-ink">{grid[hoveredCell.r][hoveredCell.c]} / 255</span>
              </div>
              <div>
                <span className="block text-[11px] font-sans font-bold text-ink/50 uppercase">Normalized</span>
                <span className="font-bold text-ink">{(grid[hoveredCell.r][hoveredCell.c] / 255).toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-[11px] font-sans font-bold text-ink/50 uppercase">Classification</span>
                <span className="font-bold text-ink">{grid[hoveredCell.r][hoveredCell.c] < 128 ? "Foreground" : "Background"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mini Visualization: Text -> Tokens -> Numbers */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fbe1eb] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">
              <Type size={16} />
            </span>
            How Text Becomes Numbers
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Text cannot be plotted on a 2D grid like pixels. Instead, language models break sentences into chunks called <Highlight color="#6654f5">tokens</Highlight>, map each token to a unique ID, and convert it into a dense list of numbers called an <Highlight color="#65c99a">embedding vector</Highlight>.
          </p>

          {/* Text Sample Selector */}
          <div className="flex flex-wrap gap-3 mb-6">
            {TEXT_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedTextIndex(idx);
                  setSelectedTokenIndex(0);
                }}
                className={`px-4 py-2 rounded-xl border-2 border-ink font-bold text-sm transition-all shadow-[2px_2px_0_#17191f] ${
                  selectedTextIndex === idx ? "bg-sunshine -translate-y-0.5" : "bg-white hover:bg-black/5"
                }`}
              >
                "{sample.sentence}"
              </button>
            ))}
          </div>

          {/* Token Chips */}
          <div className="bg-white p-6 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f] mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-ink/50 mb-3">
              Step 1 & 2: Tokenization & Token IDs (Click a token to inspect its vector)
            </div>
            <div className="flex flex-wrap gap-2.5">
              {activeSentence.tokens.map((token, idx) => {
                const isSelected = selectedTokenIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTokenIndex(idx)}
                    className={`px-4 py-2.5 rounded-xl border-2 border-ink font-display font-bold text-base transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? "bg-violetPop text-white shadow-[3px_4px_0_#17191f] -translate-y-1 scale-105"
                        : "bg-[#faf8f4] text-ink shadow-[2px_2px_0_#17191f] hover:bg-sunshine"
                    }`}
                  >
                    <span>{token.word}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      isSelected ? "bg-white/20 border-white/40 text-white" : "bg-black/5 border-ink/20 text-ink/60"
                    }`}>
                      #{token.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Token Vector Telemetry */}
          <div className="bg-white p-6 rounded-2xl border-[3px] border-ink shadow-[4px_5px_0_#17191f]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ink/50">Step 3: Embedding Vector</span>
                <h4 className="font-display font-bold text-lg text-ink">
                  Vector Representation for: <span className="text-[#6654f5]">"{activeToken.word}"</span> (Token ID: #{activeToken.id})
                </h4>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-sunshine border-2 border-ink rounded-lg shadow-[2px_2px_0_#17191f]">
                8 Dimensions Shown (Real models use 768 to 4096)
              </span>
            </div>

            {/* Vector Numbers & Visual Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {activeToken.vector.map((val, idx) => {
                const isPositive = val >= 0;
                return (
                  <div key={idx} className="bg-[#f4f5f8] p-2.5 rounded-xl border-2 border-ink flex flex-col items-center justify-between min-h-[90px]">
                    <span className="text-[10px] font-bold text-ink/50 uppercase">Dim {idx + 1}</span>
                    <div className="h-10 w-full flex items-center justify-center my-1">
                      <div 
                        className={`w-3 rounded-full border border-ink transition-all duration-300 ${
                          isPositive ? "bg-[#65c99a]" : "bg-[#f58ab4]"
                        }`}
                        style={{ height: `${Math.max(12, Math.abs(val) * 40)}px` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-ink">
                      {isPositive ? `+${val.toFixed(2)}` : val.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-sm font-medium text-ink/70 mt-4 leading-relaxed">
              In deep learning, words with similar meanings (like <em>cat</em> and <em>dog</em>) end up having numerical vectors that point in nearly identical directions in space.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Real AI Multimodal Pipeline */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How Every Media Type Translates to Numbers</h2>

          <div className="space-y-4">
            {/* Image */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white rounded-xl border-2 border-ink shadow-[3px_3px_0_#17191f]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#dcecff] border-2 border-ink flex items-center justify-center font-bold text-ink">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base">Images & Video</h4>
                  <p className="text-xs text-ink/60 font-medium">Visual reality</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm flex-wrap">
                <span className="px-2.5 py-1 bg-[#f4f5f8] rounded-md border border-ink">Light / Photons</span>
                <ArrowRight size={14} className="text-ink/40" />
                <span className="px-2.5 py-1 bg-sunshine rounded-md border border-ink">Pixels (R, G, B)</span>
                <ArrowRight size={14} className="text-ink/40" />
                <span className="px-2.5 py-1 bg-[#dcecff] rounded-md border border-ink">3D Matrix [H, W, 3]</span>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white rounded-xl border-2 border-ink shadow-[3px_3px_0_#17191f]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fbe1eb] border-2 border-ink flex items-center justify-center font-bold text-ink">
                  <Type size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base">Text & Language</h4>
                  <p className="text-xs text-ink/60 font-medium">Written symbols</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm flex-wrap">
                <span className="px-2.5 py-1 bg-[#f4f5f8] rounded-md border border-ink">Words & Sentences</span>
                <ArrowRight size={14} className="text-ink/40" />
                <span className="px-2.5 py-1 bg-sunshine rounded-md border border-ink">Tokens & IDs</span>
                <ArrowRight size={14} className="text-ink/40" />
                <span className="px-2.5 py-1 bg-[#fbe1eb] rounded-md border border-ink">Embedding Vectors</span>
              </div>
            </div>

            {/* Audio */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white rounded-xl border-2 border-ink shadow-[3px_3px_0_#17191f]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9baff] border-2 border-ink flex items-center justify-center font-bold text-ink">
                  <Volume2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-base">Audio & Speech</h4>
                  <p className="text-xs text-ink/60 font-medium">Air pressure vibrations</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm flex-wrap">
                <span className="px-2.5 py-1 bg-[#f4f5f8] rounded-md border border-ink">Continuous Waveform</span>
                <ArrowRight size={14} className="text-ink/40" />
                <span className="px-2.5 py-1 bg-sunshine rounded-md border border-ink">44.1k Samples/sec</span>
                <ArrowRight size={14} className="text-ink/40" />
                <span className="px-2.5 py-1 bg-[#c9baff] rounded-md border border-ink">Spectrogram Matrix</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-ink/20 text-center font-bold text-lg leading-relaxed">
            Different types of information are all converted into <Highlight color="#fffdf8">structured numbers</Highlight>.<br />
            Once everything is numbers, mathematics can find the patterns.
          </div>
        </div>
      </section>
    </div>
  );
}
