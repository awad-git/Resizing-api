"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing modules & middleware
const express_1 = __importDefault(require("express"));
const url = require('url');
const fs = require('fs');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
//sharp.cache({ files : 0 });
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.set('views', './views'); // or app.use(express.static("views"));
//Upload the image |or //Get url query strings (?filename=&width=&height=)
app.get('/', (req, res) => {
    // res.send('hellow for image processing API')
    res.render('form');
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); //cb(null, file.originalname + "-"+Date.now()+"."+ext)
    }
});
let upload = multer({ storage: storage });
////////////
app.post('/images', upload.single('image'), (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //res.send('resized image is below')
    console.log(req.body);
    console.log(req.file);
    //Send the image to API-asyncrounous (Resizing operation)
    yield sharp((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) //req.file?.filename
        .resize(parseInt(req.body.width), parseInt(req.body.height))
        //Save image to file (asyncrounous)
        .toFile('./resized/resized.jpg');
    //.then((err:any,info:any)=>{res.render('./resized/resized.jpg')})
    const responding = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fs.readFile("./resized/resized.jpg", (err, data) => {
            if (err) {
                throw err;
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            //send resized image to the user 
            res.end(data, 'binary');
        });
    });
    responding();
}));
//save image to cache
let port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server is running or port ${port}`); });
module.exports = { sharp, multer, upload };
exports.default = app;
