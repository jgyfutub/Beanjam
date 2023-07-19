import React , { useEffect, useState } from "react";
import { Form, useNavigate, useParams  } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

export default function OtherDashboards(){
    const params= useParams()
    const navigate=useNavigate()
    const [id,setid]=useState("")
    const [arr,setarr]=useState([])
    const [userid,setuserid]=useState({email:"",id:""})
    console.log(params.id)
    const handleLike=async(e)=>{
        const formdata=new FormData()
        formdata.append("userid",userid.id)
        formdata.append("postid",e.target.value)
        console.log(userid)
        const response=await axios.post('http://localhost:8080/likepost?userid='+id+'&postid='+e.target.value)
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
    useEffect(()=>{
        console.log(id)
        axios.get('http://localhost:8080/accounts?id='+params.id)
        .then((response)=>{
            console.log(response.data)
            for(const i of response.data){
                setarr([...arr,i])
            }
        })
        axios.get('http://localhost:8080/aboutaccounts?id='+params.id)
        .then((response)=>{
            console.log(response)
            setuserid({email:response.data[0].email,id:response.data[0]._id})
        })
    },[id])

    useEffect(()=>{
        console.log(arr)
    },[arr])

    return(
        <div>
            <Header userid="wef"/>
            <div className="Accounts">
                <h3>User Profile</h3>
                <h5>Username: {userid.email}</h5>
                <div>
                    <button value={userid.id} >Follow</button>
                    <button>Start a Rap Battle</button>
                </div>
                {arr.map((audio,index)=>{
                return (
                    <div className="audiobox">
                    <audio controls>
                    <source index={index} src={"./audios/"+audio.Audio} type="audio/wav"/>
                     Your browser does not support the audio element.
                    </audio>
                    <p>likes: {audio.likes.length}</p>
                    <button value={audio._id} onClick={handleLike}>Like</button>
                    </div>
                )
            })}
            </div>
        </div>
    )
}