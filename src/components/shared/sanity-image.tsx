"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Sanity resizes images at the CDN, avoiding a second optimization proxy.
function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  return urlFor(src).width(width).quality(quality ?? 75).fit("max").auto("format").url();
}

export function SanityImage({ alt, ...props }: Omit<ImageProps, "loader">) {
  return <Image {...props} alt={alt} loader={sanityImageLoader} />;
}
