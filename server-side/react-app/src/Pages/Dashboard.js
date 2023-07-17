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
    const [audios,setaudios]=useState([])
    useEffect(()=>{
        const currentUser_ =JSON.parse( localStorage.getItem("currentuser"));
if (currentUser_ == null) {
navigate("/");
}
else if(currentUser_!=null){
    console.log(currentUser_)
    setid(currentUser_['id'])
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
        formdata.append("id",id)
        formdata.append("text",text)
        formdata.append("audio",audio)
        const response =await axios.post('http://localhost:8080/uploadaudio',formdata)
        console.log(response)
    }
    useEffect(()=>{
        console.log(id)
        axios.get('http://localhost:8080/uploadaudio?id='+id)
        .then((response)=>{
            console.log(response.data)
            for(const i of response.data){
                setaudios([...audios,i.Audio])
            }

        })
    },[id])
    useEffect(()=>{
        console.log(audios)
    },[audios])
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

            <div className="Showbox">
            {audios.forEach((audio)=>{
                return (
                    <audio controls>
                    <source src="./audios/64b420d77360f4d9bceeab8e_mixkit-arcade-retro-game-over-213.wav" type="audio/wav"/>
                     Your browser does not support the audio element.
                    </audio>
                )
            })}
            </div>
        </div>
    )
}