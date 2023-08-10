import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'reactstrap'

import Delete from "../assets/Delete.svg"
import { addTodo, deleteOneTodo, getAllTodos, getTodoCategories, updateTodo } from '../services/todoService'
import { toast } from 'react-toastify'

const Todo = () => {

    const [modal,setModal] = useState(false)

    const [categories,setCategories] = useState([])

    const [category,setCategory]= useState(undefined)

    const [todos,setTodos] = useState([])

    const [todo,setTodo] = useState({
        todo:"",
        category:{},
    })

    //edit
    const toggleModal=(todo)=> {
        setTodo(todo)
        const rContainer = document.querySelector(".rContainer")
        const eArea  = document.querySelector("#editArea")
        if(modal){
            eArea.style.display="block"
            rContainer.style.display="none"
            setModal(!modal) 
        }else{
            rContainer.style.display="block"
            eArea.style.display="none"
            setModal(!modal) 
        }
        
    }

    // to create new todo
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

        setTodo({...todo,"id":undefined,"category":category})
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
            
        })
    }

    const updateTitle=()=>{
        updateTodo(todo._id,{todo:todo.todo}).then(data=>{
            toast.success("updated successfully...")
            toggleModal()
            AllToDos()
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
                            <div className='pt-1 rContainer'  >
                           

                             <table className='table table-borderless'>
                                <tbody>
                             {
                                todos.map((todo)=>(
                            <tr>
                            
                               <td>
                                <p className="todoCheckbox" ></p>
                                </td>
                                <td>

                                
                                <p style={{marginLeft:"35px",display:"inline"}}>{todo.todo}</p>
                                <p className='todoCategoryBadge'>{todo.category?todo.category.title:'Uncategorized'}</p>
                                </td>
                                <td>
                                
                                <svg onClick={()=>toggleModal(todo)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" style={{width:"20px"}} className="cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>

                                <img onClick={()=>deleteTodo(todo)} className='todoDelete' src={Delete} alt="delete" />
                                </td>
                                   
                                
                                </tr>
                                ))
                             
                             }

                              
                                </tbody>
                             </table>

                                
                           
                            
                             

                             
                            </div>
                            <div className='card mt-1' id="editArea" style={{display:"none"}} >
                                <div className="card-body">
                                    <textarea  rows="3"  className='form-control' value={todo?.todo} onChange={(event)=>setTodo({...todo,"todo":event.target.value})}  ></textarea>
                                    <div className='mt-1'>
                                    <button onClick={()=>toggleModal()} className='btn btn-outline-danger ' >Cancel</button>
                                    <button onClick={()=>updateTitle()} className='btn btn-outline-danger ml-1' style={{marginLeft:"5px"}} >Submit</button>
                                    </div>
                                </div>
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