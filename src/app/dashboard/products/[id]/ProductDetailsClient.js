
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
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

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
        setActiveImage(0);
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
        <Typography color="error" sx={{ mb: 2 }}>
          {error || "Product not found"}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/dashboard/products")}
        >
          Back to Products
        </Button>
      </Box>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : product.thumbnail
        ? [product.thumbnail]
        : [];

  const specifications = [
    ["Brand", product.brand],
    ["SKU", product.sku],
    ["Category", product.category],
    ["Weight", product.weight != null ? `${product.weight} g` : null],
    [
      "Dimensions",
      product.dimensions
        ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
        : null,
    ],
    ["Minimum Order Quantity", product.minimumOrderQuantity],
    ["Warranty", product.warrantyInformation],
    ["Shipping", product.shippingInformation],
    ["Return Policy", product.returnPolicy],
    ["Availability", product.availabilityStatus],
    ["Stock", product.stock],
    ["Barcode", product.meta?.barcode],
    ["Release Date", product.meta?.createdAt
      ? new Date(product.meta.createdAt).toLocaleDateString()
      : null],
  ];

  const changeImage = (direction) => {
    if (images.length < 2) return;

    setActiveImage((current) =>
      (current + direction + images.length) % images.length
    );
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
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
          gap: { xs: 3, md: 5 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "45%" }, minWidth: 0 }}>
          <Box
            sx={{
              position: "relative",
              height: { xs: 260, sm: 350, md: 400 },
              bgcolor: "#fff",
              borderRadius: 3,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e5e7eb",
            }}
          >
            {images.length > 0 ? (
              <Box
                component="img"
                src={images[activeImage]}
                alt={`${product.title} - image ${activeImage + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  p: 2,
                }}
              />
            ) : (
              <Typography color="text.secondary">
                No product images available
              </Typography>
            )}

            {images.length > 1 && (
              <>
                <IconButton
                  aria-label="Previous product image"
                  onClick={() => changeImage(-1)}
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    bgcolor: "white",
                    "&:hover": { bgcolor: "#eeeeee" },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <IconButton
                  aria-label="Next product image"
                  onClick={() => changeImage(1)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    bgcolor: "white",
                    "&:hover": { bgcolor: "#eeeeee" },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}

            {images.length > 0 && (
              <Chip
                label={`${activeImage + 1} / ${images.length}`}
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  bgcolor: "white",
                }}
              />
            )}
          </Box>

          {images.length > 1 && (
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mt: 2,
                overflowX: "auto",
                pb: 1,
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={`${image}-${index}`}
                  component="button"
                  type="button"
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  onClick={() => setActiveImage(index)}
                  sx={{
                    flex: "0 0 76px",
                    height: 76,
                    p: 0.5,
                    bgcolor: "#fff",
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor:
                      activeImage === index ? "primary.main" : "#e5e7eb",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt=""
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            <Chip label={product.category} color="primary" variant="outlined" />
            <Chip
              label={product.availabilityStatus || "Availability unknown"}
              color={
                product.stock > 0 ? "success" : "default"
              }
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ overflowWrap: "anywhere" }}
          >
            {product.title}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          <Typography variant="h4" color="primary" fontWeight={700}>
            ${Number(product.price).toFixed(2)}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            ⭐ {product.rating} / 5
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Discount: {product.discountPercentage}%
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Brand: {product.brand || "Not specified"}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Stock: {product.stock ?? "Not available"}
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{ p: { xs: 2, md: 4 }, mt: 3, borderRadius: 3 }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Product Specifications
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {specifications.map(([label, value]) => (
            <Grid item xs={12} sm={6} md={4} key={label}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {label}
              </Typography>

              <Typography
                fontWeight={500}
                sx={{ overflowWrap: "anywhere" }}
              >
                {value !== null && value !== undefined && value !== ""
                  ? String(value)
                  : "Not available"}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
