import { Container, TextField, Button, Typography, Box, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routing.ts";

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form); // send to API
  };

  // @ts-ignore
  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h4" mb={3} textAlign="center">
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
        />

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Login
        </Button>

        <Typography mt={2} textAlign="center">
          Don’t have an account?{" "}
          <Link onClick={() => navigate(AppRoutes.SIGN_UP)} sx={{ cursor: "pointer" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
