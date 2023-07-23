import React, { useEffect, useState } from "react";
import './pages.css';
import Header from "./Header";
import axios from "axios";
import { useNavigate} from "react-router-dom";
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
        window.location.reload()
    }
    const handleDelete=async(e)=>{
        const response=await axios.delete('http://localhost:8080/uploadaudio?audiourl='+e.target.value)
        window.location.reload()
    }
    const handleEdit=(e)=>{
        navigate('/edit/'+e.target.value)
    }
    const handleCrop=(e)=>{
        navigate('/crop/'+e.target.value)
    }
    useEffect(()=>{
        console.log(id)
        axios.get('http://localhost:8080/uploadaudio?id='+id)
        .then((response)=>{
            console.log(response.data)
            for(const i of response.data){
                setaudios([...audios,i])
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
            {audios.map((audio,index)=>{
                return (
                    <div>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                    <button value={audio.Audio} onClick={handleDelete}>🗑️</button>
                    <button value={audio.Audio} onClick={handleCrop}>✂️</button>
                    <button value={audio.Audio} onClick={handleEdit}>edit</button>
                    </div>
                    <p>{audio.text}</p>
                    <audio controls autoplay muted>
                    <source index={index} src={"./audios/"+audio.Audio} type="audio/wav"/>
                     Your browser does not support the audio element.
                    </audio>
                    <p style={{textAlign:'end'}}>Likes:{audio.likes.length}</p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}