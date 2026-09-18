import React, { useState } from 'react';
import { Map, HelpCircle, CheckCircle2 } from 'lucide-react';

export function SynthesisMap() {
  const [activeConcept, setActiveConcept] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  const path = [
    { id: 'data', label: 'DATA', info: 'The raw material (pixels, audio, text) from the real world.' },
    { id: 'rep', label: 'REPRESENTATION', info: 'Converting reality into numbers so computers can do math on them.' },
    { id: 'vectors', label: 'VECTORS & MATRICES', info: 'The fundamental data structures of all modern AI.' },
    { id: 'model', label: 'MODEL (WEIGHTS & BIAS)', info: 'A mathematical equation with adjustable parameters.' },
    { id: 'pred', label: 'PREDICTION', info: 'The output of the model\'s forward pass.' },
    { id: 'loss', label: 'LOSS', info: 'Measuring how wrong the prediction was compared to reality.' },
    { id: 'grad', label: 'CALCULUS & GRADIENTS', info: 'Finding the slope of the loss landscape to know how to improve.' },
    { id: 'opt', label: 'OPTIMIZATION & BACKPROP', info: 'Updating the weights efficiently to reduce the loss.' },
    { id: 'gen', label: 'GENERALIZATION', info: 'Making sure the model learns underlying rules, not just memorizing the training data.' },
    { id: 'embed', label: 'EMBEDDINGS', info: 'Representing words as coordinates in a multi-dimensional semantic space.' },
    { id: 'attn', label: 'ATTENTION', info: 'Allowing embeddings to look at each other to build context.' },
    { id: 'trans', label: 'TRANSFORMERS', info: 'The architecture that scales attention massively across sequences.' },
    { id: 'llms', label: 'LARGE LANGUAGE MODELS', info: 'Transformers trained on internet-scale data to predict the next token.' },
  ];

  const questions = [
    { id: 'q1', q: "How does AI represent text?", a: "Tokens are converted into numerical Vectors (Embeddings) in a semantic space." },
    { id: 'q2', q: "How does a model make a prediction?", a: "By passing data through learned parameters (Weights & Biases) using Matrix multiplication." },
    { id: 'q3', q: "How does it know it is wrong?", a: "The Loss function calculates the difference between the prediction and the target." },
    { id: 'q4', q: "How does it improve?", a: "Calculus (Gradients) tells the Optimizer how to adjust the parameters via Backpropagation." },
    { id: 'q5', q: "How does modern AI process long sequences?", a: "Transformers use Self-Attention to build dynamic, context-aware representations." },
    { id: 'q6', q: "How does an LLM learn to speak?", a: "By repeatedly performing Next-Token Prediction over massive amounts of text data." }
  ];

  const toggleCard = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">7</span>
            Synthesis: Everything We Learned
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            We have reached the end of the conceptual journey. AI isn't magic. It's a stack of ideas—representation, linear algebra, probability, calculus, optimization, geometry, and information flow—working together.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Map className="text-[#ec5faa]" />
          From Numbers to AI
        </h2>
        
        <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 lg:p-10">
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* The Map */}
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-1 bg-ink/10 rounded-full" />
              
              <div className="space-y-4 relative z-10">
                {path.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveConcept(item.id)}
                    className="w-full group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${activeConcept === item.id ? 'bg-[#ec5faa] border-ink text-white shadow-[2px_2px_0_#17191f]' : 'bg-white border-ink group-hover:bg-paper'}`}>
                        {index + 1}
                      </div>
                      <div className={`font-bold text-sm tracking-widest transition-colors ${activeConcept === item.id ? 'text-[#ec5faa]' : 'text-ink/60 group-hover:text-ink'}`}>
                        {item.label}
                      </div>
                    </div>
                    {/* Expandable Info */}
                    <div className={`ml-13 overflow-hidden transition-all duration-300 ${activeConcept === item.id ? 'max-h-40 opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="bg-paper p-4 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f] text-sm font-medium">
                        {item.info}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* The Challenge */}
            <div className="space-y-6">
              
              <div className="bg-ink text-white p-6 rounded-xl shadow-[4px_4px_0_#ec5faa]">
                <h3 className="font-bold text-xs tracking-widest opacity-60 mb-6 flex items-center gap-2"><HelpCircle size={16}/> SYNTHESIS CHALLENGE</h3>
                
                <div className="space-y-4">
                  {questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => toggleCard(q.id)}
                      className="w-full text-left bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      <div className="font-bold text-sm mb-2 text-[#ec5faa]">{q.q}</div>
                      {flippedCards[q.id] ? (
                        <div className="text-sm opacity-90 animate-in fade-in slide-in-from-top-2 duration-300 flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-[#237957] shrink-0 mt-0.5" />
                          <span>{q.a}</span>
                        </div>
                      ) : (
                        <div className="text-xs font-bold tracking-widest opacity-40">CLICK TO REVEAL ANSWER</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
