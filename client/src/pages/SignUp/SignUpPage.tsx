import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/routing.ts";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.password !== form.repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(form); // send to API
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h4" mb={3} textAlign="center">
          Sign Up
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Repeat Password"
          type="password"
          name="repeatPassword"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Create account
        </Button>

        <Typography mt={2} textAlign="center">
          Already have an account?{" "}
          <Link
            onClick={() => navigate(AppRoutes.LOGIN)}
            sx={{ cursor: "pointer" }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
