import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import route from './router';
import { protect } from './modules/auth'
import { signup, signin } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    req.message = 'New products here';
    next();
});

app.get('/', (req, res, next) => {
    setTimeout(() => {
        next(new Error('hello'));
    }, 1);
});

app.use('/api', protect, route);

app.post('/user/signup', signup);
app.post('/user/signin', signin)

app.use((error, req, res, next) => {
    console.log('error ', error);
    if (error.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized'});
    } else if (error.type === 'input') {
        res.status(400).json({ message: 'Invalid Input'});
    } else {
        res.status(500).json({ message: 'server side error'});
    }
})

export default app;