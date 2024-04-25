const fs = require("fs");

class CartManager {
  constructor(filePath) {
    this.carts = [];
    this.nextId = 1;
    this.path = filePath;
  }

  generarIdUnica(){
    return Date.now().toString(36) + Math.random().toString(36).from(2, 5)
  }

  isIdCartDuplicate(id){
    return this.carts.some(cart => cart.id === id)
  }

  createCart(cart){ 
      if (this.isIdCartDuplicate(cart.id)) {
      console.log("ERROR: El carrito ya existe");
      return;
      }

      cart.id = this.generarIdUnica();

      this.carts.push(cart)

    }
    
  }



module.exports = CartManager;
