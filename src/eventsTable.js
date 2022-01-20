import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Scrollbar from './Scrollbar';

import { Add } from '@mui/icons-material';
import useMounted from './useMounted';

import axios from "axios";

const applyPagination = (
  events,
  page,
  limit
) => events
  .slice(page * limit, page * limit + limit);


const EventListTable = () => {
  const [events, setEvents] = React.useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const mounted = useMounted(); 

  const getEvents = React.useCallback(async () => {
    try {
      const data = await axios.get("https://spl-it.xyz/twitterspy/api/v1/tweet");

      console.log(data);

      if (mounted.current) {
        setEvents(data.data.tweets.reverse());       
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  React.useEffect(() => {
    getEvents();
  }, [getEvents])

  const convertTs2Date = (ts) => {
    let date = new Date(ts * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let formattedTime = month + "-" + day + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  //(customers, query, filters);
  //const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedEvents = React.useMemo(()=> {
    if(events) {
      console.log(events);
      return applyPagination(events, page, limit);
    } else {
      return [];
    }
  }, [events, page, limit])

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Account
                </TableCell>
                <TableCell>
                  Link
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEvents.map((event) => {
                return (
                  <TableRow
                    hover
                    key={event.vid}
                  >
                    <TableCell>
                      {`${event.vname}`}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Box sx={{ ml: 1 }}>
                          <Link href={"https://twitter.com/" + event.vname + "/status/" + event.tid}>
                            twitter link
                          </Link>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {`${convertTs2Date(event.ts)}`}
                    </TableCell>
                    <TableCell align="right">
                      {event.status === 1 && <IconButton onClick={() => {
                        axios({
                          method: "post",
                          url: "https://spl-it.xyz/twitterspy/api/v1/tweet",
                          data: {
                            tid: event.tid,
                            status: 2
                          },
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(() => {
                          getEvents();
                        })
                      }}>
                         <Add />
                      </IconButton>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={events? events.length: 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default EventListTable;
