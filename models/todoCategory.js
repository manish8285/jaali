const mongoose = require("mongoose")

const categorySchema= mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:{type:String,required:true}
})

const category = mongoose.model("todoCategory",categorySchema)
module.exports= category