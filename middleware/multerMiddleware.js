import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename:(req,file,cb)=>{
        const fileName = file.originalname
        cb(null,fileName)
    }
}) 

const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 }  // Limit file size to 10MB
});

export default upload;


