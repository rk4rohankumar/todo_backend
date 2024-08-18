import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        if (!token) {
            return res.status(403).send({ message: 'No token provided!' });
        }
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized!' });
            }
            next();
        });
    } catch (error) {   
        return res.status(500).send({ message: 'Internal server error in token verification' });
    }
   
};

export default verifyToken;