const jwt = require('jsonwebtoken');

const auth = (req,resp, next)=>{
    try{
        const token = req.header("Authorization")
        if(!token) 
            return resp.status(400).json({msg:"Invalid Authentication"})
        jwt.verify(token, process.env.TOKEN_SECRET, (err,user)=>{
            if(err) return resp.status(400).json({msg:"Authorization not valid."})

            req.user = user;
            next();
        })
    }catch(err){
        return resp.status(500).json({msg: err.message})
    }

}

module.exports = auth;