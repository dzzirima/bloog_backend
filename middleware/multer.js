import multer from "multer";

 
const storage = multer.diskStorage({});


const fileFilter = (req, file,cb) =>{

    if(!file.mimetype.includes('image')){
        return cb('Invalid image format !', false)
    }

    cb(null, true)


}


export default multer({storage , fileFilter})