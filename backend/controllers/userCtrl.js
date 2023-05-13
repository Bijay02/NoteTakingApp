const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const useCtrl ={
    registerUser : async(req, resp)=>{
        try{
            const {username , email, password} = req.body;
            const user = await Users.findOne({email: email})
            if(user) 
                return resp.status(400).json({msg:"This email alredy exists."})

            const passwordHash = await bcrypt.hash(password,10)
            const newUser = new Users({
                username: username,
                email: email,
                password: passwordHash
            })
            await newUser.save()
            resp.json({msg:"Sign up success"})
        }catch(err){
            return resp.status(500).json({msg: err.message})
        }
    },
    loginUser: async(req,resp)=>{
        try{
            const{email, password}= req.body;
            const user = await Users.findOne({email:email})
            if(!user)
                return resp.status(400).json({msg:"User does not exist."})
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch)
                return resp.status(400).json({msg:"Incorrect Password"})

            //if login success create token
            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        
            resp.json({token})
        }catch(err){
            return resp.status(500).json({msg:err.message})
        }
    },
    verifiedToken: (req,resp)=>{
        try{
            const token = req.header("Authorization")
            if(!token) return resp.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, async(err, verified)=>{
                if(err) return resp.send(false)

                const user = await Users.findById(verified.id)
                if(!user) return resp.send(false)

                return resp.send(true)
            })
        }catch(err){
            return resp.status(500).json({msg: err.message})
        }
    }
  
}

module.exports = useCtrl;