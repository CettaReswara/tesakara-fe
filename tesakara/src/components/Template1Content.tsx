"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { poppins, libre } from "@/app/font";
import Snow from "./Snow";
import Countdown from "./ui/countdown";
import { PhotoWithRing } from "./ui/photoring";
import { Button } from "./ui/button";
import AdabCarousel from "./ui/carousel";
import Template1Timeline from "./Template1Timeline";
import { Template1Akad, Template1Walimah, Template1Live } from "./Template1Acara";
import { Template1RSVP, Template1Selamat } from "./Template1RSVP";
import { Template1Hadiah } from "./Template1Hadiah";
import { RevealGroup } from "./reveal/reveal";

type BankInfo = {
  bank: string;
  atasNama: string;
  noRekening: string;
};

type AlamatProp = {
  namatempat: string;
  alamat: string;
  link: string;
  mulai: string; //00.00
  selesai: string; //00.00
}

type LiveProps = {
  link: string;
}

type AddressBlock =
  { isAlamat: boolean; 
    penerima: string; //kalo false "" 
    alamat: string } //kalo false ""

type Details = {
  fullbride: string;
  fullgroom: string;
  fbride: string;
  mbride: string;
  fgroom: string;
  mgroom: string;
  brillust: string;
  grillust: string;
  akad: AlamatProp;
  walimah: AlamatProp;
  live: LiveProps;
  maxhadir: number;
  alamat: AddressBlock;
};

