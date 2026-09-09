import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[31rem]">
      <div className="group relative aspect-square w-full">
        {/* Upper-left dots */}
        <DotPattern className="left-[2%] top-[10%]" />

        {/* Lower-left dots */}
        <DotPattern className="bottom-[8%] left-[8%]" />

        {/* Right-side dots */}
        <DotPattern className="bottom-[23%] right-0" />

        {/* Main irregular portrait blob */}
        <div
          className="
            absolute
            inset-x-[13%]
            bottom-[7%]
            top-[2%]
            rotate-[7deg]
            overflow-hidden
            rounded-[46%_54%_44%_56%/36%_40%_60%_64%]
            bg-gradient-to-br
            from-violet-300/80
            via-violet-500/50
            to-indigo-500/30
            shadow-[0_30px_80px_rgba(109,40,217,0.18)]
            dark:from-cyan-950
            dark:via-cyan-500/45
            dark:to-cyan-300/25
            dark:shadow-[0_30px_90px_rgba(6,182,212,0.17)]
          "
        >
          {/* Counter rotation keeps portrait straight */}
          {/* <div className="absolute -inset-[8%] -rotate-[7deg]"> */}
          <div className="absolute -inset-[8%] -bottom-[14%] -rotate-[7deg]">
            <Image
              src="/images/biswojit_profile.png"
              alt="Biswojit Biswal, Backend Developer"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="
                object-contain
                object-bottom
                grayscale
                transition-all
                duration-500
                ease-out
                group-hover:scale-[1.025]
                group-hover:grayscale-0
                group-active:grayscale-0
              "
            />
          </div>
        </div>

        {/* Left code card */}
        <div
          className="
            absolute
            left-0
            top-[38%]
            z-20
            rounded-xl
            border
            border-violet-500/60
            bg-white/80
            px-4
            py-3
            shadow-[0_14px_35px_rgba(109,40,217,0.12)]
            backdrop-blur-xl
            dark:border-cyan-400/60
            dark:bg-[#07111f]/85
            dark:shadow-[0_14px_35px_rgba(6,182,212,0.1)]
            sm:px-5
            sm:py-4
          "
        >
          <code className="block whitespace-pre font-mono text-[0.65rem] font-medium leading-5 text-violet-700 dark:text-cyan-300 sm:text-xs">
            {"const\nideas =\nrealProducts();"}
          </code>
        </div>

        {/* Bottom quote card */}
        <div
          className="
            absolute
            bottom-[7%]
            right-[5%]
            z-20
            rounded-xl
            border
            border-violet-500/60
            bg-white/85
            px-4
            py-3
            shadow-[0_14px_35px_rgba(109,40,217,0.12)]
            backdrop-blur-xl
            dark:border-cyan-400/60
            dark:bg-[#07111f]/85
            dark:shadow-[0_14px_35px_rgba(6,182,212,0.1)]
            sm:px-5
            sm:py-4
          "
        >
          <code className="block whitespace-nowrap font-mono text-[0.62rem] leading-5 text-slate-600 dark:text-slate-300 sm:text-xs">
            // Keep Building
            <br />
            Better Solutions
          </code>
        </div>

        {/* Top circuit decoration */}
        <svg
          aria-hidden="true"
          viewBox="0 0 80 90"
          className="absolute right-[3%] top-[14%] h-20 w-16 text-violet-500/60 dark:text-cyan-400/60"
        >
          <path
            d="M14 4v34c0 7 5 12 12 12h30v25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          <rect
            x="7"
            y="1"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <rect
            x="50"
            y="74"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          <circle cx="14" cy="8" r="2" fill="currentColor" />
          <circle cx="56" cy="80" r="2" fill="currentColor" />
        </svg>

        {/* Small lower square */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-[10%]
            left-[32%]
            size-4
            border
            border-violet-500/60
            dark:border-cyan-400/60
          "
        >
          <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-violet-500 dark:bg-cyan-400" />
        </span>

        {/* Small right circle */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-[31%]
            right-[1%]
            size-2.5
            rounded-full
            border
            border-violet-500/70
            dark:border-cyan-400/70
          "
        />
      </div>
    </div>
  );
}

function DotPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute z-0 grid grid-cols-6 gap-2 opacity-55 ${className}`}
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <span
          key={index}
          className="
            size-1
            rounded-full
            bg-violet-500
            shadow-[0_0_5px_rgba(139,92,246,0.3)]
            dark:bg-cyan-500
            dark:shadow-[0_0_5px_rgba(6,182,212,0.35)]
          "
        />
      ))}
    </div>
  );
}