import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
export async function POST(request: NextRequest) {
  const JOIN_API_KEY = "552ca49562ad4e888a8050b2e829513d";
  const deviceId = "77ddb3e749424e2095f56e47e20ea373";

  try {
    // ÖNEMLİ UYARILAR!
    // 1) Bu sayfaya oturum (SESSION) ile veri taşıyamazsınız. Çünkü bu sayfa müşterilerin yönlendirildiği bir sayfa değildir.
    // 2) Entegrasyonun 1. ADIM'ında gönderdiğniz merchant_oid değeri bu sayfaya POST ile gelir. Bu değeri kullanarak
    // veri tabanınızdan ilgili siparişi tespit edip onaylamalı veya iptal etmelisiniz.
    // 3) Aynı sipariş için birden fazla bildirim ulaşabilir (Ağ bağlantı sorunları vb. nedeniyle). Bu nedenle öncelikle
    // siparişin durumunu veri tabanınızdan kontrol edin, eğer onaylandıysa tekrar işlem yapmayın. Örneği aşağıda bulunmaktadır.
    var title = "payment start";
    var text = request;
    var url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=${JOIN_API_KEY}&text=${text}&title=${title}&deviceId=${deviceId}`;
    await fetch(url);
    var callback = await request.json();
    console.log(callback);
    var merchant_id = "366809";
    var merchant_key = "Erbj6JS1L7514Krx";
    var merchant_salt = "7CYZJMZ8M4c3ig8z";
    // POST değerleri ile hash oluştur.
    // var paytr_token =
    //   callback.merchant_oid +
    //   merchant_salt +
    //   callback.status +
    //   callback.total_amount;
    // console.log(paytr_token);
    // var token = crypto
    //   .createHmac("sha256", merchant_key)
    //   .update(paytr_token)
    //   .digest("base64");
    console.log("here");
    // Oluşturulan hash'i, paytr'dan gelen post içindeki hash ile karşılaştır (isteğin paytr'dan geldiğine ve değişmediğine emin olmak için)
    // Bu işlemi yapmazsanız maddi zarara uğramanız olasıdır.

    // title = "paytr_token: " + paytr_token;
    // text = "callback: " + JSON.stringify(callback);

    // url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=${JOIN_API_KEY}&text=${text}&title=${title}&deviceId=${deviceId}`;
    // await fetch(url);
    // if (token != callback.hash) {
    //   throw new Error("PAYTR notification failed: bad hash");
    // }

    // if (callback.status == "success") {
    //   //basarili
    // } else {
    //   //basarisiz
    // }
    return new NextResponse("OK");
  } catch (error: any) {
    // title = "payment error";
    // text = error.toString();
    // url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=${JOIN_API_KEY}&text=${text}&title=${title}&deviceId=${deviceId}`;
    // await fetch(url);
  }
}
