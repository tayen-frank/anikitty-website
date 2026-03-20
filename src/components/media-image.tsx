/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { cn } from "@/lib/utils";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
};

export function MediaImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width = 1600,
  height = 1200,
  sizes = "100vw",
}: MediaImageProps) {
  if (!src.startsWith("/")) {
    return (
      <img
        alt={alt}
        className={cn("media-image", className)}
        loading={priority ? "eager" : "lazy"}
        src={src}
      />
    );
  }

  if (fill) {
    return (
      <Image
        alt={alt}
        className={cn("media-image", className)}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />
    );
  }

  return (
    <Image
      alt={alt}
      className={cn("media-image", className)}
      height={height}
      priority={priority}
      sizes={sizes}
      src={src}
      width={width}
    />
  );
}
