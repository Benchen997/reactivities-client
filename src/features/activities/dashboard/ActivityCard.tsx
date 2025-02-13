import {Activity} from "../../../lib/types";
import {Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Typography, Divider} from "@mui/material";
import {Link, NavLink} from "react-router";
import {AccessTime, Place} from "@mui/icons-material";
import {formatDate} from "../../../lib/util/util.ts";


type props = {
    activity: Activity
}

export default function ActivityCard({ activity }: props) {

    const isHost:boolean = false;
    const isGoing:boolean = false;
    const label = isHost ? 'You are hosting' : "You are going";
    const isCancelled : boolean = false;
    const color = isHost ? 'primary' : isGoing ? 'warning' : 'default';

    return (
        <Card elevation={3} sx={{borderRadius: 3 }}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <CardHeader
                    avatar={<Avatar sx={{ height:80, width: 80}}/>}
                    title={activity.title}
                    slotProps={{ title: { fontWeight: 'bold', fontSize: 20 }}}
                    subheader={
                    <>
                        Hosted by {''} <Link to={`/profile/bob`}>Bob</Link>
                    </>
                    }
                />
                <Box display={'flex'} flexDirection={'column'} gap={2} mr={2}>
                    {(isHost || isGoing) && (
                        <Chip label={label} color={color} variant={'outlined'} sx={{borderRadius: 2}}/>
                    )}
                    {isCancelled && (
                        <Chip label={'Cancelled'} color={'error'} variant={'outlined'} sx={{borderRadius: 2}}/>
                    )}
                </Box>
            </Box>

            <Divider sx={{mb:3}}/>
            <CardContent>
                <Box display={'flex'} alignItems={'center'} mb={2} px={2}>
                    <Box display={'flex'} alignItems={'center'} flexGrow={1}>
                        <AccessTime sx={{mr:1}}/>
                        <Typography variant={'body2'} noWrap={true}>
                            {formatDate(activity.date)}
                        </Typography>
                    </Box>
                    <Place sx={{ml:3, mr:1}}/>
                    <Typography variant={'body2'}>{activity.venue}</Typography>
                </Box>
                <Divider/>
                <Box display={'flex'} gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3}}>
                    Attendees goes here
                </Box>
            </CardContent>
            <CardContent sx={{pb: 2 }}>
                <Typography variant={'body2'}>{activity.description}</Typography>
                <Button
                    component={NavLink}
                    to={`/activities/${activity.id}`}
                    color={'primary'}
                    size={'medium'}
                    variant={"contained"}
                    sx={{display: 'flex', justifySelf:"self-end", borderRadius: 3 }}
                >View</Button>
            </CardContent>
        </Card>
    )
}