import {Button, Paper, Typography} from "@mui/material";
import {SearchOff} from "@mui/icons-material";
import {Link} from "react-router";

export default function NotFound() {
    return (
        <Paper sx={{
            height:400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            p: 6
        }}>
            <SearchOff sx={{fontSize: 100}} color={"primary"}/>
            <Typography gutterBottom={true} variant="h3">
                Oops - we can't find what you're looking for
            </Typography>
            <Button fullWidth={true} variant="contained"
                    color="primary" component={Link} to={'/activities'}>
                Return to home page
            </Button>
        </Paper>
    );
}