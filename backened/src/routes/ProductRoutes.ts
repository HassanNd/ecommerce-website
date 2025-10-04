import express from "express";
import { editProduct, getAllProducts } from "../services/prodectService.ts";
import type { ExtendRequest } from "../types/extendedRequest.ts";

const app = express();
app.use(express.json());

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

productRouter.put("/", async (req: ExtendRequest, res: express.Response) => {
  try {
    const { product_id, title, price, image, stock } = req.body;
  const { data, message, statusCode } = await editProduct({
    product_id,
    title,
    price,
    image,
    stock,
  });
  if (!data) {
    res.status(statusCode).send(message);
  }
  res.status(statusCode).send(` ${message} ,${data}`);
    
  } catch (error) {
    res.status(500).send("something went wrong");
    
  }
  
});

export default productRouter;
