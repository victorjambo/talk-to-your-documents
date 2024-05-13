import React, { useEffect } from "react";

export const useSmoothScroll = ({
  len,
  ref,
}: {
  len: number;
  ref: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    if (len) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [len, ref]);
};
