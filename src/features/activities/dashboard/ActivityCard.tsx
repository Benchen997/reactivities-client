import {Activity} from "../../../lib/types";
import {Box, Button, Card, CardActions, CardContent, Chip, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {NavLink} from "react-router";


type props = {
    activity: Activity
}

export default function ActivityCard({ activity }: props) {
    const { deleteActivity } = useActivities()
    return (
        <Card sx={{borderRadius: 3 }}>
            <CardContent>
                <Typography variant={'h5'}>{activity.title}</Typography>
                <Typography sx={{ color:"text.secondary",mb:1}}>{activity.date}</Typography>
                <Typography variant={"body2"}>{activity.description}</Typography>
                <Typography variant={"subtitle1"}>{activity.city} / {activity.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={activity.category} variant={'outlined'}/>
                <Box display={'flex'} gap={3}>
                    <Button component={NavLink} to={`/activities/${activity.id}`} color={'primary'}
                        size={'medium'} variant={"contained"}>View</Button>
                    <Button
                        onClick={()=> deleteActivity.mutate(activity.id)}
                        color={'error'}
                        size={'medium'}
                        disabled={deleteActivity.isPending}
                        variant={"contained"}
                    >Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}