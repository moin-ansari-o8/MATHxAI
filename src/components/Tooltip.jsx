import React from 'react';

const Tooltip = ({ children, text, className = "" }) => {
  // Only add relative if the wrapper isn't already absolutely or fixed positioned
  const positionClass = className.includes('absolute') || className.includes('fixed') ? '' : 'relative';
  
  return (
    <div className={`group/tooltip inline-flex ${positionClass} ${className}`}>
      {children}
      <div className="hidden lg:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#fef08a] text-[#17191f] text-sm font-bold whitespace-nowrap border-[3px] border-[#17191f] shadow-[4px_4px_0_#17191f] z-[10000] pointer-events-none rounded-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
