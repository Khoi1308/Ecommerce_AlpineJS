import { google } from "googleapis";
import { CLIENT_ID, CLIENT_SECRET, GMAIL_REFRESH, REDIRECT_URI } from "./env";

export const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

OAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH });
