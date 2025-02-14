import {useLocation} from "react-router";
import {Divider, Paper, Typography} from "@mui/material";

export default function ServerError() {
    const { state } = useLocation();
    return (
        <Paper>
            {
                state.error? (
                    <>
                        <Typography variant={"h3"} gutterBottom={true}
                                    sx={{px:4, pt:2}}
                                    color={"secondary"}>
                            {state.error?.message || "There has been an error"}
                        </Typography>
                        <Divider/>
                        <Typography variant={"body1"} gutterBottom={true}
                                    sx={{px:4, pt:2}}>
                            {state.error.details || "Internal server error"}
                        </Typography>
                    </>
                )
                : (
                    <Typography variant={"h5"} gutterBottom={true}>
                        Server error
                    </Typography>
                    )
            }
        </Paper>
    );
}