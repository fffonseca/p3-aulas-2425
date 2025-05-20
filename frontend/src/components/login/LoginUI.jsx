import './LoginUI.css';
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const LoginUI = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false);

  const nav = useNavigate();
  const { login, token } = useContext(AuthContext);

  async function HandleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoad(true);

    try {
      await login(email, password);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Erro ao autenticar o utilizador.");
      //console.error("Erro ao autenticar o utilizador:", error);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    if (token) {
      nav("/students");
    }
  }, [token, nav]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          {message && (
            <Alert severity="error" variant="filled">
              <AlertTitle>Ocorreu um erro</AlertTitle>
              <strong>{message}</strong>
            </Alert>
          )}
        </Stack>
        <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Autenticação
        </Typography>
        <Box component="form" onSubmit={HandleLogin} noValidate sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
            sx={{ mt: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              fontSize: "1rem",
              boxShadow: 2,
            }}
            disabled={load}
            aria-label="Entrar"
          >
            {load ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Ainda não tens uma conta? Regista-te agora
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginUI;
