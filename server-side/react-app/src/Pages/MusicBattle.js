import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './pages.css'
import axios from 'axios';
import Modal from 'react-modal';
import Header from "./Header";
import io from 'socket.io-client';
export default function MusicBattle(){
    const navigate=useNavigate()
    const [vsid,setvsid]=useState("")
    const [audio,setaudio]=useState(null)
    const [id,setid]=useState("")
    const [audios,setaudios]=useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const socket=io.connect('http://localhost:8080')
    const handleBattle=async(e)=>{
        const response=await axios.post('http://localhost:8080/readyforbattle?id='+id)
        const response1=await axios.get('http://localhost:8080/warriors?id='+id)
        console.log(response1.data.warriors[Math.floor(Math.random()*response1.data.warriors.length)])
        // navigate('/battle/'+response1.data.warriors[Math.floor(Math.random()*response1.data.warriors.length)])
        socket.emit("send_message",{message:"Hello"})
        handleOpenModal()
    }
    const handleOpenModal = () => {
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
      };
      const handleBackdropClick = (e) => {
        e.stopPropagation();
      };
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
        socket.on("receive_message",(data)=>{
            console.log(data.message)
        })
    },[socket])
    return (
        <div>
            <Header userid="abcd"/>
            <button style={{marginTop:'80px'}} onClick={handleBattle} >Start a Music Battle with random user</button>
            <h1>Ongoing Music Battles</h1>
            <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="File Input Modal"
        backdrop="static"
        keyboard={false}
      >
      <div style={{display:'grid',rowGap:'20px',backgroundColor:'#f2f2f2',justifyContent:'center',marginTop:'80px',paddingBlock:'20px',width:'80%',marginInline:'10%',border:'2px solid black'}} onClick={handleBackdropClick}>
        <h2 style={{textAlign:'center'}}>Upload a File</h2>
        <input type="file" />
        <button className="buttonname">Upload</button>
        <button onClick={handleCloseModal} className="buttonname">Cancel</button>
        </div>
      </Modal>
        </div>
    )
}