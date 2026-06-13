"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { logoutStudent } from "@/lib/api";

interface StudentData {
  id: string;
  fullName: string;
  email: string;
  studentId: string;
  createdAt: string;
}

interface DashboardViewProps {
  student: StudentData;
}

export default function DashboardView({ student }: DashboardViewProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutStudent();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  const formattedDate = student.createdAt
    ? new Date(student.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <Stack spacing={3}>
      {/* Welcome Banner Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="overline" sx={{ color: "#93c5fd", letterSpacing: 1.2 }}>
              Library Management System Portal
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, mb: 1 }}>
              Welcome back, {student.fullName}!
            </Typography>
            <Typography variant="body1" sx={{ color: "#bfdbfe", maxWidth: 600 }}>
              You are signed in to your student account. From here, you can browse library books,
              check active loans, and view search histories.
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: "rgba(255,255,255,0.2)",
                border: "2px solid rgba(255,255,255,0.4)",
              }}
            >
              <LocalLibraryOutlinedIcon sx={{ fontSize: 36, color: "white" }} />
            </Avatar>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Details and Actions */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Student Profile Information
              </Typography>
              <Divider sx={{ mb: 2.5 }} />

              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "blue.50", color: "primary.main", width: 44, height: 44 }}>
                    <AccountCircleOutlinedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {student.fullName}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "blue.50", color: "primary.main", width: 44, height: 44 }}>
                    <EmailOutlinedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {student.email}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "blue.50", color: "primary.main", width: 44, height: 44 }}>
                    <BadgeOutlinedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Student ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {student.studentId}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: "blue.50", color: "primary.main", width: 44, height: 44 }}>
                    <CalendarTodayOutlinedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Registration Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {formattedDate}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: "100%", boxShadow: 1 }}>
            <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Account Actions
              </Typography>
              <Divider sx={{ mb: 2.5 }} />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, flexGrow: 1 }}>
                Manage your active session. Make sure to log out when using public terminals to
                protect your account privacy.
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                color="error"
                size="large"
                startIcon={loggingOut ? <CircularProgress size={20} color="inherit" /> : <LogoutOutlinedIcon />}
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "Signing Out..." : "Log Out"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
