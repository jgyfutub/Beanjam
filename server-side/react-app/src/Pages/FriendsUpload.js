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
    
}
    },[])
    return (
        <Header/>
    )
}