import React, { useState } from 'react';
import { BookOpen, Activity } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function WhySimilarClose() {
  const [data, setData] = useState([
    { name: 'DOG', contexts: { eats: true, drives: false, barks: true, flies: false, runs: true }, color: '#ec5faa' },
    { name: 'CAT', contexts: { eats: true, drives: false, barks: false, flies: false, runs: true }, color: '#c9baff' },
    { name: 'CAR', contexts: { eats: false, drives: true, barks: false, flies: false, runs: false }, color: '#237957' },
    { name: 'BIRD', contexts: { eats: true, drives: false, barks: false, flies: true, runs: false }, color: '#6654f5' },
  ]);

  const toggleContext = (idx, ctx) => {
    const newData = [...data];
    newData[idx].contexts[ctx] = !newData[idx].contexts[ctx];
    setData(newData);
  };

  // Convert binary contexts to a 2D projection
  // X = eats + barks + runs - drives - flies
  // Y = flies + drives - eats - barks - runs
  const getPoint = (contexts) => {
    let x = 0;
    let y = 0;
    if (contexts.eats) { x += 20; y -= 10; }
    if (contexts.barks) { x += 20; y -= 20; }
    if (contexts.runs) { x += 10; y -= 10; }
    if (contexts.drives) { x -= 30; y += 40; }
    if (contexts.flies) { x -= 20; y += 40; }

    return {
      x: 50 + x,
      y: 50 + y
    };
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">8</span>
            Why Similar Things End Up Close Together
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            The ultimate payoff: How does a model actually learn this structure? 
            <br/><br/>
            An AI doesn't have a dictionary. It learns meaning through <Highlight color="#237957">Context</Highlight>. If two words constantly appear in the exact same contexts, the model has to push their vectors close together to solve its training task effectively.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <BookOpen className="text-[#ec5faa]" />
          Teach Meaning Through Context
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
            
            {/* Input Contexts */}
            <div className="space-y-6">
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
                <h3 className="font-bold text-xs tracking-widest opacity-60 flex items-center gap-2"><Activity size={16}/> ASSIGN CONTEXTS</h3>
                
                <div className="space-y-6">
                  {data.map((item, idx) => (
                    <div key={item.name} className="space-y-2 pb-4 border-b-2 border-ink/10 last:border-0 last:pb-0">
                      <div className="font-bold text-lg font-display" style={{color: item.color}}>{item.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(item.contexts).map(ctx => (
                          <button
                            key={ctx}
                            onClick={() => toggleContext(idx, ctx)}
                            className={`px-3 py-1 rounded text-xs font-bold border-2 transition-all ${item.contexts[ctx] ? 'bg-[#c9baff] border-ink' : 'bg-white border-ink/20 opacity-50 hover:opacity-100 hover:border-ink/50'}`}
                          >
                            {ctx}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Space */}
            <div className="w-full aspect-square bg-[#fffdf8] border-2 border-ink rounded-xl relative shadow-[4px_4px_0_#17191f] overflow-hidden">
              <div className="absolute top-2 left-2 text-[10px] font-bold opacity-30">EDUCATIONAL 2D REPRESENTATION</div>
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                <g opacity="0.05">
                  {Array.from({length: 10}).map((_, i) => (
                    <React.Fragment key={i}>
                      <line x1={0} y1={i*10} x2={100} y2={i*10} stroke="#17191f" strokeWidth="0.5" />
                      <line x1={i*10} y1={0} x2={i*10} y2={100} stroke="#17191f" strokeWidth="0.5" />
                    </React.Fragment>
                  ))}
                </g>

                {/* Draw points */}
                {data.map(item => {
                  const pt = getPoint(item.contexts);
                  return (
                    <g key={item.name} className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                      <circle cx={pt.x} cy={pt.y} r="4" fill={item.color} stroke="#17191f" strokeWidth="1" />
                      <text x={pt.x + 5} y={pt.y + 2} fontSize="5" fontWeight="bold" fill="#17191f">
                        {item.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-xl border-2 border-ink shadow-[2px_2px_0_#17191f] text-sm font-medium leading-relaxed backdrop-blur-sm">
                <strong>Experiment:</strong> Give the DOG and CAT identical contexts. Notice how their points snap together? <br/>
                <span className="text-[#ec5faa] font-bold">Similar usage = Similar geometry.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">The Grand Takeaway</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f] space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#17191f] text-white px-3 py-1 rounded text-sm whitespace-nowrap">RAW WORD</div>
              <div className="text-ink/40">→</div>
              <div className="bg-[#6654f5] text-white px-3 py-1 rounded text-sm whitespace-nowrap">EMBEDDING</div>
              <div className="text-ink/40">→</div>
              <div className="bg-[#ec5faa] text-white px-3 py-1 rounded text-sm whitespace-nowrap">GEOMETRY</div>
            </div>
            <p className="mt-6">
              Embeddings let AI represent complex things as vectors, making the relationships between those things accessible to mathematics.
            </p>
            <p className="text-[#237957]">
              The model does not need a human to manually draw the semantic map. It learns representations directly from patterns in data.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
