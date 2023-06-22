"use client";
import React, { useEffect, useState } from "react";
import crypto from "crypto";
import Script from "next/script";
import { useGlobalContext } from "./Context";
import { useRouter } from "next/navigation";

export const Payment = () => {
  const { basket } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    // basket.length == 0 && router.push("/");

    return () => {};
  }, []);

  const api = async () => {
    var basket = JSON.stringify([
      ["Ornek urun 1", "18.00", 1],
      ["Ornek urun 2", "33.25", 2],
      ["Ornek urun 3", "45.42", 1],
    ]);
    var user_basket = Buffer.from(basket).toString("base64");
    var email = "emreozincegedik@gmail.com"; // Müşterinizin sitenizde kayıtlı veya form vasıtasıyla aldığınız eposta adresi.
    var currency = "TL";
    var user_name = "Emre Özincegedik"; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız ad ve soyad bilgisi
    var user_address = "test adress"; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız adres bilgisi
    var user_phone = "05394121466"; // Müşterinizin sitenizde kayıtlı veya form aracılığıyla aldığınız telefon bilgisi

    var lang = "en"; // Türkçe için tr veya İngilizce için en gönderilebilir. Boş gönderilirse tr geçerli olur.

    var options = {
      method: "POST",
      // url: "https://www.paytr.com/odeme/api/get-token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      formData: {
        email: email,
        user_name: user_name,
        user_address: user_address,
        user_phone: user_phone,
        user_basket: user_basket,
        lang: lang,
        currency: currency,
      },
    };
    try {
      var res = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify(options.formData),
      });
      var data = await res.json();
      setIframetoken(data.token);
      // console.log(data);
    } catch (error) {
      console.log("oh nooo", error);
    }
  };
  const [iframetoken, setIframetoken] = useState("");
  return (
    <div>
      <button onClick={() => api()}>test</button>
      {iframetoken !== "" && (
        <>
          <iframe
            src={`https://www.paytr.com/odeme/guvenli/${iframetoken}`}
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
