import React from "react";
import { QRCode } from "react-qrcode-logo";
import { Decorations } from "../components/Decorations";

export function About() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-paper text-ink pt-32 pb-20">
      <Decorations />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,217,56,0.16),transparent_24%),radial-gradient(circle_at_74%_70%,rgba(102,85,242,0.12),transparent_27%)]" />

      <section className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-4xl rounded-3xl border-[3px] border-ink bg-[#fffdf8] p-8 shadow-[8px_10px_0_#17191f] md:p-12">
          <h1 className="mb-8 text-center font-display text-[40px] font-bold md:text-[52px]">
            About the Project
          </h1>
          <div className="flex flex-col items-center gap-12 md:flex-row md:justify-around">

            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <p className="max-w-[400px] text-[18px] font-medium leading-relaxed text-ink/85">
                This website is for the curious minds who want to know what goes on "behind the scenes" of AI, the mathematics, the concepts, and how it all works. Built by <span className="font-bold text-ink">Moin Ansari</span>, who is a beginner himself, this project is designed especially for fellow beginners. It's a place to explore complex topics playfully and make AI feel approachable for everyone at this learning layer.
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
              <a href="https://github.com/moin-ansari-o8/MATHxAI" target="_blank" rel="noreferrer" className="block rounded-3xl border-[3px] border-ink bg-[#fffdf8] p-5 shadow-[6px_8px_0_#17191f] rotate-[2deg] transition-transform hover:rotate-0 hover:scale-105">
                <QRCode
                  value="https://github.com/moin-ansari-o8/MATHxAI"
                  bgColor="#fffdf8"
                  fgColor="#17191f"
                  size={180}
                  qrStyle="dots"
                  eyeRadius={12}
                  eyeColor="#6654f5"
                />
              </a>
              <span className="font-display text-[16px] font-bold text-ink bg-sunshine px-5 py-2 rounded-full border-[3px] border-ink shadow-[3px_3px_0_#17191f] rotate-[-4deg] transition-transform hover:rotate-[4deg] cursor-default">
                Scan/Click to contribute!
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
