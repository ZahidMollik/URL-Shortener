const express=require('express');
const {envVariable}=require('./config')
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(envVariable.PORT,()=>{
  console.log('server running on PORT',envVariable.PORT);
});