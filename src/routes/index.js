const express=require('express');
const urlRoute=require('./url-route');
const router=express.Router();

router.use('/',urlRoute);

module.exports=router;