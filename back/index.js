const express=require('express')
const mongoose = require("mongoose");
const bodyParser=require('body-parser')
const cors = require("cors");
const bcrypt=require("bcrypt")
const multer=require('multer')

const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.set("strictQuery", false);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect('mongodb://localhost:27017/shopDB',{useNewURLParser:true,useUnifiedTopology: true, family: 4}).then(()=>{console.log('connected mongoose')})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for storing the audio files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name for the stored file
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

const UserDetail=new mongoose.model('Userofaudio', UserSchema);

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
console.log(req.file)
})

app.listen(8080,()=>{
    console.log("server runnning on 8080")
})