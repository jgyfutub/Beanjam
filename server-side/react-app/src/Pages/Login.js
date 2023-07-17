import React ,{useState,useEffect} from "react";
export default function Loginpage(){
    const [user,setuser]=useState({email:"",password:""})
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
        localStorage.setItem("currentuser",data)
        console.log(data)
    }




    return <div>
        <h1>Login page</h1>
        <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Write Email" onChange={handleInput}/>
            <input type="password" name="password" placeholder="Write password" onChange={handleInput}/>
            <button type="submit">Login</button>
            </form>
        </div>
    </div>
}