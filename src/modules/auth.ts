import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.username
    }, process.env.JWT_SECRET, 
    {expiresIn: '1hr'});
    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status = 401;
        res.json({ message: 'Not Authorized!'});
        return;
    }
    const [, token] = bearer.split(' ');
    if (!token) {
        res.status = 401;
        res.json({ message: 'Not valid token!'});
        return;
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next()
    } catch(error) {
        console.log(error)
        res.status = 401;
        res.json({ message: 'Not valid token!'});
        return;
    }
    
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 12);
}

export const comparePasswords = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}