import React, { useState } from 'react';
import { ArrowRight, Settings, Scale, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Weights() {
  const [hoursWeight, setHoursWeight] = useState(8.0);
  const [attendanceWeight, setAttendanceWeight] = useState(0.3);
  
  // Static inputs for this demonstration
  const hours = 6;
  const attendance = 90;

  const hoursContribution = hours * hoursWeight;
  const attendanceContribution = attendance * attendanceWeight;
  const totalPrediction = hoursContribution + attendanceContribution;

  // Calculate connection thickness (normalized for visual appeal)
  // Max possible weight for hours is ~15, max for attendance is ~1.5
  const hoursThickness = Math.max(1, Math.abs(hoursWeight) * 1.5);
  const attendanceThickness = Math.max(1, Math.abs(attendanceWeight) * 15);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">3</span>
            Weights
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            In our prediction equation, a <Highlight color="#62a9ff">weight</Highlight> controls how strongly a particular input influences the final prediction. Think of it as a volume knob for each feature.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Scale className="text-[#ec5faa]" />
          The Weight Mixer
        </h2>
        
        <div className="bg-white p-6 lg:p-10 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f]">
          
          <div className="grid lg:grid-cols-[1fr_200px_1fr] gap-8 items-center mb-12 relative">
            
            {/* Inputs & Weights */}
            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold">Hours Studied</div>
                  <div className="bg-white border-2 border-ink px-3 py-1 rounded-lg font-mono font-bold">{hours}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <label>Weight</label>
                    <span className="font-mono text-[#d83f97]">{hoursWeight.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-5" max="15" step="0.5" value={hoursWeight} 
                    onChange={(e) => setHoursWeight(parseFloat(e.target.value))}
                    className="w-full accent-[#d83f97]"
                  />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold">Attendance (%)</div>
                  <div className="bg-white border-2 border-ink px-3 py-1 rounded-lg font-mono font-bold">{attendance}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <label>Weight</label>
                    <span className="font-mono text-[#237957]">{attendanceWeight.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="-0.5" max="1.5" step="0.1" value={attendanceWeight} 
                    onChange={(e) => setAttendanceWeight(parseFloat(e.target.value))}
                    className="w-full accent-[#237957]"
                  />
                </div>
              </div>
            </div>

            {/* Visual Connections (hidden on mobile, SVG pipes) */}
            <div className="hidden lg:flex flex-col justify-around h-full py-12 px-4 relative">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Top Pipe */}
                <path 
                  d="M 0,60 C 100,60 100,150 200,150" 
                  fill="none" 
                  stroke="#d83f97" 
                  strokeWidth={hoursThickness} 
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
                <circle cx="200" cy="150" r="6" fill="#d83f97" />
                
                {/* Bottom Pipe */}
                <path 
                  d="M 0,280 C 100,280 100,150 200,150" 
                  fill="none" 
                  stroke="#237957" 
                  strokeWidth={attendanceThickness} 
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            {/* Contributions & Output */}
            <div className="space-y-6 flex flex-col justify-center">
              
              <div className="bg-[#c9baff] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm text-center">CONTRIBUTIONS</h3>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                    <span className="font-semibold text-ink/70">Hours</span>
                    <span className="font-bold text-[#d83f97]">
                      {hoursContribution >= 0 ? '+' : ''}{hoursContribution.toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                    <span className="font-semibold text-ink/70">Att.</span>
                    <span className="font-bold text-[#237957]">
                      {attendanceContribution >= 0 ? '+' : ''}{attendanceContribution.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-ink/20 my-4"></div>
                
                <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm text-center">PREDICTION</h3>
                <div className="font-display text-4xl font-bold text-center">
                  {totalPrediction.toFixed(1)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Neural networks contain many, many weights. 
              <br/><br/>
              When we say a model is "training" or "learning," what's actually happening is that the model is adjusting these exact weights up and down mathematically until its predictions become accurate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
