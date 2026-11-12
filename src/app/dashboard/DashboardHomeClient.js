
"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

export default function DashboardHomeClient() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", p: 4 }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Help Study Abroad Dashboard
        </Typography>

        <Typography sx={{ mb: 3 }}>
          Welcome, {user?.firstName || "Admin"}!
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {user
            ? `Logged in as ${user.username}`
            : "Your dashboard page is working."}
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            logout();
            router.replace("/");
          }}
        >
          Sign Out
        </Button>
      </Paper>
    </Box>
  );
}
