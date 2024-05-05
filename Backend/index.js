const port = 4000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const path = require("path");

const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://alifalrazi1:UeewknLFrf5oe0ct@cluster0.j3eldzj.mongodb.net/e-commerce");

// API Creation

app.get("/", (req, res)=>{
    res.send("Express app is running")
})
app.listen(port, (e)=>{
    if(!e){
        console.log("server running on port "+ port);

    }
    else{
        console.log("error: " + e)
    }
});


//Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage: storage});

app.post('/upload', upload.single('product'), (req, res)=>{

});