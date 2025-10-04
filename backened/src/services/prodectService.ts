import productModel from "../models/productModel.ts";

interface IProductsEditingParams {
  product_id: string;
  title: string;
  price: number;
  image: string;
  stock: number;
}

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
     const products = [
    {
      title: "Dell laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOz2lo4bxFfVrZtZzqhyi02pktSre4HPuKmA&s",
      price: 150,
      stock: 14,
    },
    {
      title: "Dell laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOz2lo4bxFfVrZtZzqhyi02pktSre4HPuKmA&s",
      price: 150,
      stock: 23,
    },
    {
      title: "Asus laptop",
      image:
        "https://i5.walmartimages.com/asr/43afa489-3c0d-4c4f-8781-91d1d90cdb1c.b8be2ea47304c13d21db7fb944f4977a.jpeg",
      price: 155,
      stock: 10,
    },
    {
      title: "Hp laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPkIzbCliA21Ho9XE-gmP2mHiHwubtJjlww&s",
      price: 156,
      stock: 13,
    },
  ];
  const existingproducts = await getAllProducts();

  if (existingproducts.length === 0) {
    await productModel.insertMany(products);
  }
    
  } catch (error) {
    console.error('cannot see the database' , error);
    
    
  }
 
};

// export const edit_product = async ({
//   title,
//   price,
//   image,
//   stock,
// }: IProductsEditingParams) => {
//   const find_product = await productModel.findOneAndUpdate(
//     { title: title },
//     {
//       title,
//       price,
//       image,
//       stock,
//     },
//     { new: true }
//   );
//   if (!find_product) {
//     return { message: "product is not found", statusCode: 404 };
//   }
//   return {
//     data: find_product,
//     message: "editing done successfuly...",
//     statusCode: 203,
//   };
// };

export const editProduct = async ({
  product_id,
  title,
  price,
  image,
  stock,
}: IProductsEditingParams) => {
  const find_product = await productModel.findByIdAndUpdate(
    product_id,
    {
      title,
      stock,
      image,
      price,
    },
    { new: true }
  );
  if (!find_product) {
    return { message: "product is not found", statusCode: 404 };
  }
  return { message: "product edited", statusCode: 201, data: find_product };
};
