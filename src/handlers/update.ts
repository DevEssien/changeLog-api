import prisma from "../db"

export const getOneUpdate = async (req, res, next) => {
    const update = await prisma.update.findUnique({ 
        where: {
            id: req.params.id
        }
    });
    return res.json({
        update
    })
}

export const getUpdates = async (req, res, next) => {
    const products = await prisma.product.findMany({
        where: {
            id: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = await prisma.update.findMany();
    return res.json({
        updates
    })
}

export const createUpdate = async (req, res, next) => {

}

export const updateUpdate = async (req, res, next) => {

}

export const deleteUpdate  = async (req, res, next) => {
    
}
