const express = require("express")
const router = express.Router();

const CartManager = require('../cartManager.js')
const cartManager = new CartManager ('./carrito.json')

router.post('/carts', (req, res) =>{
    cartManager.createCart()
    
    res.json(carts)
})


module.exports = router