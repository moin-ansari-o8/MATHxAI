import React, { useState } from 'react';
import { BarChart, RefreshCw } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function StatisticsBehindLearning() {
  const [sampleSize, setSampleSize] = useState(10);
  const [means, setMeans] = useState([]);
  const [currentSample, setCurrentSample] = useState([]);

  // True population mean is 50
  const drawSample = () => {
    let sum = 0;
    const sample = [];
    for (let i = 0; i < sampleSize; i++) {
      // Normal distribution approximation (Box-Muller)
      const u = 1 - Math.random();
      const v = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      // mean 50, stddev 15
      const val = 50 + z * 15;
      sample.push(val);
      sum += val;
    }
    const mean = sum / sampleSize;
    setMeans([...means, mean]);
    setCurrentSample(sample);
  };

  const reset = () => {
    setMeans([]);
    setCurrentSample([]);
  };

  // Histogram buckets (30 to 70, bin size 2)
  const buckets = Array(20).fill(0);
  means.forEach(m => {
    let idx = Math.floor((m - 30) / 2);
    if (idx < 0) idx = 0;
    if (idx >= 20) idx = 19;
    buckets[idx]++;
  });

  const maxBucket = Math.max(1, ...buckets);

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">7</span>
            Statistics Behind Learning
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A model's training data is just a <Highlight color="#237957">Sample</Highlight> of the real world. Because we only ever see a limited sample, there is always <Highlight color="#ec5faa">Uncertainty</Highlight>. Machine learning relies on statistics to manage this variation and estimate how well a model will perform on the entire population.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <BarChart className="text-[#ec5faa]" />
          Sample the World
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Controls & Current Sample */}
            <div className="space-y-8">
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between font-bold text-sm opacity-60">
                    <span>Small Sample Size</span>
                    <span>Large Sample Size</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" max="100" step="5" 
                    value={sampleSize} 
                    onChange={(e) => {
                      setSampleSize(parseInt(e.target.value));
                      reset();
                    }}
                    className="w-full h-3 bg-ink/10 rounded-full appearance-none cursor-pointer accent-[#237957]"
                  />
                  <div className="text-center font-bold text-sm">Sample Size: {sampleSize}</div>
                </div>
                
                <button 
                  onClick={drawSample}
                  className="w-full py-4 bg-sunshine border-2 border-ink rounded-xl font-bold text-lg shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-all flex justify-center items-center gap-2"
                >
                  <RefreshCw size={20}/> Draw Sample
                </button>
              </div>

              {currentSample.length > 0 && (
                <div className="bg-[#fffdf8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] animate-in fade-in">
                  <h3 className="font-bold text-sm tracking-widest opacity-60 mb-2 text-center">CURRENT SAMPLE MEAN</h3>
                  <div className="text-center font-mono font-bold text-4xl text-[#237957]">
                    {means[means.length - 1].toFixed(1)}
                  </div>
                </div>
              )}
            </div>

            {/* Distribution */}
            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-sm tracking-widest opacity-60">DISTRIBUTION OF MEANS</h3>
                <span className="font-bold text-sm bg-paper px-3 py-1 rounded-full border-2 border-ink">{means.length} Samples Drawn</span>
              </div>
              
              <div className="h-64 flex items-end gap-1 border-b-2 border-ink pb-2 relative">
                {/* True mean line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-ink/20 border-l-2 border-dashed border-ink/40"></div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest opacity-40">TRUE POPULATION MEAN (50)</div>

                {buckets.map((count, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full">
                    <div 
                      className="w-full bg-[#ec5faa] border-2 border-ink rounded-t-sm transition-all duration-300"
                      style={{ height: `${(count / maxBucket) * 100}%`, minHeight: count > 0 ? '4px' : '0' }}
                    ></div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs font-bold opacity-40 mt-2">
                <span>30</span>
                <span>50</span>
                <span>70</span>
              </div>
              
              <div className="mt-8 text-sm font-medium leading-relaxed opacity-80 text-center">
                {sampleSize < 20 ? 
                  "With a small sample size, the sample means vary wildly! It's hard to trust a single sample." : 
                  "With a large sample size, the means cluster tightly around the true population mean. The estimates are much more stable."
                }
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
