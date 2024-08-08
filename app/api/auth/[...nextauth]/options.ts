import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials:{
                username: {label: "Username",type: "text",placeholder: "Enter username"},
                password: {label: "Password",type: "password"},
            },
            async authorize (credentials:any):Promise<any>{
                const user = { name: process.env.USERNAME };
                const password = process.env.PASSWORD;
                if (user.name === credentials.username && credentials.password === password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages:{
        signIn: '/signin',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true
        },
        async session({ session, user, token }) {
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          return token
        }
    },
    session:{
        strategy: 'jwt'
    },
    secret: process.env.AUTH_SECRET
}