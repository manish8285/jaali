const mongoose = require("mongoose")
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connection successfully...")
}).catch((e)=>console.log(e))

