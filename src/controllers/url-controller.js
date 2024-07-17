const shortid=require('shortid');
const {StatusCodes}=require('http-status-codes');
const {urlModel}=require('../models');

async function generateShortURL(req,res){
  if(!req.body.url){
    return res.status(StatusCodes.NOT_FOUND).json({error:'url required'});
  }
  try {
    const shortId= shortid.generate(8);
    await urlModel.create({
      shortid:shortId,
      redirectURL:req.body.url,
      visitHistory:[]
    })
    const shortURL='http://localhost:8000/'+`${shortId}`
    return res.status(StatusCodes.CREATED).json({
      status:true,
      message:'successfully generated url',
      url:shortURL
    });

  } catch (error) {
    console.log(error);
  }
}


async function redirectURL(req,res){
  try {
    const shortid=req.params.id;
    const response=await urlModel.findOneAndUpdate(
      {
      shortid,
      },
      {
        $push:{
          visitHistory:{
            timestamp:Date.now(),
          }
        }
      }
  )
  let redirectURL=response.redirectURL;
  if(redirectURL.startsWith('https://')){
    res.redirect(redirectURL);
  }
  else{
    let str='https://'+redirectURL;
    res.redirect(str);
  }

  
  } catch (error) {
    console.log(error);
  }
}

async function getVisitedUserCount(req,res){
  try {
    const shortid=req.params.id;
    const response=await urlModel.findOne(
      {
      shortid,
      },
     
  )
  res.status(StatusCodes.OK).json(response.visitHistory.length);
  } catch (error) {
    console.log(error);
  }
}


module.exports={
  generateShortURL,
  redirectURL,
  getVisitedUserCount
}