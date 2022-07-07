require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectToMongoDB = require("./config/db");
const erorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");

const customerRouter = require("./routes/customer.routes");
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const orderRouter = require("./routes/order.routes");

const app = express();

// connect to mongo DB
connectToMongoDB();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/customers", customerRouter);
app.use("/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

////// notfound middleware /////
app.use(notFoundMiddleware);
////// error middleware ////////
app.use(erorMiddleware);

module.exports = app;
