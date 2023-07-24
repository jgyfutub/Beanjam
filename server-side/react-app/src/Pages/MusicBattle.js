import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './pages.css'
import axios from 'axios'
import Header from "./Header";
export default function MusicBattle(){
    const navigate=useNavigate()
    const [vsid,setvsid]=useState("")
    const [audio,setaudio]=useState(null)
    const [id,setid]=useState("")
    const [audios,setaudios]=useState([])
    const handleBattle=async(e)=>{
        const response=await axios.post('http://localhost:8080/readyforbattle?id='+id)
        const response1=await axios.get('http://localhost:8080/warriors?id='+id)
        console.log(response1.data.warriors[Math.floor(Math.random()*response1.data.warriors.length)])
        navigate('/battle/'+response1.data.warriors[Math.floor(Math.random()*response1.data.warriors.length)])
        
    }
    useEffect(()=>{
        const currentUser_ =JSON.parse( localStorage.getItem("currentuser"));
if (currentUser_ == null) {
navigate("/");
}
else if(currentUser_!=null){
    console.log(currentUser_)
    setid(currentUser_.id)
}
    },[])

    return (
        <div>
            <Header userid="abcd"/>
            <button style={{marginTop:'80px'}} onClick={handleBattle} >Start a Music Battle with random user</button>
            <h1>Ongoing Music Battles</h1>
        </div>
    )
}