type Props = {
  bride: string;
  groom: string;
  to: string;
  date: string;             // "dd-mm-yyyy"
  bank: BankInfo[];
  detail: Details;
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
  bank,
  detail,
  youtubeId,
  bgVideoSrc,
}: Props) {
  const ytRef = useRef<HTMLIFrameElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const section2Ref = useRef<HTMLElement | null>(null);
  const dalilRef = useRef<HTMLElement | null>(null);
  const mempelaiRef = useRef<HTMLElement | null>(null);
  const [lockFirst, setLockFirst] = useState(false);

  // PostMessage helper YouTube
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

    document.getElementById("segment-after-video")
    ?.classList.add("section2--revealed");

    // Collapse S1 first so layout is final
    setLockFirst(true);

    // After React commits the collapse, position the scroll at S2
    requestAnimationFrame(() => {
      const s2 = document.getElementById("segment-after-video");
      if (s2) {
        // After S1 collapses, S2 is at top (offsetTop ~ 0)
        el.scrollTop = s2.offsetTop;
      } else {
        // Fallback: ensure at least top
        el.scrollTop = 0;
      }

      // Re-enable snap + smooth on the next frame (layout settled)
      requestAnimationFrame(() => {
        el.style.scrollSnapType = prevSnap || "";
        el.style.scrollBehavior = prevBehavior || "";
      });
    });
}, []);

  //   // Langsung lompat ke Section 2
  //   const pageHeight = el.clientHeight;
  //   el.scrollTop = pageHeight; // <-- no animation

  //   // Pastikan Section 2 langsung fade-in (kalau IO belum sempat nembak)
  //   const s2 = document.getElementById("segment-after-video");
  //   s2?.classList.add("section2--revealed");

  //   setLockFirst(true);

  //   // Pastikan setelah collapse tetap stay di Section 2
  //   requestAnimationFrame(() => {
  //       const el2 = scrollerRef.current;
  //       if (el2) el2.scrollTop = el2.clientHeight;
  //   });

  //   // Balikin setting setelah 1 frame
  //   setTimeout(() => {
  //       el.style.scrollSnapType = prevSnap || "";      // contoh awalnya "y mandatory"
  //       el.style.scrollBehavior = prevBehavior || "";  // contoh awalnya "smooth"
  //   }, 50);
  // }, []);

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
    <div className="w-full flex justify-center bg-black text-white no-horizontal-scroll">
      <Snow color="#382e2dff" />
      <div
        ref={scrollerRef}
        className="relative w-screen max-w-[470px] h-screen overflow-y-auto overflow-x-hidden"
      >
        {/* SECTION 1 — HERO VIDEO */}
        <section
          id="segment-hero-video"
          className={[
            "relative w-full overflow-hidden bg-black transition-all duration-300",
            lockFirst ? "h-0 snap-none pointer-events-none" : "h-screen snap-start",
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
          className="relative w-full h-screen snap-start bg-[#0b0b0b] flex items-center justify-center section2"
        >
          <CountdownSection bride={bride} groom={groom} date={date} />
        </section>

        {/* SECTION 3 — DALIL (audio starts/stops by visibility) */}
        <section
          ref={dalilRef}
          id="dalil"
          className="relative w-full h-screen snap-start bg-[#0b0b0b] items-center justify-center"
        >
          <DalilSection />
          {/* Spacer acts as bottom sentinel inside Dalil
          <div ref={bottomSentinelRef} className="h-24" /> */}
        </section>

       {/* SECTION 4 — MEMPELAI */}
        <section
            ref={mempelaiRef}
            id="mempelai"
            className="relative isolate snap-start snap-always w-full auto min-h-dvh"
        >
            <MempelaiSection 
              fullbride={detail.fullbride}
              fullgroom={detail.fullgroom}
              fbride={detail.fbride}
              mbride={detail.mbride}
              fgroom={detail.fgroom}
              mgroom={detail.mgroom}
              brlink={detail.brillust}
              grlink={detail.grillust}
            />
        </section>

        {/* SECTION 5 — ACARA */}
        <section
            // ref={mempelaiRef}
            id="acara1"
            className="relative w-full snap-start bg-[#0b0b0b] items-center justify-center"
        >
          <Template1Akad
            namatempat={detail.akad.namatempat}
            alamat={detail.akad.alamat}
            link={detail.akad.link}
            mulai={detail.akad.mulai}
            selesai={detail.akad.selesai}
            date={date}
          />

        </section>

        <section
            // ref={mempelaiRef}
            id="acara2"
            className="relative w-full snap-start bg-[#0b0b0b] items-center justify-center"
        >

          <Template1Walimah
            namatempat={detail.walimah.namatempat}
            alamat={detail.walimah.alamat}
            link={detail.walimah.link}
            mulai={detail.walimah.mulai}
            selesai={detail.walimah.selesai}
            date={date}
          />

        </section>

        <section
            // ref={mempelaiRef}
            id="acara3"
            className="relative w-full h-auto snap-start bg-[#0b0b0b] items-center justify-center"
        >

          <Template1Live
            link={detail.live.link}
          />
          <div className="h-[230px]" />
          
        </section>

        {/* SECTION 6 — ADAB */}
        <section
            // ref={mempelaiRef}
            id="adab"
            className="relative w-full min-h-screen snap-start bg-[#f6eee7] items-center justify-center"
        >
          <Adab />
        </section>

        {/* SECTION 7 — DOA */}
         <section
            // ref={mempelaiRef}
            id="doa"
            className="relative w-full min-h-screen snap-start bg-[#f6eee7] items-center justify-center"
        >
          <DoaMempelai />
        </section>

        {/* SECTION 8 — KONFIRMASI & UCAPAN */}
        <section
            // ref={mempelaiRef}
            id="konfirmasi"
            className="relative w-full min-h-screen snap-start bg-[#f6eee7] items-center justify-center"
        >
          <Template1RSVP 
            maxValue={detail.maxhadir} 
            name={to} 
        />

        </section>

        <section
            // ref={mempelaiRef}
            id="ucapan"
            className="relative w-full min-h-screen snap-start bg-[#f6eee7] items-center justify-center"
        >
          <Template1Selamat
          />

        </section>

        {/* SECTION 9 — HADIAH */}

        <section
            // ref={mempelaiRef}
            id="hadiah"
            className="relative w-full min-h-screen snap-start bg-[#f6eee7] items-center justify-center"
        >
          
          <Template1Hadiah
            dataRekening={bank} 
            isAlamat={detail.alamat.isAlamat}
            penerima={detail.alamat.penerima}
            alamat={detail.alamat.alamat}
          />

        </section>

        {/* SECTION 10 — PENUTUP */}
        <section
            // ref={mempelaiRef}
            id="penutup"
            className="relative w-full min-h-screen snap-start bg-[#f6eee7] items-center justify-center"
        ></section>

        {/* YouTube iframe (audio) */}
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

function CountdownSection({ bride, groom, date }: { bride: string; groom: string; date: string }) {
  const [dd, mm, yyyy] = date.split("-");

  return (
    <section className="relative w-screen max-w-[470px] h-full">
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
        <RevealGroup direction="zoom" amount={0.3} duration={1.2}>
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
        </RevealGroup>

        {/* Names */}
        <RevealGroup direction="zoom" amount={0.3} duration={1.2}>
          <div className="name">
            <span className="bride">{bride}</span>
            <span className="div">&</span>
            <span className="groom">{groom}</span>
          </div>
        </RevealGroup>

        <div className="h-4" />

        {/* Date */}
        <RevealGroup direction="zoom" amount={0.3} duration={1.6}>
          <div className={`flex gap-6 mt-6 mb-8 text-[#bb959d] ${libre.className} font-bold text-2xl`}>
            <span>{dd}</span>
            <span className="relative -top-1">.</span>
            <span>{mm}</span>
            <span className="relative -top-1">.</span>
            <span>{yyyy.slice(2)}</span>
          </div>
        </RevealGroup>

        <RevealGroup direction="zoom" amount={0.3} duration={1.6}>
          <Countdown
            date={date}
            boxColor="bg-[#bb959d]"
            textColor="text-[#bb959d]"
            fontFamily={poppins.className}
            extralight
          />
        </RevealGroup>
      </div>

      {/* local styles */}
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
          left: 217px;
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
          font-family: 'Libre Baskerville', serif;
          font-style: italic;
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);
  const [isMusicPlayed, setIsMusicPlayed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Create the YouTube Player when the section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && !isMusicPlayed) {
          // Play the main video (muted) when the section is in view
          if (videoRef.current) {
            videoRef.current.play(); // Play main video (muted)
            videoRef.current.muted = true; // Ensure the main video is muted
            setIsVideoPlayed(true);
          }

          // Load and play the YouTube music
          if (!iframeRef.current) {
            const iframe = document.createElement("iframe");
            iframe.src = "https://www.youtube.com/embed/m24kZjhq3Cw?autoplay=1&loop=1&mute=0"; // Replace with your YouTube video URL
            iframe.width = "1";
            iframe.height = "1";
            iframe.style.position = "absolute";
            iframe.style.visibility = "hidden"; // Hide the iframe
            iframe.style.pointerEvents = "none"; // Disable interactions with the iframe
            iframeRef.current = iframe;

            // Append the iframe to the body or a hidden div
            document.body.appendChild(iframe);
            setIsMusicPlayed(true); // Mark that music is now playing
          }
        } else if (!entry.isIntersecting && isMusicPlayed) {
          // Stop the video and music when the section is not in view
          if (videoRef.current) {
            videoRef.current.pause();
          }

          if (iframeRef.current) {
            if (!iframeRef?.current) return;
            setIsMusicPlayed(false);
          }
        }
      },
      {
        threshold: 0.3, // Ensure 100% visibility for playback
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.disconnect();
      }
    };
  }, [isMusicPlayed]);
  
  return (
    <div className="relative isolate h-screen w-screen max-w-[470px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
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

      {/* Video content */}
      <div className="relative w-screen max-w-[470px] max-h-screen overflow-hidden mx-auto">
        <video
          ref={videoRef}
          src="/videos/template1dalil.mp4"
          autoPlay
          muted
          playsInline 
          className="object-cover w-full h-full"
        />
      </div>
      </div>
  );
}

