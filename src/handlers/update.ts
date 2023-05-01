import prisma from "../db"

export const getOneUpdate = async (req, res, next) => {
    const update = await prisma.update.findUnique({ 
        where: {
            id: req.params.id
        }
    });
    return res.json({
        data: update
    })
}

export const getUpdates = async (req, res, next) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);
    return res.json({
        data: updates
    });
}

export const createUpdate = async (req, res, next) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });
    if (!product) {
        res.json({
            message: 'Product does not belong to User'
        });
    }
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: {id: product.id}}
        }
    });
    return res.json({
        data: update 
    })
}

export const updateUpdate = async (req, res, next) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);

    const match = updates.find(update => update.id === req.params.id);
    if (!match) {
        return res.json({
            message: "Not matched updates"
        });
    }
    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    });
    return res.json({
        data: updatedUpdate
    })
}

export const deleteUpdate  = async (req, res, next) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);

    const match = updates.find(update => update.id === req.params.id);
    if (!match) {
        return res.json({
            message: "Not matched updates"
        });
    }
    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    });
    return res.json({
        message: 'Deleted',
        data: deleted
    });
}
