import { headers } from "next/headers";

import crypto from "crypto";
import queryString from "querystring";
import signUrl from "./signUrl";

export async function GET(request) {
  // Your actual implementation could be fetching these from a database or environment variables
  //   const videoId = "41a78d16-3d4e-40c7-8b2c-7c3e12ca7a65";
  const tokenSecurityKey = process.env.BUNNY_TOKEN_SECURITY_KEY; // Store this key securely

  const url =
    "https://vz-61abc3c0-bd7.b-cdn.net/41a78d16-3d4e-40c7-8b2c-7c3e12ca7a65/preview.webp";

  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  console.log(searchParams, "params", videoId);

  const durationInHours = 5; // or however long you want the link to be valid
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + durationInHours * 60 * 60;
  // const expirationTimestamp = 1699333200000;

  var securityKey = process.env.BUNNY_TOKEN_SECURITY_KEY_PULL_ZONE;
  var signedUrl = signUrl(
    "https://vz-61abc3c0-bd7.b-cdn.net/41a78d16-3d4e-40c7-8b2c-7c3e12ca7a65/preview.webp",
    securityKey,
    3600,
    "",
    false,
    "/41a78d16-3d4e-40c7-8b2c-7c3e12ca7a65/"
  );

  console.log();
  console.log();
  console.log(signedUrl, "sign");
  console.log();
  console.log();

  const ip = "";
  const pathTokenEnabled = false;
  const pathAllowedRoute = "/";
  const countriesAllowed = "";
  const countriesBlocked = "";
  const signedUrl1 = signUrl(
    url,
    securityKey,
    3600,
    ip,
    pathTokenEnabled,
    pathAllowedRoute,
    countriesAllowed,
    countriesBlocked
  );
  console.log(
    signUrl(
      url,
      securityKey,
      3600,
      ip,
      pathTokenEnabled,
      pathAllowedRoute,
      countriesAllowed,
      countriesBlocked
    ),
    "url signed"
  );

  // const isDirectory = true;

  // Generate token using SHA256
  const rawToken = `${tokenSecurityKey}${signedUrl1}${expirationTimestamp}`;
  // const rawToken = tokenSecurityKey + videoId + expirationTimestamp;
  console.log();
  console.log();
  console.log(rawToken, "rawToekn");
  console.log();
  console.log();
  let md5Hash = crypto.createHash("md5").update(rawToken).digest("binary");
  var token = new Buffer.from(md5Hash, "binary").toString("base64");
  token = token.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
  // https://vz-61abc3c0-bd7.b-cdn.net/41a78d16-3d4e-40c7-8b2c-7c3e12ca7a65/preview.webp
  // Return the full URL with the token and expiration timestamp as a query parameter
  const secureMediaUrl = `https://vz-61abc3c0-bd7.b-cdn.net${videoId}?token=${token}&expires=${expirationTimestamp}`;
  console.log();
  console.log();
  console.log(secureMediaUrl, "url url");
  console.log();
  console.log();
  const res = await fetch(secureMediaUrl);
  //   console.log(await res, "ran ran ran");
  const data = await res;
  console.log();
  console.log();
  console.log("start", data, "data");
  return Response.json({ data });

  //   res.status(200).json({ secureImageUrl });
}
