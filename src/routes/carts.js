const express = require("express")
const router = express.Router();

const CartManager = require('../cartManager.js')
const cartManager = new CartManager ('./carrito.json')

router.post('/carts', (req, res) =>{
    const cartData = req.body
    cartManager.createCart(cartData)
    
    res.json(cartManager.carts)
})


module.exports = router