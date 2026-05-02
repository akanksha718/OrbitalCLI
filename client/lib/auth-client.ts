import {createAuthClient} from 'better-auth/react';
import { deviceAuthorizationClient } from "better-auth/client/plugins";
const authBaseURL = process.env.NEXT_PUBLIC_AUTH_URL
  ?? (typeof window !== 'undefined'
    ? `${window.location.origin}/api/auth`
    : 'http://localhost:3000/api/auth');

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins:[
    deviceAuthorizationClient()
    
  ]
});
