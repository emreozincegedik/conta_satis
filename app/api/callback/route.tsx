import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
var x = 1;

// export default function handler(req: any, res: any) {
//   res.status(200).json({ name: "John Doe" });
// }
const merchant_id = process.env.merchant_id;
const merchant_key = process.env.merchant_key || "";
const merchant_salt = process.env.merchant_salt || "";
export async function POST(request: Request) {
  var callback = await request.formData();
  const JOIN_API_KEY = "552ca49562ad4e888a8050b2e829513d";
  const deviceId = "77ddb3e749424e2095f56e47e20ea373";

  //   try {
  //     // ÖNEMLİ UYARILAR!
  //     // 1) Bu sayfaya oturum (SESSION) ile veri taşıyamazsınız. Çünkü bu sayfa müşterilerin yönlendirildiği bir sayfa değildir.
  //     // 2) Entegrasyonun 1. ADIM'ında gönderdiğniz merchant_oid değeri bu sayfaya POST ile gelir. Bu değeri kullanarak
  //     // veri tabanınızdan ilgili siparişi tespit edip onaylamalı veya iptal etmelisiniz.
  //     // 3) Aynı sipariş için birden fazla bildirim ulaşabilir (Ağ bağlantı sorunları vb. nedeniyle). Bu nedenle öncelikle
  //     // siparişin durumunu veri tabanınızdan kontrol edin, eğer onaylandıysa tekrar işlem yapmayın. Örneği aşağıda bulunmaktadır.

  // try {
  // var text2 = form;
  var merchant_oid = callback.get("merchant_oid") || "";
  var status = callback.get("status") || "";
  var total_amount = callback.get("total_amount") || "";
  var hash = callback.get("hash") || "";
  //     } catch (error) {
  //       // try {
  //       //   var text = "callback2 await failed: " + (await request.body());
  //       // } catch (error2) {
  //       var text = "callback1: " + JSON.stringify(await request.json());
  //       try {
  // } catch (error3) {
  //   // var text =
  //   //   "callback4 body empty. headers: " + JSON.stringify(await request.headers);
  //   //         // }
  //   //       }
  // }

  // return new NextResponse("OK");
  var paytr_token = merchant_oid + merchant_salt + status + total_amount;

  //     var callback = await request.json();
  //     // console.log(callback);
  //     var merchant_id = "366809";
  //     var merchant_key = "Erbj6JS1L7514Krx";
  //     var merchant_salt = "7CYZJMZ8M4c3ig8z";
  //     // POST değerleri ile hash oluştur.
  //     var paytr_token =
  //       callback.merchant_oid +
  //       merchant_salt +
  //       callback.status +
  //       callback.total_amount;
  //     // console.log(paytr_token);
  var token = crypto
    .createHmac("sha256", merchant_key)
    .update(paytr_token)
    .digest("base64");
  //     // console.log("here");
  //     // Oluşturulan hash'i, paytr'dan gelen post içindeki hash ile karşılaştır (isteğin paytr'dan geldiğine ve değişmediğine emin olmak için)
  //     // Bu işlemi yapmazsanız maddi zarara uğramanız olasıdır.

  if (token != hash) {
    throw new Error("PAYTR notification failed: bad hash");
  }

  var text = merchant_oid + " " + status + " " + total_amount + " " + hash;
  if (status == "success") {
    //basarili
    var title = "paytr request success";
  } else {
    var title =
      "paytr request fail: " +
      (callback.get("failed_reason_msg") || "") +
      " " +
      (callback.get("failed_reason_code") || "") +
      " " +
      (callback.get("failed_reason") || ""); //"paytr request fail
    //basarisiz
  }
  var url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=${JOIN_API_KEY}&text=${text}&title=${title}&deviceId=${deviceId}`;
  await fetch(url);
  return new NextResponse("OK");
  //   } catch (error: any) {
  //     // title = "payment error";
  //     // text = error.toString();
  //     // url = `https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?apikey=${JOIN_API_KEY}&text=${text}&title=${title}&deviceId=${deviceId}`;
  //     // await fetch(url);
  //   }
}
