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

const StarSharksData = () => {

    const nowDate = new Date(new Date() - 4*24*60*60*1000);
    const dayBeforeNow = new Date(new Date() - 11*24*60*60*1000);

    const nowStr = nowDate.toISOString().split('T')[0];
    const dayBeforeStr = dayBeforeNow.toISOString().split('T')[0];

    const [dauStart, setDauStart] = React.useState(dayBeforeStr);
    const [dauEnd, setDauEnd] = React.useState(nowStr);

    const timestamps = React.useMemo(() => {
        const ss = new Date(dauStart).getTime() / 1000;
        const se = new Date(dauEnd).getTime() / 1000;

        const ts = [];
        let t = ss;
        while(t < se) {
            t += 24*60*60;
            ts.push(t);
        }

        return ts;
    }, [dauStart, dauEnd])

    const [dauData, setDauData] = React.useState([]);
    const [trxData, setTrxData] = React.useState([]);

    return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 700, paddingX: '40px', paddingY: '40px', display: 'flex', flexDirection: 'column' }}>
            <h2>DAU & TRX</h2>
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
                        method: "post",
                        url: `https://wksix6r85d.execute-api.us-west-1.amazonaws.com/staging/data`,
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        data: {
                            "jsonrpc": "2.0",
                            "method": "getDaus",
                            "params": timestamps.map((t) => ({timestamp: t})),
                        }
                      })
                      .then((r) => {
                        setDauData(r.data)
                      })
                      .catch((e) => {
                          alert(e);
                      })

                      axios({
                        method: "post",
                        url: `https://wksix6r85d.execute-api.us-west-1.amazonaws.com/staging/data`,
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        data: {
                            "jsonrpc": "2.0",
                            "method": "getDailyTransactionVolumes",
                            "params": timestamps.map((t) => ({timestamp: t})),
                        }
                      })
                      .then((r) => {
                          console.log(r);
                        setTrxData(r.data)
                      })
                      .catch((e) => {
                          alert(e);
                      })
                }}
            >
                Sumbit
            </Button>
            <h3>DAU</h3>
            {
                dauData.map((rd) => 
                <div style={{marginBottom: '20px'}}>
                    <div style={{marginBottom: '10px'}}>
                        {new Date(rd.dateTimestamp*1000).toUTCString()}
                    </div>
                    <div>
                        total
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        {rd.totalActiveUsers.totalUserCount}
                    </div>

                    <div>
                        new
                    </div>
                    <div>
                        {rd.newActiveUsers.totalUserCount}
                    </div>

                    <div style={{marginLeft: '20px'}}>
                        rentee
                    </div>
                    <div style={{marginLeft: '20px'}}>
                        {rd.newActiveUsers.payerCount.renteeCount}
                    </div>

                    <div style={{marginLeft: '20px'}}>
                        purchaser
                    </div>
                    <div style={{marginLeft: '20px'}}>
                        {rd.newActiveUsers.payerCount.purchaserCount}
                    </div>
                </div>
                )
            }
            <h3>TRX</h3>
            {
                trxData.map((rd) => 
                <div style={{marginBottom: '20px'}}>
                    <div style={{marginBottom: '10px'}}>
                        {new Date(rd.dateTimestamp*1000).toUTCString()}
                    </div>
                    <div>
                        total
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        {rd.totalTransactionVolume.renterTransactionVolume 
                        + rd.totalTransactionVolume.purchaserTransactionVolume 
                        + rd.totalTransactionVolume.withdrawerTransactionVolume}
                    </div>

                    <div style={{marginLeft: '20px'}}>
                        rentee
                    </div>
                    <div style={{marginLeft: '20px', marginBottom: '20px'}}>
                        {rd.totalTransactionVolume.renterTransactionVolume}
                    </div>

                    <div style={{marginLeft: '20px'}}>
                        purchaser
                    </div>
                    <div style={{marginLeft: '20p', marginBottom: '20px'}}>
                        {rd.totalTransactionVolume.purchaserTransactionVolume}
                    </div>

                    <div style={{marginLeft: '20px'}}>
                        withdrawl
                    </div>
                    <div style={{marginLeft: '20px'}}>
                        {rd.totalTransactionVolume.withdrawerTransactionVolume}
                    </div>
                </div>
                )
            }
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default StarSharksData;
