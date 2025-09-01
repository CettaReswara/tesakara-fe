import styles from "./Template1Acara.module.css";
import { extractFromDmy, type Extracted } from "@/lib/date";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Reveal, RevealGroup } from "./reveal/reveal";

type AlamatProp = {
  namatempat: string;
  alamat: string;
  link: string;
  mulai: string; //00.00
  selesai: string; //00.00
  date: string; // "dd-mm-yyyy"
}

type LiveProps = {
  link: string;
}

export function Template1Akad({namatempat, alamat, link, mulai, selesai, date}: AlamatProp) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const out = extractFromDmy(date);

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

  const onOpenAkadMap = () => {
    const mapLink = link;
    window.open(mapLink, "_blank");

  };

  return (
    <section
      ref={ref}
      className="relative isolate snap-start w-full min-h-[100dvh] bg-[#f6eee7]"
    >
      {/* vidbg */}
      <div className="bg-scroll z-0" aria-hidden="true">
        <video
          className={`-z-20 absolute inset-0 w-screen max-w-[470px] mx-auto overflow-hidden object-cover transition-opacity duration-700 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          src="/videos/template1shade.mp4"
          muted
          playsInline
          autoPlay
          loop
        />
      </div>

      {/* Konten */}
      <div className="h-14 center" />
      <div className="relative z-10 mx-auto max-w-[470px] flex flex-col items-center justify-center space-y-2">
      
      <div className={`${styles.content} item-center`}>

        <RevealGroup direction="up" amount={0.7} duration={10} stagger={0.12}>
        <div className={styles.pembuka}>
          Dengan memohon taufik dan rahmat Allah ﷻ, kami bermaksud mengundang
          Bapak/Ibu/Saudara/i untuk menghadiri rangkaian pernikahan kami yang
          akan diselenggarakan pada:
        </div>
        </RevealGroup>

        {/* AKAD */}
        <RevealGroup direction="down" amount={0.3} duration={6} stagger={0.12}>
        <div className={`${styles.heading} item-center`}>
            <span className={styles.a}>A</span>
            <i className={styles.kad}>kad Nikah</i>
        </div>
        </RevealGroup>
        
        <RevealGroup direction="down" amount={0.3} duration={6} stagger={0.12}>
         <div className={styles.container}>
          <div className={styles.dateBox}>
            <div className={styles.day}>{out.day}</div>
            <div className={styles.datemonth}>
              <div className={styles.date}>{out.date}</div>
              <div className={styles.month}>{out.month}</div>
            </div>
            <div className={styles.year}>{out.year}</div>
          </div>
          <Image 
            className={styles.decorationIcon} 
            width={364} 
            height={173} 
            sizes="100vw" 
            alt="Decoration" 
            src="/svg/template1date.svg" 
          />
        </div>
        </RevealGroup>

        <RevealGroup direction="zoom" amount={0.3} duration={6} stagger={0.12}>
        <div className={styles.container}>
          <div className={styles.time}>{mulai} s.d. {selesai}</div>
        </div>
        </RevealGroup>

        <div className={styles.container}>
          <RevealGroup direction="zoom" amount={0.3} duration={6}>
          <div className={styles.container}>
          <Image 
            className={styles.mapIcon} 
            width={364} 
            height={173} 
            sizes="100vw" 
            alt="Decoration" 
            src="/svg/template1place.png" 
          />
          </div>
          </RevealGroup>
          <div className={styles.location}>
            <Reveal direction="zoom" amount={0.3} duration={6}>
            <div>{namatempat}</div>
            </Reveal>
            <Reveal direction="zoom" amount={0.3} duration={6}>
            <div className={styles.address}>
              <div>{alamat}</div>
            </div>
            </Reveal>
            <div className="h-4 center"/>
            <Reveal direction="zoom" amount={0.3} duration={6}>
            <Button className={`${styles.mapbutton} animate-bob`} onClick={onOpenAkadMap}>
              Buka Maps
            </Button>
            </Reveal>
            {/* <div className="h-[150px]" /> */}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export function Template1Walimah({namatempat, alamat, link, mulai, selesai, date}: AlamatProp) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const out = extractFromDmy(date);

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

  const onOpenWalimahMap = () => {
    const mapLink = link;
    window.open(mapLink, "_blank");

  };

  return (
    <section
      ref={ref}
      className="relative isolate snap-start w-full min-h-[100dvh] bg-[#f6eee7]"
    >
      {/* vidbg */}
        <video
          className={`-z-20 absolute inset-0  w-[470px] mx-auto overflow-hidden object-content transition-opacity duration-700 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          src="/videos/template1shade.mp4"
          muted
          playsInline
          autoPlay
          loop
        />

      {/* Konten */}
      <div className="h-14 center" />
      <div className="relative z-10 mx-auto max-w-[470px] flex flex-col items-center justify-center space-y-2">
      
      <div className={`${styles.content} item-center`}>
        <div className="h-14 center" />

        {/* AKAD */}
        <RevealGroup direction="down" amount={0.3} duration={6} stagger={0.12}>
        <div className={`${styles.heading} item-center`}>
            <span className={styles.w}>W</span>
            <i className={styles.alimat}>alimatul ‘Ursy</i>
        </div>
        </RevealGroup>

        <RevealGroup direction="down" amount={0.3} duration={6} stagger={0.12}>
         <div className={styles.container}>
          <div className={styles.dateBox}>
            <div className={styles.day}>{out.day}</div>
            <div className={styles.datemonth}>
              <div className={styles.date}>{out.date}</div>
              <div className={styles.month}>{out.month}</div>
            </div>
            <div className={styles.year}>{out.year}</div>
          </div>
          <Image 
            className={styles.decorationIcon} 
            width={364} 
            height={173} 
            sizes="100vw" 
            alt="Decoration" 
            src="/svg/template1date.svg" 
          />
        </div>
        </RevealGroup>

        <RevealGroup direction="zoom" amount={0.3} duration={6} stagger={0.12}>
        <div className={styles.container}>
          <div className={styles.time}>{mulai} s.d. {selesai}</div>
        </div>
        </RevealGroup>

        <div className={styles.container}>
          <RevealGroup direction="zoom" amount={0.3} duration={6}>
          <div className={styles.container}>
          <Image 
            className={styles.mapIcon} 
            width={364} 
            height={173} 
            sizes="100vw" 
            alt="Decoration" 
            src="/svg/template1place.png" 
          />
          </div>
          </RevealGroup>
          <div className={styles.location}>
            <Reveal direction="zoom" amount={0.3} duration={6}>
            <div>{namatempat}</div>
            </Reveal>
            <Reveal direction="zoom" amount={0.3} duration={6}>
            <div className={styles.address}>
              <div>{alamat}</div>
            </div>
            </Reveal>
            <div className="h-4 center"/>
            <Reveal direction="zoom" amount={0.3} duration={6}>
            <Button className={`${styles.mapbutton} animate-bob`} onClick={onOpenWalimahMap}>
              Buka Maps
            </Button>
            </Reveal>
            <div className="h-[250px]" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export function Template1Live({ link }: LiveProps) {
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

  const onOpenLivestram = () => {
    const mapLink = link;
    window.open(mapLink, "_blank");

  };

  return (
    <section
      ref={ref}
      className="relative isolate snap-start w-full min-h-[100dvh] min-h-screen bg-[#f6eee7]"
    >
      {/* vidbg */}
        <video
          className={`-z-20 absolute inset-0  w-[470px] mx-auto overflow-hidden object-content transition-opacity duration-700 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          src="/videos/template1shade.mp4"
          muted
          playsInline
          autoPlay
          loop
        />

      {/* Konten */}
      <div className="h-14 center" />
      <div className="relative z-10 mx-auto max-w-[470px] flex flex-col items-center justify-center space-y-2">
      
      <div className={`${styles.content} item-center`}>
        <div className="h-48 center" />

        {/* AKAD */}
        <RevealGroup direction="down" amount={0.3} duration={6} stagger={0.12}>
        <div className={`${styles.heading} item-center`}>
            <span className={styles.w}>L</span>
            <i className={styles.ive}>ive Streaming</i>
        </div>
        </RevealGroup>

        <RevealGroup direction="down" amount={0.3} duration={6} stagger={0.25}>
        <div className={styles.container}>
            <div className={styles.location}>
              <div className="h-12 center" />
              <div className={styles.address}>
                <div>InsyaaAllah, rangkaian acara juga akan disiarkan langsung melalui:</div>
              </div>
            </div>
            <Button className={`${styles.livebutton} animate-bob`} onClick={onOpenLivestram}>
              Ikuti Siaran Langsung
            </Button>
         </div>
         </RevealGroup>
        </div>
      </div>
    </section>
  );
}