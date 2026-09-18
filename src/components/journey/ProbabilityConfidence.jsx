import React, { useState } from 'react';
import { BarChart, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function ProbabilityConfidence() {
  const [fur, setFur] = useState(8);
  const [ears, setEars] = useState(7);
  const [whiskers, setWhiskers] = useState(9);

  // Simple scoring for 3 classes based on features
  const catScore = (fur * 0.4) + (ears * 0.6) + (whiskers * 1.2);
  const dogScore = (fur * 0.6) + (ears * 0.3) + (whiskers * 0.2);
  const rabbitScore = (fur * 0.3) + (ears * 1.2) + (whiskers * 0.3);

  // Apply softmax to get probability distribution summing to 100%
  // To avoid extreme 100% / 0% easily, we scale down the scores before exp
  const scale = 0.3; 
  const expCat = Math.exp(catScore * scale);
  const expDog = Math.exp(dogScore * scale);
  const expRabbit = Math.exp(rabbitScore * scale);
  const sumExp = expCat + expDog + expRabbit;

  const catProb = Math.round((expCat / sumExp) * 100);
  const dogProb = Math.round((expDog / sumExp) * 100);
  const rabbitProb = Math.round((expRabbit / sumExp) * 100);

  // Check if we have an ambiguous state
  const maxProb = Math.max(catProb, dogProb, rabbitProb);
  const isAmbiguous = maxProb < 60;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">8</span>
            Probability & Confidence
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            So far, our model has output a single exact number. But many AI systems classify things into categories, and to do that, they need a way to express <Highlight color="#62a9ff">uncertainty</Highlight>.
            <br/><br/>
            Instead of simply saying "It's a cat," the model outputs a probability-like score for every possible option.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <BarChart className="text-[#ec5faa]" />
          Prediction Confidence
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          
          {/* Controls */}
          <div className="bg-white p-6 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] space-y-6">
            <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm text-ink/70">DETECTED FEATURES</h3>
            
            <div>
              <div className="flex justify-between font-bold mb-2 text-sm">
                <label>Fur-like Texture</label>
                <span className="font-mono text-[#d83f97]">{fur}/10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="1" value={fur} 
                onChange={(e) => setFur(parseInt(e.target.value))}
                className="w-full accent-[#d83f97]"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-2 text-sm">
                <label>Pointed Ears</label>
                <span className="font-mono text-[#4185d9]">{ears}/10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="1" value={ears} 
                onChange={(e) => setEars(parseInt(e.target.value))}
                className="w-full accent-[#4185d9]"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-2 text-sm">
                <label>Whiskers</label>
                <span className="font-mono text-[#237957]">{whiskers}/10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="1" value={whiskers} 
                onChange={(e) => setWhiskers(parseInt(e.target.value))}
                className="w-full accent-[#237957]"
              />
            </div>
            
            <div className="pt-4 border-t-2 border-ink/10 mt-4 text-sm font-medium text-ink/70 italic">
              Try making all features roughly equal to see what happens.
            </div>
          </div>

          {/* Probabilities Output */}
          <div className={`p-6 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] transition-colors duration-500 ${isAmbiguous ? 'bg-[#fbe1eb]' : 'bg-[#dff4e8]'}`}>
            <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-6 text-sm text-ink/70">CLASS PREDICTIONS</h3>
            
            <div className="space-y-6">
              
              {/* Cat */}
              <div>
                <div className="flex justify-between font-bold text-lg mb-2">
                  <span>Cat</span>
                  <span>{catProb}%</span>
                </div>
                <div className="w-full h-6 bg-white border-2 border-ink rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#ec5faa] transition-all duration-300"
                    style={{ width: `${catProb}%` }}
                  ></div>
                </div>
              </div>

              {/* Dog */}
              <div>
                <div className="flex justify-between font-bold text-lg mb-2">
                  <span>Dog</span>
                  <span>{dogProb}%</span>
                </div>
                <div className="w-full h-6 bg-white border-2 border-ink rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4185d9] transition-all duration-300"
                    style={{ width: `${dogProb}%` }}
                  ></div>
                </div>
              </div>

              {/* Rabbit */}
              <div>
                <div className="flex justify-between font-bold text-lg mb-2">
                  <span>Rabbit</span>
                  <span>{rabbitProb}%</span>
                </div>
                <div className="w-full h-6 bg-white border-2 border-ink rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#237957] transition-all duration-300"
                    style={{ width: `${rabbitProb}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {isAmbiguous && (
              <div className="mt-8 bg-white p-4 rounded-xl border-2 border-[#ec5faa] text-[#ec5faa] font-bold text-center animate-[pulse_2s_infinite]">
                Should the model be certain here? This introduces uncertainty naturally.
              </div>
            )}
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              A probability-like output can often be interpreted as a probability, depending on the model and how it was trained. 
              <br/><br/>
              But remember: a high confidence score simply means the input features strongly triggered a specific pattern in the model's weights. It does <strong className="text-[#ec5faa]">not</strong> mean the model is perfectly certain or "knows" it is right.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
