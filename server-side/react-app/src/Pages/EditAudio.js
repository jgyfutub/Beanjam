import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import './pages.css'
import axios from "axios";

export default function EditAudio(){
    const navigate=useNavigate()
    const [id,setid]=useState("")
    const [url,seturl]=useState("")
    const [myRange1 ,setmyRange1] = useState(0) 
    const [myRange2 ,setmyRange2] = useState(0) 
    const [myRange3 ,setmyRange3] = useState(0)

    const funcmyRange1=(e)=>{
        setmyRange1(e.target.value)
    }
    const funcmyRange2=(e)=>{
        setmyRange2(e.target.value)
    }
    const funcmyRange3=(e)=>{
        setmyRange3(e.target.value)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("url",url)
        formdata.append("bass",myRange1)
        formdata.append("treble",myRange2)
        formdata.append("volume",myRange3)
        const response=await axios.post('http://127.0.0.1:8000/audiostyletransfer/',formdata)

    }
    useEffect(()=>{
        const currentUser_ =JSON.parse(localStorage.getItem("currentuser"));
        const useraudiourl=JSON.parse(localStorage.getItem('editaudiodata'))
        if (currentUser_ == null) {
            navigate("/");
        }
        else if(currentUser_!=null){
            console.log(currentUser_,)
            setid(currentUser_['id'])
            seturl(useraudiourl.url)
        }
    },[])
    useEffect(()=>{
        console.log(id)
    },[id])
    useEffect(()=>{
        console.log(url)
    },[url])
    window.unload=()=>{
        localStorage.removeItem('editaudiodata')
    }
    return (<div>
    <Header userid="abcd"/>
    <form className="editcontainer" onSubmit={handleSubmit}>
       <h1> Edit you audio</h1>
       <h3>Bass: {myRange1}</h3>
        <input type="range" min="0" max="100" className="myRange1" value={myRange1} onChange={funcmyRange1}/>
        <h3>Treble: {myRange2}</h3>
        <input type="range" min="0" max="100" className="myRange2" value={myRange2} onChange={funcmyRange2}/>
        <h3>Volume: {myRange3}</h3>
        <input type="range" min="0" max="100" className="myRange3" value={myRange3} onChange={funcmyRange3}/>
        <button type="submit">Submit</button>
        </form>
        <audio controls>
        <source src={"./audios/"+url} type="audio/wav"/>
        Your browser does not support the audio element.
        </audio>
    </div>)
}