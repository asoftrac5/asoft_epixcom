const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routers
const categoryRouter = require("./routes/categories");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/orders");
const productsRouter = require("./routes/products");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/products`, productsRouter);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log("Database Connection is ready...");
})
.catch((err) => {
    console.log(err);
})

//Server Develeopment
// app.listen(3000, ()=>{
//     console.log("Server is running http://localhost:3000")
// })

// Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port" + port)
})