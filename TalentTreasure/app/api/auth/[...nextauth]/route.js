import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/Models/User'
import Payment from '@/Models/Payment' 
import username from '@/app/[username]/page'
import connectDB from '@/app/db/connectDb'

const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Uncomment and configure other providers as needed
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider=="github"){
        await connectDB()
        // console.log(email.split("@")[0])
       
        //Check if user already exists in the database
        const currentUser= await User.findOne({email:email})
        // console.log(currentUser)
        if (!currentUser) {
          //Create a new user
          const newUser= await User.create({
            email:user.email,
            username:user.email.split("@")[0],
          })
          
         
          // console.log(newUser)
        }
       
        return true
      }
    },
    async session({ session, user, token }) {
      const dbUser=await User.findOne({email:session.user.email})
      // console.log(dbUser)
      session.user.name=dbUser.username
      return session
    },
  }
}

// Handler for GET requests
export const GET = async (req, res) => {
  return NextAuth(req, res, authoptions)
}

// Handler for POST requests
export const POST = async (req, res) => {
  return NextAuth(req, res, authoptions)
}
