const express = require("express")
require("dotenv").config()
const bcrypt = require("bcryptjs")
require("./db")

const cors = require("cors")

const jwt = require("jsonwebtoken")
const User = require("./models/user")
const todoCategory = require("./models/todoCategory")
const app = express()
const bodyParser = require("body-parser")
const Todo = require("./models/todo")
const category = require("./models/todoCategory")
const todo = require("./models/todo")


const PORT = process.env.PORT || 8181

app.use(cors())
app.use(bodyParser.json())
const generateToken=(id)=>{
    return jwt.sign({id},"manish",{
        expiresIn:"30d"
    })
}

app.get("/",(req,res)=>{
    return res.send(" Smart Todo API");
})

app.post("/login",async(req,res)=>{
   const {email,password} = req.body;

   try{
   const user = await User.findOne({email})
   let matched
   if(user)
    matched = await user.matchPassword(password)
    if(user && matched){
      return  res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })

    }
    }catch(error){
        return   res.status(400).send("Credential does not match")
    }
     
    return   res.status(400).send("Credential does not match") 

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

//middleware for authorization
const protect=async(req,res,next)=>{
    const token =req.headers.authorization
    const decoded = jwt.verify(token,"manish")

    if(!token && decoded){
        return res.status(401).send("Not Authorized, Or Token Failed")
    }
   console.log("req body = "+req.body)
    const user = await User.findById(decoded.id)
    req.user = user
    next()
}

// 
app.get("/dashboard",protect,(req,res)=>{
    return res.status(201).send(req.user)
})

// add new category
app.post("/todo/category",protect,(req,res)=>{
    const title = req.body.title
    if(!title){
        return res.status(400).send(" title can not be empty")
    }
    todoCategory.create({
        title:title,
        user:req.user,
    }).then(data=>{
        return res.json(data)
    }).catch(error=>{
        return res.status(400).json(error)
    })
    
})

// get categories
app.get("/todo/category",protect,(req,res)=>{
    todoCategory.find({user:req.user}).then(data=>{
        return res.json(data)
    }).catch(error=>{
        return res.status(400).send(error)
    })
})

// get todos with category
app.get("/todo/:catId",protect,async(req,res)=>{
    console.log("inside controller ...")
    const catId = req.params.catId

    // get 
    if(catId !=0){
        
        const mycat = await category.findById(catId)
    Todo.find({user:req.user,category:mycat}).populate("category").then(data=>{
        console.log(data)
        return res.json(data)
    }).catch(error=>{
        return res.status(400).send(error)
    })
    }else{
        Todo.find({user:req.user}).populate("category").then(data=>{
           // console.log(data)
            return res.json(data)
        }).catch(error=>{
            return res.status(400).send(error)
        })
    }
})

// add new todo
app.post("/todo",protect,(req,res)=>{
    const mytodo = req.body
    
    if(!mytodo.todo){
        return res.status(400).send("All fields are required")
    }
    Todo.create({todo:mytodo.todo,category:mytodo.category,user:req.user}).then(data=>{
        return res.json(data)
    }).catch(error=>{
        return res.status(400).send(error)
    })
})

// delete todo
app.delete("/todo/:todoId",protect,(req,res)=>{
    const id = req.params.todoId
    if(!id){
        return res.status(400).send("Path variable is missing")
    }else{
        todo.deleteOne({_id:id}).then(data=>{
           return  res.send("Deleted Successfully")
        }).catch(error=>{
            return res.status(400).send(error)
        })
    }
})

// update todo
app.put("/todo/:todoId",protect,(req,res)=>{
    const id = req.params.todoId
    const {todo} = req.body
    if(!id){
        return res.status(400).send("Path variable is missing")
    }else{
        Todo.updateOne({_id:id},{
            $set:{todo:todo}
        }).then(data=>{
           return  res.send("Deleted Successfully")
        }).catch(error=>{
            return res.status(400).send(error)
        })
    }
})


// port setting
app.listen(PORT,()=>{
    console.log("listening at port "+PORT)
})

