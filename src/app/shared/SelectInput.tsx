import {FieldValues, useController, UseControllerProps} from 'react-hook-form';
import {Select, FormControl, InputLabel, MenuItem, FormHelperText} from "@mui/material";
import {SelectInputProps} from "@mui/material/Select/SelectInput";

type props<T extends FieldValues> = {
    items: { text: string, value: string }[],
    label?: string
} & UseControllerProps<T> & Partial<SelectInputProps>;

export default function SelectInput<T extends FieldValues>(props: props<T>) {

    const {field, fieldState} = useController({...props});

    return (
        <FormControl fullWidth={true} variant={"outlined"} error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                label={props.label}
                onChange={field.onChange}
                value={field.value || ''}
            >
                {
                    props.items.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.text}
                        </MenuItem>
                    ))
                }
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}