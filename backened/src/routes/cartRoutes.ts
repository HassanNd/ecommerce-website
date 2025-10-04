import express from "express";
import { additemToCart, Checkout, ClearCard, deleItemIncart, getActiveCartForUser, updateItemInCart } from "../services/cartServices.ts";
import validateJWT from "../middelwares/validateJWT.ts";
import type { ExtendRequest } from "../types/extendedRequest.ts";

const app = express();
app.use(express.json());
const cartRouter = express.Router();

cartRouter.get("/", validateJWT, async (req:ExtendRequest, res) => {
  try {
    const userId = req.user._id
  const cart = await getActiveCartForUser({ userId });
  res.status(200).send(cart);
    
  } catch (error) {
    res.status(500).send("something went wrong")
    
  }
  
});

cartRouter.post('/items' , validateJWT , async(req:ExtendRequest , res)=>{

  try {
    const userId=req.user._id
    const {productId  , quantity}=req.body
    const response=await additemToCart({userId ,productId , quantity})
    res.status(response.statusCode).send(response.data)
    
  } catch (error) {
    res.status(500).send("something went wrong")
    
  }
    


})

cartRouter.put('/items' , validateJWT , async(req:ExtendRequest , res:express.Response)=>{
  try {
    const userId=req.user._id
  const {productId ,quantity}=req.body
  const response = await updateItemInCart({ userId, product_id: productId, quantity });

  if (response) {
    res.status(response.statusCode).send(response.data);
  } else {
    res.status(500).send({ error: "Failed to update item in cart." });
  }
    
  } catch (error) {
    res.status(500).send("something went wrong")
    
    
  }
  

})

cartRouter.delete('/items/:productId' , validateJWT , async(req:ExtendRequest , res)=>{
  try {
    const userId=req.user._id
  const {productId}=req.params
  const response=await deleItemIncart({userId , productId})
  res.status(response.statusCode).send(response.data)
    
  } catch (error) {
    res.status(500).send("something went wrong")
    
  }
})

cartRouter.delete('/' , validateJWT ,async(req:ExtendRequest , res:express.Response)=>{
  try {
      const userId=req.user._id
  const response=await ClearCard({ userId })
  res.status(response.statusCode).send(response.data)
    
  } catch (error) {
     res.status(500).send("something went wrong")
    
  }

})

cartRouter.post('/checkout' , validateJWT ,async(req:ExtendRequest , res:express.Response)=>{
  try {
      const userId=req.user._id

  const {address}=req.body;

  const response=await Checkout({userId , address})

  res.status(response.statusCode).send(response.data)
    
  } catch (error) {
     res.status(500).send("something went wrong")
    
  }

})




export default cartRouter