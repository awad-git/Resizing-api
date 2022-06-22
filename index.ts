//importing modules & middleware
import express, { query } from 'express';
import { Server } from 'http';
const url = require('url');
const fs =require('fs')
const formidable=require('formidable')
const bodyParser= require('body-parser')
const path=require('path')
const multer = require('multer');
const sharp = require('sharp');
//sharp.cache({ files : 0 });

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', './views'); // or app.use(express.static("views"));



//Upload the image |or //Get url query strings (?filename=&width=&height=)
app.get('/',(req,res)=>{
   // res.send('hellow for image processing API')
    res.render('form')
})

let storage = multer.diskStorage({
  destination: function(req:Request, file:any, cb:Function){
  cb(null, "images")
},
  filename: function(req:Request, file:any, cb:Function){
  
      cb(null, file.originalname) //cb(null, file.originalname + "-"+Date.now()+"."+ext)
  }
})
let upload = multer({storage:storage})
////////////


//////////////
app.post('/images',upload.single('image') ,async (req,res,_next)=>{        //,upload.single('image'),
   //res.send('resized image is below')
 console.log(req.body)
 console.log(req.file)

 //Send the image to API-asyncrounous (Resizing operation)
 await sharp(req.file?.path) //req.file?.filename
 .resize(parseInt(req.body.width),parseInt(req.body.height)) 
 //Save image to file (asyncrounous)
 .toFile('./resized/resized.jpg')

//.then((err:any,info:any)=>{res.render('./resized/resized.jpg')})
const responding =async ()=>{
await fs.readFile("./resized/resized.jpg",(err:any, data:any)=> {   if (err) { 
        throw err;
    }
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
   //send resized image to the user 
      res.end(data,'binary');
    
   })
  }


responding()
});








//save image to cache











let port=process.env.PORT || 3000;
let server =app.listen(port,()=>{console.log(`server is running or port ${port}`)})

/* module.exports={sharp ,multer,upload ,app}
module.exports=app
 */
module.exports =server 