import axios from "axios"

export const BASE_URL="http://localhost:8181/"


export const privateAxios = axios.create({
    baseURL:BASE_URL
   // withCredentials:false
})

privateAxios.interceptors.request.use(config=>{
    const token = getToken()
    if(token){
        config.headers['Authorization']=token
        return config
    }
},error=>Promise.reject(error))
const isLogedIn=()=>{
    if(localStorage.getItem("user")){
        return true
    }
    return false
}

const getUserDetails=()=>{
    if(isLogedIn){
        const user = JSON.parse(localStorage.getItem("user"))
        return user;
    }
    return undefined;
}

const getToken=()=>{
    const user = getUserDetails()
    if(user){
        return user.token
    }else{
    return undefined
    }
}

const logOut=()=>{
    if(isLogedIn){
        localStorage.removeItem("user")
        
    }
    return true

}