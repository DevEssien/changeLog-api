import prisma from "../db"

export const getProducts = async (req, res, next) => {
    const user  = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true,
        }
    });
   if (!user) {
    res.status = 400;
   }
   return res.json({
    data: user.products
   });
}

export const getOneProduct = async (req, res, next) => {
    console.log('id ', req.params.id)
    const id = req.params.id;
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    });
    if (!product) {
        res.status = 400;
       }
       return res.json({
        data: product
       })
}

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        });
        return res.json({
            data: {
                product: newProduct
            }
        });
    } catch(error) {
        next(error)
    }
}

export const updateOneProduct = async (req, res, next) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    });
    return res.json({
        updatedProduct: updated
    })
}

export const deleteProduct = async (req, res, next) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    });
    return res.json({
        message: 'Deleted',
        deleted
    })
}