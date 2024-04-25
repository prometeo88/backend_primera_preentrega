const express = require("express")
const router = express.Router();

const CartManager = require('../cartManager.js')
const cartManager = new CartManager ('./carrito.json')

router.post('/carts', (req, res) =>{
    const cartData = req.body
    cartManager.createCart(cartData)
    
    res.json(cartManager.carts)
})

router.post('/carts/:cid/product/:pid', (req, res) =>{
    const cartData = req.body
    cartManager.createCart(cartData)
    
    res.json(cartManager.carts)
})

router.get('/carts/:cid', (req, res) =>{
    try {
        const cartId = req.params.cid;
        const cart = cartManager.carts.find( cart => cart.id === cartId)

        if(!cart){
            return res.status(400).json({message:'Carrito no encontrado'})
        }

        res.json(cart)
    } catch (error) {
        res.status(500).json({message:'Error en servidor' })
        
    }

})

module.exports = router