"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";

interface AppShellProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | false;
  footer?: boolean;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Register", href: "/register" },
];

export default function AppShell({
  children,
  maxWidth = "lg",
  footer = true,
}: AppShellProps) {
  const pathname = usePathname();

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
              {navItems.map((item) => {
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
