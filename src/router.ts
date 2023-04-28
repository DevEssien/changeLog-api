import express from 'express';
import { body, oneOf, validationResult } from 'express-validator'
import { handleInputErrors } from './modules/middlewares';

import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product' 

const route = express.Router();

/**
 * Products
*/
route.get('/product', getProducts);

route.get('/product/:id', getOneProduct);

route.put('/product/:id', body('name').isString(), handleInputErrors, (req, res, next) => {});

route.post('/product', body('name').isString(), handleInputErrors, createProduct );

route.delete('/product/:id', deleteProduct);

/**
 * updates
 */
route.get('/update', (req, res, next) => {});

route.get('/update/:id', (req, res, next) => {});

route.put('/update/:id',
    body('title').optional(), 
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRICATED']),
    body('version').optional(), 
    (req, res, next) => {});

route.post('/update',
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('productId').exists().isString(),
    (req, res, next) => {});

route.delete('/update/:id', (req, res, next) => {});

/**
 * Update Points
 */

route.get('/update-point', (req, res, next) => {});

route.get('/update-point/:id', (req, res, next) => {});

route.put('/update-point/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(), 
    (req, res, next) => {}
);

route.post('/update-point', 
    body('name').exists().isString(), 
    body('description').isString(), 
    body('updateId').exists().isString(), 
    (req, res, next) => {}
);

route.delete('/update-point/:id', (req, res, next) => {});


export default route;