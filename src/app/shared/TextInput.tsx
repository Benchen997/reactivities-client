import {FieldValues, useController, UseControllerProps} from 'react-hook-form';
import {TextField, TextFieldProps} from "@mui/material";

type props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps;


export default function TextInput<T extends FieldValues>(props: props<T>) {
    const {field, fieldState} = useController({...props});

    return (
        <TextField
            {...props}
            {...field}
            value={field.value || ''}
            fullWidth={true}
            variant={"outlined"}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    )
}