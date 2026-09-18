import Image from "next/image";

type BrandLogoProps = {
  name?: string;
  specialization?: string;
  showSpecialization?: boolean;
};

export function BrandLogo({
  name = "BISWOJIT",
  specialization = "Backend Developer",
  showSpecialization = true,
}: BrandLogoProps) {
  return (
    <div className="flex items-center gap-1">
      {/* Brand mark */}
      <div className="relative h-14 w-14 shrink-0">
        {/* Light theme logo */}
        <Image
          src="/images/brand/logo-light.png"
          alt=""
          fill
          sizes="56px"
          className="object-contain dark:hidden"
          priority
        />

        {/* Dark theme logo */}
        <Image
          src="/images/brand/logo-dark.png"
          alt=""
          fill
          sizes="56px"
          className="hidden object-contain dark:block"
          priority
        />
      </div>

      {/* Brand content */}
      <div className="min-w-0">
        <p className="font-mono text-sm font-bold tracking-[0.12em] text-foreground">
          {name}
        </p>

        {showSpecialization && (
          <p className="text-[0.65rem] font-medium tracking-[0.04em] text-technical">
            {specialization}
          </p>
        )}
      </div>
    </div>
  );
}