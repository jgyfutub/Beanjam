import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function List(){
    const navigate=useNavigate()
    const [id,setid]=useState("")
    const [following,setfollowing]=useState([])
    const [followers,setfollowers]=useState([])
    const [followersname,setfollowersname]=useState([])
    const [followingname,setfollowingname]=useState([])
    const handleView=(e)=>{
        navigate('/accounts/'+e.target.value)
    }
    useEffect(()=>{
        const currentUser_ =JSON.parse( localStorage.getItem("currentuser"));
if (currentUser_ == null) {
navigate("/");
}
else if(currentUser_!=null){
    console.log(currentUser_) 
    setid(currentUser_.id)
    axios.get('http://localhost:8080/aboutaccounts?id='+currentUser_.id)
        .then((response)=>{
            console.log(response)
            for(const i of response.data[0].followers){
                setfollowers([...followers,i])
            }
            for(const i of response.data[0].following){
                setfollowing([...following,i])
            }
        })
}
    },[])
    return (
        <div className="List">
            <Header userid="abcd"/>
            <div>
                <div className="Following">
                    <h3>Following</h3>
                    {following.map((audio,index)=>{
                        return(
                            <button value={audio} onClick={handleView}>View Profile</button>
                        )
                    }
                    )}
                </div>
                <div className="Followers">
                    <h3>Followers</h3>
                    {followers.map((audio,index)=>{
                        return(
                            <button value={audio} onClick={handleView}>View Profile</button>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}