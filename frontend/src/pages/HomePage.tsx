import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import Container from "@mui/material/Container";

export const HomePage = () => {
  return (
    <Container sx={{ mt: 2  ,display:"flex" , flexDirection:"row" , justifyContent:"center"  }}>
      <Grid container spacing={2}>
       <Grid sx={{mw:4}}>
          <ProductCard />
        </Grid> 
        <Grid sx={{mw:4}}>
          <ProductCard />
        </Grid> 
        <Grid sx={{mw:4}}>
          <ProductCard />
        </Grid> 
      </Grid>
    </Container>
  );
};