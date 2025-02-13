import {Activity} from "../../../lib/types";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type props = {
    activity: Activity
    cancelSelectActivity: () => void
    openForm: (id?: string) => void
}
export default function ActivityDetail( {activity, cancelSelectActivity, openForm}: props) {
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
                <Button color={'primary'} onClick={() => openForm(activity.id) }>Edit</Button>
                <Button onClick={() => cancelSelectActivity()}
                    color={'inherit'}>Cancel</Button>
            </CardActions>
        </Card>
    )
}