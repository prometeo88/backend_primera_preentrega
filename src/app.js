const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")
app.use(productsRouter)
app.use(cartsRouter)



app.listen(PORT, () =>{
    console.log(`Server running on PORT ${PORT}`)
})