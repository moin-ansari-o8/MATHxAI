import React, { useState } from 'react';
import { Film, Search } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function VectorsAsMeaning() {
  const [vector, setVector] = useState({ action: 8, comedy: 2, romance: 1, drama: 6 });

  // A tiny database of predefined movies with their "true" vectors in our space
  const db = [
    { name: "Die Hard", action: 9, comedy: 3, romance: 1, drama: 4, color: '#ec5faa' },
    { name: "The Notebook", action: 1, comedy: 2, romance: 9, drama: 8, color: '#c9baff' },
    { name: "Superbad", action: 2, comedy: 9, romance: 4, drama: 2, color: '#237957' },
    { name: "The Matrix", action: 9, comedy: 1, romance: 2, drama: 6, color: '#17191f' },
    { name: "Forrest Gump", action: 3, comedy: 6, romance: 7, drama: 8, color: '#6654f5' },
    { name: "Deadpool", action: 8, comedy: 9, romance: 3, drama: 2, color: '#e63946' },
  ];

  // Calculate distances to find neighbors
  const getNeighbors = () => {
    return db.map(movie => {
      // Euclidean distance in 4D
      const dx = movie.action - vector.action;
      const dy = movie.comedy - vector.comedy;
      const dz = movie.romance - vector.romance;
      const dw = movie.drama - vector.drama;
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz + dw*dw);
      return { ...movie, dist };
    }).sort((a, b) => a.dist - b.dist);
  };

  const neighbors = getNeighbors();

  // For the 2D projection visualization, let's map:
  // X = Action - Romance (more action = right, more romance = left)
  // Y = Comedy - Drama (more comedy = up (lower Y), more drama = down (higher Y))
  // This is a super simplified PCA-like projection for educational purposes
  const getProjection = (v) => {
    const x = ((v.action - v.romance) / 20) * 100 + 50; // map -10..10 to 0..100
    const y = ((v.drama - v.comedy) / 20) * 100 + 50; // inverted Y in SVG
    return { x, y };
  };

  const userPoint = getProjection(vector);

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">4</span>
            Vectors as Meaning
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            So far, our vectors have represented raw physical measurements (like weight or speed). But a vector can also represent <Highlight color="#6654f5">abstract concepts and meaning.</Highlight>
            <br/><br/>
            Imagine we wanted to represent a Movie as a list of numbers. We could score it across different genres to build its "Meaning Vector".
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Film className="text-[#ec5faa]" />
          Build a Meaning Vector
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Input Sliders */}
            <div className="space-y-8">
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
                <h3 className="font-bold text-sm tracking-widest opacity-60 flex items-center gap-2">RATE YOUR MOVIE (0-10)</h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'action', label: 'Action', color: '#e63946' },
                    { key: 'comedy', label: 'Comedy', color: '#6654f5' },
                    { key: 'romance', label: 'Romance', color: '#ec5faa' },
                    { key: 'drama', label: 'Drama', color: '#237957' }
                  ].map(feature => (
                    <div key={feature.key} className="space-y-2">
                      <div className="flex justify-between font-bold text-sm">
                        <span>{feature.label}</span>
                        <span className="font-mono" style={{color: feature.color}}>{vector[feature.key].toFixed(1)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="10" step="0.1" 
                        value={vector[feature.key]} 
                        onChange={(e) => setVector({...vector, [feature.key]: parseFloat(e.target.value)})}
                        className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer"
                        style={{accentColor: feature.color}}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Vector Output */}
              <div className="bg-[#1e1e1e] border-2 border-ink rounded-xl shadow-[4px_4px_0_#17191f] p-6 text-center text-white font-mono animate-in fade-in">
                <div className="text-xs font-bold tracking-widest text-white/50 mb-4">RESULTING 4D VECTOR</div>
                <div className="text-xl sm:text-2xl font-bold flex flex-wrap justify-center gap-3">
                  <span className="text-sunshine">[</span>
                  <span style={{color: '#e63946'}}>{vector.action.toFixed(1)},</span>
                  <span style={{color: '#6654f5'}}>{vector.comedy.toFixed(1)},</span>
                  <span style={{color: '#ec5faa'}}>{vector.romance.toFixed(1)},</span>
                  <span style={{color: '#237957'}}>{vector.drama.toFixed(1)}</span>
                  <span className="text-sunshine">]</span>
                </div>
              </div>
            </div>

            {/* Space / Neighbors */}
            <div className="space-y-8">
              <div className="w-full aspect-square bg-[#fffdf8] border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] font-bold opacity-30">2D PROJECTION OF 4D SPACE</div>
                
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#17191f" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2"/>
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#17191f" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2"/>
                  
                  {/* Draw Database Movies */}
                  {db.map((movie, i) => {
                    const pt = getProjection(movie);
                    return (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="3" fill={movie.color} stroke="#17191f" strokeWidth="1" opacity="0.5" />
                        <text x={pt.x + 4} y={pt.y + 2} fontSize="4" fontWeight="bold" fill="#17191f" opacity="0.5">{movie.name}</text>
                      </g>
                    )
                  })}

                  {/* Draw User Point */}
                  <g className="transition-all duration-300">
                    <circle cx={userPoint.x} cy={userPoint.y} r="5" fill="#sunshine" stroke="#17191f" strokeWidth="2" className="animate-pulse" />
                    <text x={userPoint.x + 6} y={userPoint.y + 2} fontSize="5" fontWeight="bold" fill="#17191f">Your Movie</text>
                  </g>
                </svg>
              </div>

              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-sm tracking-widest opacity-60 flex items-center gap-2 mb-4"><Search size={16}/> NEAREST NEIGHBORS</h3>
                <div className="space-y-3">
                  {neighbors.slice(0, 3).map((movie, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">
                      <div className="flex items-center gap-3">
                        <span className="opacity-40 font-bold text-sm">{i+1}.</span>
                        <span className="font-bold" style={{color: movie.color}}>{movie.name}</span>
                      </div>
                      <span className="font-mono text-xs opacity-50">Dist: {movie.dist.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h3 className="font-display text-xl font-bold mb-4">Important Concept</h3>
          <p className="text-lg font-medium leading-relaxed">
            A representation can capture useful properties of something. But meaning is not automatically inherent in the numbers. It depends entirely on how the representation was designed or learned. 
            <br/><br/>
            In this toy example, we manually designed the genres. In real AI, <Highlight color="#ec5faa">models learn these representations themselves from data.</Highlight>
          </p>
        </div>
      </section>
      
    </div>
  );
}
