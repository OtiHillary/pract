import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.JWT_SECRET as string;

type Payload = {
   loginToken: string | undefined;
}

type returnPayload = {
   loginToken: string | undefined;
   iat: number;
   exp: number;
}

function encrypt(payload: Payload){
   return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set expiration time;
}

function decrypt(token: string) {
   try {
      const payload = jwt.verify(token, secretKey) as returnPayload
      return payload.loginToken;
   } catch(error) {
      console.error('Error decoding JWT:', error);
   }
}

function generate(email: string | undefined ): string {
   // Hash the email address to create a seed for the random number generator
   const seed = email?.split('').reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0);
 
   // Use the seed to initialize a random number generator
   const random = Math.random();
 
   // Generate a random string using the characters A-Z and a-z
   let result = '';
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   for (let i = 0; i < 8; i++) {
     const index = Math.floor(random * characters.length);
     result += characters.charAt(index);
   }
 
   return result;
}

export {
   encrypt,
   decrypt, 
   generate
};
export type { 
   Payload, 
   returnPayload 
};
