const port = 4000;

const { v4: uuidv4 } = require('uuid');


const express = require("express");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const path = require("path");

const cors = require("cors");
const { error } = require("console");
const { type } = require('os');




app.use(express.json());
app.use(cors());

// Database Connection with MongoDB

const dbURL = "mongodb+srv://alifrazi:alif1234@cluster0.btdcpfl.mongodb.net/e-commerce"
mongoose.connect(dbURL).then(()=>{
    console.log('Mongodb is Connected');
}).catch((error=>{
    console.log(error);
    process.exit(1);
}));

// API Creation

app.get("/", (req, res)=>{
    res.send("Express app is running")
})


//Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage: storage});

app.use("/images", express.static('upload/images'));

app.post('/upload', upload.single('product'), (req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`

    })
});











const Product = mongoose.model('Product', {
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

    new_price:{
        type: Number,
        required: true
    },

    old_price:{
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },
    available: {
        type: Boolean,
        default: true
    }
});



const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique: true
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type: Date,
        default: Date.now(),
    }
});

app.post('/signup', async (req, res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false, errors: "existing email ID found"})
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cart: uuidv4(),
    });

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token})


})


app.post('/login', async (req, res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors: "wrong password"});
        }

    }
    else{
        res.json({success:false, errors: "Wrong Email ID"});
    }})


app.post("/addproduct", async (req, res) => {
    const product = new Product({
        id: uuidv4(),
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: Number(req.body.new_price),
        old_price: Number(req.body.old_price),
        date: req.body.date,
        available: req.body.available
    });
    try{
        await product.save();
        res.status(201).json({
            success: true,
            name: req.body.name,
            message: "Product Added Successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success: 0,
            message: "Internal Server Error"
        })
    }
});

app.post('/removeproduct', async (req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.status(201).json({
        success: true,
        name: req.body.name,
        
    })
});

app.get("/allproducts", async(req, res)=>{
    const products = await Product.find();
    res.status(200).send(products);
    
});


app.listen(port, (e)=>{
    if(!e){
        console.log(`server running on http://localhost:${port}`);

    }
    else{
        console.log("error: " + e)
    }
});
