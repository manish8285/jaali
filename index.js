const express = require("express")
require("dotenv").config()
const bcrypt = require("bcryptjs")
require("./db")

const cors = require("cors")

const jwt = require("jsonwebtoken")
const User = require("./models/user")
const app = express()
const bodyParser = require("body-parser")
app.use(cors())

const generateToken=(id)=>{
    return jwt.sign({id},"manish",{
        expiresIn:"30d"
    })
}

app.post("/login",bodyParser.json(),async(req,res)=>{
   const {email,password} = req.body;
   const user = await User.findOne({email})
   console.log("password ="+password)
   const matched = await user.matchPassword(password)
   console.log(matched)
    if(user && matched){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })

    }

        res.status(400).send("Credential does not match")
    

})


app.post("/signup",bodyParser.json(),async(req,res)=>{
    const user = req.body

    if(!user.password || !user.name || !user.email || !user.mobile || !user.city){
        return res.status(400).send("All Fields are required")
        
        
    }

                const email = user.email
                const userExist = await User.findOne({email});

                if(!userExist){
                    console.log("pwd inside controller"+user.password)
                    User.create(user).then(data=>{
                       return res.status(201).json({
                            _id:data.id,
                            name:data.name,
                            email:data.email,
                            token:generateToken(data.id)
                        })
                    }).catch(e=>{
                        console.log(e)
                        return res.status(400).send("User not found")

                    })
                }else{
                   return res.status(400).send("User Already Exist")
                }
   // return res.send("success")

})


app.get("/users",(req,res)=>{
    const token =req.headers.authorization
   const decoded = jwt.verify(toekn,"manish")
   User.findById(decoded._id)

})



app.listen(process.env.PORT,()=>{
    console.log("listening at port "+process.env.PORT)
})

