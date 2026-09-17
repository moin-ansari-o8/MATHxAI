import React from "react";
import { Link } from "react-router-dom";

export function Logo({ className = "" }) {
  const circleRef = React.useRef(null);

  React.useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!circleRef.current) return;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      
      const rot = -9 + (x * 24); 
      const tx = x * 8;
      const ty = y * 8;
      
      circleRef.current.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <Link className={`logo group inline-flex flex-col ${className}`} to="/" aria-label="Math x AI home">
      <span>
        <span className="relative inline-flex items-center gap-2 font-display text-[30px] font-bold leading-none tracking-normal text-ink lg:text-[32px]">
          <span>MATH</span>
          <span 
            ref={circleRef}
            className="relative flex h-8 w-8 flex-col items-center justify-center rounded-full border-2 border-ink bg-sunshine shadow-[2px_3px_0_#17191f] transition-transform duration-100 ease-out"
            style={{ transform: "rotate(-9deg)" }}
          >
            <span className="mb-2 text-[18px] font-black leading-none">x</span>
            <span className="absolute bottom-[1px] text-[13px] font-black leading-none -rotate-[95deg]">
              (
            </span>
          </span>
          <span className="bg-gradient-to-r from-violetPop to-[#8b62ff] bg-clip-text text-transparent">
            AI
          </span>
          <svg
            aria-hidden="true"
            className="absolute -bottom-3 left-0 h-3 w-full"
            preserveAspectRatio="none"
            viewBox="0 0 210 14"
          >
            <path
              d="M3 8 C44 13, 90 4, 207 9"
              fill="none"
              stroke="#ffda45"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
        </span>
        <span className="mt-2 block text-center text-[8px] font-bold uppercase tracking-[0.15em] text-ink/75 lg:text-[9px]">
          Explore . Play . Learn
        </span>
      </span>
    </Link>
  );
}
