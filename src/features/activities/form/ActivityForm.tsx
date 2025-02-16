import {Box, Button, Paper, Typography} from "@mui/material";
import {useEffect} from "react";
import { useActivities } from "../../../lib/hooks/useActivities.ts";
import {NavLink, useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {activitySchema, ActivitySchema} from "../../../lib/schemas/activitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/TextInput.tsx";
import SelectInput from "../../../app/shared/SelectInput.tsx";
import {categoryOptions} from "./categoryOptions.ts";
import DateTimeInput from "../../../app/shared/DateTimeInput.tsx";
import LocationInput from "../../../app/shared/LocationInput.tsx";



export default function ActivityForm() {

    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode:'onTouched',
        resolver: zodResolver(activitySchema),
    });

    const { id } = useParams<{id: string}>();

    const navigate = useNavigate();

    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

    useEffect(() => {
        if (activity) {
            // make use of React form hook reset method to reset the form
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                }
            });
        }
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const {location, ...rest} = data;
        const flattenedData = {...rest, ...location};
        try {
            if (activity) {
                updateActivity.mutate({...activity, ...flattenedData}, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            } else {
                // @ts-ignore
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        } catch (error) {
            console.log(error);
        }
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
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)} display={"flex"} flexDirection={"column"} gap={3}>

                <TextInput label={'Title'} control={control} name={'title'} />

                <TextInput label={'Description'} control={control} name={'description'} multiline rows={3}/>


                <Box display={"flex"} gap={3}>
                    <SelectInput label={'Category'} items={categoryOptions} name={'category'}  control={control}/>

                    <DateTimeInput label={'Date'} control={control} name={'date'} />
                </Box>

                <LocationInput control={control} name={'location'} label={'Enter the location'} />

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