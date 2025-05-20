import { Box, Typography } from "@mui/material";
import NavBar from "../components/navbar/index";

const HomePage = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <NavBar />
                <Typography variant="h3">App de Exemplo das Aulas</Typography>
            </Box>
        </>
    )
}

export default HomePage;