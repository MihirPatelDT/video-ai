import { DefaultSession } from "next-auth"

// defaultSession provide by next-auth in that we store user id which is always available
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}
