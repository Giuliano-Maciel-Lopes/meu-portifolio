import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/Logo Giuliano.png"
      alt="logo"
      width={100}
      height={100}
      className="h-20 w-auto object-cover md:h-16"
    />
  );
}
