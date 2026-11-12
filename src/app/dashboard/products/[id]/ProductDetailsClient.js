
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          {error || "Product not found"}
        </Typography>
        <Button onClick={() => router.push("/dashboard/products")}>
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/dashboard/products")}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          component="img"
          src={product.thumbnail}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: "40%" },
            maxHeight: 350,
            objectFit: "contain",
          }}
        />

        <Box sx={{ flex: 1 }}>
          <Chip label={product.category} sx={{ mb: 2 }} />

          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.title}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Typography variant="h4" color="primary" fontWeight={700}>
            ${product.price}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Rating: {product.rating} / 5
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Brand: {product.brand || "Not specified"}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Stock: {product.stock}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Discount: {product.discountPercentage}%
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
