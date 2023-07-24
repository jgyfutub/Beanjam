import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
export default function Battle(){
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
    return (
        <div>
            <Header userid="abcd"/>
            <div>
                
            </div>
        </div>
    )
}