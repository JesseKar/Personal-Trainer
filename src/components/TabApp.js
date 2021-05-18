import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customers from './Customers';
import Trainings from './Trainings';
import Calendar from './Calendar';

function TabApp() {

    const [value, setValue] = useState('home');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
    <div>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} >
                <Tab value="home" label="Home" />
                <Tab value="customers" label="Customers" />
                <Tab value="trainings" label="Trainings" />
                <Tab value="calendar" label="Calendar" />
            </Tabs>
            </AppBar>
        {value === 'home' && <h1>Welcome to the Personal Trainer home page!</h1>}
        {value === 'customers' && <div><Customers /></div>}
        {value === 'trainings' && <div><Trainings /></div>}
        {value === 'calendar' && <div><Calendar /></div>}
    </div>
    );
}

export default TabApp;