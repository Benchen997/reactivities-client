import {useStore} from "../../lib/hooks/useStore.ts";
import {observer} from "mobx-react-lite";
import {Box, Button, ButtonGroup, List, Paper, Typography} from "@mui/material";


const Counter = observer(function Counter() {

    const {counterStore} = useStore();

    return (
        <Box display={'flex'} alignItems={'space-between'}>
            {/*<Observer>
                {() => (
                    <>
                        <Typography variant={'h4'} gutterBottom={true}>Counter store</Typography>
                        <Typography variant={'h4'} gutterBottom={true}>{counterStore.count}</Typography>
                    </>
                )}
            </Observer>*/}
            <Box sx={{width: '60%'}}>
                <Typography variant={'h4'} gutterBottom={true}>{counterStore.title}</Typography>
                <Typography variant={'h4'} gutterBottom={true}>{counterStore.count}</Typography>
                <ButtonGroup sx={{mt:3}}>
                    <Button onClick={()=>counterStore.increment()} variant={'contained'} color={'primary'}>Increment</Button>
                    <Button onClick={()=>counterStore.decrement()} variant={'contained'} color={'error'}>Decrement</Button>
                    <Button onClick={()=>counterStore.increment(5)} variant={'contained'} color={'primary'}>Increment 5</Button>
                    <Button onClick={()=>counterStore.decrement(5)} variant={'contained'} color={'error'}>Decrement 5</Button>
                </ButtonGroup>
            </Box>
            <Paper sx={{width: '40%', p: 4}}>
                <Typography variant={'h4'} gutterBottom={true}>Counter Events:{counterStore.eventCount}</Typography>
                <List>
                    {
                        counterStore.events.map((event, index) => (
                            <Typography key={index}>{event}</Typography>
                        ))
                    }
                </List>
            </Paper>
        </Box>
    );
});
export default Counter;