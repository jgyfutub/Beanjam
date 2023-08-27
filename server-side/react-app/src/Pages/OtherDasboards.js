import React , { useEffect, useState } from "react";
import { Form, useNavigate, useParams  } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

export default function OtherDashboards(){
    const params= useParams()
    const navigate=useNavigate()
    const [id,setid]=useState("")
    const [follow,setfollow]=useState('Follow')
    const [arr,setarr]=useState([])
    const [userid,setuserid]=useState({email:"",id:"",name:"",follower:0,following:0})
    console.log(params.id)
    const handleLike=async(e)=>{
        const formdata=new FormData()
        formdata.append("userid",userid.id)
        formdata.append("postid",e.target.value)
        console.log(userid)
        const response=await axios.post('http://localhost:8080/likepost?userid='+id+'&postid='+e.target.value)

    }
    const handleFollow=async(e)=>{
        const response=await axios.post('http://localhost:8080/follow?id='+id+'&userid='+userid.id)
        window.location.reload()
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
                setarr(prevarr=>[...prevarr,i])
            }
        })
        axios.get('http://localhost:8080/aboutaccounts?id='+params.id)
        .then((response)=>{
            console.log(response)
            if (response.data[0].followers.includes(id)){
                setfollow("UnFollow")
            }else{
                setfollow("Follow")
            }
            console.log(response.data[0].followers.length)
            setuserid({email:response.data[0].email,id:response.data[0]._id,name:response.data[0].name,follower:(response.data[0].followers.length),following:(response.data[0].following.length)})
        })
    },[id])

    useEffect(()=>{
        console.log(arr)
    },[arr])

    return(
        <div>
            <Header userid="wef"/>
            <div className="Accounts">
                <h1>User Profile</h1>
                <h3>Name: {userid.name}</h3>
                <h3>Email: {userid.email}</h3>
                <h3>Followers: {userid.follower}</h3>
                <h3>Following: {userid.following}</h3>
                <div>
                    <button value={userid.id} onClick={handleFollow} className="buttonname">{follow}</button>
                    <button  className="buttonname">Start a Rap Battle</button>
                </div>
                <div style={{display:'grid',justifyContent:'center',rowGap:20}}>
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
        </div>
    )
}