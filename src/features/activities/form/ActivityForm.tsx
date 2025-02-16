import {Box, Button, Paper, Typography} from "@mui/material";
import {useEffect} from "react";
import { useActivities } from "../../../lib/hooks/useActivities.ts";
import {NavLink, useParams} from "react-router";
import {FieldValues, useForm} from "react-hook-form";
import {activitySchema, ActivitySchema} from "../../../lib/schemas/activitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/TextInput.tsx";
import SelectInput from "../../../app/shared/SelectInput.tsx";
import {categoryOptions} from "./categoryOptions.ts";
import DateTimeInput from "../../../app/shared/DateTimeInput.tsx";



export default function ActivityForm() {

    const { control, reset } = useForm<ActivitySchema>({
        mode:'onTouched',
        resolver: zodResolver(activitySchema),
    });

    const { id } = useParams<{id: string}>();

    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

    useEffect(() => {
        if (activity) {
            // make use of React form hook reset method to reset the form
            reset(activity);
        }
    }, [activity, reset]);

    const handleSub = (data: FieldValues) => {
        console.log(data);
    }

    if (isLoadingActivity) return <Typography variant={'h4'}>Loading...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            {/* 1. form header*/}
            <Typography variant={"h5"} gutterBottom={true} color={"primary"}>
                {
                    activity ? 'Edit Activity' : 'Create Activity'
                }
            </Typography>

            {/* 2. form */}
            <Box component={"form"} onSubmit={handleSub} display={"flex"} flexDirection={"column"} gap={3}>

                <TextInput label={'Title'} control={control} name={'title'} />

                <TextInput label={'Description'} control={control} name={'description'} multiline rows={3}/>

                <SelectInput label={'Category'} items={categoryOptions} name={'category'}  control={control}/>

                <DateTimeInput label={'Date'} control={control} name={'date'} />

                <TextInput label={'City'} control={control} name={'city'} />

                <TextInput label={'Venue'} control={control} name={'venue'} />

                {/* 3. form actions */}
                <Box display={"flex"} justifyContent={"end"} gap={3}>
                    <Button component={NavLink} to={`/activities`} color={"inherit"}>Cancel</Button>
                    <Button
                        type={'submit'}
                        variant={"contained"}
                        color={"success"}
                        disabled={ updateActivity.isPending || createActivity.isPending }
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}