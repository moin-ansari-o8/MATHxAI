import React, { useState, useEffect } from 'react';
import { ArrowRight, Mic, Activity, Play, Square } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function AudioToNumbers() {
  const [frequency, setFrequency] = useState(50);
  const [amplitude, setAmplitude] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [samples, setSamples] = useState([]);

  // Generate a mock waveform path based on frequency and amplitude
  const generateWaveform = () => {
    const freq = frequency / 10;
    const amp = amplitude / 2;
    let path = 'M 0 50 ';
    let newSamples = [];
    
    for (let i = 0; i <= 100; i++) {
      // Sine wave calculation
      const x = i;
      const y = 50 + Math.sin((i * freq * Math.PI) / 50) * amp;
      path += `L ${x} ${y} `;
      
      // Store a few sample points for the numerical view
      if (i % 10 === 0 && newSamples.length < 7) {
        // Normalize between -1 and 1
        const normalized = -Math.sin((i * freq * Math.PI) / 50) * (amplitude / 100);
        newSamples.push(normalized.toFixed(1));
      }
    }
    
    setSamples(newSamples);
    return path;
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">3</span>
            Sound as a Signal
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Sound is just changes in air pressure over time. We can record these changes and represent them as a <Highlight color="#4185d9">numerical signal</Highlight>.
          </p>
          <div className="bg-[#dff4e8] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center text-center font-bold">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-lg">
              <span>Sound</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Air-pressure</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Signal</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Numbers</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - Sound Wave Lab */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Activity className="text-[#62a9ff]" />
          Sound Wave Lab
        </h2>
        
        <div className="p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-[#dcecff] shadow-[6px_8px_0_#17191f] mb-8">
          
          <div className="bg-white border-4 border-ink rounded-xl shadow-inner mb-8 p-4 relative overflow-hidden h-48 flex items-center justify-center">
            {/* Playful background grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#17191f 1px, transparent 1px), linear-gradient(90deg, #17191f 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 preserve-aspect-ratio-none">
              <path 
                d={generateWaveform()} 
                fill="none" 
                stroke="#6654f5" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#17191f" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
            </svg>
            
            {isPlaying && (
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-2 h-2 bg-[#f58ab4] rounded-full animate-ping"></div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between font-bold mb-2">
                  <label>Frequency (Pitch)</label>
                </div>
                <input 
                  type="range" min="10" max="100" value={frequency} 
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-full accent-[#6654f5]"
                />
              </div>
              
              <div>
                <div className="flex justify-between font-bold mb-2">
                  <label>Amplitude (Volume)</label>
                </div>
                <input 
                  type="range" min="10" max="100" value={amplitude} 
                  onChange={(e) => setAmplitude(parseInt(e.target.value))}
                  className="w-full accent-[#6654f5]"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center md:items-start gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-8 py-4 rounded-xl border-[3px] border-ink font-bold transition-all flex items-center gap-3 text-lg ${isPlaying ? 'bg-[#f58ab4] shadow-[2px_2px_0_#17191f] translate-y-1' : 'bg-sunshine shadow-[4px_5px_0_#17191f] hover:-translate-y-1'}`}
              >
                {isPlaying ? (
                  <><Square fill="currentColor" size={24} /> Stop Simulation</>
                ) : (
                  <><Play fill="currentColor" size={24} /> Start Simulation</>
                )}
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white/60 p-4 border-2 border-ink border-dashed rounded-xl">
            <h3 className="font-bold text-sm text-ink/50 uppercase tracking-widest mb-3 flex items-center gap-2">Sampled Numerical Values</h3>
            <div className="font-mono font-bold text-lg text-center overflow-x-auto">
              [ {samples.join(', ')}, ... ]
            </div>
          </div>

        </div>
      </section>

      {/* 3. Real AI Connection */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How this connects to real AI</h2>
          
          <div className="bg-white/80 border-2 border-ink p-6 rounded-xl shadow-[4px_4px_0_#17191f] mb-6 font-mono font-bold text-sm sm:text-base overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              <span>Speech</span> <ArrowRight size={16} /> 
              <span className="text-[#4185d9]">Audio waveform</span> <ArrowRight size={16} />
              <span className="text-[#237957]">Numerical representation</span> <ArrowRight size={16} />
              <span className="bg-ink text-white px-3 py-1 rounded">Speech model</span> <ArrowRight size={16} />
              <span className="bg-sunshine border-2 border-ink px-3 py-1 rounded">"Hello"</span>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed">
            Speech-recognition systems first convert sound into <Highlight color="#fffdf8">numerical information</Highlight> before interpreting language. A model can't hear; it can only process numbers.
          </div>
        </div>
      </section>
    </div>
  );
}
