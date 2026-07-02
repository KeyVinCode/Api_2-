const authMiddleware = (req,res,next) => {
    const token  = req.headers.authorization

    if (token !== JWT_SECRET){
        return res.status(401).json({ message: 'No autorizado'})
    }

    next()
    
}

export default  authMiddleware