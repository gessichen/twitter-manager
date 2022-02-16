import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Scrollbar from './Scrollbar';
import IconButton from '@mui/material/IconButton';
import { Add, Delete, LineAxis } from '@mui/icons-material';
import Divider from '@mui/material/Divider';

import useMounted from './useMounted';

import axios from "axios";

const GameTable = () => {
  const [games, setGames] = React.useState([]);

  const mounted = useMounted(); 

  const getGames = React.useCallback(async () => {
    try {
      const data = await axios.get("https://spl-it.xyz/gamefidata/api/v1/game_proj");

      console.log(data);

      if (mounted.current) {
        setGames(data.data.games);       
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  React.useEffect(() => {
    getGames();
  }, [getGames])


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <IconButton onClick={() => {
            window.open("http://localhost:3000/addgame");
          }}>
              <Add /> Add New Game
          </IconButton>
          {
            games.map((g) => 
            <>
            <div style={{display: "flex", justifyContent: "start", alignItems: "center", flexDirection: "row"}}>
              <div style={{display: "flex", justifyContent: "start", margin: "12px", width: '200px', cursor: 'pointer'}} onClick={()=>{
                window.open(`http://localhost:3000/editgame?game_id=${g.game_id}&chain=${g.chain}&game_name=${g.game_name}`);
              }}>
                {`${g.game_name}`}
              </div>
              <div style={{color: 'blue'}}>
                {`${g.chain}`}
              </div>
              <div style={{marginLeft: 'auto'}} >
              <IconButton style={{marginLeft: 'auto'}} onClick={() => {
                window.open(`http://localhost:3000/gamedata?game_id=${g.game_id}`);
              }}>
                  <LineAxis />
              </IconButton>
              <IconButton onClick={() => {
                axios({
                  method: "delete",
                  url: "https://spl-it.xyz/gamefidata/api/v1/game_proj",
                  data: {
                    game_id: g.game_id,
                    chain: g.chain
                  },
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(() => {
                  getGames();
                })
                .catch((e) => {
                  console.log(e);
                })
              }}>
                  <Delete />
              </IconButton>
              </div>
            </div>
            <Divider />
            </>
            )
          }
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default GameTable;
