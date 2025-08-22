import Image from "next/image";

type PhotoWithRingProps = {
  frameSrc: string   // PNG ring (pusat lingkaran di tengah file)
  photoSrc: string  // URL/import foto portrait
  size?: number;                        // ukuran kanvas persegi final (px)
  ringPadding?: number;                 // jarak dari tepi kanvas ke tepi lingkaran (px)
  photoZoom?: number;                   // 1 = normal, >1 = zoom in
  photoOffsetX?: number;                // geser foto (px) +kanan / -kiri
  photoOffsetY?: number;                // geser foto (px) +bawah / -atas
  // opsional kalau frame PNG agak off-center
  frameOffsetX?: number;
  frameOffsetY?: number;
  frameScale?: number;                  // kecil-besarkan frame dikit (0.99–1.01)
};

export function PhotoWithRing({
  frameSrc,
  photoSrc,
  size = 320,
  ringPadding = 22,     // kira2 ketebalan ring + jarak aman
  photoZoom = 1.2, 
  photoOffsetX = 0,
  photoOffsetY = 0,
  frameOffsetX = 0,
  frameOffsetY = 0,
  frameScale = 1,
}: PhotoWithRingProps) {
  // diameter lingkaran (mask) = kanvas persegi dikurangi padding kiri+kanan
  const circle = Math.max(0, size - ringPadding * 5);

  return (
    <div className="relative mx-auto overflow-hidden" style={{ width: size, height: size }}>
      {/* 1) FRAME dipotong persegi oleh container di atas (overflow-hidden) */}
      {/* 2–4) FOTO dimask ke lingkaran */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full overflow-hidden z-0"
        style={{
          width: circle,
          height: circle,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <Image
          src={photoSrc}
          alt="photo"
          fill
          className="object-cover"
          sizes={`${circle}px`}
          // besarkan & geser foto di DALAM mask
          style={{
            transform: `translate(${photoOffsetX}px, ${photoOffsetY}px) scale(${photoZoom})`,
            transformOrigin: "center",
          }}
          priority
        />
      </div>

      {/* 5) FRAME di atas foto (tetap ukuran pakem, tapi kita square‑crop via parent) */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-10"
        style={{
          transform: `translate(${frameOffsetX}px, ${frameOffsetY}px) scale(${frameScale})`,
          transformOrigin: "center",
        }}
      >
        <Image
          src={frameSrc}
          alt="frame"
          fill
          className="object-contain"
          sizes={`${size}px`}
          priority
        />
      </div>
    </div>
  );
}
