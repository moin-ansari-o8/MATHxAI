import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Gamepad2,
  Lightbulb,
  Play,
  Search,
  UsersRound,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const featureCards = [
  {
    icon: Lightbulb,
    title: "Interactive Visualizations",
    body: "See mathematical concepts come to life.",
    color: "from-[#fff4d9] to-[#fff8ea]",
    iconColor: "text-[#17191f]",
  },
  {
    icon: Gamepad2,
    title: "Hands-on Experiments",
    body: "Adjust parameters and see what happens.",
    color: "from-[#dcecff] to-[#edf6ff]",
    iconColor: "text-[#1f6fb2]",
  },
  {
    icon: BrainCircuit,
    title: "Real AI Examples",
    body: "Connect theory to real applications.",
    color: "from-[#fbe1eb] to-[#fff0f5]",
    iconColor: "text-[#17191f]",
  },
  {
    icon: UsersRound,
    title: "For Everyone",
    body: "No prior knowledge needed. Just curiosity!",
    color: "from-[#dff4e8] to-[#effaf4]",
    iconColor: "text-[#237957]",
  },
];

function Decorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -bottom-16 -left-20 h-36 w-36 rounded-full border-[3px] border-ink bg-violetPop sm:h-40 sm:w-40" />
      <div className="absolute -right-11 top-4 h-28 w-28 rounded-full border-[3px] border-ink bg-sunshine" />
      <div className="absolute -right-16 bottom-28 hidden h-32 w-32 rounded-full border-[3px] border-ink bg-[#62a9ff] lg:block" />
      <div className="absolute -left-10 top-[31%] block h-20 w-16 rotate-[25deg] rounded-xl border-[3px] border-ink bg-[#c9baff]" />
      <div className="absolute left-3 top-36 grid gap-3">
        {[0, 1, 2, 3, 4, 5].map((dot) => (
          <span
            className="h-1.5 w-1.5 rounded-full bg-ink"
            key={dot}
            style={{ transform: `translateX(${[0, -2, 9, 2, -3, 7][dot]}px)` }}
          />
        ))}
      </div>
    </div>
  );
}

function DiscoveryNote() {
  return (
    <div
      aria-hidden="true"
      className="quote-note absolute bottom-[126px] right-5 z-20 hidden w-[310px] rotate-[-2deg] rounded-sm border border-ink/10 bg-[#ffe36a] px-5 py-4 text-left font-display text-[16px] font-semibold leading-tight shadow-[5px_6px_0_#17191f] xl:block"
    >
      &quot;Mathematics is the language in which the universe is written.&quot;
      <span className="mt-2 block text-right text-sm font-bold">- Galileo Galilei</span>
    </div>
  );
}

function HeroArt() {
  return (
    <div className="hero-art order-1 lg:order-2 relative mx-auto w-full max-w-[760px] lg:max-w-[620px] xl:max-w-[690px] 2xl:max-w-[760px]">
      <div className="absolute inset-x-8 bottom-3 top-10 -z-10 rounded-[36px] bg-violetPop/10 blur-2xl" />
      <figure className="relative rotate-[-1.2deg] rounded-[26px] border-[3px] border-ink bg-[#fffdf8] p-3 shadow-[7px_8px_0_#17191f]">
        <img
          alt="Illustrated math and AI learning scene with pixels, neural network, numbers, and books"
          className="block w-full rounded-[18px] object-contain"
          src="/right-land.jpg"
        />
      </figure>
    </div>
  );
}

