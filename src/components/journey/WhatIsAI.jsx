import React, { useState } from 'react';
import { Check, X, ArrowRight, Camera, Mic, Type } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function WhatIsAI() {
  const [answers, setAnswers] = useState({});
  const [spamAnswer, setSpamAnswer] = useState(null);

  const systems = [
    { id: 'youtube', name: 'YouTube recommendations', isAi: true, reason: 'Learns your preferences from viewing history.' },
    { id: 'calc', name: 'Calculator', isAi: false, reason: 'Follows explicitly programmed rules.' },
    { id: 'face', name: 'Face unlock', isAi: true, reason: 'Recognizes patterns in facial data.' },
    { id: 'maps', name: 'Google Maps route', isAi: true, reason: 'Predicts traffic and optimal paths.' },
    { id: 'spam', name: 'Spam filter', isAi: true, reason: 'Learns to classify based on past emails.' },
    { id: 'clock', name: 'Digital clock', isAi: false, reason: 'Follows a simple counting mechanism.' },
  ];

  const handleAnswer = (id, guess) => {
    setAnswers(prev => ({ ...prev, [id]: guess }));
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">1</span>
            What exactly is AI?
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            <Highlight>Artificial Intelligence</Highlight> is the field of building machines that can perform tasks that normally require human-like abilities such as recognizing, predicting, understanding, or deciding.
          </p>
          <div className="bg-[#fbe1eb] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f]">
            <h3 className="font-bold mb-4">The vague word "intelligence" breaks down into observable tasks:</h3>
            <ul className="grid sm:grid-cols-2 gap-4 font-medium text-ink/80">
              <li className="flex gap-2 items-center"><span className="bg-white border-2 border-ink px-2 py-1 rounded-md text-xs font-bold w-20 text-center">SEE</span> recognize a face</li>
              <li className="flex gap-2 items-center"><span className="bg-white border-2 border-ink px-2 py-1 rounded-md text-xs font-bold w-20 text-center">HEAR</span> understand speech</li>
              <li className="flex gap-2 items-center"><span className="bg-white border-2 border-ink px-2 py-1 rounded-md text-xs font-bold w-20 text-center">READ</span> understand text</li>
              <li className="flex gap-2 items-center"><span className="bg-white border-2 border-ink px-2 py-1 rounded-md text-xs font-bold w-20 text-center">PREDICT</span> forecast a price</li>
              <li className="flex gap-2 items-center"><span className="bg-white border-2 border-ink px-2 py-1 rounded-md text-xs font-bold w-20 text-center">DECIDE</span> classify spam</li>
              <li className="flex gap-2 items-center"><span className="bg-white border-2 border-ink px-2 py-1 rounded-md text-xs font-bold w-20 text-center">GENERATE</span> create text/images</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6">Is this AI?</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {systems.map(sys => {
            const answered = answers[sys.id] !== undefined;
            const correct = answers[sys.id] === sys.isAi;
            
            return (
              <div key={sys.id} className="p-5 rounded-xl border-2 border-ink bg-[#dcecff] shadow-[4px_5px_0_#17191f] flex flex-col justify-between min-h-[140px]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg pr-2 leading-tight">{sys.name}</h3>
                  {!answered ? (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleAnswer(sys.id, true)} className="px-3 py-1 bg-white border-2 border-ink rounded-lg text-sm font-bold shadow-[2px_2px_0_#17191f] hover:bg-sunshine transition-colors">YES</button>
                      <button onClick={() => handleAnswer(sys.id, false)} className="px-3 py-1 bg-white border-2 border-ink rounded-lg text-sm font-bold shadow-[2px_2px_0_#17191f] hover:bg-[#f58ab4] transition-colors">NO</button>
                    </div>
                  ) : (
                    <div className={`flex items-center gap-1 font-bold shrink-0 ${correct ? 'text-[#237957]' : 'text-[#d83f97]'}`}>
                      {correct ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
                      {correct ? 'Correct' : 'Not quite'}
                    </div>
                  )}
                </div>
                {answered && (
                  <div className="text-sm font-medium bg-white/60 p-3 rounded-lg border-2 border-ink/10 animate-in fade-in duration-300">
                    <span className="font-bold block mb-1">{sys.isAi ? 'AI' : 'Not AI'}</span>
                    {sys.reason}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {Object.keys(answers).length === systems.length && (
          <div className="p-6 bg-sunshine/30 rounded-xl border-2 border-ink border-dashed text-center animate-in zoom-in-95 duration-500">
            <h3 className="font-display font-bold text-xl mb-2">The Big Takeaway</h3>
            <p className="font-medium">
              A calculator follows <Highlight color="#62a9ff">explicitly programmed rules</Highlight>.<br/>
              A modern recommendation system <Highlight color="#65c99a">learns patterns from data</Highlight>.
            </p>
          </div>
        )}
      </section>

      {/* 3. Hands-on Experiment */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6">The Task of an AI</h2>
        <div className="p-8 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] shadow-[6px_8px_0_#17191f]">
          <div className="bg-white rounded-xl border-2 border-ink p-6 shadow-inner mb-6">
            <div className="text-sm font-bold text-ink/50 mb-2 uppercase tracking-widest">New Email</div>
            <p className="font-medium text-lg">"Congratulations! You won $10,000! Click here to claim your prize now."</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setSpamAnswer('spam')}
              className={`px-6 py-3 rounded-xl border-2 border-ink font-bold transition-all flex items-center gap-2 ${spamAnswer === 'spam' ? 'bg-[#f58ab4] translate-y-1 shadow-[0px_0px_0_#17191f]' : 'bg-white shadow-[4px_4px_0_#17191f] hover:bg-black/5'}`}
            >
              Spam
            </button>
            <button 
              onClick={() => setSpamAnswer('not-spam')}
              className={`px-6 py-3 rounded-xl border-2 border-ink font-bold transition-all flex items-center gap-2 ${spamAnswer === 'not-spam' ? 'bg-[#c9baff] translate-y-1 shadow-[0px_0px_0_#17191f]' : 'bg-white shadow-[4px_4px_0_#17191f] hover:bg-black/5'}`}
            >
              Not Spam
            </button>
          </div>

          {spamAnswer && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center font-display font-bold">
                <div className="bg-white px-4 py-3 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">
                  <span className="block text-xs text-ink/50 uppercase mb-1">INPUT</span>
                  Email Text
                </div>
                <ArrowRight className="hidden md:block text-ink" strokeWidth={3} />
                <ArrowRight className="md:hidden rotate-90 text-ink" strokeWidth={3} />
                <div className="bg-sunshine px-4 py-3 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f] scale-110 rotate-1">
                  <span className="block text-xs text-ink/70 uppercase mb-1">AI TASK</span>
                  Analyze Patterns
                </div>
                <ArrowRight className="hidden md:block text-ink" strokeWidth={3} />
                <ArrowRight className="md:hidden rotate-90 text-ink" strokeWidth={3} />
                <div className="bg-white px-4 py-3 rounded-lg border-2 border-ink shadow-[2px_2px_0_#17191f]">
                  <span className="block text-xs text-ink/50 uppercase mb-1">OUTPUT</span>
                  {spamAnswer === 'spam' ? 'Spam' : 'Not Spam'}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Real AI Connection */}
      <section>
        <div className="p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-8">How this connects to real AI</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/60 border-2 border-ink p-4 rounded-xl shadow-[2px_2px_0_#17191f]">
              <div className="w-12 h-12 shrink-0 bg-white border-2 border-ink rounded-full flex items-center justify-center"><Camera /></div>
              <div className="flex-1 font-bold flex items-center gap-2 flex-wrap text-sm sm:text-base">
                <span>Camera</span> <ArrowRight size={16} className="text-ink/50" /> 
                <span className="text-[#237957]">Pixels</span> <ArrowRight size={16} className="text-ink/50" />
                <span className="px-2 py-1 bg-white border-2 border-ink rounded">Model</span> <ArrowRight size={16} className="text-ink/50" />
                <span>"Face detected"</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/60 border-2 border-ink p-4 rounded-xl shadow-[2px_2px_0_#17191f]">
              <div className="w-12 h-12 shrink-0 bg-white border-2 border-ink rounded-full flex items-center justify-center"><Mic /></div>
              <div className="flex-1 font-bold flex items-center gap-2 flex-wrap text-sm sm:text-base">
                <span>Microphone</span> <ArrowRight size={16} className="text-ink/50" /> 
                <span className="text-[#4185d9]">Audio</span> <ArrowRight size={16} className="text-ink/50" />
                <span className="px-2 py-1 bg-white border-2 border-ink rounded">Model</span> <ArrowRight size={16} className="text-ink/50" />
                <span>"Hello"</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/60 border-2 border-ink p-4 rounded-xl shadow-[2px_2px_0_#17191f]">
              <div className="w-12 h-12 shrink-0 bg-white border-2 border-ink rounded-full flex items-center justify-center"><Type /></div>
              <div className="flex-1 font-bold flex items-center gap-2 flex-wrap text-sm sm:text-base">
                <span>Text</span> <ArrowRight size={16} className="text-ink/50" /> 
                <span className="text-[#d83f97]">Tokens</span> <ArrowRight size={16} className="text-ink/50" />
                <span className="px-2 py-1 bg-white border-2 border-ink rounded">Model</span> <ArrowRight size={16} className="text-ink/50" />
                <span>"How can I help?"</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-ink/20 font-bold text-lg md:text-xl text-center leading-relaxed">
            AI is not one single thing. <br className="hidden md:block"/>
            It is a collection of systems that perform different <Highlight color="#fffdf8">intelligent tasks</Highlight>.
          </div>
        </div>
      </section>
    </div>
  );
}
