import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {NavLink, useParams} from "react-router";
import {useActivities} from "../../../lib/hooks/useActivities.ts";


export default function ActivityDetail() {
    const { id } = useParams<{id: string}>();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) return <Typography variant={'h4'}>Loading...</Typography>

    if (!activity) return <Typography variant={'h4'}>Activity not found</Typography>

    return (
        <Card sx={{borderRadius: 3 }}>
            <CardMedia
                component={'img'}
                src={`/images/categoryImages/${activity.category}.jpg`}
                alt={activity.title}
                />
            <CardContent>
                <Typography variant={'h5'}>{activity.title}</Typography>
                <Typography variant={'subtitle1'} fontWeight={'light'}>{activity.date}</Typography>
                <Typography variant={'body1'}>{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button component={NavLink} to={`/editActivity/${activity.id}`} color={'primary'}>Edit</Button>
                <Button component={NavLink} to={`/activities`} color={'inherit'}>Cancel</Button>
            </CardActions>
        </Card>
    )
}