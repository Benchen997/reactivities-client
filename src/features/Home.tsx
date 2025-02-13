import {Paper, Box, Button, Typography} from "@mui/material";
import {Group} from "@mui/icons-material";
import {Link} from "react-router";

export default function Home() {

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                gap: 6,
                height: '100vh',
                backgroundImage:'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
                color: 'white',
                }}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, color: 'white'}}>
                <Group sx={{height:110, width:110}}/>
                <Typography variant="h1">
                    Reactivities
                </Typography>
            </Box>
            <Typography variant="h2">
                    Welcome to Reactivities
            </Typography>
            <Button
                    component={Link}
                    to={"/activities"}
                    size={'large'}
                    variant={'contained'}
                    sx={{height: 80, borderRadius: 4, fontSize: '1.5rem'}}
                >
                    Take me to the activities
                </Button>
        </Paper>
    )
}