import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import user_router from "./routes/userRoutes.ts";
import { seedInitialProducts } from "./services/prodectService.ts";
import productRouter from "./routes/ProductRoutes.ts";
import cartRouter from "./routes/cartRoutes.ts";
import cors from "cors";


dotenv.config()


const app = express();
const port = 3001;

app.use(express.json())
app.use(cors())

//Connecting the database
mongoose
  .connect(process.env.DATABASE_URL || '')
  .then(() => {
    console.log("database connected successfuly !!!!");
  })
  .catch((err) => {
    console.log("error in connecting to the database" , err);
  });

  //seed the products to database
  seedInitialProducts()

  app.use("/users" , user_router)
  app.use('/product' , productRouter)
  app.use('/cart' , cartRouter)

//Connecting to the server
app.listen(port , () => {
  console.log(`Server is running at port  ${port}`);
});
