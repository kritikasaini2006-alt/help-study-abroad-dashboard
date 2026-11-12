
"use client";

import { useEffect, useState } from "react";
import { useApiStore } from "../../store/apiStore";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  CircularProgress,
  TablePagination,
  Alert,
} from "@mui/material";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;

  // Read state and actions from Zustand
  const users = useApiStore((state) => state.users);
  const total = useApiStore((state) => state.usersTotal);
  const loading = useApiStore((state) => state.usersLoading);
  const error = useApiStore((state) => state.usersError);
  const fetchUsers = useApiStore((state) => state.fetchUsers);

  useEffect(() => {
    const skip = page * limit;

    const url = search.trim()
      ? `https://dummyjson.com/users/search?q=${encodeURIComponent(
          search.trim()
        )}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    fetchUsers(url);
  }, [page, search, fetchUsers]);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Users
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage and explore user information.
      </Typography>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
        <TextField
          fullWidth
          label="Search users"
          placeholder="Search by name, email, or username"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(0);
          }}
          sx={{ mb: 3 }}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
         <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>User</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Gender</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Company</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id} hover>
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Avatar src={user.image} alt={user.firstName} />
              <Typography fontWeight={600}>
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          </TableCell>

          <TableCell>{user.email}</TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.gender || "—"}</TableCell>
          <TableCell>{user.phone || "—"}</TableCell>
          <TableCell>{user.company?.name || "—"}</TableCell>
        </TableRow>
      ))}

      {users.length === 0 && (
        <TableRow>
          <TableCell colSpan={6} align="center">
            No users found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={limit}
              rowsPerPageOptions={[10]}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
