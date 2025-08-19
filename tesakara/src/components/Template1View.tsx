"use client";
import React from "react";
import { useState } from "react";
import Template1Intro from "@/components/Template1Intro";
import Template1Content from "./Template1Content";

type InviteProps = {
    bride: string;
    groom: string;
    to: string;
};

export default function Template1View({ bride, groom, to}: InviteProps) {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return (
      <Template1Intro
        brideName={bride}
        groomName={groom}
        inviteeName={to}
        onOpen={() => setOpened(true)}
        floralSrc="https://lh3.googleusercontent.com/d/1JglMOKT3TEUcwTDI_RWGLM7OO6Y4rrjr=w586-h408"
      />
    );
  }

  return <Template1Content bride={bride} groom={groom} to={to} />;
}
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