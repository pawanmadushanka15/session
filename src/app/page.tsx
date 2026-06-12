import Link from "next/link";
import { Button, Paper, Typography } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AppShell from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell maxWidth="sm">
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: { xs: 3, sm: 4 },
          width: "100%",
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 1.5 }}>
          Library Management System
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.7 }}
        >
          University demo project for student registration and library
          activities.
        </Typography>

        <Link href="/register" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonAddOutlinedIcon />}
          >
            Student Registration
          </Button>
        </Link>
      </Paper>
    </AppShell>
  );
}
