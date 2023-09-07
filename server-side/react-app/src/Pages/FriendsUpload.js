import react,{ useEffect, useState } from 'react'
import './pages.css';
import Header from "./Header";
import axios from "axios";
import { useNavigate} from "react-router-dom";
export default function FriendsUpload(props){
    const navigate=useNavigate()
    const [id,setid]=useState("")
    const [following,setfollowing]=useState([])
    const [followingcontent,setfollowingcontent]=useState([])
    useEffect(()=>{
        const currentUser_ =JSON.parse( localStorage.getItem("currentuser"));
if (currentUser_ == null) {
navigate("/");
}
else if(currentUser_!=null){
    console.log(currentUser_)
    setid(currentUser_['id'])
    axios.get('http://localhost:8080/aboutaccounts?id='+currentUser_.id)
        .then((response)=>{
            console.log(response)
            for(const i of response.data[0].following){
                setfollowing(prevfollowing=>[...prevfollowing,i])
            }
        })
    axios.get('http://localhost:8080/getposts?id='+currentUser_.id)
    .then((response)=>{
        console.log(response)
        for (const i of response.data.posts){
            setfollowingcontent(prevposts=>[...prevposts,i])
        }
    })
}
    },[])
    return (
        <div>
        <Header/>
        <div className="audiobox">
            <audio controls>
            <source type="audio/wav"/>
                Your browser does not support the audio element.
            </audio>
            <p>likes: 0</p>
            <button >Like</button>
            </div>
        </div>

    )
}