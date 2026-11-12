
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Avatar,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UserDetailsClient() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://dummyjson.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error" sx={{ mb: 2 }}>
          {error || "User not found"}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/dashboard/users")}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  const details = [
    ["First Name", user.firstName],
    ["Last Name", user.lastName],
    ["Maiden Name", user.maidenName],
    ["Username", user.username],
    ["Email", user.email],
    ["Phone", user.phone],
    ["Age", user.age],
    ["Gender", user.gender],
    ["Birth Date", user.birthDate],
    ["Blood Group", user.bloodGroup],
    ["Height", `${user.height} cm`],
    ["Weight", `${user.weight} kg`],
    ["Eye Color", user.eyeColor],
    ["Hair", user.hair?.color && user.hair?.type
      ? `${user.hair.color}, ${user.hair.type}`
      : "Not available"],
    ["University", user.university],
    ["Company", user.company?.name],
    ["Department", user.company?.department],
    ["Job Title", user.company?.title],
    [
      "Address",
      [
        user.address?.address,
        user.address?.city,
        user.address?.state,
        user.address?.postalCode,
        user.address?.country,
      ]
        .filter(Boolean)
        .join(", "),
    ],
  ];

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
        onClick={() => router.push("/dashboard/users")}
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 110, height: 110 }}
          />

          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 1 }}>
              {user.email}
            </Typography>

            <Chip
              label={user.gender || "Gender not specified"}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Personal Information
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {details.map(([label, value]) => (
            <Grid item xs={12} sm={6} md={4} key={label}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {label}
              </Typography>

              <Typography fontWeight={500} sx={{ overflowWrap: "anywhere" }}>
                {value || "Not available"}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
