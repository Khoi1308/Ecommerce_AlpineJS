import nodemailer, { TransportOptions } from "nodemailer";
import { OAuth2Client } from "../config/gmail";
import { CLIENT_ID, CLIENT_SECRET, GMAIL_REFRESH } from "../config/env";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: Params): Promise<void> => {
  const accessToken = await OAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      type: "OAuth2",
      user: "duongminhanhkhoi14092002@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH,
      accessToken: accessToken,
    },
  } as TransportOptions);

  const mailOptions = {
    from: "duongminhanhkhoi14092002@gmail.com",
    to,
    subject,
    text,
    html,
  };

  await transport.sendMail(mailOptions);
  transport.close();
};
