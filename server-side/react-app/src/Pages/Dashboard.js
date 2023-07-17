import React, { useEffect, useState } from "react";
import './pages.css';
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Dashboard(){
    const navigate=useNavigate()
    const [text,settext]=useState("")
    const [audio,setaudio]=useState(null)
    const [id,setid]=useState("")
    useEffect(()=>{
        const currentUser_ = localStorage.getItem("currentuser");
if (currentUser_ == null) {
navigate("/");
}
else if(currentUser_!=null){
    console.log(currentUser_)
    setid(currentUser_.id)
}
    },[])
    const handleInput=(e)=>{
        settext(e.target.value)
    }
    const handleAudioInput=(e)=>{
        setaudio(e.target.files[0])
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("text",text)
        formdata.append("audio",audio)
        const response =await axios.post('http://localhost:8080/uploadaudio',formdata)
        console.log(response)
    }
    return(
        <div className="Dashboard">
            <Header userid="abcd"/>
            <div className="Uploadbox">
            <form onSubmit={handleSubmit}>
                <h2>Upload your post</h2>
                <textarea onChange={handleInput}></textarea>
                    <input type='file' accept=".wav" onChange={handleAudioInput}/>
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}