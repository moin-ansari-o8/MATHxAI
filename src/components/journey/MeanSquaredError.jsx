import React, { useState } from 'react';
import { Sigma, ArrowDown, TrendingDown, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function MeanSquaredError() {
  const actuals = [80, 60, 90];
  const [preds, setPreds] = useState([75, 65, 87]);

  const diffs = actuals.map((a, i) => a - preds[i]);
  const sqErrors = diffs.map(d => d * d);
  const sumSq = sqErrors.reduce((acc, val) => acc + val, 0);
  const mse = sumSq / 3;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">5</span>
            Mean Squared Error
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight color="#ec5faa">Mean Squared Error (MSE)</Highlight> is one of the most famous loss functions in all of machine learning. It measures the average of the squared differences between predictions and actual values.
          </p>
          
          <div className="bg-paper p-6 rounded-xl border-2 border-ink text-center shadow-[4px_4px_0_#17191f] font-mono font-bold">
            <div className="text-sm opacity-60 mb-2">THE MATH</div>
            <div className="text-xl sm:text-2xl flex items-center justify-center flex-wrap gap-2">
              MSE = <span className="text-[#237957]">Average</span>( <span className="text-[#ec5faa]">(Actual - Prediction)²</span> )
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <TrendingDown className="text-[#ec5faa]" />
          Make MSE Smaller
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          
          {/* Controls */}
          <div className="bg-white p-6 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] space-y-8">
            <h3 className="font-bold border-b-2 border-ink/20 pb-2 text-sm text-ink/70 mb-4">ADJUST PREDICTIONS</h3>
            
            {actuals.map((actual, idx) => (
              <div key={idx} className="bg-paper p-4 rounded-xl border-2 border-ink relative overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-[#ec5faa] transition-all duration-300"
                  style={{ width: `${Math.min(100, (sqErrors[idx] / 1000) * 100)}%` }}
                />
                
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="font-bold text-sm">
                    <span className="opacity-60 block">Actual</span>
                    <span className="text-xl text-[#237957]">{actual}</span>
                  </div>
                  <div className="font-bold text-sm text-right">
                    <span className="opacity-60 block">Prediction</span>
                    <span className="text-xl text-[#ec5faa]">{preds[idx]}</span>
                  </div>
                </div>
                
                <input 
                  type="range" min="0" max="100" value={preds[idx]} 
                  onChange={(e) => {
                    const newPreds = [...preds];
                    newPreds[idx] = parseInt(e.target.value);
                    setPreds(newPreds);
                  }}
                  className="w-full accent-[#ec5faa] mb-4"
                />

                <div className="bg-white p-3 rounded-lg border-2 border-ink flex flex-wrap gap-2 items-center justify-center font-mono text-sm font-bold opacity-80">
                  <span>({actual} - {preds[idx]})²</span>
                  <ArrowRight size={14} />
                  <span className="text-[#ec5faa]">{sqErrors[idx]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Readout */}
          <div className="space-y-6 sticky top-6">
            <div className={`p-6 rounded-[20px] border-[3px] shadow-[6px_8px_0_#17191f] transition-colors duration-500 ${mse === 0 ? 'bg-[#dff4e8] border-[#237957]' : 'bg-[#fbe1eb] border-ink'}`}>
              <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm text-ink/70">OVERALL LOSS (MSE)</h3>
              
              <div className="text-center">
                <div className="font-display font-bold text-6xl text-ink">
                  {mse.toFixed(1)}
                </div>
                
                {mse === 0 && (
                  <div className="text-[#237957] font-bold mt-4 animate-[bounce_1s_infinite]">
                    Perfect Predictions! 🎉
                  </div>
                )}
                {mse > 0 && mse < 10 && (
                  <div className="text-[#ec5faa] font-bold mt-4">
                    Very close! Keep going.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold text-sm text-ink/70 mb-2 flex items-center gap-2"><Target size={16}/> The Goal of Training</h3>
              <p className="font-medium text-sm leading-relaxed">
                Training a machine learning model can be viewed simply as trying to reduce this loss number until it is as close to zero as possible.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#17191f] text-white shadow-[6px_8px_0_#ec5faa]">
            <h2 className="font-display text-2xl font-bold mb-4 text-[#ec5faa]">Crucial Insight</h2>
            <p className="text-lg leading-relaxed font-medium opacity-90">
              Why do we square the error instead of just using the absolute difference? 
              <br/><br/>
              Squaring makes large errors much, much more costly than small errors. The model is strongly penalized for being wildly wrong on even a single example.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] space-y-4 font-mono font-bold">
            <div className="flex items-center gap-4 bg-paper p-4 rounded-xl border-2 border-ink">
              <div className="flex-1">
                <div className="text-sm opacity-60">Error = 2</div>
                <div className="text-xl">Squared = 4</div>
              </div>
              <div className="w-16 h-2 bg-[#ec5faa] rounded-full" />
            </div>
            
            <div className="flex items-center gap-4 bg-[#fbe1eb] p-4 rounded-xl border-2 border-[#ec5faa]">
              <div className="flex-1">
                <div className="text-sm opacity-60 text-[#ec5faa]">Error = 10</div>
                <div className="text-xl text-[#ec5faa]">Squared = 100</div>
              </div>
              <div className="w-full h-4 bg-[#ec5faa] rounded-full shadow-[2px_2px_0_#17191f]" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
