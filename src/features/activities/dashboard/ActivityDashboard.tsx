import { Grid2, Typography } from "@mui/material";
import ActivityList from "./ActivityList.tsx";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import ActivityFilters from "./ActivityFilters.tsx";


export default function ActivityDashboard() {

    const { activities, isPending } = useActivities();

    if (!activities || isPending) return <Typography>Loading...</Typography>;

    return (
        <Grid2 container={true} spacing={3}>
            <Grid2 size={7}>
                <ActivityList/>
            </Grid2>
            <Grid2 size={5}>
               <ActivityFilters/>
            </Grid2>
        </Grid2>
    )
}