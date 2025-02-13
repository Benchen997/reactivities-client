import { Grid2 } from "@mui/material";
import {Activity} from "../../../lib/types";
import ActivityList from "./ActivityList.tsx";
import ActivityDetail from "../details/ActivityDetail.tsx";
import ActivityForm from "../form/ActivityForm.tsx";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    selectedActivity: Activity | undefined
    openForm: (id?: string) => void
    closeForm: () => void
    editMode: boolean
}

export default function ActivityDashboard(
    { activities, selectedActivity, selectActivity, cancelSelectActivity, openForm, closeForm, editMode }: Props) {
    return (
        <Grid2 container={true} spacing={3}>
            <Grid2 size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                />
            </Grid2>
            <Grid2 size={5}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetail
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {
                    editMode &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity}/>
                }
            </Grid2>
        </Grid2>
    )
}