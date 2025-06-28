"use client";

import { useEffect, useRef } from "react";
import ReactLenis, { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (data: { timestamp: number }) => {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    };

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, smoothWheel: true }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
};
