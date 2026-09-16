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
                <Image
                    src="/images/brand/logo.png"
                    alt=""
                    fill
                    sizes="52px"
                    className="object-contain"
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