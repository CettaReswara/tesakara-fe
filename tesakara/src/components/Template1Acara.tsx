import styles from "./Template1Acara.module.css";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export function Template1Akad() {
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

  const onOpenAkadMap = () => {
    const mapLink = "https://maps.app.goo.gl/5iZJUTi2iPXJ1wVT8";
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
      <div className="relative z-10 mx-auto max-w-[520px] flex flex-col items-center justify-center space-y-2">
      
      <div className={`${styles.content} item-center`}>
        <div className={styles.pembuka}>
          Dengan memohon taufik dan rahmat Allah ﷻ, kami bermaksud mengundang
          Bapak/Ibu/Saudara/i untuk menghadiri rangkaian pernikahan kami yang
          akan diselenggarakan pada:
        </div>

        {/* AKAD */}
        <div className={`${styles.heading} item-center`}>
            <span className={styles.a}>A</span>
            <i className={styles.kad}>kad Nikah</i>
        </div>

         <div className={styles.container}>
          <div className={styles.dateBox}>
            <div className={styles.day}>Selasa</div>
            <div className={styles.datemonth}>
              <div className={styles.date}>1</div>
              <div className={styles.month}>Desember</div>
            </div>
            <div className={styles.year}>2025</div>
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

        <div className={styles.container}>
          <div className={styles.time}>08.00 s.d. 09.00</div>
        </div>

        <div className={styles.container}>
          <Image 
            className={styles.mapIcon} 
            width={364} 
            height={173} 
            sizes="100vw" 
            alt="Decoration" 
            src="/svg/template1place.png" 
          />
          <div className={styles.location}>
            <div>Masjid Al-Ukhuwwah</div>
            <div className={styles.address}>
              <div>Jl. Wastukencana No.27, Babakan Ciamis, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40117</div>
            </div>
            <div className="h-4 center"/>
            <Button className={`${styles.mapbutton} animate-bob`} onClick={onOpenAkadMap}>
              Buka Maps
            </Button>
            <div className="h-[150px]" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export function Template1Walimah() {
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

  const onOpenWalimahMap = () => {
    const mapLink = "https://maps.app.goo.gl/qpbCVwvsjoj3FbTg8";
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
      <div className="relative z-10 mx-auto max-w-[520px] flex flex-col items-center justify-center space-y-2">
      
      <div className={`${styles.content} item-center`}>
        <div className="h-14 center" />

        {/* AKAD */}
        <div className={`${styles.heading} item-center`}>
            <span className={styles.w}>W</span>
            <i className={styles.alimat}>alimatul ‘Ursy</i>
        </div>

         <div className={styles.container}>
          <div className={styles.dateBox}>
            <div className={styles.day}>Selasa</div>
            <div className={styles.datemonth}>
              <div className={styles.date}>1</div>
              <div className={styles.month}>Desember</div>
            </div>
            <div className={styles.year}>2025</div>
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

        <div className={styles.container}>
          <div className={styles.time}>13.00 s.d. 17.00</div>
        </div>

        <div className={styles.container}>
          <Image 
            className={styles.mapIcon} 
            width={364} 
            height={173} 
            sizes="100vw" 
            alt="Decoration" 
            src="/svg/template1place.png" 
          />
          <div className={styles.location}>
            <div>Intercontinental Dago Pakar</div>
            <div className={styles.address}>
              <div>Jalan Resor Dago Pakar Raya 2B Resor Dago Pakar, Mekarsaluyu, Kec. Cimenyan, Kota Bandung, Jawa Barat 40198</div>
            </div>
            <div className="h-4 center"/>
            <Button className={`${styles.mapbutton} animate-bob`} onClick={onOpenWalimahMap}>
              Buka Maps
            </Button>
            <div className="h-[250px]" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export function Template1Live() {
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
    const mapLink = "https://www.youtube.com/live/e85tJVzKwDU?si=aNFciZUgg0SqKhZB";
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
      <div className="relative z-10 mx-auto max-w-[520px] flex flex-col items-center justify-center space-y-2">
      
      <div className={`${styles.content} item-center`}>
        <div className="h-48 center" />

        {/* AKAD */}
        <div className={`${styles.heading} item-center`}>
            <span className={styles.w}>L</span>
            <i className={styles.ive}>ive Streaming</i>
        </div>


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
        </div>
      </div>
    </section>
  );
}