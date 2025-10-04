import mongoose , {Schema , Document ,type ObjectId} from "mongoose"
import type { IProduct } from "./productModel.ts"



const CardStatusEmun=['active' , "completed"]

export interface ICartItem{
    product:IProduct,
    unitPrice:number,
    quantity:number
}


export interface ICart extends Document{
    userId:ObjectId | string,
    items:ICartItem[],
    totalAmount:number,
    status:"active" | "completed"

}

const CartItemSchema=new Schema<ICartItem>({
    product:{type:Schema.Types.ObjectId , ref:"product" , required:true},
    quantity:{type:Number  , required:true ,default:1},
    unitPrice:{type:Number  , required:true}
})

const cartSchema=new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId, required:true , ref:"User"},
    items:[CartItemSchema],
    totalAmount:{type:Number , required:true},
    status:{type:String , enum:CardStatusEmun , default:"active"}

})

export const cartModel=mongoose.model<ICart>("Cart",cartSchema)
