
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useApiStore } from "../../store/apiStore";

import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Pagination,
  Chip,
  Alert,
} from "@mui/material";

export default function ProductsPage() {
  const router = useRouter();
  const limit = 12;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  // Read API data and actions from Zustand
  const products = useApiStore((state) => state.products);
  const total = useApiStore((state) => state.productsTotal);
  const loading = useApiStore((state) => state.productsLoading);
  const error = useApiStore((state) => state.productsError);

  const categories = useApiStore((state) => state.categories);
const categoriesLoading = useApiStore(
  (state) => state.categoriesLoading
);
const categoriesError = useApiStore(
  (state) => state.categoriesError
);

  const fetchProducts = useApiStore((state) => state.fetchProducts);
  const fetchCategories = useApiStore(
    (state) => state.fetchCategories
  );

  // Load categories through Zustand
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Load products through Zustand
  useEffect(() => {
    const skip = (page - 1) * limit;
    let url;

    if (search.trim()) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
        search.trim()
      )}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(
        category
      )}?limit=${limit}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    fetchProducts(url);
  }, [page, search, category, fetchProducts]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  // Apply the category filter when searching
  const visibleProducts =
    search.trim() && category
      ? products.filter((product) => product.category === category)
      : products;

  const visibleTotal =
    search.trim() && category ? visibleProducts.length : total;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Products
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Explore products, prices, ratings, and categories.
      </Typography>

      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search products"
            placeholder="Enter a product name"
            value={search}
            onChange={handleSearchChange}
            sx={{ flex: 1, minWidth: 220 }}
          />

          <TextField
            select
            label="Category"
            value={category}
            onChange={handleCategoryChange}
            sx={{ minWidth: 220 }}
            disabled={categoriesLoading}
          >
            <MenuItem value="">All categories</MenuItem>

            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item.replace(/-/g, " ")}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Paper>
            {categoriesError && (
  <Alert severity="error" sx={{ mb: 3 }}>
    Failed to load categories: {categoriesError}
  </Alert>
)}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {visibleProducts.map((product) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={product.id}
              >
                <Card
                  onClick={() =>
                    router.push(`/dashboard/products/${product.id}`)
                  }
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    borderRadius: 3,
                    transition: "0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 5,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.thumbnail}
                    alt={product.title}
                    sx={{ height: 190, objectFit: "contain", p: 2 }}
                  />

                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Chip
                      size="small"
                      label={product.category.replace(/-/g, " ")}
                      sx={{ my: 1 }}
                    />

                    <Typography variant="h6" color="primary" fontWeight={700}>
                      ${product.price}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Rating: {product.rating} / 5
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {visibleProducts.length === 0 && (
            <Typography sx={{ textAlign: "center", p: 5 }}>
              No products found.
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.max(1, Math.ceil(visibleTotal / limit))}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
