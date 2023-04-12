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
    res.status(200);
    res.json({ message: 'hello'});
});

app.use('/api', protect, route);

app.post('/user/signup', signup);
app.post('/user/signin', signin)

export default app;