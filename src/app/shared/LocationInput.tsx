import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {Box, ListItemText, TextField, Typography, List, ListItemButton, debounce} from "@mui/material";
import {useEffect, useState} from "react";
import {LocationIQSuggestion} from "../../lib/types";
import {useMemo} from "react";
import axios from "axios";

type props<T extends FieldValues> = {
    label: string;
} & UseControllerProps<T>

export default function LocationInput<T extends FieldValues>(props: props<T>) {
    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false);

    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || '');

    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || '');
        } else {
            setInputValue(field.value || '');
        }
    }, [field.value])

    const locationUrl =
        `https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_LOCATION_IQ_API}&limit=5&dedupe=1&`

    const fetchSuggestions = useMemo(
        () => debounce(async (query: string) => {

            // do not call api if query is less than 3 characters
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }
            setLoading(true);
            try {
                const res = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`);
                setSuggestions(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },500), [locationUrl]
    )

    const handleChange = async (value:string) => {
        field.onChange(value);
        await fetchSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address.city || location.address.town || location.address.village || location.address.suburb;
        const venue = location.display_name;
        const latitude = parseFloat(location.lat);
        const longitude = parseFloat(location.lon);

        setInputValue(venue);
        field.onChange({city,venue, latitude, longitude});
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                onChange={(e) => handleChange(e.target.value)}
                value={inputValue}
                fullWidth={true}
                variant={"outlined"}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            { suggestions.length > 0 && (
                <List>
                    {suggestions.map(suggestion => (
                        <ListItemButton
                            divider={true}
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}
                        >
                            <ListItemText>{suggestion.display_name}</ListItemText>
                        </ListItemButton>
                    ))}
                </List>
            )}
        </Box>
    )
}