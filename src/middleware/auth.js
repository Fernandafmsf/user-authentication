import jwt from 'jsonwebtoken'; 

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;
    
    if (!authHeader){
        return res.status(401).json({error:'Token was not provided'});
    }

    try{
        const decoded = jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET);
        req.userId = decoded.userId;
        return next();
    }catch(error){
        console.error(error);
        return res.status(401).json({error:'Access denied'})
    }

   
}

export default auth;