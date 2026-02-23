import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppRoutes } from "../../constants/routing.ts";
import { useAuth } from "../../context/auth/auth-hooks.tsx";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate(AppRoutes.LOGIN);
    }
  }, [user, navigate]);
  
  const handleLogout = async () => {
    await logout();
    navigate(AppRoutes.LOGIN);
  };
  
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <Box mt={8} width="100%" maxWidth={600}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3} alignItems="center">
          <Avatar sx={{ width: 80, height: 80 }}>{user.name[0]}</Avatar>

          <Box textAlign="center">
            <Typography variant="h5">{user!.name}</Typography>
            <Typography color="text.secondary">{user!.email}</Typography>
          </Box>

          <Divider sx={{ width: "100%" }} />

          <Stack spacing={1} width="100%">
            <Typography>
              <strong>Member since:</strong> {user!.joined}
            </Typography>
          </Stack>

          <Divider sx={{ width: "100%" }} />

          <Stack direction="row" spacing={2}>
            <Button variant="contained">Edit Profile</Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
