import React from "react";

export function Decorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden opacity-50">
      <div className="absolute -bottom-16 -left-20 h-36 w-36 rounded-full border-[3px] border-ink bg-violetPop sm:h-40 sm:w-40 animate-float-slow" />
      <div className="absolute -right-11 top-4 h-28 w-28 rounded-full border-[3px] border-ink bg-sunshine animate-float-reverse" />
      <div className="absolute -right-16 bottom-28 hidden h-32 w-32 rounded-full border-[3px] border-ink bg-[#62a9ff] lg:block animate-float-slow" />
      {/* Sweeping Background Path 1 */}
      <div className="absolute top-[40%] left-0 w-full opacity-60 pointer-events-none">
        <svg 
          viewBox="0 0 100 20" 
          className="w-full h-24 sm:h-32 md:h-48 lg:h-64 overflow-visible" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black outline */}
          <path 
            d="M -5 10 Q 30 25 60 10 T 105 15" 
            fill="none" 
            stroke="#17191f" 
            strokeWidth="18" 
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner road color */}
          <path 
            d="M -5 10 Q 30 25 60 10 T 105 15" 
            fill="none" 
            stroke="#f58ab4" 
            strokeWidth="12" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Sweeping Background Path 2 */}
      <div className="absolute top-[10%] left-0 w-full opacity-60 pointer-events-none">
        <svg 
          viewBox="0 0 100 20" 
          className="w-full h-24 sm:h-32 md:h-48 lg:h-64 overflow-visible" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Black outline */}
          <path 
            d="M -5 15 Q 40 0 70 12 T 105 5" 
            fill="none" 
            stroke="#17191f" 
            strokeWidth="16" 
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner road color */}
          <path 
            d="M -5 15 Q 40 0 70 12 T 105 5" 
            fill="none" 
            stroke="#65c99a" 
            strokeWidth="10" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="absolute left-3 top-36 grid gap-3 animate-float-reverse">
        {[0, 1, 2, 3, 4, 5].map((dot) => (
          <span
            className="h-1.5 w-1.5 rounded-full bg-ink"
            key={dot}
            style={{ transform: `translateX(${[0, -2, 9, 2, -3, 7][dot]}px)` }}
          />
        ))}
      </div>
      <div className="absolute bottom-40 left-1/4 grid gap-3 animate-drift">
        {[0, 1, 2].map((dot) => (
          <span
            className="h-1.5 w-1.5 rounded-full bg-ink"
            key={dot}
            style={{ transform: `translateX(${[0, 5, -2][dot]}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
