import React from "react";
import QRCode from "react-qr-code";

export function About() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-paper text-ink pt-32 pb-20">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,217,56,0.16),transparent_24%),radial-gradient(circle_at_74%_70%,rgba(102,85,242,0.12),transparent_27%)]" />
      
      <section className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-4xl rounded-3xl border-[3px] border-ink bg-[#fffdf8] p-8 shadow-[8px_10px_0_#17191f] md:p-12">
          <h1 className="mb-8 text-center font-display text-[40px] font-bold md:text-[52px]">
            About the Creator
          </h1>
          <div className="flex flex-col items-center gap-12 md:flex-row md:justify-around">
            
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <p className="max-w-[400px] text-[18px] font-medium leading-relaxed text-ink/85">
                Built with curiosity by <span className="font-bold text-ink">Moin Ansari</span>. This project combines playful neo-brutalist design with complex mathematical visualizations to make AI feel more approachable and fun.
              </p>
              <div className="flex flex-col gap-4 font-semibold text-[16px]">
                <a href="mailto:moin.edu01@gmail.com" className="group flex items-center gap-4 transition-colors hover:text-violetPop">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-[#c9baff] shadow-[3px_3px_0_#17191f] transition-transform group-hover:-translate-y-1">✉️</span>
                  moin.edu01@gmail.com
                </a>
                <a href="https://yourstrulymoin.vercel.app/" target="_blank" rel="noreferrer" className="group flex items-center gap-4 transition-colors hover:text-[#d83f97]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-sunshine shadow-[3px_3px_0_#17191f] transition-transform group-hover:-translate-y-1">🌐</span>
                  yourstrulymoin.vercel.app
                </a>
                <a href="https://www.linkedin.com/in/moin-ansari1817/" target="_blank" rel="noreferrer" className="group flex items-center gap-4 transition-colors hover:text-[#1f6fb2]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-[#62a9ff] shadow-[3px_3px_0_#17191f] transition-transform group-hover:-translate-y-1">💼</span>
                  in/moin-ansari1817
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[6px_8px_0_#17191f] rotate-[2deg] transition-transform hover:rotate-0">
                <QRCode
                  value="https://mathh-x-ai.vercel.app"
                  bgColor="#ffffff"
                  fgColor="#17191f"
                  size={180}
                />
              </div>
              <span className="font-display text-[16px] font-bold text-ink bg-sunshine px-4 py-1.5 rounded-full border-[3px] border-ink shadow-[3px_3px_0_#17191f]">
                Scan to visit
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
