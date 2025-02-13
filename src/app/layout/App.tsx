import {CssBaseline, Container, Box} from "@mui/material";
import NavBar from "./NavBar.tsx";
import {Outlet, useLocation} from "react-router";
import Home from "../../features/Home.tsx";

export default function App() {

    const location = useLocation();

  return (
    <Box sx={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
        <CssBaseline />
        {
            location.pathname === '/' ? <Home/> : (
                <>
                    <NavBar/>
                    <Container maxWidth={'xl'} sx={{marginTop: 3}}>
                        <Outlet/>
                    </Container>
                </>
            )
        }
    </Box>
  )
}
