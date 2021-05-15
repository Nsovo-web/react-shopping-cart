const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();
app.use(bodyParser.json());//read the object as a json

//initialize mongoose database with uri and options

mongoose.connect("mongodb://localhost/react-shopping-cart-db",{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
})

//define your models (name of the collection in the database,the list of fields)
const Product = mongoose.model('Products',new mongoose.Schema({ 
    //fields (columns)
    _id:{type:String, default: shortid.generate},//new id is generated from shortid
    title:String,
    description:String,
    image:String,
    price:Number,
    availableSizes:[String],
}))


//define the first endpoint

app.get('/api/products', async(req, res)=>{
//get the list of products from the database using the model
const products = await Product.find(); //there is no condition, so return all products. and await for response
res.send(products);
})

//http post method to create a new product
app.post('/api/products', async(req, res)=>{
    const newProduct = new Product(req.body);// fill the request body with the new product data
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

//http req to delete product
app.delete("/api/products/:id",async(req, res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

//create model for ORDER
const orderModel = mongoose.model("order",new mongoose.Schema({
    _id:{type:String ,default: shortid.generate},
    email:String, 
    name:String,
    address:String, 
    total:Number,
    cartItems:[{
        _id:String,
        title:String,
        count:Number,
        price:Number
    }]
},
{
    timestamps:true,
}
))

//CRUD operations for the order schema
//insert new items
app.post("/api/order",async(req, res)=>{
    if(!req.body.name || !req.body.email || !req.body.address || !req.body.total || !req.body.cartItems){ //check that all required fields exist
       return res.send({message:"Please Enter All Required Fields"})
    }
    const order = await orderModel(req.body.save())
    res.send(order)
})


//listen to a port and launch the server

const port = process.env.PORT||5000;
app.listen(port,()=>{
    console.log("server at localhost:5000");
})