"use client";
import Script from "next/script";
import { useGlobalContext } from "./Context";
import { useEffect, useState, useRef } from "react";

export const Payment = () => {
  const { iframetoken2 } = useGlobalContext();
  const [height, setHeight] = useState("50vh");
  useEffect(() => {
    setTimeout(() => {
      setHeight("70vh");
    }, 800);
  }, []);
  return (
    <div style={{ height: height }}>
      {iframetoken2 !== "" && (
        <>
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${iframetoken2}`}
            id="paytriframe"
            // frameborder="0"
            allowFullScreen={true}
            frameBorder={0}
            scrolling="yes"
            style={{ width: "100%", height: height }}
          ></iframe>
          {/* <Script id="#paytriframe">
            {"iFrameResize({}, '#paytriframe')"}
          </Script> */}
        </>
      )}
    </div>
  );
};
