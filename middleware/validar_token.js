const jwt = require("jsonwebtoken");

//aqui validamos el token(ruta protegida)
const verificartoken=(req,res,next)=>{
    const token = req.header('authorization');
 
    if(!token) return res.status(401).json({error: 'acceso denegado '});
try {
    const verificado = jwt.verify(token,process.env.TOKEN_SECRET);
   
    req.user = verificado;
       //verificado pase
       next();
   
} catch (error) {
    res.status(400).json({error: 'token no es valido'})
}
}


module.exports = verificartoken;