import { handlers } from "@/auth"; // Referring to the auth.js we just created
import { authOptions } from "@/utils/outhOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions)

export const { GET, POST } = handlers;
