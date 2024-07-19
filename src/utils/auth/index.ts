import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export function signToken(tokenData: { id: string; email: string; name: string }) {
    return jwt.sign(
        {
            tokenData,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: process.env.JWT_LIFETIME!,
        },
    );
}

export function comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}