export function Home() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", breakpoints: { "(min-width: 768px)": { active: false } } },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <Decorations />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,217,56,0.16),transparent_24%),radial-gradient(circle_at_74%_70%,rgba(102,85,242,0.12),transparent_27%)]" />
      <DiscoveryNote />
      <section className="page-shell relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-5 pt-28 pb-4 sm:px-8 lg:px-10 xl:px-14">
        <div className="hero-grid grid flex-1 items-center gap-6 pt-9 lg:grid-cols-[0.82fr_1.18fr] lg:pt-5 xl:gap-8">
          <div className="z-10 order-2 lg:order-1">
            <h1 className="hero-title max-w-2xl text-center sm:text-left overflow-visible pb-0 sm:pb-2 font-display text-[11.5vw] font-bold leading-[0.86] tracking-normal text-ink sm:text-[82px] lg:text-[80px] xl:text-[88px] 2xl:text-[96px] whitespace-nowrap sm:whitespace-normal">
              AI is not
              <span className="relative inline-block sm:block overflow-visible bg-gradient-to-r from-violetPop to-[#7666ff] bg-clip-text pb-5 pt-1 text-[1.12em] text-transparent ml-2 sm:ml-[1.2em] lg:ml-[1.12em]">
                magic.
                <svg
                  aria-hidden="true"
                  className="absolute right-16 -top-10 hidden h-32 w-32 overflow-visible sm:block"
                  viewBox="0 0 112 112"
                >
                  <path
                    d="M52 14 L36 42"
                    fill="none"
                    stroke="#ffda45"
                    strokeLinecap="round"
                    strokeWidth="9"
                  />
                  <path
                    d="M54 16 L38 41"
                    fill="none"
                    stroke="#fff0a6"
                    strokeLinecap="round"
                    strokeOpacity="0.65"
                    strokeWidth="4"
                  />
                  <path
                    d="M56 51 L84 34"
                    fill="none"
                    stroke="#ffda45"
                    strokeLinecap="round"
                    strokeWidth="9"
                  />
                  <path
                    d="M58 50 L82 36"
                    fill="none"
                    stroke="#fff0a6"
                    strokeLinecap="round"
                    strokeOpacity="0.65"
                    strokeWidth="4"
                  />
                  <path
                    d="M60 68 L94 73"
                    fill="none"
                    stroke="#ffda45"
                    strokeLinecap="round"
                    strokeWidth="9"
                  />
                  <path
                    d="M62 67 L91 72"
                    fill="none"
                    stroke="#fff0a6"
                    strokeLinecap="round"
                    strokeOpacity="0.65"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            </h1>
            <h2 className="hero-subtitle mt-0 sm:mt-4 max-w-2xl text-center sm:text-left font-display text-[24px] font-bold leading-tight sm:text-[30px] lg:text-[28px] xl:text-[31px]">
              It's{" "}
              <span className="relative inline-block pb-1">
                Mathematics at scale.
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-4 w-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 330 18"
                >
                  <path
                    d="M4 11 C82 7, 168 15, 326 8"
                    fill="none"
                    stroke="#ec5faa"
                    strokeLinecap="round"
                    strokeWidth="7"
                    transform="rotate(-1.3 165 9)"
                  />
                  <path
                    d="M7 12 C88 9, 174 14, 321 9"
                    fill="none"
                    stroke="#f5a3cf"
                    strokeLinecap="round"
                    strokeWidth="4"
                    strokeOpacity="0.72"
                    transform="rotate(-1.3 165 9)"
                  />
                  <path
                    d="M13 10 C92 8, 183 13, 306 8"
                    fill="none"
                    stroke="#d83f97"
                    strokeLinecap="round"
                    strokeWidth="2"
                    strokeOpacity="0.38"
                    transform="rotate(-1.3 165 9)"
                  />
                </svg>
              </span>
            </h2>
            <p className="hero-copy mt-3 max-w-[540px] rounded-2xl bg-paper/45 pr-2 text-base font-semibold leading-relaxed sm:text-lg lg:text-[17px]">
              From pixels to predictions, from probabilities to neural networks - AI is built on
              mathematical ideas you can explore, visualize, and play with.
            </p>
            <div className="hero-actions mt-5 flex flex-col gap-4 sm:flex-row">
              <Link to="/journey" className="flex h-[52px] min-h-[52px] items-center justify-center gap-3 rounded-2xl border-[3px] border-ink bg-sunshine px-7 text-lg font-bold shadow-[4px_5px_0_#17191f] transition hover:-translate-y-1">
                Start the Journey <ArrowRight className="h-5 w-5" strokeWidth={3} />
              </Link>
              <button className="flex h-[52px] min-h-[52px] items-center justify-center gap-3 rounded-2xl border-[3px] border-ink bg-white px-7 text-lg font-bold shadow-[4px_5px_0_#17191f] transition hover:-translate-y-1">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white">
                  <Play className="ml-0.5 h-4 w-4 fill-white" />
                </span>
                Watch Trailer
              </button>
            </div>
          </div>
          <HeroArt />
        </div>

        <section className="relative z-10 mt-10 md:mt-2">
          <div
            className="overflow-hidden -mx-5 px-5 py-10 -my-10 md:overflow-visible md:mx-0 md:px-0 md:py-0 md:-my-0"
            ref={emblaRef}
          >
            <div className="flex max-md:-ml-4 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4">
              {featureCards.map(({ icon: Icon, title, body, color, iconColor }) => (
                <div className="flex-[0_0_82%] min-w-0 max-md:pl-4 sm:flex-[0_0_280px] md:flex-none" key={title}>
                  <article className={`h-full min-h-[112px] rounded-2xl bg-gradient-to-br ${color} p-5 shadow-[0_16px_34px_rgba(23,25,31,0.06)]`}>
                    <Icon className={`mb-2 h-8 w-8 ${iconColor}`} strokeWidth={2.7} />
                    <h3 className="font-display text-[17px] font-bold leading-tight">{title}</h3>
                    <p className="mt-1.5 max-w-[220px] text-[13px] font-medium leading-snug text-ink/85">
                      {body}
                    </p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
