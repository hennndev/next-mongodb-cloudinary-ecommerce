import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import clientPromise from "lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    session: {
        jwt: true
    },
    secret: 'abcdefgh',
    providers: [
        CredentialsProvider({
            name: "Credentials",   

            async authorize(credentials, req) {
            
                const client = await clientPromise
                const db = client.db()
                const checkExistingUser = await db.collection('users').findOne({
                    email: credentials.email
                })
           
                if(checkExistingUser) {
                    const checkPasswordUser = await compare(credentials.password, checkExistingUser.password)
                    if(!checkPasswordUser) {
                        throw new Error("Password Incorrect")
                    } else {
                        return {
                            email: checkExistingUser.email,
                            username: checkExistingUser.username
                        }
                    }
                } else {
                    throw new Error("Invalid Email, This email address is not yet registered")
                }
            }
        })
    ]
})