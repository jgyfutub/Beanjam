import React ,{useState,useEffect}from "react";
import axios from 'axios'
export default function SignUppage(){
    const [user,setuser]=useState({email:"",password:"",cpassword:"",name:""})
    const handleInput=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setuser({ ...user, [name]: value })
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        if (user.password==user.cpassword){
            const response=await fetch('http://localhost:8080/signup',{
                method:'POST',
                 body: JSON.stringify({email:user.email,password:user.password,name:user.name}),
                 headers: {
                 "Content-Type": "application/json",
                },
            })
            const data=await response.json()
            console.log(data)
            const UserData={
                id:data.id,
                email:data.email,
                password:data.password,
                v:data.v
            }
            localStorage.setItem("CurrentUser",UserData)
            
        }
    }
    return <div>
        <h1>SignUp Page</h1>
        <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Write Email" onChange={handleInput} required/>
            <input type="password" name="password" placeholder="Write password" onChange={handleInput} required/>
            <input type="cpassword" name="cpassword" placeholder="ReWrite Password" onChange={handleInput} required/>
            <input type="text" name="name" placeholder="Write your name" onChange={handleInput} required/>
            <button type="submit">Register</button>
            </form>
        </div>
    </div>
}