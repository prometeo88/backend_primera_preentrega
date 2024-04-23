const express = require("express")
const router = express.Router();
const fs_= require('fs')

const ProductManager = require('../productManager.js');
const productManager = new ProductManager('./productos.json');
productManager.loadProducts();

router.get('/', async (req, res) =>{
    try {
        await productManager.loadProducts();
        const product = productManager.getProducts()
    
        if(req.query.limit){
            const limit = parseInt(req.query.limit);
            console.log('Limite solicitado;',limit)
            if(!isNaN(limit) && limit > 0){
                products = product.slice(0,limit)
                console.log(products)
            } else {
                console.log("Error al aplicar el limite")
                return res.status(400).send("Error al aplicar el limite")
            }
        }
    
        res.json(productManager.products)
        
    } catch (error) {
        console.log("Error al cargar archivos")
        res.status(500).send('Error al cargar archivos')
        
    }
    });
    
    router.get('/:pid', async (req, res)=>{
        try {  
        const productId = parseInt(req.params.pid)
        await productManager.loadProducts()
        const product = productManager.getProductById(productId)
    if(product){
        res.json(product)}
    else{
        const respuestaE = `<p style="color:red">PRODUCTO NO ENCONTRADO</p>`;
        res.status(400).send(respuestaE)
    
        }
    }
        catch (error) {
            console.log("ERROR AL ENCONTRAR PRODUCTO")
                    
        }
    
    
    })

router.post('/', async (req, res) =>{
    try {
        const newProduct = req.body;
        const addedProduct = await productManager.addProduct(newProduct)
        res.json(addedProduct)
        
    } catch (error) {
        console.log("Error al agregar producto:", error); 
    }

})    

router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = req.body;
        
        await productManager.loadProducts(); 
        const modifiedProduct = productManager.updateProduct(productId, updatedProduct);
        
        if (modifiedProduct) {
            res.json(modifiedProduct);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.log("Error al actualizar producto:", error);
        res.status(500).send('Error interno del servidor');
    }
});





module.exports = router