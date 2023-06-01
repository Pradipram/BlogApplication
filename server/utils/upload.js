import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: `mongodb://localhost:27017/Blog`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        console.log("function is called ", file);
        const match = ["image/png", "image/jpg","image/jpeg"];

        if(match.indexOf(file.mimetype) === -1) {
            // console.log("inside upload.js file printing file.memetype ", file.mimetype);
            return`${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 