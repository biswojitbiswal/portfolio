"use client";

import { lazy, Suspense, useState, type CSSProperties, type ElementType } from "react";
import type { IconType } from "react-icons";
import { Wrench } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { reactIconLoaders } from "./icon-loaders";
import { SanityImage } from "./sanity-image";

const iconCache = new Map<string, ElementType>();

function resolveIcon(value: string): ElementType {
  const name = value.trim();
  const cached = iconCache.get(name);
  if (cached) return cached;

  // A pack prefix disambiguates sets sharing names, e.g. fa/FaGithub vs fa6/FaGithub.
  const [pack, exportName] = name.includes("/")
    ? name.split("/")
    : [name.match(/^[A-Z][a-z]*/)?.[0].toLowerCase(), name];
  const loader = pack && Object.hasOwn(reactIconLoaders, pack) ? reactIconLoaders[pack] : undefined;
  const lucideName = name.replace(/^lucide\//, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  if (loader && /^[A-Z][A-Za-z0-9]+$/.test(exportName)) {
    const Icon = lazy(async () => {
      try {
        const icons = await loader();
        return { default: Object.hasOwn(icons, exportName) && typeof icons[exportName] === "function" ? icons[exportName] as IconType : Wrench };
      } catch {
        return { default: Wrench };
      }
    });
    iconCache.set(name, Icon);
    return Icon;
  }

  if (Object.hasOwn(dynamicIconImports, lucideName)) {
    const Icon = lazy(() => dynamicIconImports[lucideName as keyof typeof dynamicIconImports]().catch(() => ({ default: Wrench })));
    iconCache.set(name, Icon);
    return Icon;
  }
  return Wrench;
}

export function CmsIcon({ name, image, fallback: Fallback = Wrench, className, style }: {
  name?: string | null;
  image?: string | null;
  fallback?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  if (image && image !== failedImage) {
    return <SanityImage src={image} alt="" width={48} height={48} className={`${className ?? ""} object-contain`} onError={() => setFailedImage(image)} />;
  }
  const Icon = name?.trim() ? resolveIcon(name) : Fallback;
  const fallback = <Fallback aria-hidden="true" className={className} style={style} />;
  // resolveIcon caches each lazy component at module scope; its identity stays stable across renders.
  // eslint-disable-next-line react-hooks/static-components
  return <Suspense fallback={fallback}><Icon aria-hidden="true" className={className} style={style} /></Suspense>;
}
