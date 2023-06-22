import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import items from "@/utils/items.json";
import countries from "@/utils/countries.json";
export async function POST(request: NextRequest) {
  const body = await request.json();

  var x = body.user_basket;
  var amount = 0;
  var user_basket = [];
  for (let i = 0; i < x.length; i++) {
    const basketItem = x[i];
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      if (basketItem.id == item.id) {
        amount += basketItem.quantity * item.price;
        user_basket.push([item.title, item.price, basketItem.quantity]);
      }
    }
  }
  var user_basket_buffer = Buffer.from(JSON.stringify(user_basket)).toString(
    "base64"
  );
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    if (country.label == body.country.label) {
      amount += country.price;
    }
  }
  console.log(amount);

  const paymentAmount = amount * 100;
  const userIp = request.ip;
  const merchant_id = process.env.merchant_id;
  const merchant_key = process.env.merchant_key;
  const merchant_salt = process.env.merchant_salt;
  // Başarılı ödeme sonrası müşterinizin yönlendirileceği sayfa
  // Bu sayfa siparişi onaylayacağınız sayfa değildir! Yalnızca müşterinizi bilgilendireceğiniz sayfadır!
  const merchant_ok_url = "https://www.sefaudi.com/payment_success"; //odeme_basarili.php";
  // Ödeme sürecinde beklenmedik bir hata oluşması durumunda müşterinizin yönlendirileceği sayfa
  // Bu sayfa siparişi iptal edeceğiniz sayfa değildir! Yalnızca müşterinizi bilgilendireceğiniz sayfadır!
  const merchant_fail_url = "https://www.sefaudi.com/payment_fail";
  const timeout_limit = 30; // İşlem zaman aşımı süresi - dakika cinsinden
  const debug_on = 1; // Hata mesajlarının ekrana basılması için entegrasyon ve test sürecinde 1 olarak bırakın. Daha sonra 0 yapabilirsiniz.
  const merchant_oid = "IN" + Date.now();
  //   const user_basket = nodeBase64.encode(basket);
  // Sipariş numarası: Her işlemde benzersiz olmalıdır!! Bu bilgi bildirim sayfanıza yapılacak bildirimde geri gönderilir.
  // Sayfada görüntülenecek taksit adedini sınırlamak istiyorsanız uygun şekilde değiştirin.
  // Sıfır (0) gönderilmesi durumunda yürürlükteki en fazla izin verilen taksit geçerli olur.
  const max_installment = "0";
  const no_installment = "0"; // Taksit yapılmasını istemiyorsanız, sadece tek çekim sunacaksanız 1 yapın.
  const test_mode = "1"; // Mağaza canlı modda iken test işlem yapmak için 1 olarak gönderilebilir.
  const hashSTR = `${merchant_id}${userIp}${merchant_oid}${body.email}${paymentAmount}${user_basket_buffer}${no_installment}${max_installment}${body.currency}${test_mode}`;
  const paytr_token = hashSTR + merchant_salt;
  const token = crypto
    .createHmac("sha256", merchant_key || "")
    .update(paytr_token)
    .digest("base64");

  var formData: any = {};
  // console.log(body);
  formData.merchant_id = process.env.merchant_id;
  formData.merchant_key = process.env.merchant_key;
  formData.merchant_salt = process.env.merchant_salt;
  formData.email = body.email;
  formData.payment_amount = paymentAmount;
  formData.merchant_oid = merchant_oid;
  formData.user_name = body.user_name;
  formData.user_address =
    body.user_address +
    " " +
    (body.country.label === "Other"
      ? body.other_country + "(Other)"
      : body.country.label);
  formData.user_phone = body.user_phone;
  formData.merchant_ok_url = merchant_ok_url;
  formData.merchant_fail_url = merchant_fail_url;
  formData.user_basket = user_basket_buffer;
  formData.user_ip = userIp;
  formData.timeout_limit = timeout_limit;
  formData.debug_on = debug_on;
  formData.test_mode = test_mode;
  formData.lang = body.lang;
  formData.no_installment = no_installment;
  formData.max_installment = max_installment;
  formData.currency = body.currency;
  formData.paytr_token = token;

  var formBody = [];
  for (var property in formData) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(formData[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  console.log(formBody);
  var formBodyString = formBody.join("&");
  // return NextResponse.json({ token: "test" });

  try {
    var data = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: formBodyString,
    });
    var body2 = await data.json();
    console.log(body2);
    // console.log(body2);
    return NextResponse.json(body2, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // console.log("error");
    console.log(error);
    return NextResponse.error();
  }
}
