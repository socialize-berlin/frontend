import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";

export const MOBILE = 670;
// export const SMALL_MOBILE = 375;
export const TABLET = 1200;
// export const INCH_13 = 1280;

export type Responsive = {
  innerWidth: number | null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const ResponsiveContext = React.createContext<Responsive>({
  innerWidth: null,
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

export function ResponsiveProvider(props: { children: React.ReactNode }) {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  const isMobile = innerWidth <= MOBILE;
  const isTablet = innerWidth > MOBILE && innerWidth! <= TABLET;
  const isDesktop = innerWidth > TABLET;

  useEffect(() => {
    const resize = debounce(() => {
      setInnerWidth(window.innerWidth);
    }, 200);

    window.addEventListener("resize", resize);
    window.addEventListener("load", resize);
    document.addEventListener("DOMContentLoaded", resize);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", resize);
      document.removeEventListener("DOMContentLoaded", resize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider
      value={{
        innerWidth,
        isMobile,
        isTablet,
        isDesktop,
      }}
    >
      {props.children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsive() {
  const context = React.useContext(ResponsiveContext);

  if (context === undefined) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }

  return context;
}
