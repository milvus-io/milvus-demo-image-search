import { useEffect, useState, useMemo } from "react";

export const useMobileScreen = () => {
  const [screenWidth, setScreenWidth] = useState(null);
  useEffect(() => {
    const cb = () => {
      setScreenWidth(document.body.clientWidth);
    };
    cb();
    window.addEventListener("resize", cb);

    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);

  const isMobile = useMemo(
    () => screenWidth && screenWidth < 1000,
    [screenWidth]
  );

  return { screenWidth, isMobile };
};
