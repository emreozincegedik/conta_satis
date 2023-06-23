"use client";
import Script from "next/script";
import { useGlobalContext } from "./Context";

export const Payment = () => {
  const { iframetoken2 } = useGlobalContext();

  return (
    <div>
      {iframetoken2 !== "" && (
        <>
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${iframetoken2}`}
            id="paytriframe"
            // frameborder="0"
            allowFullScreen={true}
            frameBorder={0}
            scrolling="yes"
            style={{ width: "100%" }}
          ></iframe>
          <Script id="#paytriframe">
            {"iFrameResize({}, '#paytriframe')"}
          </Script>
        </>
      )}
    </div>
  );
};
