import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[31rem]">
      <div className="group relative aspect-square w-full">
        {/* Decorative dot patterns */}
        <DotPattern className="left-[2%] top-[10%]" />
        <DotPattern className="bottom-[8%] left-[8%]" />
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
            from-technical-soft
            via-technical/35
            to-primary/10
            shadow-2xl
            shadow-technical/15
          "
        >
          {/* Counter-rotation keeps the portrait straight */}
          <div className="absolute -inset-[8%] -bottom-[14%] -rotate-[7deg]">
            <Image
              src="/images/biswojit_profile.png"
              alt="Biswojit Biswal, Backend Developer"
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 496px"
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
            border-technical/60
            bg-surface/85
            px-4
            py-3
            shadow-lg
            shadow-technical/10
            backdrop-blur-xl
            sm:px-5
            sm:py-4
          "
        >
          <code className="block whitespace-pre font-mono text-[0.65rem] font-medium leading-5 text-technical sm:text-xs">
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
            border-technical/60
            bg-surface/85
            px-4
            py-3
            shadow-lg
            shadow-technical/10
            backdrop-blur-xl
            sm:px-5
            sm:py-4
          "
        >
          <code className="block whitespace-nowrap font-mono text-[0.62rem] leading-5 text-muted-foreground sm:text-xs">
            // Keep Building
            <br />
            Better Solutions
          </code>
        </div>

        {/* Circuit decoration */}
        <svg
          aria-hidden="true"
          viewBox="0 0 80 90"
          className="
            absolute
            right-[3%]
            top-[14%]
            h-20
            w-16
            text-technical/60
          "
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

          <circle
            cx="14"
            cy="8"
            r="2"
            fill="currentColor"
          />

          <circle
            cx="56"
            cy="80"
            r="2"
            fill="currentColor"
          />
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
            border-technical/60
          "
        >
          <span
            className="
              absolute
              left-1/2
              top-1/2
              size-1
              -translate-x-1/2
              -translate-y-1/2
              bg-technical
            "
          />
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
            border-technical/70
          "
        />
      </div>
    </div>
  );
}

function DotPattern({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        absolute
        z-0
        grid
        grid-cols-6
        gap-2
        ${className}
      `}
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <span
          key={index}
          className="
            size-1
            rounded-full
            bg-grid-dot
            shadow-sm
            shadow-technical/10
          "
        />
      ))}
    </div>
  );
}