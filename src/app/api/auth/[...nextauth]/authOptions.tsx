import { NextAuthOptions, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import * as https from 'https';



export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "text" }
      },
      async authorize(credentials) {
        console.log('Received credentials:', credentials);
        if (credentials && credentials.email && credentials.password) {
          try {
            const response = await axios.post("https://localhost:7263/api/account/login", {
              email: credentials.email,
              password: credentials.password
            }, {
              headers: {
                'Content-Type': 'application/json'
              },
              httpsAgent: new https.Agent({ rejectUnauthorized: false })
            });

            if (response.status === 200 && response.data) {
              console.log("data from api", response.data)
              const user = { id: 1, name: response.data.profile.firstName + " " + response.data.profile.lastName, email: response.data.profile.email
                            , test:"et"
              };
              console.log("user", user);
              return user;
            }
          } catch (error) {
            console.error('Error during authentication:', error);
          }
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user's ID in JWT token
        token.email = user.email; // Store email in JWT token
        token.name = user.name; // Store name in JWT token
      }
      return token;
    },
    async session({ session, user }) {
      if (user) {
        console.log("session", session);
        if (!session.user) {
          session.user = {}; // Initialize user object if it doesn't exist
        }
        session.user.name = user.name;
        session.user.email = user.email;
      }
      return session;
    }    
  }
};


export async function loginIsRequiredServer() {
  debugger;
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/login");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/login");
  }
}
