import './StudentsTable.css';
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Snackbar, Alert } from "@mui/material";
import Stack from "@mui/material/Stack";

const SemRegistos = () => {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            Não existem resultados para mostrar.
        </Stack>
    );
}

const SemResultados = () => {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            A aplicação dos filtros não obtém resultados para mostrar.
        </Stack>
    );
}

const StudentsTable = () => {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState("");
    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    // Função para gerar headers, memoizada
    const setHeaders = useCallback((data) => {
        if (!Array.isArray(data) || data.length === 0) return [];

        const headers = Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key.toUpperCase(),
            flex: 1,
            minWidth: 150,
        }));

        headers.push({
            field: "actions",
            headerName: "Ações",
            type: "actions",
            width: 300,
            renderCell: (params) => (
                <>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, marginRight: 1 }}
                        onClick={() => nav("/students/edit/" + params.id)}
                        aria-label={`Editar ${params.row.name || ''}`}
                    >
                        Editar
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => nav("/students/delete/" + params.id)}
                        aria-label={`Apagar ${params.row.name || ''}`}
                    >
                        Apagar
                    </Button>
                </>
            ),
        });

        return headers;
    }, [nav]);

    useEffect(() => {
        console.log("Token: ", token);
        axios
            .get("http://localhost:5000/api/v1/students", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setColumns(setHeaders(res.data.data));
                    setRows(res.data.data);
                } else {
                    setError("Ocorreu um erro na execução do pedido.");
                }
            })
            .catch((error) => {
                setError("Erro na ligação à API. " + error.message);
            });
    }, [setHeaders, token]);

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                autoHeight
                components={{
                    SemRegistos,
                    SemResultados,
                }}
            />
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setError("")} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default StudentsTable;