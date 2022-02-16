import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import TwitterListTable from './twitterTable';
import EventListTable from './eventsTable';
import GameTable from './gameTable';
import useMounted from './useMounted';


const tabs = [
  {
    label: 'Accounts',
    value: 'accounts'
  },
  {
    label: 'Events',
    value: 'events'
  },
  {
    label: 'Contracts',
    value: 'contracts'
  },
];

function App() {

  const [currentTab, setCurrentTab] = React.useState('accounts');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const currentComp = React.useMemo(() => {
    if(currentTab === "accounts") {
      return <TwitterListTable />
    } else if(currentTab === "events") {
      return <EventListTable />
    } else {
      return <GameTable />
    }
  }, [currentTab])
  
  return (
    <div className="App">
      <h3>Twitter dashboard</h3>
      <Box sx={{m: 10}}>
        <Tabs
          indicatorColor="primary"
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="primary"
          value={currentTab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{marginLeft: 10, marginRight: 10, marginTop: -8}}>
        { currentComp }
      </Box>
    </div>
  );
}

export default App;
