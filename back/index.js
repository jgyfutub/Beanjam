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
  password: String,
  followers:[String],
  following:[String]
})
const AudioSchema=new Schema({
    id:String,
    Audio:String,
    text:String,
    likes:[String]
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
        name:req.body.name,
        password:hashedPassword,
        followers:[],
        following:[]
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
            text:req.body.text,
            likes:[]
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

app.get('/accounts',async(req,res)=>{
    console.log(req.query.id)
    const response=await AudioDetail.find({id:req.query.id})
    console.log(response)
    res.json(response)
})

app.get('/aboutaccounts',async(req,res)=>{
    console.log(req.query.id)
    const response=await UserDetail.find({_id:req.query.id})
    console.log(response)
    res.json(response)
})

app.post('/likepost',async(req,res)=>{
    console.log(req.query)
    const response=await AudioDetail.find({_id:req.query.postid})
    if (response[0].likes.includes(req.query.userid)){
        const response1=await AudioDetail.findOneAndUpdate({_id:req.query.postid},{$pull:{likes:req.query.userid}})
        res.json({"message":"unliked"})
    }
    else{
        const response1=await AudioDetail.findOneAndUpdate({_id:req.query.postid},{$push:{likes:req.query.userid}})
        res.json({"message":"liked"})
    }
})
app.post('/follow',async(req,res)=>{
    const response=await UserDetail.find({_id:req.query.id})
    console.log(response[0].following)
    if (response[0].following.includes(req.query.userid)){
        const response1=await UserDetail.findOneAndUpdate({_id:req.query.id},{$pull:{following:req.query.userid}})
        const response2=await UserDetail.findOneAndUpdate({_id:req.query.userid},{$pull:{followers:req.query.id}})
        res.json({"message":"unfollowed"})
    }
    else{
        const response1=await UserDetail.findOneAndUpdate({_id:req.query.id},{$push:{following:req.query.userid}})
        const response2=await UserDetail.findOneAndUpdate({_id:req.query.userid},{$push:{followers:req.query.id}})
        res.json({"message":"followed"})
    }
})
app.listen(8080,()=>{
    console.log("server runnning on 8080")
})
const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C://Users/Acer/OneDrive/Desktop/Avishkar2023/server-side/react-app/public/mixaudios');
    },
    filename: function (req, file, cb) {
        console.log(req.body)
      cb(null,req.query.id+'_'+file.originalname)
    }
  });
const upload1 = multer({ storage: storage1 });
app.post('/uploadmix',upload1.single('audio'),async(req,res)=>{
res.json({"message":req.query.id+'_'+req.file.originalname})
})