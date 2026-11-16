import Image from "next/image";

export function DiamondMark({ className }: { className: string }) {
  return (
    <Image
      src="/diamond-icon.png"
      alt=""
      width={128}
      height={128}
      unoptimized
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
