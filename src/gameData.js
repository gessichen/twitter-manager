import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Scrollbar from './Scrollbar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

import axios from "axios";

const GameData = () => {

    const nowDate = new Date();
    const dayBeforeNow = new Date(nowDate.getTime() - 7*24*60*60*1000);

    const nowStr = nowDate.toISOString().split('T')[0];
    const dayBeforeStr = dayBeforeNow.toISOString().split('T')[0];

    const [dauStart, setDauStart] = React.useState(dayBeforeStr);
    const [dauEnd, setDauEnd] = React.useState(nowStr);

    const [gameData, setGameData] = React.useState([]);

    const search = window.location.search;
    const gameIdProp = new URLSearchParams(search).get("game_id");

    const [gameId, setGameId] = React.useState(gameIdProp);


    return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 700, paddingX: '40px', paddingY: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2>DAU</h2>
            <TextField 
                style={{marginBottom: '20px'}} 
                id="dau_start" 
                label="Start date"
                value={dauStart}
                variant="outlined"
                onChange={(e) => {
                    setDauStart(e.target.value);
                }}
            />

            <TextField 
                style={{marginBottom: '20px'}} 
                id="dau_end" 
                label="End date"
                value={dauEnd}
                variant="outlined"
                onChange={(e) => {
                    setDauEnd(e.target.value);
                }}
            />
            <Button
                style={{marginBottom: '20px'}} 
                variant="text"
                size="large"
                onClick={() => {

                    axios({
                        method: "get",
                        url: `https://spl-it.xyz/gamefidata/api/v1/dau?gameid=${gameId}&start=${dauStart}&end=${dauEnd}`,
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                      .then((r) => {
                        const data = r.data.data.map((g) => (
                        {   date: (new Date(g.date * 1000)).toISOString().split('T')[0],
                            dau: g.dau
                        }
                        ));
                        setGameData(data);
                      })
                      .catch((e) => {
                          alert(e);
                      })
                }}
            >
                Sumbit
            </Button>
            <Paper>
                <Chart
                data={gameData}
                >
                <ArgumentAxis />
                <ValueAxis />

                <LineSeries valueField="dau" argumentField="date" />
                </Chart>
            </Paper>
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default GameData;
