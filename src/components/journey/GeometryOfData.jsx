import React, { useState } from 'react';
import { Map, Table as TableIcon, Code, Move } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function GeometryOfData() {
  const [view, setView] = useState('space'); // table, vectors, space
  const [customSpeed, setCustomSpeed] = useState(50);
  const [customWeight, setCustomWeight] = useState(50);

  // Normalize data for 0-100 grid visually (0-100 scale mapping)
  // Let's pretend Speed goes 0-100, Weight goes 0-100 (log-ish or just scaled)
  const items = [
    { name: 'Cat', speed: 15, weight: 10, color: '#ec5faa' },
    { name: 'Dog', speed: 25, weight: 20, color: '#c9baff' },
    { name: 'Car', speed: 90, weight: 85, color: '#237957' }
  ];

  const renderTable = () => (
    <div className="w-full bg-white border-2 border-ink rounded-xl overflow-hidden shadow-[4px_4px_0_#17191f] animate-in fade-in">
      <div className="grid grid-cols-3 bg-paper font-bold text-sm tracking-widest border-b-2 border-ink">
        <div className="p-4 border-r-2 border-ink">OBJECT</div>
        <div className="p-4 border-r-2 border-ink">SPEED</div>
        <div className="p-4">WEIGHT</div>
      </div>
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-3 border-b-2 border-ink last:border-b-0 font-mono font-bold">
          <div className="p-4 border-r-2 border-ink" style={{color: item.color}}>{item.name}</div>
          <div className="p-4 border-r-2 border-ink">{item.speed}</div>
          <div className="p-4">{item.weight}</div>
        </div>
      ))}
      <div className="grid grid-cols-3 border-t-4 border-ink font-mono font-bold bg-[#fffdf8]">
        <div className="p-4 border-r-2 border-ink text-[#6654f5]">Custom</div>
        <div className="p-4 border-r-2 border-ink">{customSpeed}</div>
        <div className="p-4">{customWeight}</div>
      </div>
    </div>
  );

  const renderVectors = () => (
    <div className="w-full bg-[#1e1e1e] border-2 border-ink rounded-xl shadow-[4px_4px_0_#17191f] p-6 space-y-4 font-mono text-sm sm:text-base animate-in fade-in">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <span style={{color: item.color}} className="w-16 font-bold">{item.name}</span>
          <span className="text-white">→</span>
          <span className="text-sunshine font-bold">[ {item.speed}, {item.weight} ]</span>
        </div>
      ))}
      <div className="h-2 border-b-2 border-ink/20 my-4"></div>
      <div className="flex gap-4">
        <span className="text-[#6654f5] w-16 font-bold">Custom</span>
        <span className="text-white">→</span>
        <span className="text-sunshine font-bold">[ {customSpeed}, {customWeight} ]</span>
      </div>
    </div>
  );

  const renderSpace = () => (
    <div className="w-full aspect-square bg-paper border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] animate-in fade-in overflow-hidden">
      
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#17191f 1px, transparent 1px), linear-gradient(90deg, #17191f 1px, transparent 1px)', backgroundSize: '10% 10%' }}></div>

      <div className="absolute bottom-2 right-4 font-bold text-xs opacity-40 tracking-widest">SPEED →</div>
      <div className="absolute top-4 left-2 font-bold text-xs opacity-40 tracking-widest -rotate-90 origin-left translate-y-full">WEIGHT →</div>

      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
        
        {/* Origin lines */}
        <line x1="0" y1="100" x2="100" y2="100" stroke="#17191f" strokeWidth="2" />
        <line x1="0" y1="100" x2="0" y2="0" stroke="#17191f" strokeWidth="2" />

        {items.map((item, i) => (
          <g key={i}>
            <line x1="0" y1="100" x2={item.speed} y2={100 - item.weight} stroke={item.color} strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
            <circle cx={item.speed} cy={100 - item.weight} r="3" fill={item.color} stroke="#17191f" strokeWidth="1" />
            <text x={item.speed + 4} y={100 - item.weight + 4} fontSize="6" fontWeight="bold" fill={item.color} style={{textShadow: '1px 1px 0 #fff'}}>{item.name}</text>
          </g>
        ))}

        {/* Custom Point */}
        <g>
          <line x1="0" y1="100" x2={customSpeed} y2={100 - customWeight} stroke="#6654f5" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          <circle cx={customSpeed} cy={100 - customWeight} r="4" fill="#6654f5" stroke="#fff" strokeWidth="1.5" className="animate-pulse" />
          <text x={customSpeed + 5} y={100 - customWeight + 5} fontSize="6" fontWeight="bold" fill="#6654f5" style={{textShadow: '1px 1px 0 #fff'}}>Custom</text>
        </g>
      </svg>
    </div>
  );

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">1</span>
            Geometry of Data
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            In previous chapters, we converted reality into numbers (features), and grouped those numbers into <Highlight color="#c9baff">Vectors</Highlight>.
            <br/><br/>
            Here is the crucial breakthrough: Once data becomes a vector, we can visualize that vector as a <Highlight color="#237957">Point in Space</Highlight>. By doing this, numbers become geometry.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Map className="text-[#ec5faa]" />
          Turn Data Into a Map
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button 
              onClick={() => setView('table')}
              className={`px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all flex items-center gap-2 ${view === 'table' ? 'bg-sunshine shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
            >
              <TableIcon size={18}/> Table
            </button>
            <button 
              onClick={() => setView('vectors')}
              className={`px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all flex items-center gap-2 ${view === 'vectors' ? 'bg-sunshine shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
            >
              <Code size={18}/> Vectors
            </button>
            <button 
              onClick={() => setView('space')}
              className={`px-6 py-3 rounded-xl font-bold border-2 border-ink transition-all flex items-center gap-2 ${view === 'space' ? 'bg-sunshine shadow-[4px_4px_0_#17191f] -translate-y-1' : 'bg-white hover:bg-paper'}`}
            >
              <Move size={18}/> Space
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            <div className="w-full flex justify-center items-center min-h-[400px]">
              {view === 'table' && renderTable()}
              {view === 'vectors' && renderVectors()}
              {view === 'space' && renderSpace()}
            </div>

            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              <h3 className="font-bold text-sm tracking-widest opacity-60 flex items-center gap-2"><Move size={16}/> LIVE EXPERIMENT</h3>
              <p className="text-sm font-medium opacity-80">Change the numbers and watch the custom point move in real time.</p>
              
              <div className="space-y-4 pt-4 border-t-2 border-ink/10">
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <span>Speed</span>
                    <span className="font-mono text-[#6654f5]">{customSpeed}</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={customSpeed} onChange={(e) => setCustomSpeed(parseInt(e.target.value))}
                    className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#6654f5]"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <span>Weight</span>
                    <span className="font-mono text-[#6654f5]">{customWeight}</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={customWeight} onChange={(e) => setCustomWeight(parseInt(e.target.value))}
                    className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#6654f5]"
                  />
                </div>
              </div>

              {view !== 'space' && (
                <div className="bg-[#fffdf8] p-3 rounded-lg border-2 border-ink text-xs font-bold animate-pulse text-center">
                  Switch to "Space" view to see it move!
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Machine learning models operate entirely on numbers. Geometry gives us a way to reason about the relationships between those numbers.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              When a model is analyzing images, text, or user behavior, it is fundamentally calculating the geometric distances and angles between points in a massive, multi-dimensional space.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
}
