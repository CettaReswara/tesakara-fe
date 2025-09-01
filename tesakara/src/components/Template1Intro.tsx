"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { libre, meow } from "@/app/font";
import styles from './Template1Intro.module.css';
import Snow from "./Snow";

type Props = {
  brideName: string;    
  groomName: string;   
  inviteeName: string;  
  onOpen?: () => void;
  floralSrc?: string;    // optional decorative image
  bgPattern?: boolean;   // toggle grid pattern
};

export default function Template1Intro({
  brideName,
  groomName,
  inviteeName,
  onOpen,
  floralSrc = "https://placehold.co/244x170",
  bgPattern = true,
}: Props) {
  return (
    <div
      className={`
        relative w-screen max-w-[470px] h-[905px] overflow-hidden rounded-2xl
        bg-white shadow-xl border border-rose-200
      `}
    >
        <Snow color="#382e2dff" /> 

      {/* background & grid */}
      {bgPattern && (
        <div
          className={styles.bg}
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
      )}

      {/* content */}
      <div className="relative h-full flex flex-col items-center px-8">
        {/* top spacing */}
        <div className="h-20" />

        {/* “The Wedding Of” */}
        <div className="flex justify-center">
            <div className={styles.wedding} style={{ width: 256 }}>
                <div className={styles.t}>T</div>
                <div className={styles.he}>he</div>
                <div className={styles.w}>W</div>
                <div className={styles.edding}>edding</div>
                <div className={styles.o}>O</div>
                <div className={styles.f}>f</div>
            </div>
        </div>

        {/* Names */}
        <div className={styles.name}>
            <span className={styles.bride}>{brideName}</span>
            <span className={styles.div}>&</span>
            <span className={styles.groom}>{groomName}</span>
        </div>

        {/* Floral deco */}
        <div className="relative w-[280px] h-[250px] overflow-hidden mx-auto">
          <Image
            src={floralSrc}
            alt="floral"
            // width={488}
            // height={340}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Tamu */}
        <div className="mt-4 text-center">
          <div className={`${libre.className} text-stone-600 text-base italic`}>Kepada</div>
          <div className={`${libre.className} text-stone-600 text-xl font-bold`}>
            {inviteeName}
          </div>
        </div>

        {/* button */}
        <div className="mt-8">
          <Button className="animate-bob" onClick={onOpen}>Buka Undangan</Button>
        </div>

        {/* bottom spacing */}
        <div className="flex-1" />
      </div>
    </div>
  );
}