function MempelaiSection({ fullbride, fullgroom, fbride, fgroom, mbride, mgroom, brlink, grlink, }: { fullbride: string; fullgroom: string; fbride: string; fgroom: string; mbride: string; mgroom: string; brlink: string; grlink: string}) {
  const bgVideoSrc = "/videos/template1vidbg.mp4";
  //const iconlink = "https://lh3.googleusercontent.com/d/1FXIFbA7q056resWKB7SinkZ1az-kWSic=w1496-h992";
  const borderlink = "https://lh3.googleusercontent.com/d/1jNS6LOo6D5HjLkFN7wMidmw2UUdQPNL_=w1080-h1350";
  const secRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const [openStory, setOpenStory] = useState(false);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Biar autoplay jalan di mobile: play saat inView, pause saat keluar
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      const tryPlay = async () => {
        try {
          // penting untuk iOS
          v.muted = true;
          v.playsInline = true as any;
          await v.play();
        } catch (e) {
          // autoplay kadang pending sampai canplay/canplaythrough
        }
      };
      tryPlay();
    } else {
      v.pause();
    }
  }, [inView]);

  const handleCanPlay = () => {
    if (inView) videoRef.current?.play().catch(() => {});
  };

  return (
    <section
      ref={secRef}
      id="informasi-mempelai"
      className="relative isolate snap-start bg-[#f6eee7]" // pastikan minimal setinggi layar
      aria-label="Informasi Mempelai"
    >
      {/* === VIDEO  === */}
      <div className="bg-fixed-vid">
        <video
          ref={videoRef}
          className={[
            // "-translate-y-3/32",
            "fixed inset-0 -z-20 w-screen max-w-[470px] mx-auto h-auto object-cover overflow-hidden",
            "transition-opacity duration-300 ease-linear pointer-events-none select-none",
            inView ? "opacity-100" : "opacity-0"
          ].join(" ")}
          // sumber video (boleh pakai <source> ganda webm+mp4 kalau mau)
          src={bgVideoSrc}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          aria-hidden="true"
          onCanPlay={handleCanPlay}
        />
      </div>

      {/* KONTEN */}
      <div className="h-14 center" />
      <div className="relative z-10 mx-auto w-screen max-w-[470px] flex flex-col items-center space-y-2">
        <RevealGroup direction="zoom" amount={0.8} duration={4}>
        <div className="pembuka">
          <i className="salam">Assalamu‘alaikum Warahmatullahi Wabarakaatuh</i>
          <div className="katakata">
            <p className="kata">Mahasuci Allah ﷻ</p>
            <p className="kata">yang telah mensyariatkan pernikahan dan menciptakan pasangan bagi setiap hambaNya.</p>
            <p className="kata">InsyaaAllah, akan dilakanakan pernikahan antara:</p>
          </div>
        </div>
        </RevealGroup>

        <RevealGroup direction="zoom" amount={0.8} duration={4} stagger={0.1}>
        <PhotoWithRing
            frameSrc={borderlink}    
            photoSrc={brlink}         
            size={320}                
            ringPadding={24}       
            photoZoom={1.35}         
            photoOffsetY={12}        
            frameOffsetY={15}
        />
        </RevealGroup>

        <RevealGroup direction="up" amount={0.8} duration={4} stagger={0.1}>
        <div className="brides">
          <div className="name">{fullbride}</div>
          <div className={`fam ${libre.className}`}>Putri dari Bapak {fbride} dan Ibu {mbride}</div>
        </div>
        </RevealGroup>

        <RevealGroup direction="zoom" amount={0.8} duration={7} stagger={0.1}>
        <div className="dengan">&</div>
        </RevealGroup>

        <RevealGroup direction="zoom" amount={0.8} duration={4} stagger={0.1}>
        <PhotoWithRing
            frameSrc={borderlink}    
            photoSrc={grlink}         
            size={320}                
            ringPadding={24}       
            photoZoom={1.5}         
            photoOffsetY={35}
            photoOffsetX={15}        
            frameOffsetY={15}
        />
        </RevealGroup>

        <RevealGroup direction="up" amount={0.8} duration={4} stagger={0.1}>
        <div className="groom">
          <div className="name">{fullgroom}</div>
          <div className={`fam ${libre.className}`}>Putra dari Bapak {fgroom} dan Ibu {mgroom}</div>
        </div>
        </RevealGroup>
      </div>

      <RevealGroup direction="down" amount={0.8} duration={4} stagger={0.1}>
      <div className="mt-16 flex justify-center">
          <Button className="animate-bob" onClick={() => setOpenStory(true)}>Our Story</Button>
      </div>
      </RevealGroup>

      <OurStoryOverlay 
        open={openStory}
        onClose={() => setOpenStory(false)} 
      />
      
      <div className="h-[150px]" />

      <style jsx>{`

        .salam {
            // position: absolute;
            top: 0px;
            left: 0px;
            line-height: 17px;
            font-size: 12px;
        }
        .kata {
            margin: 0;
        }
        .katakata {
            // position: absolute;
            top: 43px;
            left: 3px;
            font-size: 10px;
            line-height: 17px;
            display: inline-block;
            width: 313px;
        }
        .pembuka {
            width: 100%;
            color: #675553;
            font-family: 'Libre Baskerville';
            display: flex;
            flex-direction: column;
            align-items: center; 
            justify-content: flex-start;
            text-align: center;
            gap: 12px;         
            top: 43px;
            left: 3px;
        }

        .name {
            font-family: 'Berkshire Swash';
            font-size: 32px;
            max-width: 300px;
            text-align: center;
            display: inline-block;
            line-height: 1.2;
            }

        .fam {
            margin-top: 5px;
            top: 44px;
            left: 13px;
            font-size: 12px;
            }

        .brides {
            margin-top: -20px;
            width: 100%;
            position: relative;
            // height: 59px;
            text-align: center;
            color: #675553;
         }

        .groom {
            margin-top: -20px;
            width: 100%;
            position: relative;
            // height: 59px;
            text-align: center;
            color: #675553;
        }

        .dengan {
            margin-top: 40px;
            margin-bottom: -20px;
            width: 43px;
            position: relative;
            font-size: 60px;
            font-family: 'Meow Script';
            color:  #675553;
            text-align: center;
            display: inline-block;
        }
      `}</style>
    </section>
  );
}

