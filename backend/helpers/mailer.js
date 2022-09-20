const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
//this is the link from playground auth
const OAUTH_LINK = "https://developers.google.com/oauthplayground";

const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  OAUTH_LINK
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOption = {
    from: EMAIL,
    to: email,
    subject: "Raihanbiswas Social Media Application",
    html: `<div style="max-width:600px"><div style="column-gap:24px;display:flex;border-bottom:1px solid #000;padding-bottom:14px"><div><img src="https://i.ibb.co/SPxc3Zf/icon-1.png" alt=""></div><p style="font-family:sans-serif">Confirm Email</p></div><p>Hi ${name},</p><p>Thanks for sign up in Facebook. Please verify your email by click confirm to continue</p><p>Verification Link:</p><a href="${url}" style="font-family:sans-serif;padding:7px 33px;background:#0c88ef;text-decoration:none;color:#fff;display:inline-block;margin:10px 0" href="#">Confirm</a><p>from CIT ©️ Facebook. CIT Platforms, Inc., Attention: Community Support, 1 Facebook Way, Menlo Park, CA 94025 This message was sent to shawon@gmail.com. To help keep your account secure, please don't forward this email.</p></div>`,
  };

  transporter.sendMail(mailOption, (err, res) => {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
};
