import jwt from "jsonwebtoken"
import {jwtVerify} from "jose";

const SECRET = process.env.SECRET!

export function signJWT(payload: object) {
    return jwt.sign(payload, SECRET)
}

const verifyJWTWithJose = async (token: string) => {
    const secret = new TextEncoder().encode(SECRET);
    try {
        const {payload} = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
};

const verifyJWTWithNode = (token: string) => {
    const jwt = require('jsonwebtoken');
    return jwt.verify(token, SECRET);
};

export function verifyJWT(token: string) {
    if (typeof window === "undefined") {
        return verifyJWTWithJose(token);
    }
    return verifyJWTWithNode(token);
}