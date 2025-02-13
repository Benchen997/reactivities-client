import {Grid2, Typography} from "@mui/material";
import {useParams} from "react-router";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import ActivityDetailsHeader from "./ActivityDetailsHeader.tsx";
import ActivityDetailsInfo from "./ActivityDetailsInfo.tsx";
import ActivityDetailsChat from "./ActivityDetailsChat.tsx";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar.tsx";


export default function ActivityDetailPage() {
    const { id } = useParams<{id: string}>();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) return <Typography variant={'h4'}>Loading...</Typography>

    if (!activity) return <Typography variant={'h4'}>Activity not found</Typography>

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </Grid2>
            <Grid2 size={4}>
                <ActivityDetailsSidebar/>
            </Grid2>
        </Grid2>
    )
}