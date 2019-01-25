const mongoose=require('mongoose');

const registrationSchema=mongoose.Schema({    
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const registration=module.exports=mongoose.model('registration',registrationSchema);