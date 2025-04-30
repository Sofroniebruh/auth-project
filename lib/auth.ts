import jwt from "jsonwebtoken"

const SECRET = process.env.SECRET!

export function signJWT(payload: object) {
    return jwt.sign(payload, SECRET)
}

export function verifyJWT(token: string) {
    try {
        return jwt.verify(token, SECRET)
    } catch {
        return null
    }
}