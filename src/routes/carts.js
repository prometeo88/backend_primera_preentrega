const express = require("express")
const router = express.Router();

const cart = []

router.get('/carts', (req, res) =>{
    res.json(cart)
})


module.exports = router