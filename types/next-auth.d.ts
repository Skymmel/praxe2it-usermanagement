// noinspection ES6UnusedImports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, {DefaultUser} from "./next-auth";
import {DefaultJWT} from "next-auth/jwt";

declare module "./next-auth" {
  interface Session {
    user: {
      email: string,
      role: string,
    }
  }

  interface User extends DefaultUser {
    role: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string,
  }
}
