import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const signup = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        });
        if (user) {
            res.status(401);
            return res.json({
                message: 'User already exist'
            });
        }
        const newUser = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            },
        });
        const token = createJWT(newUser);
        return res.status(201).json({ 
            status: 'Successful',
            message: 'Created a new user',
            token 
        });
    } catch(error) {
        console.log(error)
    }
}

export const signin = async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });
    if (!user) {
        res.status(401);
        res.json({ message: 'No user with username found!'});
        return
    }
    const matchPassword = await comparePasswords(req.body.password, user?.password);
    if (!matchPassword) {
        res.status(500);
        res.json({ message: 'Server side error!'});
        return
    }
    const token = createJWT(user);
    return res.status(200).json({
        status: 'Successful',
        message: 'logged user in',    
        user,
        token
    });
}
