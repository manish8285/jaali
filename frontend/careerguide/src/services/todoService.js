import { privateAxios } from "./helper";
import axios from "axios";


const loginUser=(user)=>{
    axios.get(HOME_URL+"login").then()
}

export const getTodoCategories=()=>{
   return privateAxios.get("todo/category").then(response=>response.data)
}

export const getAllTodos=(catId)=>{
    return privateAxios.get(`todo/${catId}`).then(response=>response.data)
 }
 export const deleteOneTodo=(id)=>{
    return privateAxios.delete(`todo/${id}`).then(response=>response.data)
 }

export const addTodo=(todo)=>{
    return privateAxios.post(`todo`,todo).then(response=>response.data)
 }
