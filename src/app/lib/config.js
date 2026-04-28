let local = true;
export const BASE_URL = local ? "http://localhost:3000":"http://13.233.24.205:3000";
export const IMAGE_URL = local ? "http://localhost:3000/assets/img/":"http://192.168.0.102:3000/assets/img/";
export const PAYLOAD_ENCRYCT = local ? false : true;
export const PAYLOAD_DECRYCT = local ? false : true;
export const GST_KEY = local ? "0a262d161234a69ff5c4314c9bbf7367" : "0a262d161234a69ff5c4314c9bbf7367";
export const username = local ? "indranillghoshal" : "indranillghoshal";
export const password = local ? "INDRANIL" : "INDRANIL";
export const database = local ? "strutleDB" : "strutleDB";
export const RESEND_API_KEY = local ? "re_XrSJPSiq_MW2WxM1qpew3AcfPsMgNLa7h" : "re_XrSJPSiq_MW2WxM1qpew3AcfPsMgNLa7h";
export const authEmail = local ? "Acme <onboarding@resend.dev>" : "Acme <onboarding@resend.dev>";
export const cryptokey = local ? "srutle@123" : "srutle@123";
export const accountSid = local ? process.env.TWILIO_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID;
export const authToken = local ? process.env.TWILIO_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN;
export const RAZORPAY_SECRET = local ? "smvxiFw4aMTucIGYll1QJnI5" : "smvxiFw4aMTucIGYll1QJnI5";
export const RAZORPAY_KEY_ID = local ? "rzp_test_pvVdQM3MSMrc2y" : "rzp_test_pvVdQM3MSMrc2y";
export const TOKEN_KEY = local ? "hgasfhgfafsaf623y3y23g2h2gbs" : "hgasfhgfafsaf623y3y23g2h2gbs";

