import {CssBaseline, Container, Box, Typography} from "@mui/material";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import { useState } from "react";
import {Activity} from "../../lib/types";
import {useActivities} from "../../lib/hooks/useActivities.ts";

function App() {
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    const { activities, isPending } = useActivities();
    
    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities!.find(x => x.id === id))
    }
    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined)
    }
    const handleFormOpen = (id?: string) => {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }

  return (
    <Box sx={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
        <CssBaseline />
        <NavBar
            openForm={handleFormOpen}
        />
        <Container maxWidth={'xl'} sx={{marginTop: 3}}>
            { !activities || isPending
                ? <Typography>Loading...</Typography>
                : (<ActivityDashboard
                     activities={activities}
                     selectActivity={handleSelectActivity}
                     cancelSelectActivity={handleCancelSelectActivity}
                     selectedActivity={selectedActivity}
                     openForm={handleFormOpen}
                     closeForm={handleFormClose}
                     editMode={editMode}
                 />)}
        </Container>
    </Box>
  )
}

export default App
