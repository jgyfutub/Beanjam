import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import './pages.css'
import axios from "axios";

export default function EditAudio(){
    const navigate=useNavigate()
    const params=useParams()
    const [id,setid]=useState("")
    const [url,seturl]=useState("")
    const [myRange1 ,setmyRange1] = useState(1) 
    const [myRange2 ,setmyRange2] = useState(1) 
    const [myRange3 ,setmyRange3] = useState(1)
    const [audio,setaudio] = useState(null)
    const [bool,setbool]=useState(0)
    const [audioname,setaudioname]=useState("")

    const handleAudioChange=(e)=>{
        setaudioname(e.target.files[0].name)
        setaudio(e.target.files[0])
    }
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
        formdata.append("tomono",bool)
        const response=await axios.post('http://127.0.0.1:8000/audiostyletransfer/',formdata)
    }
    const handleAudioMix=async(e)=>{
        await e.preventDefault();
        const formdata=new FormData()
        formdata.append("audio",audio)
        formdata.append("id",id)
        const response=await axios.post('http://localhost:8080/uploadmix?id='+id,formdata)
        const formdata1=new FormData()
        formdata1.append('audio',params.filename)
        formdata1.append('id',id)
        formdata1.append("audiomix",audioname)
        const response1=await axios.post('http://127.0.0.1:8000/audiomix/',formdata1)
    }
    // const handleMix=async(e)=>{
    //     const formdata=new FormData()
    //     formdata.append('audio',params.filename)
    //     formdata.append('id',id)
    //     formdata.append("audiomix",audioname)
    //     const response=await axios.post('http://127.0.0.1:8000/audiomix/',formdata)
    // }
    useEffect(()=>{
        const currentUser_ =JSON.parse(localStorage.getItem("currentuser"));
        if (currentUser_ == null) {
            navigate("/");
        }
        else if(currentUser_!=null){
            console.log(currentUser_,)
            setid(currentUser_['id'])
            seturl(params.filename)
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
        <input type="range" min="1" max="100" className="myRange1" value={myRange1} onChange={funcmyRange1}/>
        <h3>Treble: {myRange2}</h3>
        <input type="range" min="1" max="100" className="myRange2" value={myRange2} onChange={funcmyRange2}/>
        <h3>Volume: {myRange3}</h3>
        <input type="range" min="1" max="100" className="myRange3" value={myRange3} onChange={funcmyRange3}/>
        <button type="submit">Submit</button>
        </form>
        <div style={{display:'grid',justifyContent:'center',marginTop:'20px'}}>
        <h3>Real audio</h3>

        <audio controls>
        <source src={"./audios/"+url} type="audio/wav"/>
        </audio>

        <h3>Synthesized audio</h3>
        
        <audio controls>
        <source src={"./editedaudios/"+url} type="audio/wav"/>
        </audio>

        </div>

        <input type='file' accept=".wav" onChange={handleAudioChange}/>
        <button onClick={handleAudioMix}>Upload Audios and Mix!!</button>
    </div>)
}