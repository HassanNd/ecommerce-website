import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import type { Product } from "../types/Products";
import { BASE_URL } from "../constants/baseUrl";
import { Box } from "@mui/material";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error , SetError]=useState(false)

  //fetching the data from the backened
  useEffect(() => {
    const fetchData=async()=>{
      try{
        const response=await fetch(`${BASE_URL}/product`)
        const data=await response.json()
        setProducts(data)

      }
      catch{
        SetError(true)

      }
    }
  fetchData()
  },[])

  if(error){
    return(<Box>Something went wrong</Box>)
  }
    
      
        
  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 2,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
       
      }}
    >
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid sx={{ mw: 8 }}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