function OurStoryOverlay({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[999]">
      {/* backdrop dims */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* centered panel */}
      <div className="absolute inset-0 grid place-items-center p-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <Template1Timeline 
          taaruf="15 Agustus 2024"
          nadzor="15 Januari 2025"
          khitbah="15 Maret 2025"
          akad="15 September 2025"
            // taaruf="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus."
            // nadzor="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus."
            // khitbah="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus."
            // akad="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ut augue fermentum ullamcorper lacus."
          />

          {/* close button */}
          <button
            aria-label="Close Our Story"
            onClick={onClose}
            className="absolute top-6 right-6 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function Adab() {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate snap-start w-full min-h-[100dvh] max-h-screen bg-[#f6eee7]"
    >
      {/* vidbg */}
        <video
          className={`-z-20 absolute inset-0 w-screen max-w-[470px]  mx-auto overflow-hidden object-content transition-opacity duration-700 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          src="/videos/template1flower.mp4"
          muted
          playsInline
          autoPlay
          loop
        />
      
      <RevealGroup direction="up" amount={0.3} duration={6} stagger={0.12}>
      <div className="adab">
        <div className="adabWalimah">Adab Walimah</div>
          <div className="tanpaMengurangiRasaContainer">
          <p className="tanpaMengurangiRasa">Tanpa mengurangi rasa hormat kami,</p>
          <p className="tanpaMengurangiRasa">ada adab-adab seorang muslim yang harus diperhatikan ketika menghadiri walimah:</p>
        </div>

        <div className="carousel">
          <AdabCarousel />
        </div>
      </div>
      </RevealGroup>

      <style jsx>{`
      .adabWalimah {
        position: absolute;
        top: 174px;
        left: 130px;
      }
      .tanpaMengurangiRasa {
        margin: 0;
      }
      .tanpaMengurangiRasaContainer {
        position: absolute;
        top: 239px;
        left: 56px;
        font-size: 12px;
        font-family: 'Libre Baskerville';
        display: inline-block;
        width: 357px;
      }

      .adab {
        width: 100%;
        position: relative;
        height: 905px;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
        font-size: 40px;
        color: #675553;
        font-family: 'Meow Script';
        margin-top: -240px;
      }

      .carousel {
        width: 100%;
        position: relative;
        height: 303px;
        margin-top: 300px;
      }
      `}</style>

    </section>
  );
}

function DoaMempelai() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVideoPlayed && videoRef.current) {
          videoRef.current.play();
          setIsVideoPlayed(true);
        } else if (!entry.isIntersecting && isVideoPlayed && videoRef.current) {
          videoRef.current.pause();
          setIsVideoPlayed(false);
        }
      },
      { threshold: 0.5 } 
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVideoPlayed]);

  const handleStopPreview = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlayed(false);
    }
  };

  return (
      <div className="relative isolate h-full w-screen max-w-[470px] flex flex-col items-center justify-center">
      {/* Background */}
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

      {/* Video content */}
      <div className="relative w-screen max-w-[470px] h-screen overflow-hidden mx-auto">
        <video
          ref={videoRef}
          src="/videos/template1doa.mp4/"
          autoPlay
          muted
          playsInline 
          className="object-cover w-full h-full"
        />
      </div>
      </div>
  );
}