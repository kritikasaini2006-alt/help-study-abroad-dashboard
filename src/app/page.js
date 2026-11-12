
"use client";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useAuthStore } from "./store/authStore";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
const setAuth = useAuthStore((state) => state.setAuth);
  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.ok) {
  const session = await getSession();

  if (!session?.user) {
    setError("Login succeeded, but the session could not be loaded.");
    return;
  }

  setAuth(
    {
      id: session.user.id,
      firstName: session.user.name?.split(" ")[0] || "Admin",
      lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
      username: session.user.username,
      email: session.user.email,
      image: session.user.image,
    },
    session.accessToken
  );

  router.push("/dashboard");
  router.refresh();
} else {
  setError("Invalid username or password.");
}
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background:
          "radial-gradient(circle at top left, #dbeafe, transparent 45%), #f5f7fb",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 430,
          border: "1px solid #e5eaf2",
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                bgcolor: "#dbeafe",
                color: "#2563eb",
              }}
            >
              <AdminPanelSettingsRoundedIcon sx={{ fontSize: 36 }} />
            </Box>

            <Typography variant="h5" fontWeight={800}>
              Help Study Abroad
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Admin Dashboard
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              required
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2.5 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 3,
            }}
          >
            Secure administrator access
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
