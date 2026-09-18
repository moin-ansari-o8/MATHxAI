import React, { useState } from 'react';
import { Target, SearchX, Brain, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function AIGetsItWrong() {
  const [step, setStep] = useState(0);
  
  const [catProb, setCatProb] = useState(70);
  const [dogProb, setDogProb] = useState(20);
  
  // Normalise probabilities so they sum to 100
  const rabbitProb = Math.max(0, 100 - (catProb + dogProb));
  const normalizedCat = catProb;
  const normalizedDog = Math.min(dogProb, 100 - catProb);
  
  const handleCatChange = (val) => {
    setCatProb(val);
    if (val + dogProb > 100) setDogProb(100 - val);
  };
  
  const handleDogChange = (val) => {
    setDogProb(val);
    if (val + catProb > 100) setCatProb(100 - val);
  };

  const isCorrect = normalizedCat >= Math.max(normalizedDog, rabbitProb);
  const maxConf = Math.max(normalizedCat, normalizedDog, rabbitProb);
  const isConfident = maxConf > 75;

  let confidenceMessage = "";
  if (isCorrect && isConfident) confidenceMessage = "Correct & Highly Confident! The ideal scenario.";
  else if (isCorrect && !isConfident) confidenceMessage = "Correct... but barely. It was a lucky guess.";
  else if (!isCorrect && !isConfident) confidenceMessage = "Wrong, but at least the model wasn't sure.";
  else if (!isCorrect && isConfident) confidenceMessage = "Confidently Wrong! This is the most dangerous kind of mistake.";

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">1</span>
            AI Gets It Wrong
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            In the last chapter, our model made predictions based on inputs. But here is an unavoidable truth in machine learning: <Highlight color="#ec5faa">AI makes mistakes.</Highlight>
            <br/><br/>
            Because a model learns patterns instead of strict rules, it will occasionally misclassify an image, predict the wrong price, or misinterpret a word.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Brain className="text-[#ec5faa]" />
          The Prediction Game
        </h2>
        
        <div className="bg-white p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] mb-8 relative">
          
          <div className="text-center font-bold text-xl mb-6">What is this image?</div>
          <div className="flex justify-center mb-8">
            <div className="text-8xl bg-paper p-8 rounded-2xl border-4 border-ink shadow-[8px_8px_0_#17191f]">
              🐱
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="bg-paper p-6 rounded-xl border-2 border-ink max-w-md mx-auto">
                <div className="font-bold text-sm text-ink/60 mb-4 border-b-2 border-ink/10 pb-2">AI PREDICTION 1</div>
                <div className="space-y-3 font-mono font-bold">
                  <div className="flex justify-between"><span className="text-[#ec5faa]">Cat</span><span>72%</span></div>
                  <div className="flex justify-between"><span className="text-ink/50">Dog</span><span className="text-ink/50">21%</span></div>
                  <div className="flex justify-between"><span className="text-ink/50">Rabbit</span><span className="text-ink/50">7%</span></div>
                </div>
              </div>
              <div className="text-center">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-sunshine border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:translate-x-1 hover:-translate-y-1 transition-all">Reveal Answer</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-[#237957] max-w-md mx-auto text-center">
                <div className="font-bold text-xl text-[#237957] mb-2">ACTUAL ANSWER: CAT ✅</div>
                <p className="font-medium text-ink/80">The model got it right, and it was fairly confident!</p>
              </div>
              <div className="text-center">
                <button onClick={() => setStep(2)} className="px-6 py-3 bg-white border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:bg-paper transition-colors">See Another Prediction</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="bg-paper p-6 rounded-xl border-2 border-ink max-w-md mx-auto">
                <div className="font-bold text-sm text-ink/60 mb-4 border-b-2 border-ink/10 pb-2">AI PREDICTION 2</div>
                <div className="space-y-3 font-mono font-bold">
                  <div className="flex justify-between"><span className="text-[#4185d9]">Dog</span><span>81%</span></div>
                  <div className="flex justify-between"><span className="text-ink/50">Cat</span><span className="text-ink/50">15%</span></div>
                  <div className="flex justify-between"><span className="text-ink/50">Rabbit</span><span className="text-ink/50">4%</span></div>
                </div>
              </div>
              <div className="text-center">
                <button onClick={() => setStep(3)} className="px-6 py-3 bg-[#ec5faa] text-white border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:translate-x-1 hover:-translate-y-1 transition-all">Reveal Answer</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-[#ec5faa] max-w-md mx-auto text-center">
                <div className="font-bold text-xl text-[#ec5faa] mb-2">ACTUAL ANSWER: CAT ❌</div>
                <p className="font-medium text-ink/80">The model was totally wrong, and even worse—it was highly confident it was a dog.</p>
              </div>
              
              <div className="bg-sunshine p-6 rounded-xl border-2 border-ink max-w-md mx-auto mt-6 shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2"><Target className="text-ink" /> The Core Problem</h3>
                <p className="font-medium leading-relaxed">
                  Simply calling a prediction "right" or "wrong" isn't enough. We need to know <em>how wrong</em> it was to figure out how to fix it.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <SearchX className="text-[#ec5faa]" />
          Which mistake is worse?
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] space-y-6">
            <h3 className="font-bold text-sm text-ink/50 border-b-2 border-ink/10 pb-2 mb-4">ADJUST PREDICTION CONFIDENCE</h3>
            
            <div>
              <div className="flex justify-between font-bold mb-2">
                <span>Cat Prediction</span>
                <span className="font-mono text-[#ec5faa]">{normalizedCat}%</span>
              </div>
              <input type="range" min="0" max="100" value={normalizedCat} onChange={(e) => handleCatChange(parseInt(e.target.value))} className="w-full accent-[#ec5faa]" />
            </div>
            
            <div>
              <div className="flex justify-between font-bold mb-2">
                <span>Dog Prediction</span>
                <span className="font-mono text-[#4185d9]">{normalizedDog}%</span>
              </div>
              <input type="range" min="0" max="100" value={normalizedDog} onChange={(e) => handleDogChange(parseInt(e.target.value))} className="w-full accent-[#4185d9]" />
            </div>

            <div className="pt-4 border-t-2 border-ink/10">
              <div className="flex justify-between font-bold mb-2">
                <span>Rabbit Prediction (Remaining)</span>
                <span className="font-mono text-[#6654f5]">{rabbitProb}%</span>
              </div>
            </div>
            
            <div className="bg-[#fbe1eb] p-3 rounded-lg border-2 border-[#ec5faa] font-bold text-center mt-4">
              Actual Reality: It is a CAT
            </div>
          </div>

          <div className={`p-8 rounded-[20px] border-[3px] shadow-[6px_8px_0_#17191f] flex flex-col justify-center h-full transition-colors duration-500 ${isCorrect ? 'bg-[#dff4e8] border-[#237957]' : 'bg-[#fbe1eb] border-[#ec5faa]'}`}>
            <h3 className="font-display text-2xl font-bold text-center mb-4">{isCorrect ? 'Correct!' : 'Wrong!'}</h3>
            <p className="font-bold text-lg text-center opacity-80 mb-6">{confidenceMessage}</p>
            
            <div className="bg-white/80 p-4 rounded-xl border-2 border-ink/20 text-sm font-medium">
              If you were training a model, a "Confidently Wrong" mistake would require a massive correction, whereas a "Barely Wrong" mistake might only need a tiny tweak.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f] space-y-4">
            <p>Every AI system must confront being wrong:</p>
            <ul className="list-disc pl-6 space-y-2 opacity-80">
              <li><strong>Spam Detection:</strong> Did it accidentally send your boss's email to the spam folder? (False Positive)</li>
              <li><strong>House Prices:</strong> Did it predict a house was worth $500k when it actually sold for $800k?</li>
              <li><strong>Speech Recognition:</strong> Did it hear "I scream" instead of "ice cream"?</li>
            </ul>
            <div className="pt-4 mt-4 border-t-2 border-ink/10">
              The AI development cycle isn't about making a flawless model immediately—it's about measuring the mistakes exactly so the model can learn from them.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
