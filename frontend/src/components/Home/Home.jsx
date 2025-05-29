import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

const Home = () => (
    <Container maxWidth="md">
        <Paper
            elevation={3}
            sx={{
                mt: { xs: 4, md: 10 },
                p: { xs: 2, md: 4 },
                textAlign: "center",
            }}
        >
            <Typography variant="h5" component="h1" fontWeight={600}> Projeto prático desenvolvido no âmbito da unidade curricular de Programação III, com o objetivo de criar uma aplicação web que exemplifique os principais conceitos e técnicas em React. A aplicação recorre à API implementada na primeira parte da unidade curricular, promovendo a integração entre o front-end e o back-end.
            </Typography>
        </Paper>
    </Container>
);

export default Home;