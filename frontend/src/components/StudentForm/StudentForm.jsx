// filepath: src/components/StudentsTable/StudentForm.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { Box, Button, TextField, Typography, Container, Paper, Snackbar, Alert } from "@mui/material";

const StudentForm = () => {
    const { id } = useParams();

    const [student, setStudent] = useState({ name: "", address: "", nif: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (id && token) {
            axios.get(`http://localhost:5000/api/v1/student/${id}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
                .then((res) => {
                    //console.log(res.data);
                    setStudent(res.data.data);
                })
                .catch(() => setError("Erro ao carregar dados do estudante."));
        }
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "nif" && value.length > 9) return;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:5000/api/v1/student/${id}`, student, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
                .then(() => {
                    setSuccess(true);
                    setTimeout(() => nav("/students"), 1500);
                })
                .catch(() => setError("Erro ao editar estudante."));
        } else {
            axios.post(`http://localhost:5000/api/v1/student`, student, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
                .then(() => {
                    setSuccess(true);
                    setTimeout(() => nav("/students"), 1500);
                })
                .catch((error) => setError(error.response?.data?.message || "Erro ao criar estudante."));
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    mt: { xs: 2, md: 8 },
                    p: { xs: 2, md: 4 },
                    borderRadius: 3,
                }}
            >
                <Typography component="h1" variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    {id ? "Editar Estudante" : "Criar Novo Estudante"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Nome"
                        name="name"
                        value={student.name ?? ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Morada"
                        name="address"
                        value={student.address ?? ""}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="NIF"
                        name="nif"
                        type="number"
                        value={student.nif ?? ""}
                        onChange={handleChange}
                        required
                        fullWidth
                        inputProps={{
                            maxLength: 9,
                            min: 0,
                            max: 999999999,
                            inputMode: "numeric",
                            pattern: "[0-9]*"
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        {id ? "Guardar Alterações" : "Criar Estudante"}
                    </Button>
                </Box>
            </Paper>
            <Snackbar
                open={!!success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    {id ? "Estudante editado com sucesso!" : "Estudante criado com sucesso!"}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setError("")} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default StudentForm;