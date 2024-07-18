const Order=require('../models/orders')
const Product=require('../models/product')
const mongoose=require('mongoose')
exports.order_get_all=(req, res, next)=>{
    Order.find()
    .select('product quantity _id')
    .populate('product','name')
    .exec()
    .then(doc=>{
        res.status(200).json({
            count:doc.lenght,
            orders:doc.map(doc=>{
                return{
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/orders/'+doc._id
                    }
                }
            }),
           
        })
    })
    .catch(err=>{
        
        res.status(500).json({
            error:err
        })
    })
}

exports.order_create_order= (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {

            if (!product) {
                return res.status(404).json({
                    message: "Product not found in Database...",
                    error: err
                })
            }

            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save()
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Order created successfully!",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    description: "Get Info on the Newly Created Order!",
                    url: '/orders/' + result._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Order could not be stored correctly...",
                error: err
            })
        })
}

exports.order_get_order=(req, res, next)=>{
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
       if(!order){
         return res.status(404).json({
             message:'order not found'
         })
     }
     res.status(200).json({
         order: order,
         request: {
             type: 'GET',
             url: 'http://localhost:3000/orders'
         }
     })
    })
    .catch(err=>{
     res.status(500).json({
         error:err
     })
    })
 }

 exports.order_delete_order=(req, res, next)=>{
    Order.deleteOne({_id: req.params.orderId})
    .exec()
    .then(result=> {
     res.status(200).json({
         message:'order deleted',
         request:{
             type:'POST',
             url:'http://localhost:3000/orders',
             body:{
                 productId:'ID',
                 quantity:'Number'
             }
         }
     })
    })
    .catch(err =>{
     res.status(500).json({
         error:err
     })
    })
 }