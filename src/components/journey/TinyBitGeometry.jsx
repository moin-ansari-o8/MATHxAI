import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Box } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function TinyBitGeometry() {
  const [rotation, setRotation] = useState({ x: 15, y: -25 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of container (-1 to 1)
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    
    // Map to rotation angles
    setRotation({
      x: -y * 30 + 15, // rotateX based on vertical movement
      y: x * 40 - 25   // rotateY based on horizontal movement
    });
  };

  const handleMouseLeave = () => {
    // Reset to default
    setRotation({ x: 15, y: -25 });
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">8</span>
            A Tiny Bit of Geometry
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            When we organize features into a vector, we are implicitly mapping things into <Highlight color="#62a9ff">multi-dimensional space</Highlight>. Every feature adds a new dimension!
          </p>
          <div className="bg-[#fbe1eb] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] text-center font-bold">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <div className="font-mono bg-white px-3 py-1 border-2 border-ink rounded mb-2">[x]</div>
                <div className="text-sm">1D (Line)</div>
              </div>
              <ArrowRight className="hidden md:block text-ink/40" />
              <div className="flex flex-col items-center">
                <div className="font-mono bg-white px-3 py-1 border-2 border-ink rounded mb-2">[x, y]</div>
                <div className="text-sm">2D (Plane)</div>
              </div>
              <ArrowRight className="hidden md:block text-ink/40" />
              <div className="flex flex-col items-center">
                <div className="font-mono bg-white px-3 py-1 border-2 border-ink rounded mb-2">[x, y, z]</div>
                <div className="text-sm">3D (Space)</div>
              </div>
              <ArrowRight className="hidden md:block text-ink/40" />
              <div className="flex flex-col items-center">
                <div className="font-mono bg-white px-3 py-1 border-2 border-ink rounded mb-2">[x₁, ..., xₙ]</div>
                <div className="text-sm">nD (Hyperspace)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - 3D Vector Space */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Box className="text-[#65c99a]" />
          3D Vector Space
        </h2>
        
        <div className="p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-[#c9baff] shadow-[6px_8px_0_#17191f] mb-8">
          
          <div className="mb-6 font-bold text-center">
            Move your mouse over the space below to rotate it!
          </div>

          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[600px] mx-auto aspect-video bg-[#fffdf8] border-4 border-ink rounded-xl shadow-inner relative flex items-center justify-center overflow-hidden cursor-crosshair perspective-[1000px]"
            style={{ perspective: '800px' }}
          >
            {/* The 3D Scene */}
            <div 
              className="relative w-64 h-64 preserve-3d transition-transform duration-100 ease-out"
              style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            >
              
              {/* Z-Axis (Depth) */}
              <div className="absolute top-1/2 left-1/2 w-64 h-1 bg-[#237957] origin-left -translate-y-1/2 translate-x-0 rotate-y-90"></div>
              
              {/* X-Axis (Horizontal) */}
              <div className="absolute top-1/2 left-1/2 w-64 h-1 bg-[#d83f97] origin-left -translate-y-1/2 translate-x-0"></div>
              
              {/* Y-Axis (Vertical) */}
              <div className="absolute top-1/2 left-1/2 w-64 h-1 bg-[#4185d9] origin-left -translate-y-1/2 translate-x-0 -rotate-90"></div>
              
              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-ink rounded-full -translate-x-1/2 -translate-y-1/2 translate-z-1"></div>

              {/* Vector 1 */}
              <div className="absolute top-1/2 left-1/2 w-48 h-1 bg-[#ffda45] origin-left -translate-y-1/2 translate-x-0"
                   style={{ transform: 'rotateZ(-30deg) rotateY(45deg)' }}>
                {/* Vector Head */}
                <div className="absolute right-0 top-1/2 w-4 h-4 rounded-full bg-[#ffda45] border-2 border-ink -translate-y-1/2 shadow-[2px_2px_0_#17191f] hover:scale-150 transition-transform"></div>
              </div>

              {/* Vector 2 */}
              <div className="absolute top-1/2 left-1/2 w-32 h-1 bg-white border-y border-ink origin-left -translate-y-1/2 translate-x-0"
                   style={{ transform: 'rotateZ(45deg) rotateY(-30deg)' }}>
                {/* Vector Head */}
                <div className="absolute right-0 top-1/2 w-4 h-4 rounded-full bg-white border-2 border-ink -translate-y-1/2 shadow-[2px_2px_0_#17191f] hover:scale-150 transition-transform"></div>
              </div>

              {/* Grid Planes to help 3D illusion */}
              <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-ink/10 -translate-x-0 -translate-y-1/2 rotate-x-90"
                   style={{ backgroundImage: 'linear-gradient(rgba(23,25,31,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(23,25,31,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
              </div>
            </div>
            
            {/* Axis labels fixed to screen */}
            <div className="absolute bottom-4 left-4 font-mono font-bold text-sm bg-white/80 p-2 border-2 border-ink rounded flex flex-col gap-1">
              <span className="text-[#d83f97]">— X Axis</span>
              <span className="text-[#4185d9]">— Y Axis</span>
              <span className="text-[#237957]">— Z Axis</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Real AI Connection */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How this connects to real AI</h2>
          
          <div className="bg-white/80 border-2 border-ink p-6 rounded-xl shadow-[4px_4px_0_#17191f] mb-6 font-mono font-bold text-sm sm:text-base">
             Large language models often use vectors with <span className="bg-sunshine border border-ink px-1 rounded">1024</span>, <span className="bg-[#ffda45] border border-ink px-1 rounded">4096</span>, or even <span className="bg-[#f58ab4] border border-ink px-1 rounded text-white">12288</span> dimensions!
          </div>
          
          <div className="font-bold text-lg leading-relaxed">
            Humans can only visualize up to 3 dimensions. But computers have no problem doing geometry in <Highlight color="#fffdf8">thousands of dimensions</Highlight>. 
            <br/><br/>
            When AI thinks, it is plotting points in a massive, unimaginable hyperspace, and checking the distance and angles between them.
          </div>
        </div>
      </section>
    </div>
  );
}
