const mongoose= require("mongoose")

const todoSchema =mongoose.Schema({
    todo:{type:String,require:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"todoCategory"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
},{
    timestamps:true
})

const todo = mongoose.model("todo",todoSchema)

module.exports = todo