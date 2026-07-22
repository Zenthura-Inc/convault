import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  iconSize?: number;
  priority?: boolean;
  textClassName?: string;
};

export function BrandLogo({
  iconSize = 40,
  priority = false,
  textClassName = "text-lg",
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 rounded-xl py-2 font-bold tracking-tight text-[var(--brand)]"
      aria-label="Convault home"
    >
      <span
        className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/icon-transparent.png"
          alt=""
          width={iconSize}
          height={iconSize}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </span>
      <span className={textClassName}>Convault</span>
    </Link>
  );
}
