import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.JWT_SECRET;

export type Payload = {
   loginToken: FormDataEntryValue | null;
}

export function encrypt(info: Payload){
   const payload = info 
   const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set expiration time
   return token;
}

