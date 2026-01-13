import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routing.ts";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box mt={8} width="100%" maxWidth={800}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" mb={2}>
          Welcome 👋
        </Typography>

        <Typography variant="body1" mb={3} color="text.secondary">
          You are now logged in. This is your home dashboard.
          From here you can navigate to other parts of the app.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => navigate(AppRoutes.PROFILE)}>
            Profile
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
