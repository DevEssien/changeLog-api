import jwt from 'jsonwebtoken';

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.username
    }, process.env.SECRET_JWT, 
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
        const user = jwt.verify(token, process.env.SECRET_JWT);
        req.user = user;
        next()
    } catch(error) {
        console.log(error)
        res.status = 401;
        res.json({ message: 'Not valid token!'});
        return;
    }
    
}