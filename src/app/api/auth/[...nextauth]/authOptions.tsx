import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import * as https from 'https';
import Cookies from 'js-cookie';
import { User as NextAuthUser } from "next-auth";
import { redirect } from "next/navigation";

// Define the CustomUser type extending NextAuthUser without password
interface CustomUser extends NextAuthUser {
  id: string; // Ensure ID is a string to match next-auth's expected type
  subscriptionPlan: {
    id: number;
    name: string;
  };
  status: string;
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
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
              console.log("Data from API:", response.data);
              const user: CustomUser = {
                id: response.data.profile.id.toString(), // Ensure ID is a string
                name: response.data.profile.firstName + " " + response.data.profile.lastName,
                email: response.data.profile.email,
                subscriptionPlan: {
                  id: 1,
                  name: "Monthly"
                },
                status: "Pending"
              };
              Cookies.set('userProfile', JSON.stringify(user), { expires: 7 });
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
        token.id = user.id; // Token ID should be a string
        token.email = user.email || "";
        token.name = user.name || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  }
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/login");
}
