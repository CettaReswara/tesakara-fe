"use client";
import React from "react";
import { useState } from "react";
import Template1Intro from "@/components/Template1Intro";
import Template1Content from "./Template1Content";
import { InviteProps } from "@/types/invite";

// type Details = {
//   fullbride: string;
//   fullgroom: string;
//   fbride: string;
//   mbride: string;
//   fgroom: string;
//   mgroom: string;
//   brillust: string;
//   grillust: string;
//   akad: AlamatProp;
//   walimah: AlamatProp;
//   live: LiveProps;
//   maxhadir: number;
//   alamat: AddressBlock;
// }

// type BankInfo = {
//   bank: string;
//   atasNama: string;
//   noRekening: string;
// };

// type AlamatProp = {
//   namatempat: string;
//   alamat: string;
//   link: string;
//   mulai: string; //00.00
//   selesai: string; //00.00
// }

// type LiveProps = {
//   link: string;
// }

// type AddressBlock =
//   { isAlamat: boolean; 
//     penerima: string; //kalo false "" 
//     alamat: string } //kalo false ""

// type InviteProps = {
//     bride: string;
//     groom: string;
//     to: string;
//     date: string;
//     bank: BankInfo[];
//     detaildata: Details;
// };

const Template1View: React.FC<InviteProps> = (props) => {
// export default function Template1View({ bride, groom, to, date, bank, detaildata}: InviteProps) {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <Template1Intro
        brideName={props.bride}
        groomName={props.groom}
        inviteeName={props.to}
        onOpen={() => setOpened(true)}
        floralSrc="https://lh3.googleusercontent.com/d/1JglMOKT3TEUcwTDI_RWGLM7OO6Y4rrjr=w586-h408"
      />
    );
  }

  return <Template1Content 
            bride={props.bride} 
            groom={props.groom} 
            to={props.to} 
            date={props.date}
            bank = {props.bank}
            detail = {props.detaildata}
            youtubeId="lNB8iwiQb9k?si=P7GdtHb9eCpMKYnt" 
            bgVideoSrc="/videos/template1vid.mp4" />;
}

export default Template1View;
  // const open = () => {
  //   // navigate to /invite, scroll, play music, etc.
  //   alert("Open invitation!");
  // };

  // return (
  //   <Template1Intro
  //     brideName={bride}
  //     groomName={groom}
  //     inviteeName={to}
  //     onOpen={open}
  //     floralSrc="https://lh3.googleusercontent.com/d/1JglMOKT3TEUcwTDI_RWGLM7OO6Y4rrjr=w586-h408"
  //   />
//   );
// }

// https://youtu.be/sbib9tRlNNg?si=wEqFB9ruC1RZsq8L