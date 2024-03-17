import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container, Skeleton, TextField, Select, MenuItem, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Rating from '@mui/material/Rating';
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("priceLowToHigh");

  useEffect(() => {
    const delay = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${searchTerm}&sortBy=${sortBy}`)
        .then((res) => res.json())
        .then((json) => {
          // Sort the data based on the selected sorting option
          const sortedData = json.products.slice().sort((a, b) => {
            if (sortBy === 'priceLowToHigh') {
              return a.price - b.price;
            } else if (sortBy === 'priceHighToLow') {
              return b.price - a.price;
            } else {
              return b.rating - a.rating;
            }
          });
          setData(sortedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, 3000);

    return () => clearTimeout(delay);
  }, [searchTerm, sortBy]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  const standardizeDescription = (description) => {
    return description.substring(0, 40).charAt(0).toUpperCase() + description.substring(0, 40).slice(1).toLowerCase();
  };

  return (
    <>
      <Productcarsoul />
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: 20 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: 20 }}
            >
              <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
              <MenuItem value="rating">By Review Rating</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            data.length === 0 ? (
              <Typography variant="body1" align="center" className="no-results-message">No results found</Typography>
            ) : (
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
            )
          )}
        </Grid>
      </Container>
    </>
  );
}
