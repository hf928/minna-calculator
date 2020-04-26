import React, { useReducer } from 'react';
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

function App () {

    const [value, setValue] = React.useState('normal');

    const handleChange = (event, newValue) => setValue(newValue);
       
    return (

        <div>
            <AppBar position="fixed">
                <Tabs
                    value={value}
                    onChange={handleChange}
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
                        <Normal/>
                    </TabPanel>
                    <TabPanel
                        index="inverse"
                        value={value}
                    >
                        <Inverse/>
                    </TabPanel>
                </Box>
            </Container>
            
        </div>
        
    );
}

export default App;
