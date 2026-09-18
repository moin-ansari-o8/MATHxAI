import React, { useState } from 'react';
import { Layers, ZoomIn } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function SemanticSpace() {
  const [activeFilters, setActiveFilters] = useState({
    Animals: true,
    Food: true,
    Vehicles: true,
    People: true
  });
  const [zoomLevel, setZoomLevel] = useState('Whole space');
  const [selectedWord, setSelectedWord] = useState(null);

  const categories = [
    { name: 'Animals', color: '#237957' },
    { name: 'Food', color: '#ec5faa' },
    { name: 'Vehicles', color: '#6654f5' },
    { name: 'People', color: '#17191f' },
  ];

  // A larger toy dataset clustered roughly
  const dataset = [
    // Animals (top left cluster)
    { text: 'dog', cat: 'Animals', x: 20, y: 20 },
    { text: 'puppy', cat: 'Animals', x: 22, y: 18 },
    { text: 'hound', cat: 'Animals', x: 18, y: 22 },
    { text: 'cat', cat: 'Animals', x: 25, y: 30 },
    { text: 'kitten', cat: 'Animals', x: 27, y: 28 },
    { text: 'tiger', cat: 'Animals', x: 35, y: 35 },
    { text: 'lion', cat: 'Animals', x: 38, y: 33 },

    // Food (bottom left cluster)
    { text: 'apple', cat: 'Food', x: 20, y: 80 },
    { text: 'banana', cat: 'Food', x: 25, y: 75 },
    { text: 'orange', cat: 'Food', x: 22, y: 85 },
    { text: 'bread', cat: 'Food', x: 35, y: 70 },
    { text: 'rice', cat: 'Food', x: 38, y: 75 },
    { text: 'pizza', cat: 'Food', x: 40, y: 85 },

    // Vehicles (top right cluster)
    { text: 'car', cat: 'Vehicles', x: 80, y: 20 },
    { text: 'truck', cat: 'Vehicles', x: 75, y: 15 },
    { text: 'bus', cat: 'Vehicles', x: 85, y: 25 },
    { text: 'bicycle', cat: 'Vehicles', x: 70, y: 30 },
    { text: 'airplane', cat: 'Vehicles', x: 90, y: 35 },

    // People (bottom right cluster)
    { text: 'man', cat: 'People', x: 80, y: 80 },
    { text: 'woman', cat: 'People', x: 85, y: 75 },
    { text: 'child', cat: 'People', x: 75, y: 85 },
    { text: 'doctor', cat: 'People', x: 70, y: 70 },
    { text: 'teacher', cat: 'People', x: 85, y: 65 },
  ];

  const getCatColor = (catName) => categories.find(c => c.name === catName).color;

  const toggleFilter = (cat) => {
    setActiveFilters(prev => ({...prev, [cat]: !prev[cat]}));
    setSelectedWord(null); // clear selection on filter change
  };

  // ViewBox logic for zooming
  // Default: 0 0 100 100
  // Animals: 10 10 35 35
  // Dogs: 15 15 10 10
  let viewBox = "0 0 100 100";
  if (zoomLevel === 'Animals') viewBox = "10 10 35 35";
  if (zoomLevel === 'Dogs') viewBox = "15 15 10 10";

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">7</span>
            Semantic Space
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A <Highlight color="#237957">Semantic Space</Highlight> is a representation space where geometric relationships reflect meaning. 
            <br/><br/>
            Because the embedding model maps concepts based on how they relate to everything else, natural clusters form. Animals end up in one region, food in another, and within the "Animal" region, you'll find even smaller clusters of "Pets" or "Wild Animals".
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Layers className="text-[#ec5faa]" />
          Explore Meaning as a Map
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map(cat => (
              <button 
                key={cat.name}
                onClick={() => toggleFilter(cat.name)}
                className={`px-4 py-2 rounded-lg font-bold border-2 border-ink transition-all flex items-center gap-2`}
                style={{
                  backgroundColor: activeFilters[cat.name] ? cat.color : '#fff',
                  color: activeFilters[cat.name] ? '#fff' : '#17191f',
                  opacity: activeFilters[cat.name] ? 1 : 0.5
                }}
              >
                <div className={`w-3 h-3 rounded-full border border-ink ${activeFilters[cat.name] ? 'bg-white' : ''}`} style={{backgroundColor: activeFilters[cat.name] ? '#fff' : cat.color}}></div>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            {/* Map */}
            <div className="w-full aspect-square bg-paper border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden">
              <svg width="100%" height="100%" viewBox={viewBox} className="absolute inset-0 transition-all duration-1000 ease-in-out">
                {/* Background Grid */}
                <g opacity="0.05">
                  {Array.from({length: 20}).map((_, i) => (
                    <React.Fragment key={i}>
                      <line x1={0} y1={i*5} x2={100} y2={i*5} stroke="#17191f" strokeWidth="0.2" />
                      <line x1={i*5} y1={0} x2={i*5} y2={100} stroke="#17191f" strokeWidth="0.2" />
                    </React.Fragment>
                  ))}
                </g>

                {/* Connections from selected word */}
                {selectedWord && dataset.map(w => {
                  if (w.text === selectedWord) return null;
                  const target = dataset.find(d => d.text === selectedWord);
                  const isVisibleTarget = activeFilters[target.cat];
                  const isVisibleW = activeFilters[w.cat];
                  if (!isVisibleTarget || !isVisibleW) return null;

                  const dist = Math.sqrt(Math.pow(w.x - target.x, 2) + Math.pow(w.y - target.y, 2));
                  if (dist > 15) return null; // Only connect very close neighbors for clarity

                  return (
                    <line 
                      key={`l_${w.text}`}
                      x1={target.x} y1={target.y}
                      x2={w.x} y2={w.y}
                      stroke={getCatColor(target.cat)}
                      strokeWidth="0.3"
                      opacity={dist < 5 ? 0.6 : 0.2}
                    />
                  )
                })}

                {/* Words */}
                {dataset.map(word => {
                  if (!activeFilters[word.cat]) return null;
                  
                  const isSelected = word.text === selectedWord;
                  const baseSize = zoomLevel === 'Dogs' ? 0.5 : zoomLevel === 'Animals' ? 1.5 : 3;
                  const fontSize = zoomLevel === 'Dogs' ? 1 : zoomLevel === 'Animals' ? 2 : 4;

                  return (
                    <g 
                      key={word.text} 
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedWord(word.text)}
                    >
                      {isSelected && (
                        <circle cx={word.x} cy={word.y} r={baseSize*2.5} fill="none" stroke={getCatColor(word.cat)} strokeWidth="0.5" className="animate-ping" />
                      )}
                      <circle cx={word.x} cy={word.y} r={isSelected ? baseSize*1.5 : baseSize} fill={getCatColor(word.cat)} stroke="#17191f" strokeWidth={zoomLevel === 'Dogs' ? 0.1 : 0.5} />
                      <text 
                        x={word.x + baseSize + (zoomLevel === 'Dogs' ? 0.5 : 1)} y={word.y + baseSize/2} 
                        fontSize={isSelected ? fontSize*1.2 : fontSize} 
                        fontWeight="bold" 
                        fill="#17191f"
                        style={{textShadow: '0.5px 0.5px 0 #fff'}}
                      >
                        {word.text}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Zoom Controls */}
            <div className="space-y-6">
              <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-4 flex items-center gap-2"><ZoomIn size={16}/> ZOOM LEVEL</h3>
                <div className="space-y-2">
                  {['Whole space', 'Animals', 'Dogs'].map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        setZoomLevel(level);
                        // Force animal filter on if zooming into animals
                        if (level !== 'Whole space') {
                          setActiveFilters(prev => ({...prev, Animals: true}));
                        }
                      }}
                      className={`w-full p-3 rounded-lg font-bold border-2 text-left transition-all ${zoomLevel === level ? 'bg-[#c9baff] border-ink translate-x-2' : 'bg-white border-transparent hover:border-ink/20 opacity-70 hover:opacity-100'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {selectedWord && (
                <div className="bg-white p-4 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f] animate-in slide-in-from-right-4">
                  <div className="text-xs font-bold opacity-50 mb-1 uppercase tracking-widest">Selected Concept</div>
                  <div className="text-xl font-bold font-display" style={{color: getCatColor(dataset.find(d=>d.text===selectedWord).cat)}}>{selectedWord}</div>
                  <div className="text-sm font-medium opacity-80 mt-2">
                    Notice how selecting a concept reveals its local neighborhood geometry.
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#e63946] text-white shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">Important Caveat</h2>
          <div className="bg-white/10 p-6 rounded-xl border-2 border-white/20 font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Embedding spaces do not contain one universal, perfectly objective map of meaning.
            </p>
            <p className="mt-4 text-base font-medium opacity-90">
              The structure you see depends entirely on the data the model was trained on, the architecture of the model, and the mathematical objective it was trying to optimize. "Similarity" is defined by the specific task the model was built for.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
