"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { getCurrentStudent, logoutStudent } from "@/lib/api";
import type { StudentPublic } from "@/types/student";

interface AppShellProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | false;
  footer?: boolean;
}

export default function AppShell({
  children,
  maxWidth = "lg",
  footer = true,
}: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [student, setStudent] = useState<StudentPublic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCurrentStudent()
      .then((res) => {
        if (active) {
          if (res.success && res.authenticated && res.student) {
            setStudent(res.student);
          } else {
            setStudent(null);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch session:", err);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutStudent();
      setStudent(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const items = student
    ? [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Register", href: "/register" },
        { label: "Login", href: "/login" },
      ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
            <Box
              component={Link}
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                textDecoration: "none",
                color: "inherit",
                mr: 2,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  bgcolor: "primary.main",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                }}
              >
                <LocalLibraryOutlinedIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  LibraryMS
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Management Portal
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              {loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <>
                  {items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Button
                        key={item.href}
                        component={Link}
                        href={item.href}
                        variant={active ? "contained" : "text"}
                        color={active ? "primary" : "inherit"}
                        size="small"
                        sx={{
                          color: active ? undefined : "text.secondary",
                          fontWeight: active ? 600 : 500,
                        }}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                  {student && (
                    <Button
                      variant="text"
                      color="inherit"
                      size="small"
                      startIcon={<LogoutOutlinedIcon fontSize="small" />}
                      onClick={handleLogout}
                      sx={{
                        color: "error.main",
                        fontWeight: 500,
                        "&:hover": {
                          bgcolor: "error.light",
                        },
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        {maxWidth === false ? (
          children
        ) : (
          <Container maxWidth={maxWidth}>{children}</Container>
        )}
      </Box>

      {footer && (
        <Box
          component="footer"
          sx={{
            py: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Library Management System — University Demo
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Next.js · PostgreSQL · Material UI
              </Typography>
            </Stack>
          </Container>
        </Box>
      )}
    </Box>
  );
}
