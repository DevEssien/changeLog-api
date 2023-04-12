import express from 'express';

const route = express.Router();

/**
 * Products
*/
route.get('/product', (req, res, next) => {
    return res.json({ message: 'Getting the products'})
});

route.get('/product/:id', (req, res, next) => {});

route.put('/product/:id', (req, res, next) => {});

route.post('/product', (req, res, next) => {});

route.delete('/product/:id', (req, res, next) => {});

/**
 * updates
 */
route.get('/update', (req, res, next) => {});

route.get('/update/:id', (req, res, next) => {});

route.put('/update/:id', (req, res, next) => {});

route.post('/update', (req, res, next) => {});

route.delete('/update/:id', (req, res, next) => {});

/**
 * Update Points
 */

route.get('/update-point', (req, res, next) => {});

route.get('/update-point/:id', (req, res, next) => {});

route.put('/update-point/:id', (req, res, next) => {});

route.post('/update-point', (req, res, next) => {});

route.delete('/update-point/:id', (req, res, next) => {});


export default route;