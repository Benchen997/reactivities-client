import {CssBaseline, Container, Box} from "@mui/material";
import NavBar from "./NavBar.tsx";
import {Outlet} from "react-router";

export default function App() {


  return (
    <Box sx={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
        <CssBaseline />
        <NavBar/>
        <Container maxWidth={'xl'} sx={{marginTop: 3}}>
            <Outlet/>
        </Container>
    </Box>
  )
}
