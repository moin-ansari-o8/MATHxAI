import React, { useState } from 'react';
import { ArrowRight, List, Home, Info, AlertTriangle } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Features() {
  const [features, setFeatures] = useState({
    weight: true,
    height: true,
    age: true,
    furColor: false,
    name: false
  });

  const toggleFeature = (key) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Mock a simple prediction/usefulness bar
  const usefulnessScore = 
    (features.weight ? 30 : 0) + 
    (features.height ? 40 : 0) + 
    (features.age ? 30 : 0) - 
    (features.furColor ? 15 : 0) - // noisy feature
    (features.name ? 20 : 0); // very noisy feature

  const normalizedScore = Math.max(0, Math.min(100, usefulnessScore));

  const currentVector = [];
  if (features.weight) currentVector.push("18");
  if (features.height) currentVector.push("42");
  if (features.age) currentVector.push("4");
  if (features.furColor) currentVector.push("1"); // 1 for brown
  if (features.name) currentVector.push("9"); // arbitrary encoding

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">4</span>
            Describing the World
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-8">
            A <Highlight color="#65c99a">feature</Highlight> is a measurable property that helps describe something. It turns real-world properties into measurable inputs a model can work with.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 items-center bg-[#dff4e8] border-2 border-ink rounded-xl shadow-[4px_4px_0_#17191f] p-6">
            <div className="font-bold space-y-3">
              <h3 className="flex items-center gap-2 text-xl font-display mb-4 uppercase tracking-widest"><Home size={20} /> HOUSE</h3>
              <div className="flex justify-between items-center bg-white/60 p-2 rounded border-2 border-ink/20"><span>Area</span> <span className="font-mono bg-white px-2 py-1 border-2 border-ink rounded">1200</span></div>
              <div className="flex justify-between items-center bg-white/60 p-2 rounded border-2 border-ink/20"><span>Bedrooms</span> <span className="font-mono bg-white px-2 py-1 border-2 border-ink rounded">3</span></div>
              <div className="flex justify-between items-center bg-white/60 p-2 rounded border-2 border-ink/20"><span>Age</span> <span className="font-mono bg-white px-2 py-1 border-2 border-ink rounded">7</span></div>
              <div className="flex justify-between items-center bg-white/60 p-2 rounded border-2 border-ink/20"><span>Distance</span> <span className="font-mono bg-white px-2 py-1 border-2 border-ink rounded">2.4</span></div>
            </div>
            
            <div className="flex flex-col items-center justify-center pt-4 sm:pt-0">
              <ArrowRight className="hidden sm:block text-ink/50 mb-4 scale-150" />
              <ArrowRight className="sm:hidden text-ink/50 mb-4 scale-150 rotate-90" />
              <div className="font-mono font-bold text-xl bg-white border-2 border-ink rounded-xl p-4 shadow-[4px_4px_0_#17191f]">
                [1200, 3, 7, 2.4]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - Build a Data Point */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <List className="text-[#f58ab4]" />
          Build a Data Point
        </h2>
        
        <div className="p-4 sm:p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-[#fbe1eb] shadow-[6px_8px_0_#17191f] mb-8 grid md:grid-cols-2 gap-8">
          
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Dog Classifier Features</h3>
            <p className="font-medium text-ink/70 mb-6">Select which features to include in the model's data point.</p>
            
            <div className="space-y-3 font-bold text-lg">
              <label className="flex items-center gap-3 p-3 bg-white border-2 border-ink rounded-xl cursor-pointer hover:bg-black/5 transition-colors">
                <input type="checkbox" checked={features.weight} onChange={() => toggleFeature('weight')} className="w-5 h-5 accent-[#6654f5]" />
                <div className="flex-1">Weight</div>
                <div className="font-mono bg-[#dcecff] px-2 py-0.5 rounded border border-ink text-sm">18 kg</div>
              </label>
              
              <label className="flex items-center gap-3 p-3 bg-white border-2 border-ink rounded-xl cursor-pointer hover:bg-black/5 transition-colors">
                <input type="checkbox" checked={features.height} onChange={() => toggleFeature('height')} className="w-5 h-5 accent-[#6654f5]" />
                <div className="flex-1">Height</div>
                <div className="font-mono bg-[#dcecff] px-2 py-0.5 rounded border border-ink text-sm">42 cm</div>
              </label>
              
              <label className="flex items-center gap-3 p-3 bg-white border-2 border-ink rounded-xl cursor-pointer hover:bg-black/5 transition-colors">
                <input type="checkbox" checked={features.age} onChange={() => toggleFeature('age')} className="w-5 h-5 accent-[#6654f5]" />
                <div className="flex-1">Age</div>
                <div className="font-mono bg-[#dcecff] px-2 py-0.5 rounded border border-ink text-sm">4 years</div>
              </label>
              
              <label className="flex items-center gap-3 p-3 bg-white border-2 border-ink border-dashed rounded-xl cursor-pointer hover:bg-black/5 transition-colors text-ink/70">
                <input type="checkbox" checked={features.furColor} onChange={() => toggleFeature('furColor')} className="w-5 h-5 accent-[#6654f5]" />
                <div className="flex-1">Fur Color</div>
                <div className="font-mono bg-paper px-2 py-0.5 rounded border border-ink text-sm">Brown</div>
              </label>
              
              <label className="flex items-center gap-3 p-3 bg-white border-2 border-ink border-dashed rounded-xl cursor-pointer hover:bg-black/5 transition-colors text-ink/70">
                <input type="checkbox" checked={features.name} onChange={() => toggleFeature('name')} className="w-5 h-5 accent-[#6654f5]" />
                <div className="flex-1">Name</div>
                <div className="font-mono bg-paper px-2 py-0.5 rounded border border-ink text-sm">Buster</div>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="bg-white border-2 border-ink rounded-xl p-6 shadow-[4px_4px_0_#17191f] mb-6">
              <h3 className="font-bold text-sm text-ink/50 uppercase tracking-widest mb-3">Live Feature Vector</h3>
              <div className="font-mono font-bold text-2xl text-center break-all">
                [ {currentVector.join(', ')} ]
              </div>
              {currentVector.length === 0 && (
                <div className="text-center text-ink/40 font-medium italic text-base mt-2">No features selected</div>
              )}
            </div>
            
            <div className="bg-white/60 border-2 border-ink border-dashed rounded-xl p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Info size={18} /> Feature Quality
              </h3>
              <div className="h-4 w-full bg-paper border-2 border-ink rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-500 ${normalizedScore < 50 ? 'bg-[#d83f97]' : 'bg-[#237957]'}`}
                  style={{ width: `${normalizedScore}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium text-ink/70">
                Useful features help a model distinguish patterns, while irrelevant or noisy features (like a dog's name) may confuse it.
              </p>
              
              {(features.furColor || features.name) && (
                <div className="mt-3 p-2 bg-[#fff4d9] border-2 border-[#ffda45] rounded-lg text-sm font-bold flex items-start gap-2">
                  <AlertTriangle className="text-[#d83f97] shrink-0" size={16} />
                  <span>Adding arbitrary properties like Name adds noise. A dog's name doesn't help classify its breed or health!</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Real AI Connection */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-8">How this connects to real AI</h2>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border-2 border-ink p-4 rounded-xl shadow-[2px_2px_0_#17191f]">
              <div className="font-bold text-lg mb-2">Spam detection</div>
              <div className="font-mono text-sm bg-[#dcecff] p-2 rounded border border-ink/20">
                → message length, sender info, specific words
              </div>
            </div>
            
            <div className="bg-white border-2 border-ink p-4 rounded-xl shadow-[2px_2px_0_#17191f]">
              <div className="font-bold text-lg mb-2">House price</div>
              <div className="font-mono text-sm bg-[#fff4d9] p-2 rounded border border-ink/20">
                → area, rooms, age, location
              </div>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed p-6 bg-white/50 border-2 border-ink border-dashed rounded-xl">
            Traditional machine learning often uses <Highlight color="#fffdf8">manually designed features</Highlight>, while modern deep learning can often learn useful representations automatically from raw data.
          </div>
        </div>
      </section>
    </div>
  );
}
