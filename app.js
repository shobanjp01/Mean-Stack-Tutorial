var express=require('express');
var mongoose=require('mongoose');
var cors=require('cors');
var bodyparser=require('body-parser');
var path=require('path');

var app=express();

mongoose.connect('mongodb://localhost:27017/contactList');



mongoose.connection.on('connected',()=>{
    console.log('Mongo DB Connected');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Mongo DB Connection failed'+err);
    }
});

const port=3000;

app.use(cors());

app.use(bodyparser.json());

//app.use(express.static(path.join(__dirname,'public')));

const route=require('./routes/route');

app.use('/api',route);

app.get('/',(req,res)=>{
 res.send("shoban babu");
});

app.listen(port,()=>{
    console.log('server started at port'+port)
});