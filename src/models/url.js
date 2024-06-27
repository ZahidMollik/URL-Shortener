const mongoose=require('mongoose');


const urlSchema=new mongoose.Schema({
  shortid:{
    type:String,
    require:true,
    unique:true
  },
  redirectURL:{
    type:String,
    require:true,
  },
  visitHistory:[{timestamp:{type:Number}}]
},{timestamp:true});

const URL=new mongoose.model('url',urlSchema);

module.exports=URL;