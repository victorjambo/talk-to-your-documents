"use client";

import React, { useRef, useEffect } from "react";
import jazzicon from "@metamask/jazzicon";

export default function Jazzicon({
  size = 10,
  username,
}: {
  size?: number;
  username?: string;
}) {
  const divRef = useRef(null);
  const seed = username
    ? toPseudoRandomInteger(username)
    : Math.floor(100000 + Math.random() * 900000);
  const result = jazzicon(size, seed);

  useEffect(() => {
    if (!divRef || !divRef.current) return;

    const current = divRef.current as HTMLDivElement;

    current.appendChild(result);
  }, []);

  return <div className="flex" ref={divRef} />;
}

function toPseudoRandomInteger(uidString = "") {
  var numberArray = [uidString.length];
  for (var i = 0; i < uidString.length; i++) {
    numberArray[i] = uidString.charCodeAt(i);
  }

  return numberArray.reduce((a, b) => a + b, 0);
}
