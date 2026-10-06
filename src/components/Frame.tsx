import Image from "next/image";
import ParallaxInner from "./ParallaxInner";
import { assetSrc } from "@/lib/asset";

/**
 * Fixed-ratio image frame. `ratio` is width/height; `4/5` is the catalogue
 * default. Set `parallax={false}` for images that sit inside something already
 * moving (a carousel slide, a hover-zoom card).
 */
export default function Frame({
  src,
  alt,
  ratio,
  sizes = "100vw",
  priority = false,
  contain = false,
  parallax = true,
  zoom = false,
  className = "",
  fill = false,
}: {
  src: string;
  alt: string;
  ratio?: number;
  sizes?: string;
  priority?: boolean;
  contain?: boolean;
  parallax?: boolean;
  zoom?: boolean;
  className?: string;
  /** Stretch to the parent box instead of holding a ratio. */
  fill?: boolean;
}) {
  const img = (
    <Image
      src={assetSrc(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={zoom ? "frame__zoom" : undefined}
      style={{ objectFit: contain ? "contain" : "cover" }}
    />
  );

  return (
    <div
      className={`frame ${contain ? "frame--contain" : ""} ${className}`}
      style={
        fill
          ? { position: "absolute", inset: 0 }
          : { aspectRatio: String(ratio ?? 4 / 5) }
      }
    >
      {parallax ? (
        <ParallaxInner>{img}</ParallaxInner>
      ) : (
        <div className="frame__inner" style={{ height: "100%", top: 0 }}>
          {img}
        </div>
      )}
    </div>
  );
}
