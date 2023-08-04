const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema =new mongoose.Schema({
    name:String,
    email:{type:String,require:true},
    password:{type:String,require:true},
    qualification:String,
    city:String,
    code:String,
    mobile:String,
})

userSchema.pre("save",async function(next){
    console.log("inside pre save")
    if(!this.isModified){
        next()
    }
    const salt=await bcrypt.genSalt(10);
    console.log("password inside schema"+this.password)
    this.password =await bcrypt.hash(this.password,salt)
})

console.log("password inside schema"+this.password)

userSchema.methods.matchPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}


const User = mongoose.model("user",userSchema)

module.exports= User