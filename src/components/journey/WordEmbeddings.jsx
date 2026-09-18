import React, { useState } from 'react';
import { Type, Search } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function WordEmbeddings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeWord, setActiveWord] = useState(null);

  // Toy 2D word embedding dictionary
  const dictionary = [
    { text: 'king', x: 20, y: 20, type: 'royal' },
    { text: 'queen', x: 30, y: 25, type: 'royal' },
    { text: 'prince', x: 25, y: 15, type: 'royal' },
    
    { text: 'man', x: 20, y: 60, type: 'person' },
    { text: 'woman', x: 30, y: 65, type: 'person' },
    { text: 'child', x: 25, y: 55, type: 'person' },
    
    { text: 'dog', x: 75, y: 20, type: 'animal' },
    { text: 'cat', x: 80, y: 30, type: 'animal' },
    { text: 'puppy', x: 70, y: 25, type: 'animal' },
    
    { text: 'car', x: 75, y: 80, type: 'vehicle' },
    { text: 'bus', x: 85, y: 75, type: 'vehicle' },
    { text: 'truck', x: 80, y: 85, type: 'vehicle' },
  ];

  const getColor = (type) => {
    switch(type) {
      case 'royal': return '#ec5faa';
      case 'person': return '#6654f5';
      case 'animal': return '#237957';
      case 'vehicle': return '#e63946';
      default: return '#17191f';
    }
  };

  const getNeighbors = (targetText) => {
    const target = dictionary.find(w => w.text === targetText);
    if (!target) return [];
    
    return dictionary
      .filter(w => w.text !== target.text)
      .map(w => ({
        ...w,
        dist: Math.sqrt(Math.pow(w.x - target.x, 2) + Math.pow(w.y - target.y, 2))
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 4);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const found = dictionary.find(w => w.text.toLowerCase() === searchTerm.toLowerCase().trim());
    if (found) {
      setActiveWord(found.text);
    } else {
      setActiveWord(null);
    }
  };

  const neighbors = activeWord ? getNeighbors(activeWord) : [];

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">6</span>
            Word Embeddings
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If we can represent a movie as a vector, can we do the same thing for <Highlight color="#c9baff">Words</Highlight>?
            <br/><br/>
            Yes. By mapping words into a geometric space, AI models can mathematically understand that "dog" and "puppy" are close together, while "car" is far away.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Type className="text-[#ec5faa]" />
          Word Map
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
            
            {/* Map */}
            <div className="w-full aspect-square bg-paper border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden">
              <div className="absolute top-2 left-2 text-[10px] font-bold opacity-30">EDUCATIONAL 2D PROJECTION</div>
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                {/* Background Grid */}
                <g opacity="0.05">
                  {Array.from({length: 10}).map((_, i) => (
                    <React.Fragment key={i}>
                      <line x1={0} y1={i*10} x2={100} y2={i*10} stroke="#17191f" strokeWidth="0.5" />
                      <line x1={i*10} y1={0} x2={i*10} y2={100} stroke="#17191f" strokeWidth="0.5" />
                    </React.Fragment>
                  ))}
                </g>

                {/* Connections to neighbors if active */}
                {activeWord && neighbors.map(n => {
                  const target = dictionary.find(w => w.text === activeWord);
                  return (
                    <line 
                      key={`l_${n.text}`}
                      x1={target.x} y1={target.y}
                      x2={n.x} y2={n.y}
                      stroke={getColor(target.type)}
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  )
                })}

                {/* Words */}
                {dictionary.map(word => {
                  const isActive = word.text === activeWord;
                  const isNeighbor = neighbors.some(n => n.text === word.text);
                  const isFaded = activeWord && !isActive && !isNeighbor;

                  return (
                    <g 
                      key={word.text} 
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setActiveWord(word.text);
                        setSearchTerm(word.text);
                      }}
                      style={{ opacity: isFaded ? 0.2 : 1 }}
                    >
                      {isActive && (
                        <circle cx={word.x} cy={word.y} r="8" fill="none" stroke={getColor(word.type)} strokeWidth="0.5" className="animate-ping" />
                      )}
                      <circle cx={word.x} cy={word.y} r={isActive ? 3 : 2} fill={getColor(word.type)} stroke="#17191f" strokeWidth="0.5" />
                      <text 
                        x={word.x + 3} y={word.y + 1} 
                        fontSize={isActive ? "6" : "4"} 
                        fontWeight="bold" 
                        fill="#17191f"
                      >
                        {word.text}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Search panel */}
            <div className="space-y-6">
              
              <form onSubmit={handleSearchSubmit} className="bg-[#c9baff] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xs tracking-widest opacity-80 mb-4 flex items-center gap-2">SEARCH DICTIONARY</h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. dog, king, car"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded border-2 border-ink font-bold text-sm focus:outline-none focus:ring-2 focus:ring-sunshine"
                  />
                  <button type="submit" className="bg-white p-2 rounded border-2 border-ink hover:bg-sunshine transition-colors">
                    <Search size={18} />
                  </button>
                </div>
                {searchTerm && !dictionary.find(w => w.text.toLowerCase() === searchTerm.toLowerCase().trim()) && (
                  <div className="text-xs font-bold text-[#e63946] mt-2">Word not in toy dictionary.</div>
                )}
              </form>

              {activeWord && (
                <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] animate-in slide-in-from-right-4">
                  <h3 className="font-bold text-xs tracking-widest opacity-60 mb-4">NEAREST CONCEPTS</h3>
                  <div className="space-y-3">
                    {neighbors.map((n, i) => (
                      <div key={n.text} className="flex items-center gap-3 bg-white p-2 border-2 border-ink rounded font-bold text-sm">
                        <span className="opacity-40">{i+1}.</span>
                        <span style={{color: getColor(n.type)}}>{n.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">Important Explanation</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              A word embedding does not simply store a dictionary definition. It is a learned representation shaped entirely by how words occur and relate to other words in massive datasets.
            </p>
            <p className="mt-4 text-[#237957]">
              The core intuition of modern NLP: <strong>You can learn useful information about a word simply by looking at how it is used in context.</strong>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
