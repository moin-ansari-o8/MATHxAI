import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Image as ImageIcon, Grid, Hash, ZoomIn } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function ImagesToMatrices() {
  const [viewMode, setViewMode] = useState('image'); // 'image', 'pixels', 'matrix'
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  
  // A simple 5x5 pixel art heart for demonstration
  const pixelArt = [
    [{r: 255, g: 255, b: 255}, {r: 245, g: 138, b: 180}, {r: 255, g: 255, b: 255}, {r: 245, g: 138, b: 180}, {r: 255, g: 255, b: 255}],
    [{r: 245, g: 138, b: 180}, {r: 245, g: 138, b: 180}, {r: 245, g: 138, b: 180}, {r: 245, g: 138, b: 180}, {r: 245, g: 138, b: 180}],
    [{r: 255, g: 255, b: 255}, {r: 245, g: 138, b: 180}, {r: 245, g: 138, b: 180}, {r: 245, g: 138, b: 180}, {r: 255, g: 255, b: 255}],
    [{r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, {r: 245, g: 138, b: 180}, {r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}],
    [{r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}, {r: 255, g: 255, b: 255}],
  ];

  const applyFilters = (color) => {
    let r = color.r;
    let g = color.g;
    let b = color.b;
    
    // Grayscale
    if (isGrayscale) {
      const avg = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      r = g = b = avg;
    }
    
    // Brightness
    r = Math.min(255, Math.max(0, r * (brightness / 100)));
    g = Math.min(255, Math.max(0, g * (brightness / 100)));
    b = Math.min(255, Math.max(0, b * (brightness / 100)));
    
    // Contrast
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    r = Math.min(255, Math.max(0, factor * (r - 128) + 128));
    g = Math.min(255, Math.max(0, factor * (g - 128) + 128));
    b = Math.min(255, Math.max(0, factor * (b - 128) + 128));
    
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">1</span>
            Images are just numbers
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A computer doesn't see an image the way you do. It sees a <Highlight color="#62a9ff">grid of numbers</Highlight>.
          </p>
          <div className="bg-[#fff4d9] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center text-center font-bold">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-lg">
              <span>Image</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Pixels</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Pixel Values</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Matrix</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - Pixel Explorer */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <ZoomIn className="text-[#6654f5]" />
          Pixel Explorer
        </h2>
        
        <div className="grid md:grid-cols-[1fr_250px] gap-6 mb-8">
          <div className="p-5 rounded-xl border-2 border-ink bg-white shadow-[4px_5px_0_#17191f] flex flex-col items-center">
            
            <div className="flex gap-2 mb-6 bg-paper p-1.5 rounded-lg border-2 border-ink/10">
              <button 
                onClick={() => setViewMode('image')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all ${viewMode === 'image' ? 'bg-white shadow-[2px_2px_0_#17191f] border-2 border-ink' : 'text-ink/60 hover:text-ink border-2 border-transparent'}`}
              >
                <ImageIcon size={18} /> Image
              </button>
              <button 
                onClick={() => setViewMode('pixels')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all ${viewMode === 'pixels' ? 'bg-white shadow-[2px_2px_0_#17191f] border-2 border-ink' : 'text-ink/60 hover:text-ink border-2 border-transparent'}`}
              >
                <Grid size={18} /> Pixels
              </button>
              <button 
                onClick={() => setViewMode('matrix')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold transition-all ${viewMode === 'matrix' ? 'bg-white shadow-[2px_2px_0_#17191f] border-2 border-ink' : 'text-ink/60 hover:text-ink border-2 border-transparent'}`}
              >
                <Hash size={18} /> Matrix
              </button>
            </div>

            <div className="w-full max-w-[300px] aspect-square grid grid-cols-5 gap-0 border-4 border-ink shadow-[4px_4px_0_#17191f] overflow-hidden bg-white">
              {pixelArt.map((row, y) => (
                row.map((color, x) => {
                  const finalColor = applyFilters(color);
                  return (
                    <div 
                      key={`${x}-${y}`} 
                      className="w-full h-full cursor-crosshair transition-all duration-100 flex items-center justify-center"
                      style={{ 
                        backgroundColor: `rgb(${finalColor.r}, ${finalColor.g}, ${finalColor.b})`,
                        border: viewMode === 'pixels' ? '1px solid rgba(23, 25, 31, 0.1)' : 'none'
                      }}
                      onMouseEnter={() => setHoveredPixel({ x, y, color: finalColor })}
                      onMouseLeave={() => setHoveredPixel(null)}
                    >
                      {viewMode === 'matrix' && (
                        <span className="text-[10px] sm:text-xs font-mono font-bold bg-white/70 px-1 rounded text-ink pointer-events-none">
                          {isGrayscale ? finalColor.r : `${finalColor.r},${finalColor.g}...`}
                        </span>
                      )}
                    </div>
                  )
                })
              ))}
            </div>
            
          </div>

          <div className="p-6 rounded-xl border-2 border-ink bg-[#c9baff] shadow-[4px_5px_0_#17191f]">
            <h3 className="font-bold text-lg mb-4 uppercase tracking-widest text-ink/50 text-xs">Pixel Inspector</h3>
            {hoveredPixel ? (
              <div className="space-y-3 font-mono font-bold text-lg bg-white/80 p-4 rounded-lg border-2 border-ink/10 shadow-inner">
                <div>x: {hoveredPixel.x}</div>
                <div>y: {hoveredPixel.y}</div>
                <div className="h-px w-full bg-ink/20 my-2"></div>
                <div className="text-[#d83f97]">R: {hoveredPixel.color.r}</div>
                <div className="text-[#237957]">G: {hoveredPixel.color.g}</div>
                <div className="text-[#4185d9]">B: {hoveredPixel.color.b}</div>
              </div>
            ) : (
              <div className="text-ink/60 font-medium italic p-4 text-center border-2 border-dashed border-ink/20 rounded-lg">
                Hover over the image to inspect pixels
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Hands-on Experiment */}
      <section>
        <div className="p-8 rounded-[20px] border-[3px] border-ink bg-[#dcecff] shadow-[6px_8px_0_#17191f]">
          <h3 className="font-display font-bold text-2xl mb-4">Try It</h3>
          <p className="font-medium mb-6 text-ink/80">Change the image properties and watch the numerical values change live.</p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-bold mb-2">
                  <label>Brightness</label>
                  <span>{brightness}%</span>
                </div>
                <input 
                  type="range" min="0" max="200" value={brightness} 
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-[#62a9ff]"
                />
              </div>
              
              <div>
                <div className="flex justify-between font-bold mb-2">
                  <label>Contrast</label>
                  <span>{contrast}%</span>
                </div>
                <input 
                  type="range" min="0" max="200" value={contrast} 
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-[#62a9ff]"
                />
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-start gap-4 p-6 bg-white/50 border-2 border-ink rounded-xl border-dashed">
              <span className="font-bold">Color Mode</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsGrayscale(false)}
                  className={`px-4 py-2 rounded-lg font-bold border-2 border-ink transition-all ${!isGrayscale ? 'bg-sunshine shadow-[3px_3px_0_#17191f] -translate-y-1' : 'bg-white text-ink/60'}`}
                >
                  RGB
                </button>
                <button 
                  onClick={() => setIsGrayscale(true)}
                  className={`px-4 py-2 rounded-lg font-bold border-2 border-ink transition-all ${isGrayscale ? 'bg-sunshine shadow-[3px_3px_0_#17191f] -translate-y-1' : 'bg-white text-ink/60'}`}
                >
                  Grayscale
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Real AI Connection */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fbe1eb] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How this connects to real AI</h2>
          
          <div className="bg-white/80 border-2 border-ink p-6 rounded-xl shadow-[4px_4px_0_#17191f] mb-6 font-mono font-bold text-sm sm:text-base overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              <span>Photo</span> <ArrowRight size={16} /> 
              <span className="text-[#4185d9]">Pixels</span> <ArrowRight size={16} />
              <span className="text-[#6654f5]">Matrix / Tensor</span> <ArrowRight size={16} />
              <span className="bg-ink text-white px-3 py-1 rounded">Neural Network</span> <ArrowRight size={16} />
              <span className="bg-[#dff4e8] border-2 border-ink px-3 py-1 rounded">"Dog"</span>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed">
            Image models learn patterns from <Highlight color="#fffdf8">numerical pixel data</Highlight>, eventually building up from simple patterns such as edges and textures toward more complex visual patterns.
          </div>
        </div>
      </section>
    </div>
  );
}
