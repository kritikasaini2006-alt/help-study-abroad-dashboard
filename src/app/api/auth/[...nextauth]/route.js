
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "DummyJSON",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const response = await fetch(
          "https://dummyjson.com/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
              expiresInMins: 30,
            }),
          }
        );

        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        return {
          id: String(data.id),
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          image: data.image,
          username: data.username,
          accessToken: data.accessToken || data.token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.username = token.username;

      return session;
    },
  },

  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
