import {AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography} from "@mui/material";
import {Group} from "@mui/icons-material";
import {NavLink} from "react-router";
import MenuItemLink from "../shared/MenuItemLink.tsx";
import {useStore} from "../../lib/hooks/useStore.ts";
import {Observer} from "mobx-react-lite";


export default function NavBar() {
    const{ uiStore } = useStore();

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static"
                  sx={{
                      position: 'relative',
                      backgroundImage:'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'}}>
              <Container maxWidth={'xl'}>
                  <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                     <Box>
                         <MenuItem component={NavLink} to={"/"} sx={{display: 'flex', gap: 2}}>
                                <Group fontSize="large"/>
                                <Typography variant="h4" fontWeight={'bold'}>
                                    Reactivities
                                </Typography>
                        </MenuItem>
                     </Box>
                     <Box sx={{display: 'flex'}}>
                         <MenuItemLink to={"/activities"}>Activities</MenuItemLink>
                         <MenuItemLink to={"/createActivity"}>Create Activity</MenuItemLink>
                         <MenuItemLink to={"/counter"}>Counter</MenuItemLink>
                     </Box>
                    <MenuItem>
                        User Menu
                    </MenuItem>
                </Toolbar>
              </Container>
              <Observer>
                  {
                      () => uiStore.isLoading ? (
                          <LinearProgress
                              color={'secondary'}
                              sx={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: 4
                              }}
                          />
                      ) : null
                  }
              </Observer>
          </AppBar>
        </Box>
      );
}