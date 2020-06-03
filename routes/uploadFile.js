const express=require('express');
const authenticate=require('../authenticate');
const router=express.Router();
const bodyParser=require('body-parser');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        ///first parameter is false bcoz it si for error
        callback(false,'public/images');
    },
    filename:(req,file,callback)=>{
        callback(false,file.originalname);
    }
})

const fileFilter=(req,file,callback)=>{
    if(file.originalname.match(/\.(jpg|png|gif|jpeg)$/)){
        callback(null,true);
    }
    else{
        return callback(new Error("Please upload only image type i.e png,jpg,jpeg,gif"));
    }
}
router.use(bodyParser.json());

const upload=multer({storage:storage,fileFilter:fileFilter});
router.route('/')
.get(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.setHeader('Content-type','application/json');
    res.end(' Get operation not supported at /imageUpload')
})
.post(upload.single('imageFile'),(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.setHeader('Content-type','application/json');
    res.end(' Get operation not supported at /imageUpload')
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.setHeader('Content-type','application/json');
    res.end(' Get operation not supported at /imageUpload')
})
module.exports =router ;