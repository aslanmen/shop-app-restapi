const express=require('express')
const router=express.Router()
const multer=require('multer')
const check_auth=require('../middleware/check-auth')
const ProductController=require('../constrollers/product')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        const timestamp = Date.now(); // Unix timestamp olarak tarih-saat bilgisi alınabilir
        cb(null, timestamp + '-' + file.originalname);
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload=multer({storage:storage,
    limits:{fileSize:1024*1024*5},
    fileFilter:fileFilter

})

router.get('/',ProductController.product_get_all)

router.post('/',check_auth,upload.single('productImage'),ProductController.product_create_product)

router.get('/:productId',check_auth,ProductController.product_get_product)
router.patch('/:productId',check_auth,ProductController.product_update_product)

router.delete('/:productId',check_auth,ProductController.product_delete_product)



module.exports=router;