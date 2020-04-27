import React, { useReducer, useCallback } from 'react';
import { Container, Box, AppBar, Tabs, Tab } from '@material-ui/core';

import Normal from './container/Normal';
import Inverse from './container/Inverse';

const TabPanel = ({ value, index ,children }) => (
    <div style={
        {
            display: value === index ? 'block' : 'none'
        }
    }>
        {
            children
        }
    </div>
);

const initState = {
    exrate: localStorage.getItem('exrate') ? localStorage.getItem('exrate') : '1',
    minFee: localStorage.getItem('minFee') ? localStorage.getItem('minFee') : '200',
    maxFee: localStorage.getItem('maxFee') ? localStorage.getItem('maxFee') : '800',
    feeRate: localStorage.getItem('feeRate') ? localStorage.getItem('feeRate') : '0.0005',
};

const stateReducer = (state, action) => {

    const newState = { ...state };

    switch (action.type) {

        case 'UPDATE_EXRATE':

            newState.exrate = action.payload;
            localStorage.setItem('exrate', action.payload);

            break;

        case 'UPDATE_MINFEE':

            newState.minFee = action.payload;
            localStorage.setItem('minFee', action.payload);

            break;

        case 'UPDATE_MAXFEE':

            newState.maxFee = action.payload;
            localStorage.setItem('maxFee', action.payload);

            break;

        case 'UPDATE_FEERATE':

            newState.feeRate = action.payload;
            localStorage.setItem('feeRate', action.payload);

            break;

        default:
            
            throw new Error('Something went wrong.');

    }

    return newState;

};


function App () {

    const [value, setValue] = React.useState('normal');
    const [state, dispatch] = useReducer(stateReducer, initState);

    const handleChangeTab = (event, newValue) => setValue(newValue);
    const handleChange = useCallback((e, type) => dispatch({ type, payload: e.target.value }), [dispatch]);

       
    return (

        <div>
            <AppBar position="fixed">
                <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    variant="fullWidth"
                    centered
                >
                    <Tab
                        value="normal"
                        label="正算"
                    />
                    <Tab
                        value="inverse"
                        label="逆算"
                    />
                </Tabs>
            </AppBar>
            <Container fixed>
                <Box pt={6}>
                    <TabPanel
                        index="normal"
                        value={value}
                    >
                        <Normal
                            exrate={state.exrate}
                            minFee={state.minFee}
                            maxFee={state.maxFee}
                            feeRate={state.feeRate}
                            handleChange={handleChange}
                        />
                    </TabPanel>
                    <TabPanel
                        index="inverse"
                        value={value}
                    >
                        <Inverse
                            exrate={state.exrate}
                            minFee={state.minFee}
                            maxFee={state.maxFee}
                            feeRate={state.feeRate}
                            handleChange={handleChange}
                        />
                    </TabPanel>
                </Box>
            </Container>
            
        </div>
        
    );
}

export default App;
