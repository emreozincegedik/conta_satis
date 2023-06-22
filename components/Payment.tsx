"use client";
import React, { useEffect, useState } from "react";
import crypto from "crypto";
import Script from "next/script";
import { useGlobalContext } from "./Context";
import { useRouter } from "next/navigation";

export const Payment = () => {
  const { basket, iframetoken2 } = useGlobalContext();
  const router = useRouter();

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
