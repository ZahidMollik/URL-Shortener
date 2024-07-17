const express=require('express');
const {envVariable,db}=require('./config');
const apiRoutes=require('./routes');
const app=express();
const cors=require('cors')

app.use(express.json());
app.use(express.urlencoded({extended:false}));
db.connectMongoDB(envVariable.MONGODB_URL).then(()=>{
  console.log('mongoDB connected');
})

app.use(cors());
app.use('/',apiRoutes);

app.listen(envVariable.PORT,()=>{
  console.log('server running on PORT',envVariable.PORT);
});