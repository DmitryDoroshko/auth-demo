import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { AppRoutes } from "../constants/routing.ts";
import { useAuth } from "../context/auth/auth-hooks.tsx";

export function Layout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Top Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate(AppRoutes.HOME)}
          >
            Auth Demo
          </Typography>

          {user ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate(AppRoutes.PROFILE)}
              >
                {user.name}
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate(AppRoutes.LOGIN)}>
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(AppRoutes.SIGN_UP)}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Page Content */}
      <Container
        sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
      >
        <Outlet />
      </Container>
      {/* Footer */}
      <Box textAlign="center" py={2} bgcolor="#f5f5f5">
        <Typography variant="body2">
          © {new Date().getFullYear()} Auth Demo
        </Typography>
      </Box>
    </Box>
  );
}
