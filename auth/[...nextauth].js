import EmailProvider from "next-auth/providers/email";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import MailchimpProvider from "next-auth/providers/mailchimp";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import Credentials from "next-auth/providers/credentials";
import connectMongo from "./lib/conn";
import Users from "@/model/Schema";
import { compare } from "bcryptjs";

export default NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    //login
    Credentials({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((err) => {
          err: "Connection Failed";
        });

        //check user existance

        const result = await Users.findOne({ username: credentials.username });

        if (!result) {
          // return { found: false };
          throw new Error("userNamePasswordInc");
        }

        //compare()
        console.log("EEEEffff", result);
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword || result.username !== credentials.username) {
          throw new Error("userNamePasswordInc");
        }
        return result;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        connectMongo().catch((err) => {
          err: "Connection Failed";
        });
        const userData = await Users.findOne({ _id: token.uid });

        session.user.id = token.uid;
        session.user.username = userData.username;
        session.user.email = userData.email;
        // session.user.country = userData.country
        // session.user.dob = userData.DOB
      }
      return session;
      // if (session?.user) {
      //   session.user.id = token.uid;
      // }
      // return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/login")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: '/auth/signin'
  //   // signOut: '/auth/signout',
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // (used for check email message)
  //   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // }
});

// MailchimpProvider({
//   clientId: process.env.MAILCHIMP_CLIENT_ID,
//   clientSecret: process.env.MAILCHIMP_CLIENT_SECRET,
// }),
// FacebookProvider({
//   clientId: process.env.FACEBOOK_ID,
//   clientSecret: process.env.FACEBOOK_SECRET,
// }),
// TwitterProvider({
//   clientId: process.env.TWITTER_CLIENT_ID,
//   clientSecret: process.env.TWITTER_CLIENT_SECRET,
// }),
// EmailProvider({
//   server: {
//     host: process.env.EMAIL_SERVER_HOST,
//     port: process.env.EMAIL_SERVER_PORT,
//     auth: {
//       user: process.env.EMAIL_SERVER_USER,
//       pass: process.env.EMAIL_SERVER_PASSWORD,
//     },
//   },
//   from: process.env.EMAIL_FROM,
// }),

// EmailProvider({
//   server: {
//     host: process.env.EMAIL_SERVER_HOST,
//     port: process.env.EMAIL_SERVER_PORT,
//     auth: {
//       user: process.env.EMAIL_SERVER_USER,
//       pass: process.env.EMAIL_SERVER_PASSWORD,
//     },
//   },
//   from: process.env.EMAIL_FROM,
// }),
