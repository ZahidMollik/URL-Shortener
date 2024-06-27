const express=require('express');
const {urlController}=require('../controllers');
const router=express.Router();

router.post('/url/generate',urlController.generateShortURL);
router.get('/:id',urlController.redirectURL);
router.get('/visitornumber/:id',urlController.getVisitedUserCount);

module.exports=router;