import {useEffect, useState} from 'react';
import { Activity } from './lib/types';
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import axios from "axios";

function App() {
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
       axios.get<Activity[]>('http://localhost:5000/api/activities').then(
           response => {
            setActivities(response.data)})
    }, [])

  return (
    <>
        <Typography variant={"h3"}>Activities</Typography>
        <List>
            {activities.map(activity => (
            <ListItem key={activity.id}>
               <ListItemText>{activity.title}</ListItemText>
            </ListItem>
            ))}
        </List>
    </>
  )
}

export default App
