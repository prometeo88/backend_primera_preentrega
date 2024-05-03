const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
const PORT = 8080;
const http = require("http")
const socketIo = require('socket.io')

const server = http.createServer(app)
const io = socketIo(server)

io.on("connection", (socket) =>{
    console.log("Nuevo cliente conectado con exito")
})
app.set('io', io);

app.engine('handlebars', expressHandlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine','handlebars')
app.use(express.static(__dirname + '/public'))



app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productsRouter = require("./routes/products.js");
const cartsRouter = require("./routes/carts.js");
const viewsRouter = require("./routes/views.js");

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/",viewsRouter)



server.listen(PORT, () =>{
    console.log(`Server running on PORT ${PORT}`)
})