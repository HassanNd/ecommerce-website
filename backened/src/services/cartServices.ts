import { cartModel,type ICartItem } from "../models/cardModel.ts"
import { type IOrderItem, orderModel } from "../models/orderModel.ts";
import productModel from "../models/productModel.ts";

interface ICreateCardForUser{
    userId:string
}

interface IGetActiveCardForUser{
    userId:string;
}
interface AddItemsParams{
    userId:string,
    productId:any,
    quantity:number
}


const CreateCardForUser=async({userId}:ICreateCardForUser)=>{
    const cart=await cartModel.create({userId ,totalAmount:0})
    await cart.save()
    return cart
}

export const getActiveCartForUser=async({userId}:IGetActiveCardForUser)=>{
    let cart=await cartModel.findOne({userId , status:"active"})
    if(!cart){
        cart=await CreateCardForUser({userId})
    }
    return cart
}

export const additemToCart=async({userId ,productId , quantity}:AddItemsParams)=>{
    const cart=await getActiveCartForUser({userId})

    //Does item exists in cart
    const existInCart=cart.items.find((p)=>p.product.toString() ===productId);
    if(existInCart){
        return{data:'item already exists in cart !!', statusCode:400}
    }
    //fetch the products
    const product=await productModel.findById(productId)

    if(!product){
        return{data:"product not found" , statusCode:400}
    }
    cart.items.push({product:productId ,unitPrice:product.price , quantity })

    const updatedCart=await cart.save()

    return{data:updatedCart  , statusCode:200}


}

export const updateItemInCart=async({userId , product_id , quantity}:{userId:string ,product_id:any, quantity:number})=>{
    const cart=await getActiveCartForUser({userId})

    const existsIncard=cart.items.find((p)=>p.product.toString()===product_id);

    if(!existsIncard){
        return{message:"item is not found in cart" , statusCode:404}
    }
    const product=await productModel.findById(product_id)
    if(!product){
        return{data:"product not found" , statusCode:400}
    }
    if(product.stock < quantity){
        return{data:"low stock for item" , statusCode:400}
    }

    
    const OtherCardItems=cart.items.filter((p)=>p.product.toString() !==product_id)


    let total=calculateCardaTotalItems({cartItems: OtherCardItems})

    existsIncard.quantity=quantity
    total+= existsIncard.quantity *existsIncard.unitPrice

    cart.totalAmount=total

    const updatedcart=await cart.save()
    return{data:updatedcart , statusCode:200}
    
    //Calculate total amount for the cart




}

export const  deleItemIncart =async({userId , productId}:{productId:any , userId:string })=>{
     const cart=await getActiveCartForUser({userId})

     const existsIncard=cart.items.find((p)=>p.product.toString()===productId);

    if(!existsIncard){
        return{message:"item is not found in cart" , statusCode:404}
    }
    const OtherCardItems=cart.items.filter((p)=>p.product.toString() !==productId)

       let total=calculateCardaTotalItems({cartItems: OtherCardItems})

    cart.items=OtherCardItems

    cart.totalAmount=total
    const updated_cart=await cart.save()

    return{data:updated_cart , statusCode:200}

}

export const ClearCard=async({userId}:{userId:string})=>{
    const cart=await getActiveCartForUser({userId})
    cart.items=[]
    cart.totalAmount=0

    const updated_cart=await cart.save()

    return{data:updated_cart , statusCode:200}

}

export const Checkout=async ({userId , address}:{userId:string , address:string})=>{

    if(!address){
        return {data:"please add the address" , statusCode:400}

    }

    const cart=await getActiveCartForUser({userId})

    const orderItems:IOrderItem[]=[]

    //loop on cardItems and create orderItems

    for(const item of cart.items){
        const product=await productModel.findById(item.product)
    
    if(!product){
        return{data:"product not found "  , statusCode:400}

    }
    const orderItem:IOrderItem={
        productTitle:product.title,
        productImage:product.image,
        quantity:item.quantity,
        unitPrice:item.unitPrice

    }

    orderItems.push(orderItem)
    

}
     const order=await orderModel.create({
        orderItems,
        userId,
        total:cart.totalAmount,
        address
     })

     await order.save()

     //update the card status
     cart.status="completed"
     await cart.save()

     return{data:order , statusCode:200 }


}







const calculateCardaTotalItems=({cartItems}:{cartItems:ICartItem[]})=>{

       let total=cartItems.reduce((sum , product)=>{
        sum+=product.quantity *product.unitPrice
        return sum
    }, 0)

    return total

}