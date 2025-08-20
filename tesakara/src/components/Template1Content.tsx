"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Countdown from "./ui/countdown";
import { poppins, libre, gulzar } from "@/app/font";
import Snow from "./Snow";
import Image from "next/image";

type Props = {
  bride: string;
  groom: string;
  to: string;
  date: string;             // "dd-mm-yyyy"
  youtubeId: string;        // "dQw4w9WgXcQ"
  bgVideoSrc: string;       // "/videos/bg.mp4"
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function Template1Content({
  bride,
  groom,
  to,
  date,
  youtubeId,
  bgVideoSrc,
}: Props) {
  const ytRef = useRef<HTMLIFrameElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const section2Ref = useRef<HTMLElement | null>(null);
  const dalilRef = useRef<HTMLElement | null>(null);
  const mempelaiRef = useRef<HTMLElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);
  const [lockFirst, setLockFirst] = useState(false);

  // PostMessage helper for YouTube
  const sendYT = useCallback((func: "playVideo" | "pauseVideo" | "mute" | "unMute" | "stopVideo") => {
    const iframe = ytRef.current;
    if (!iframe) return;
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
  }, []);

  // Smooth scroll to Section 2 when the hero video ends (no DOM swaps => no jitter)
  const handleVideoEnded = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Matikan scroll-snap & smooth sejenak biar nggak kelihatan scroll
    const prevSnap = el.style.scrollSnapType;
    const prevBehavior = el.style.scrollBehavior;
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";

    // Langsung lompat ke Section 2
    const pageHeight = el.clientHeight;
    el.scrollTop = pageHeight; // <-- no animation

    // Pastikan Section 2 langsung fade-in (kalau IO belum sempat nembak)
    const s2 = document.getElementById("segment-after-video");
    s2?.classList.add("section2--revealed");

    setLockFirst(true);

    // Pastikan setelah collapse tetap stay di Section 2
    requestAnimationFrame(() => {
        const el2 = scrollerRef.current;
        if (el2) el2.scrollTop = el2.clientHeight;
    });

    // Balikin setting setelah 1 frame
    setTimeout(() => {
        el.style.scrollSnapType = prevSnap || "";      // contoh awalnya "y mandatory"
        el.style.scrollBehavior = prevBehavior || "";  // contoh awalnya "smooth"
    }, 50);
  }, []);

  // Unmute the audio on the first user interaction (once)
  useEffect(() => {
    const unmuteOnce = () => {
      sendYT("unMute");
      window.removeEventListener("click", unmuteOnce, true);
      window.removeEventListener("touchstart", unmuteOnce, true);
    };
    window.addEventListener("click", unmuteOnce, true);
    window.addEventListener("touchstart", unmuteOnce, true);
    return () => {
      window.removeEventListener("click", unmuteOnce, true);
      window.removeEventListener("touchstart", unmuteOnce, true);
    };
  }, [sendYT]);

  return (
    <div className="w-full flex justify-center bg-black text-white">
      <Snow color="#382e2dff" />
      <div
        ref={scrollerRef}
        className="relative w-[470px] h-[905px] overflow-y-auto snap-y snap-mandatory scroll-smooth [scrollbar-gutter:stable]"
      >
        {/* SECTION 1 — HERO VIDEO */}
        <section
          id="segment-hero-video"
          className={[
            "relative w-full overflow-hidden bg-black transition-all duration-300",
            lockFirst ? "h-0 snap-none pointer-events-none" : "h-[905px] snap-start",
          ].join(" ")}
        >
          {!lockFirst && (
            <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="auto"
            muted
            autoPlay
            src={bgVideoSrc}
            onEnded={handleVideoEnded}
            />
          )}
        </section>

        {/* SECTION 2 — CONTENT (fades in when visible) */}
        <section
          ref={section2Ref}
          id="segment-after-video"
          className="relative w-full h-[905px] snap-start bg-[#0b0b0b] flex items-center justify-center section2"
        >
          <SectionTwo bride={bride} groom={groom} date={date} />
        </section>

        {/* SECTION 3 — DALIL (audio starts/stops by visibility) */}
        <section
          ref={dalilRef}
          id="dalil"
          className="relative w-full h-[905px] snap-start bg-[#0b0b0b]"
        >
          <DalilSection />
          {/* Spacer acts as bottom sentinel inside Dalil
          <div ref={bottomSentinelRef} className="h-24" /> */}
        </section>

       {/* SECTION 4 — MEMPELAI */}
        <section
            ref={mempelaiRef}
            id="mempelai"
            className="relative isolate w-full min-h-screen snap-start"
        >
            <MempelaiSection />
        </section>

        {/* Hidden YouTube iframe (audio) */}
        <iframe
          ref={ytRef}
          className="pointer-events-none"
          style={{ position: "absolute", width: 0, height: 0, left: -9999, top: -9999 }}
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&mute=0&playsinline=1`}
          title="music"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      {/* Styles for Section 2 entrance + some shared CSS */}
      <style jsx>{`
        :root {
          --easing-out-quad: cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        /* SECTION 2 entrance */
        .section2 {
          opacity: 0;
          transform: translateY(12px) scale(0.985);
          filter: blur(10px);
          will-change: opacity, transform, filter;
          backface-visibility: hidden;
          transition:
            opacity 900ms var(--easing-out-quad),
            transform 900ms var(--easing-out-quad),
            filter 900ms var(--easing-out-quad);
        }
        .section2.section2--revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .section2,
          .section2.section2--revealed {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- SUB‑SECTIONS ---------- */

function SectionTwo({ bride, groom, date }: { bride: string; groom: string; date: string }) {
  const [dd, mm, yyyy] = date.split("-");

  return (
    <section className="relative w-[470px] h-full">
      {/* soft grid background */}
      <div
        className="bg"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(103,85,83,0.05) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(103,85,83,0.05) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* content */}
      <div className="relative h-full flex flex-col items-center px-8">
        <div className="h-40" />
        {/* “The Wedding Of” */}
        <div className="flex justify-center">
          <div className="wedding" style={{ width: 256 }}>
            <div className="t">T</div>
            <div className="he">he</div>
            <div className="w">W</div>
            <div className="edding">edding</div>
            <div className="o">O</div>
            <div className="f">f</div>
          </div>
        </div>

        {/* Names */}
        <div className="name">
          <span className="bride">{bride}</span>
          <span className="div">&</span>
          <span className="groom">{groom}</span>
        </div>

        <div className="h-4" />

        {/* Date */}
        <div className={`flex gap-6 mt-6 mb-8 text-[#bb959d] ${libre.className} font-bold text-2xl`}>
          <span>{dd}</span>
          <span className="relative -top-1">.</span>
          <span>{mm}</span>
          <span className="relative -top-1">.</span>
          <span>{yyyy.slice(2)}</span>
        </div>

        <Countdown
          date={date}
          boxColor="bg-[#bb959d]"
          textColor="text-[#bb959d]"
          fontFamily={poppins.className}
          extralight
        />
      </div>

      {/* local styles for SectionTwo */}
      <style jsx>{`
        .bg {
          width: 100%;
          position: relative;
          background-color: #f6eee7;
          height: 100%;
        }
        .he {
          position: absolute;
          top: 12px;
          left: 40px;
        }
        .t {
          position: absolute;
          top: -3px;
          left: 0px;
          font-size: 38px;
          font-family: 'Meow Script';
          display: inline-block;
          width: 67px;
          height: 49px;
          color: #675553;
        }
        .f { /* kept for layout compat; not used visually */
          position: absolute;
          top: 10px;
          left: 248px;
        }
        .o {
          position: absolute;
          top: -3px;
          left: 220px;
          font-size: 38px;
          font-family: 'Meow Script';
          display: inline-block;
          width: 40px;
          height: 49px;
          color: #675553;
        }
        .edding {
          position: absolute;
          top: 12px;
          left: 123px;
        }
        .w {
          position: absolute;
          top: -3px;
          left: 76px;
          font-size: 38px;
          font-family: 'Meow Script';
          display: inline-block;
          width: 47px;
          height: 49px;
          color: #675553;
        }
        .wedding {
          width: max-content;
          position: relative;
          margin: 0 auto;
          height: 49px;
          text-align: left;
          font-size: 22px;
          color: #675553;
          font-family: 'Libre Baskerville';
        }
        .name {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          overflow: visible;
          width: 110%;
          padding: 50px 50px;
          box-sizing: border-box;
          height: 230px;
          font-size: 72px;
          color: #675553;
          font-family: 'Meow Script';
        }
        @keyframes pulse-text {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .bride {
          display: block;
          line-height: 0.3;
          animation: pulse-text 3s ease-in-out infinite;
          transform-origin: center;
        }
        .groom {
          display: block;
          line-height: 0;
          animation: pulse-text 3s ease-in-out infinite;
          transform-origin: center;
        }
        .div {
          font-size: 64px;
          margin: 0.5rem 0;
        }
      `}</style>
    </section>
  );
}

function DalilSection() {
  const iconlink = "https://lh3.googleusercontent.com/d/1FXIFbA7q056resWKB7SinkZ1az-kWSic=w748-h496";
  return (
    <div className="relative isolate h-full w-[470px] flex flex-col items-center justify-center">
      {/* background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundColor: "#f6eee7",
          backgroundImage: `
            linear-gradient(to right, rgba(103,85,83,0.05) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(103,85,83,0.05) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* content */}
      <div className="relative w-[374px] h-[248px] overflow-hidden mx-auto">
        <Image
            src={iconlink}
            alt="time"
            // width={488}
            // height={340}
            fill
            priority
            className="object-cover"
        />
      </div>

      <div className="h-8" />
      
      <div className="relative z-10 max-w-[340px] text-center space-y-5">
        <p
            className={`${gulzar.className} text-xl leading-[3rem] text-[#675553]`}
            dir="rtl"
            lang="ar"
            >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِّنْ أَنْفُسِكُمْ أَزْوَاجًا
            لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ
            إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            <span className="ml-2">٢١</span>
        </p>

        <p className="translate">
          “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu
          sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
          sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”
        </p>

        <p className="translate" style={{ fontSize: "7px" }}>(Q.S. Ar‑Rūm: 21)</p>
      </div>

      {/* local styles */}
      <style jsx>{`
        .translate {
          width: 359px;
          position: relative;
          font-size: 10px;
          line-height: 17px;
          font-family: 'Libre Baskerville';
          color: #675553;
          text-align: center;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

function MempelaiSection() {
  const iconlink = "https://lh3.googleusercontent.com/d/1FXIFbA7q056resWKB7SinkZ1az-kWSic=w1496-h992";
  const secRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, threshold: 0.25 } // muncul saat >=25% section kelihatan
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={secRef}
      id="informasi-mempelai"
      className="relative isolate snap-start w-full min-h-screen"
      aria-label="Informasi Mempelai"
    >
      {/* GRID BG */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundColor: "#f6eee7",
          backgroundImage: `
            linear-gradient(to right, rgba(103,85,83,0.08) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(103,85,83,0.08) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* === STICKY OVERLAY (nempel di viewport) === */}
        <div className="sticky top-0 h-screen pointer-events-none z-0">
        {/* taruh elemen langsung absolut ke pojok layar */}
        {/* TOP-RIGHT (pojok kanan atas) */}
        <div className="absolute top-50 right-0 translate-x-6 -translate-y-6">
            <div className="base-rotate-tr">
            <img
                src={iconlink}
                alt=""
                className="sway drop-shadow w-[280px] sm:w-[340px] md:w-[380px] h-auto"
            />
            </div>
        </div>

        {/* BOTTOM-LEFT (pojok kiri bawah) */}
        <div className="absolute bottom-[-90px] left-0 -translate-x-6 translate-y-6">
            <div className="base-rotate-bl">
            <img
                src={iconlink}
                alt=""
                className="sway drop-shadow w-[280px] sm:w-[340px] md:w-[380px] h-auto"
            />
            </div>
        </div>
        </div>

      {/* KONTEN */}
      <div className="relative z-10 mx-auto max-w-[520px] px-4 py-10">
        {/* ... konten mempelai ... */}
        {/* <div className="h-8" />
        <div className="h-8" />
        <p>haihahai</p>
        <div className="h-8" />
        <div className="h-8" />
        <div className="h-8" />
        <div className="h-8" />
        <p>haihahai</p>
        <div className="h-8" />
        <div className="h-8" />
        <div className="h-8" />
        <div className="h-8" />
        <div className="h-8" />
        <p>haihahai</p>
        <div className="h-8" />
        <div className="h-8" />
        <div className="h-8" />
        <div className="h-8" />
        <p>haihahai</p>
        <div className="h-8" /> */}
      </div>

      <style jsx>{`
        .base-rotate-tr { transform: rotate(-128.79deg); transform-origin: 50% 8%; }
        .base-rotate-bl { transform: rotate(51.21deg);   transform-origin: 50% 8%; }

        .sway { animation: sway 8s ease-in-out infinite alternate; will-change: transform; }
        @keyframes sway {
          0% { transform: translateX(-6px) rotate(-4deg); }
          100% { transform: translateX(6px) rotate(4deg); }
        }
        .drop-shadow { filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15)); }

        @media (prefers-reduced-motion: reduce) { .sway { animation: none !important; } }
      `}</style>
    </section>
  );
}

