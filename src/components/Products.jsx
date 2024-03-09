import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container, Skeleton } from "@mui/material";
import Rating from '@mui/material/Rating'; // Import Rating component
import "../styles/Product.css";
import Productcarsoul from "./Productcarsoul";

const ProductSkeleton = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <CardContent>
        <Typography variant="h6">
          <Skeleton />
        </Typography>
        <Typography variant="body2">
          <Skeleton />
        </Typography>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
        <Rating name="rating" value={0} readOnly style={{ color: '#9C27B0' }} />
      </CardContent>
      <CardContent style={{ flexGrow: 1 }} />
      <CardContent>
        <Skeleton variant="rectangular" width="100%" height={32} />
      </CardContent>
    </Card>
  </Grid>
);

export default function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const delay = setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((json) => {
          setData(json.products);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false in case of error
        });
    }, 3000); // 3000 milliseconds delay
  
    // Cleanup function to clear timeout in case component unmounts before delay completes
    return () => clearTimeout(delay);
  }, []);
  

  // Function to truncate the title and description
  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  // Function to capitalize the first letter of each sentence in the description
  const standardizeDescription = (description) => {
    return description.substring(0, 40).charAt(0).toUpperCase() + description.substring(0, 40).slice(1).toLowerCase();
  };

  return (
    <>
      <Productcarsoul />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {loading ? (
            // Render skeleton items if data is still loading
            Array.from(new Array(6)).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            // Render product cards when data is loaded
            data.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                    style={{ height: 200, objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{truncateString(product.title, 20)}</Typography>
                    <Typography variant="body2">{standardizeDescription(product.description)}...</Typography>
                    <Typography variant="body1">Price: ${product.price}</Typography>
                    <Rating name="rating" value={product.rating} precision={0.5} readOnly style={{ color: '#9C27B0' }} />
                  </CardContent>
                  <CardContent style={{ flexGrow: 1 }} />
                  <CardContent>
                    <Button component={Link} to={`/products/${product.id}`} variant="outlined" style={{ borderColor: "#9C27B0", color: "#9C27B0" }} >
                      Click to View
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
}
