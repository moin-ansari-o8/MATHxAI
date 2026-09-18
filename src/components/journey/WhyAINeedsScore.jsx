import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Activity, TrendingDown } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function WhyAINeedsScore() {
  const [activeTab, setActiveTab] = useState('regression');

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">7</span>
            Why AI Needs a Score
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            You've seen how to turn mistakes into numbers using different rules. But why do we go through all this trouble? <Highlight color="#6654f5">Why can't AI simply know whether it is right or wrong?</Highlight>
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Activity className="text-[#ec5faa]" />
          The Wrongness Meter
        </h2>
        
        <div className="bg-white p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] mb-8">
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('regression')}
              className={`px-6 py-3 rounded-xl border-2 border-ink font-bold transition-all shadow-[4px_4px_0_#17191f] ${activeTab === 'regression' ? 'bg-[#ec5faa] text-white' : 'bg-white hover:bg-paper'}`}
            >
              Regression Example
            </button>
            <button 
              onClick={() => setActiveTab('classification')}
              className={`px-6 py-3 rounded-xl border-2 border-ink font-bold transition-all shadow-[4px_4px_0_#17191f] ${activeTab === 'classification' ? 'bg-[#4185d9] text-white' : 'bg-white hover:bg-paper'}`}
            >
              Classification Example
            </button>
          </div>

          {activeTab === 'regression' && (
            <div className="grid sm:grid-cols-2 gap-8 animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-full bg-[#237957]/10" />
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 text-sm text-ink/70 mb-4">PREDICTION A (CLOSE)</h3>
                <div className="space-y-2 font-mono font-bold text-lg mb-4">
                  <div className="flex justify-between"><span>Actual</span><span className="text-[#237957]">80</span></div>
                  <div className="flex justify-between"><span>Prediction</span><span>78</span></div>
                  <div className="h-0.5 bg-ink/10 my-1" />
                  <div className="flex justify-between text-sm"><span>Error</span><span>2</span></div>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-ink flex justify-between items-center text-[#237957]">
                  <span className="font-bold">Loss Score (MSE)</span>
                  <span className="font-display text-2xl">4</span>
                </div>
              </div>
              
              <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-full bg-[#ec5faa]/10" />
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 text-sm text-ink/70 mb-4">PREDICTION B (WAY OFF)</h3>
                <div className="space-y-2 font-mono font-bold text-lg mb-4">
                  <div className="flex justify-between"><span>Actual</span><span className="text-[#237957]">80</span></div>
                  <div className="flex justify-between"><span>Prediction</span><span>40</span></div>
                  <div className="h-0.5 bg-ink/10 my-1" />
                  <div className="flex justify-between text-sm"><span>Error</span><span>40</span></div>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-ink flex justify-between items-center text-[#ec5faa]">
                  <span className="font-bold">Loss Score (MSE)</span>
                  <span className="font-display text-2xl">1600</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classification' && (
            <div className="grid sm:grid-cols-2 gap-8 animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-full bg-[#237957]/10" />
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 text-sm text-ink/70 mb-4">PREDICTION A (CONFIDENT)</h3>
                <div className="space-y-2 font-mono font-bold text-lg mb-4">
                  <div className="flex justify-between text-sm"><span className="text-ink/60">Actual</span><span className="text-[#237957]">CAT</span></div>
                  <div className="flex justify-between"><span>Cat Prob</span><span>0.95</span></div>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-ink flex justify-between items-center text-[#237957]">
                  <span className="font-bold">Loss Score (CE)</span>
                  <span className="font-display text-2xl">0.05</span>
                </div>
              </div>
              
              <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-16 h-full bg-[#ec5faa]/10" />
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 text-sm text-ink/70 mb-4">PREDICTION B (WRONG)</h3>
                <div className="space-y-2 font-mono font-bold text-lg mb-4">
                  <div className="flex justify-between text-sm"><span className="text-ink/60">Actual</span><span className="text-[#237957]">CAT</span></div>
                  <div className="flex justify-between"><span>Cat Prob</span><span>0.05</span></div>
                </div>
                <div className="bg-white p-3 rounded-lg border-2 border-ink flex justify-between items-center text-[#ec5faa]">
                  <span className="font-bold">Loss Score (CE)</span>
                  <span className="font-display text-2xl">3.00</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center font-bold text-lg max-w-2xl mx-auto bg-paper p-6 rounded-xl border-2 border-ink/20">
            In both scenarios, letting the AI simply output "Correct" or "Wrong" gives it no sense of direction. By outputting <strong>4</strong> versus <strong>1600</strong>, the model suddenly has a tangible number it can try to reduce.
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Lightbulb className="text-white fill-white" /> The Big Takeaway</h2>
          <div className="bg-white p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p className="text-xl">
              <Highlight color="#ec5faa">Loss gives an AI model a measurable way to tell how wrong its predictions are.</Highlight>
            </p>
            
            <div className="my-8 flex flex-wrap justify-center items-center gap-4 font-mono text-sm sm:text-base">
              <div className="bg-paper px-4 py-2 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">HIGH LOSS</div>
              <ArrowRight className="text-ink/30" />
              <div className="bg-[#fbe1eb] text-[#ec5faa] px-4 py-2 rounded-lg border-2 border-[#ec5faa]">BAD PREDICTION</div>
            </div>
            <div className="my-8 flex flex-wrap justify-center items-center gap-4 font-mono text-sm sm:text-base">
              <div className="bg-paper px-4 py-2 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">LOW LOSS</div>
              <ArrowRight className="text-ink/30" />
              <div className="bg-[#dff4e8] text-[#237957] px-4 py-2 rounded-lg border-2 border-[#237957]">GOOD PREDICTION</div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-ink/10 text-center space-y-4">
              <p className="opacity-80">We now know how wrong the model is.</p>
              <p className="text-2xl">But how does it know <em>which way to improve?</em></p>
              <div className="inline-block mt-4 px-6 py-3 bg-ink text-white rounded-xl border-2 border-ink font-bold shadow-[4px_4px_0_#ec5faa] animate-pulse">
                Next Chapter: 05. LEARN
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
