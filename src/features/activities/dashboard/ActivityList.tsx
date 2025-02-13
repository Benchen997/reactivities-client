import {Box} from "@mui/material";
import {Activity} from "../../../lib/types";
import ActivityCard from "./ActivityCard.tsx";

type Props = {
    activities: Activity[]
    selectActivity: (id: string) => void
}

export default function ActivityList({ activities, selectActivity }: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection:"column", gap: 3 }}>
            {
                activities.map(activity => (
                    <ActivityCard
                        activity={activity} key={activity.id}
                        selectActivity={selectActivity}
                    />
                ))
            }
        </Box>
    )
}