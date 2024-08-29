const express=require('express')
const { getProducts, getSingleproduct } = require('../controles/productControles')
const { register, login } = require('../controles/userControls')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')
const { addToWishlist, getWishlist, removeWishlist } = require('../controles/wishlistControl')
const { addToCart, getCart, removeCart, incrementCart, decrementCart, emptyCart } = require('../controles/cartControls')

const router=new express.Router()

router.get('/get-products',getProducts)
router.get('/get-single-products/:id',getSingleproduct)
router.post('/register',register)
router.post('/login',login)

router.post('/add-to-wishlist',jwtMiddleware,addToWishlist)
router.get('/get-user-wishlist',jwtMiddleware,getWishlist)
router.delete('/remove-wishlist-item/:_id',jwtMiddleware,removeWishlist)

router.post('/add-to-cart',jwtMiddleware,addToCart)
router.get('/get-user-cart',jwtMiddleware,getCart)
router.delete('/remove-cart-item/:_id',jwtMiddleware,removeCart)

router.get('/increment-cart/:_id',jwtMiddleware,incrementCart)
router.get('/decrement-cart/:_id',jwtMiddleware,decrementCart)

router.delete('/empty-cart',jwtMiddleware,emptyCart)


module.exports=router