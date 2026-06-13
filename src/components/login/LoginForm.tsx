"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import axios from "axios";
import { loginStudent } from "@/lib/api";
import type { LoginRequest } from "@/types/student";

interface FormErrors {
  email?: string;
  password?: string;
}

const initialForm: LoginRequest = {
  email: "",
  password: "",
};

const portalHighlights = [
  "Borrow and return library resources",
  "View active and past borrowings",
  "Manage student account preferences",
];

function validateForm(data: LoginRequest): FormErrors {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }

  return errors;
}

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <InputAdornment position="start">
      <Box sx={{ color: "text.secondary", display: "flex" }}>{children}</Box>
    </InputAdornment>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginRequest>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof LoginRequest) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setApiError(null);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      await loginStudent({
        email: form.email.trim(),
        password: form.password,
      });

      // Clear states and redirect
      setForm(initialForm);
      setErrors({});
      
      // Redirect to dashboard page and force layout refreshment to update headers
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as {
          message?: string;
          errors?: Record<string, string[]>;
        };

        if (data.errors) {
          const fieldErrors: FormErrors = {};
          Object.entries(data.errors).forEach(([key, messages]) => {
            fieldErrors[key as keyof FormErrors] = messages[0];
          });
          setErrors(fieldErrors);
        }

        setApiError(data.message ?? "Invalid email or password");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Grid container>
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            bgcolor: "#1e3a8a",
            color: "white",
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="overline" sx={{ color: "#93c5fd", letterSpacing: 1.2 }}>
            Library Access
          </Typography>
          <Typography variant="h4" sx={{ color: "white", mt: 1, mb: 2 }}>
            Log in to your account
          </Typography>
          <Typography variant="body1" sx={{ color: "#bfdbfe", mb: 3, lineHeight: 1.7 }}>
            Enter your registered university email and password to access the library dashboard.
          </Typography>

          <Stack spacing={1.5}>
            {portalHighlights.map((item) => (
              <Stack key={item} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
                <CheckCircleOutlineOutlinedIcon
                  sx={{ fontSize: 20, color: "#93c5fd", mt: 0.25 }}
                />
                <Typography variant="body2" sx={{ color: "#e2e8f0" }}>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Student Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your credentials to access the Library Management System.
            </Typography>

            {apiError && (
              <Alert severity="error" sx={{ mb: 2.5 }}>
                {apiError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  required
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  disabled={loading}
                  autoComplete="email"
                  placeholder="student@university.edu"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <FieldIcon>
                          <EmailOutlinedIcon fontSize="small" />
                        </FieldIcon>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  disabled={loading}
                  autoComplete="current-password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <FieldIcon>
                          <LockOutlinedIcon fontSize="small" />
                        </FieldIcon>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                            disabled={loading}
                            size="small"
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon fontSize="small" />
                            ) : (
                              <VisibilityOutlinedIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Stack>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Log In"
                )}
              </Button>

              <Divider sx={{ my: 2.5 }} />

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                Need an account?{" "}
                <Typography
                  component={Link}
                  href="/register"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Create one here
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
