import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from './db.js'
import { deviceAuthorization } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    basePath: "/api/auth",
    trustedOrigins: ["http://localhost:3000"],
    plugins: [
        deviceAuthorization({
            // verificationUri: "http://localhost:3000/device",  // for development
            // or in production:
            // verificationUri: process.env.VERIFICATION_URI || "http://localhost:3000/device"
            expiresIn: "30m",
            interval: "5s",
        }),
    ],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }
    }
});