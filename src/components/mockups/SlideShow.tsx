"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SlideShow({ images, interval = 4000 }: { images: string[]; interval?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          className={`object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 768px) 100vw, 500px"
        />
      ))}
    </div>
  );
}
