
import { TOKEN_KEY } from '@/app/lib/config';
import jwt from 'jsonwebtoken'

export const getsignintoken = (data) =>{
    return jwt.sign({ id: data, iat: Math.floor(Date.now() / 1000) - (60 * 60) , exp: Math.floor(Date.now() / 1000) + (60 * 60)}, TOKEN_KEY);
}