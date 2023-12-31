import React ,{useState,useEffect} from "react";
import './pages.css';
import { useNavigate } from "react-router-dom";
export default function Loginpage(){
    const [user,setuser]=useState({email:"",password:""})
    const navigate=useNavigate()
    const handleInput=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const response=await fetch('http://localhost:8080/login',{
            method:'POST',
             body: JSON.stringify(user),
             headers: {
             "Content-Type": "application/json",
            },
        })
        const data=await response.json()
        const UserData={
            id:data.id,
            email:data.email,
            password:data.password,
            v:data.v
        }
        localStorage.setItem("currentuser",JSON.stringify(UserData))
        console.log(data)
        navigate('/dashboard')
    }
    return <div>
        <h1>Login page</h1>
        <div className="Login">
        <form onSubmit={handleSubmit} className="LoginContainer">
            <input type="email" name="email" placeholder="Write Email" onChange={handleInput}/>
            <input type="password" name="password" placeholder="Write password" onChange={handleInput}/>
            <button type="submit">Login</button>
            </form>
        </div>
    </div>
}