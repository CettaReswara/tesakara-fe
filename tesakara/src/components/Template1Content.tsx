"use client";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  bride: string;
  groom: string;
  to: string;
};

export default function Template1Content({ bride, groom, to }: Props) {
  const [soundOn, setSoundOn] = useState(false);

  return (
    <div>
      <h1>{bride} & {groom}</h1>
      <p>Dear {to}</p>
    </div>
  );
}
