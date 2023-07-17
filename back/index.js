const express=require('express')
const mongoose = require("mongoose");
const bodyParser=require('body-parser')
const cors = require("cors");
const bcrypt=require("bcrypt")
const multer=require('multer')
const fs = require('fs');


const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set("strictQuery", false);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost:27017/shopDB',{useNewURLParser:true,useUnifiedTopology: true, family: 4}).then(()=>{console.log('connected mongoose')})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C://Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios'); // Destination folder for storing the audio files
    },
    filename: function (req, file, cb) {
        console.log(req.body)
      cb(null,req.body.id+'_'+file.originalname); // Use the original file name for the stored file
    }
  });
  
  // Create the multer middleware
const upload = multer({ storage: storage });

const Schema=mongoose.Schema

const UserSchema=new Schema({
    name: String,
  email: String,
  password: String
})
const AudioSchema=new Schema({
    id:String,
    Audio:String,
    likes:Number
})

const UserDetail=new mongoose.model('Userofaudio', UserSchema);

const AudioDetail=new mongoose.model('Audio',AudioSchema)

app.post('/login',async(req,res)=>{
    console.log("accepted")
    let data= await UserDetail.findOne({email:req.body.email}).exec()
    const userObject = {
        status: "",
        id:"",
        email:"",
        password:"",
        name:"",
        _v:""
   };
    if(data==null){
        userObject.status="Account doesn't exists!!!"
    }else{
        let pass=await bcrypt.compare(req.body.password,data.password)
        console.log(data)
        if(pass){
            userObject.status="Logged in!!!!"
            userObject.id=data._id
            userObject.email=data.email
            userObject.name=data.name
            userObject.password=data.password
            userObject.v=data._v
        }else{
            userObject.status="Account exists but wrong password!!"
        }
    }
    console.log(userObject)
    res.json(userObject)
})
app.get('/login',(req,res)=>{
    res.json({"data":"login api"})
})
app.post('/signup',async(req,res)=>{
    console.log("accepted")
    console.log(req.body)
    let data=await UserDetail.findOne({email:req.body.email}).exec()
    if (data==null){
        const salt=bcrypt.genSaltSync(16)
        const hashedPassword=bcrypt.hashSync(req.body.password,salt)
        const newuser=await new UserDetail({
        email:req.body.email,
        password:hashedPassword
    })
    const doc=await newuser.save()
    res.json({"message":"acoount created!!"})
    }else{
        res.json(null)
}})
app.get('/signup',async(req,res)=>{
    res.json({"data":"signup api"})
})

app.post('/uploadaudio',upload.single('audio'),async(req,res)=>{
    console.log(req.params)
    const uploadcheck=await AudioDetail.findOne({Audio:req.body.id+'_'+req.file.originalname}).exec()
    if (uploadcheck==null){
        const newAudio=await new AudioDetail({
            id:req.body.id,
            Audio:req.body.id+'_'+req.file.originalname,
            likes:0
        })
        newAudio.save()
        res.json({"message":"uploaded"})
    }
    else{
        console.log(uploadcheck)
        res.json(null)
    }
console.log(req.file)
})

app.get('/uploadaudio',async(req,res)=>{
    console.log(req.query)
    const sendaudio=await AudioDetail.find({id:req.query.id})
    console.log(sendaudio)
    res.json(sendaudio)
})

app.delete('/uploadaudio',async(req,res)=>{
    console.log(req.query)
    fs.unlinkSync("C:/Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/audios/"+req.query.audiourl)
    const response=await AudioDetail.deleteOne({Audio:req.query.audiourl})

})

app.listen(8080,()=>{
    console.log("server runnning on 8080")
})