import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'reactstrap'

import Delete from "../assets/Delete.svg"
import { addTodo, deleteOneTodo, getAllTodos, getTodoCategories } from '../services/todoService'
import { toast } from 'react-toastify'

const Todo = () => {

    const [categories,setCategories] = useState([])

    const [category,setCategory]= useState(undefined)

    const [todos,setTodos] = useState([])

    const [todo,setTodo] = useState({
        todo:"",
        category:{},
    })

    const inputHandler=(event)=>{
        if(event.key==='Enter'){
            console.log(todo)
            addTodo(todo).then(data=>{
                // console.log(data)
                // setTodos([...todos,data])
                AllToDos()
                toast.success("Todo Added Successfully")
            }).catch(error=>{
                console.log(error)
                toast.error("something went wrong")
            })
        }
    }

    const AllToDos=()=>{
        let catId 
        if(typeof(category?._id) === "undefined"){
            catId=0
        }else{
            catId= category?._id
        }
        getAllTodos(catId).then(data=>{
            setTodos(data)
            console.log(data)
        }).catch(error=>console.log(error))
    }

    useEffect(()=>{

        setTodo({...todo,"category":category})
        AllToDos()
        
    },[category])

    useEffect(()=>{
        getTodoCategories().then(data=>{
            setCategories(data)
            //console.log(data)
        }).catch(error=>{
            console.log(error)
        })

        AllToDos()
    },[])

    const deleteTodo=(todo)=>{

        

        deleteOneTodo(todo._id).then(data=>{
            const newList = todos.filter(obj=>obj !=todo)
            setTodos(newList)
            toast.success("deleted successfully...")
        }).catch(error=>{
            toast.info("Something went wrong...")
        })
    }

  return (
    <div className='todoPage'>
        <Container className="text-center">
            <Card className='todoCard'>
                <Row>
                    <Col md="3">
                        <div className='todoLeft'>
                            <ul className='todoli'>
                                <li className={`todolist ${category==undefined?'todoPrimary':''}` } onClick={()=>setCategory(undefined)} id="all" >All</li>
                                {
                                    categories.map((cat)=>(
                                        <li className={`mt-2 todolist ${category?.title==cat.title?'todoPrimary':''}`} onClick={()=>setCategory(cat)} id="groceries"  >{cat.title}</li>
                                
                                    ))
                                }
                                
                                
                                
                            </ul>
                            
                           
                        </div>
                    </Col>
                    <Col md="9">
                        <div className='w-100 todoBlockRight'>
                           <div> <h1>All Tasks</h1></div>
                           <div className='w-100 todoBlock mt-2'>

                           <input type="text" className="form-control todoInput" onKeyUp={(event)=>inputHandler(event)} onChange={(event)=>setTodo({...todo,"todo":event.target.value})} placeholder={`Add a new task inside ${category?category.title:'Uncategorized'} category`} />
                            <div >
                            {
                                todos.map((todo)=>(
                            <div className='mt-3 display-flex'>
                                <p className="todoCheckbox" ></p>
                                <p style={{marginLeft:"35px",display:"inline"}}>{todo.todo}</p>
                                <p className='todoCategoryBadge'>{todo.category?todo.category.title:'Uncategorized'}</p>
                                <img onClick={()=>deleteTodo(todo)} className='todoDelete' src={Delete} alt="delete" />
                            </div>
                                ))
                            }
                            </div>
                        </div>
                        </div>
                        
                    </Col>
                </Row>
                <p>todo</p>
            </Card>

        


        </Container>
    </div>
  )
}

export default Todo