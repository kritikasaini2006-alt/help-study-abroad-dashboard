
"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAuthStore } from "../store/authStore";
const drawerWidth = 240;

const menuItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: <DashboardRoundedIcon />,
  },
  {
    label: "Users",
    path: "/dashboard/users",
    icon: <PeopleAltRoundedIcon />,
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icon: <Inventory2RoundedIcon />,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
 const logout = useAuthStore((state) => state.logout);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNavigation(path) {
    router.push(path);
    setMobileOpen(false);
  }
async function handleLogout() {
  logout();
  await signOut({ callbackUrl: "/" });
}
  const drawerContent = (
    <>
      <Toolbar />

      <List sx={{ px: 2, pt: 3 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={pathname === item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.Mui-selected": {
                bgcolor: "#dbeafe",
                color: "#2563eb",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color:
                  pathname === item.path ? "#2563eb" : "#64748b",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fb" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#172033",
          borderBottom: "1px solid #e5eaf2",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: { xs: 1, sm: 2 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <MenuRoundedIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              flexShrink: 0,
            }}
          >
            Help Study Abroad
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            color="error"
            size={isMobile ? "small" : "medium"}
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              minWidth: 0,
              whiteSpace: "nowrap",
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #e5eaf2",
              bgcolor: "#ffffff",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #e5eaf2",
              bgcolor: "#ffffff",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: 8,
          minWidth: 0,
          width: 0,
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
