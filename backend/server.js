import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth/auth-routes.js'
import adminProductsRouter from './routes/admin/products-routes.js'
import adminOrderRouter from './routes/admin/order-routes.js'

import shopCartRouter from './routes/shop/cart-routes.js'
import shopProductsRouter from './routes/shop/products-routes.js'
import shopReviewRouter from "./routes/shop/review-routes.js"
import shopAddressRouter from "./routes/shop/address-routes.js"
import shopOrderRouter from "./routes/shop/order-routes.js"
import shopSearchRouter from "./routes/shop/search-routes.js"
import commonFeatureRouter from "./routes/common/feature-routes.js"
const app = express();
dotenv.config();
app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  }
));

app.use(cookieParser());
app.use(express.json()); 

mongoose.connect(
   process.env.MONGO_URI 
).then(()=>{
    console.log("database connected");
}).catch((error)=>{
  console.log(error)
})


app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);


app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);

app.use("/api/common/feature", commonFeatureRouter);

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
 console.log(`port is listning on ${PORT}`)
})