
import { TOKEN_KEY } from '@/app/lib/config';
import jwt from 'jsonwebtoken'
export const getVerifyWebToken = (authorization) => {
    let error = 0
    jwt.verify(authorization, TOKEN_KEY, function (err, decoded) {
        if (err) {
            error++
        }
    });
    if (error == 0) {
        return true
    } else {
        return false
    }
}