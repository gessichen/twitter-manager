import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Scrollbar from './Scrollbar';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import axios from "axios";

const EditGame = () => {

    const search = window.location.search;
    const gameIdProp = new URLSearchParams(search).get("game_id");
    const gameNameProp = new URLSearchParams(search).get("game_name");
    const gameChainProp = new URLSearchParams(search).get("chain");

    const [gameId, setGameId] = React.useState(gameIdProp);
    const [gameName, setGameName] = React.useState(gameNameProp);
    const [gameChain, setGameChain] = React.useState(gameChainProp);
    const [gameContracts, setGameContracts] = React.useState([]);

    React.useEffect(() => {
        axios.get(`https://spl-it.xyz/gamefidata/api/v1/game_contract?game_id=${gameId}&chain=${gameChain}`)
        .then((r) => {
            setGameContracts(r.data.contracts);
        })
        .catch((e) => {
            console.log(e);
        })
    }, [gameId, gameChain])

    return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 700, paddingX: '40px', paddingY: '60px', display: 'flex', flexDirection: 'column' }}>
            <TextField 
                style={{marginBottom: '20px'}} 
                id="gameid" 
                label="Game ID"
                value={gameId}
                variant="outlined"
                onChange={(e) => {
                    setGameId(e.target.value);
                }}
            />
            <TextField 
                style={{marginBottom: '20px'}} 
                id="gamename" 
                label="Game Name"
                value={gameName} 
                variant="outlined"
                onChange={(e) => {
                    setGameName(e.target.value);
                }} 
            />
            <Select style={{marginBottom: '20px'}}
                labelId="chain-label"
                id="chain-select"
                value={gameChain}
                label="Chain"
                variant="outlined"
                onChange={(e)=>{
                    setGameChain(e.target.value);
                }}
                >
                <MenuItem value={'eth'}>Ethereum</MenuItem>
                <MenuItem value={'polygon'}>Polygon</MenuItem>
                <MenuItem value={'wax'}>Wax</MenuItem>
                <MenuItem value={'solana'}>Solana</MenuItem>
                <MenuItem value={'bsc'}>BSC</MenuItem>
                <MenuItem value={'avax'}>Avalanche</MenuItem>
            </Select>

            <TextField style={{marginBottom: '20px'}}
                id="game-contracts"
                label="Cosntracts"
                placeholder="Contracts"
                rows={5}
                multiline
                value={gameContracts.join("\n")}
                onChange={(e) => {
                    setGameContracts(e.target.value.split('\n'));
                }}
            />

            <Button 
                variant="text"
                size="large"
                onClick={() => {
                    const contracts = gameContracts.filter((i) => i.length>5);
                    console.log(contracts);

                    axios({
                        method: "post",
                        url: "https://spl-it.xyz/gamefidata/api/v1/game_contract",
                        data: {
                          game_id: gameId,
                          chain: gameChain,
                          contracts: contracts
                        },
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                      .then(() => {
                        window.location.reload(false);
                      })
                      .catch((e) => {
                          alert(e);
                      })
                }}
            >
                Sumbit
            </Button>
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default EditGame;
