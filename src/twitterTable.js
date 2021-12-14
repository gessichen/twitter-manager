import { useState } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography  from '@mui/material/Typography';

import Scrollbar from './Scrollbar';

import { Search, Delete, Add } from '@mui/icons-material';
import useMounted from './useMounted';

import axios from "axios";

const tabs = [
  {
    label: 'Added',
    value: 'added'
  },
  {
    label: 'New',
    value: 'new'
  },
];

const sortOptions = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Total orders (highest)',
    value: 'orders|desc'
  },
  {
    label: 'Total orders (lowest)',
    value: 'orders|asc'
  }
];

const applyFilters = (
  twitters,
  query,
) => twitters
  .filter((twitter) => {
    let matches = false;

    if (twitter.toLowerCase().includes(query.toLowerCase())) {
      matches = true;
    }

    return matches;
  });

const applyPagination = (
  twitters,
  page,
  limit
) => twitters
  .slice(page * limit, page * limit + limit);

const descendingComparator = (
  a,
  b,
  orderBy
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
);

const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // @ts-ignore
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    // @ts-ignore
    return a[1] - b[1];
  });

  // @ts-ignore
  return stabilizedThis.map((el) => el[0]);
};

const TwitterListTable= () => {
  const [twitterCollection, setTwitterCollection] = React.useState(null);
  const [twitters, setTwitters] = React.useState([]);
  const [currentTab, setCurrentTab] = useState('added');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);

  const [newAccount, setNewAccount] = useState('');

  const mounted = useMounted(); 

  const getTwitters = React.useCallback(async () => {
    try {
      const data = await axios.get("https://spl-it.xyz/twitterspy/api/v1/vname");

      console.log(data);

      if (mounted.current) {
        setTwitterCollection(data.data);
        if(currentTab === "added") {
          console.log(11);
          setTwitters(data.data.traced);
        } else {
          console.log(2);
          setTwitters(data.data.digged);
        }
       
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted, currentTab]);

  React.useEffect(() => {
    getTwitters();
  }, [getTwitters])

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
    if(value === "added") {
      setTwitters(twitterCollection.traced);
    } else {
      setTwitters(twitterCollection.digged);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleAddChange = (event) => {
    setNewAccount(event.target.value);
  };

  const handleAddClick = (event) => {

    axios({
      method: "post",
      url: "https://spl-it.xyz/twitterspy/api/v1/vname",
      data: {
        vname: newAccount,
        status: 1
      },
      headers: { "Content-Type": "application/json" },
    })
    .then((data) => {
      getTwitters();
      setNewAccount("");
    })
  };


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  //(customers, query, filters);
  //const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedTwitters = React.useMemo(()=> {
    if(twitters) {
      console.log(twitters);
      return applyPagination(applyFilters(twitters, query), page, limit);
    } else {
      return [];
    }
  }, [twitters, page, limit, query])
  
 
  /*const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0
    && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;*/

  return (
    <Card>
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
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 500
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              )
            }}
            onChange={handleQueryChange}
            placeholder="Search twitter accounts"
            value={query}
            variant="outlined"
          />
        </Box>
        <Box
          sx={{
            m: 1,
            width: 240
          }}
        >{/*
          <TextField
            label="Sort By"
            name="sort"
            onChange={handleSortChange}
            select
            SelectProps={{ native: true }}
            value={sort}
            variant="outlined"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>*/}
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          m: -1,
          p: 2
        }}
      >
        <Box
          sx={{
            m: 1,
            maxWidth: '100%',
            width: 500
          }}
        >
          <TextField
            fullWidth
            onChange={handleAddChange}
            placeholder="new twitter account"
            value={newAccount}
            variant="outlined"
          />
          <Button
            color="primary"
            sx={{ ml: 2, mt: 2 }}
            variant="outlined"
            onClick={handleAddClick}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Account
                </TableCell>
                {/*
                    <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Orders
                </TableCell>
                <TableCell>
                  Spent
                </TableCell>
                */}
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTwitters.map((twitter) => {

                return (
                  <TableRow
                    hover
                    key={twitter}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                          {/*
                        <Avatar
                          src={twitter.avatar}
                          sx={{
                            height: 42,
                            width: 42
                          }}
                        >
                          {customer.name}
                        </Avatar>
                        */}
                        <Box sx={{ ml: 1 }}>
                          <Link href={"https://twitter.com/" + twitter}>
                            {twitter}
                          </Link>
                        </Box>
                      </Box>
                    </TableCell>
                    {/*
                    <TableCell>
                      {`${customer.city}, ${customer.state}, ${customer.country}`}
                    </TableCell>
                    <TableCell>
                      {customer.totalOrders}
                    </TableCell>
                    <TableCell>
                      {customer.currency}
                    </TableCell> */}
                    <TableCell align="right">
                      {currentTab == "added" ? 
                      (<IconButton onClick={() => {
                        axios({
                          method: "delete",
                          url: "https://spl-it.xyz/twitterspy/api/v1/vname?vname=" + twitter,
                        })
                        .then((data) => {
                          getTwitters();
                        })
                      }}>
                         <Delete />
                      </IconButton>): (
                      <IconButton onClick={() => {
                        console.log(1);
                        axios({
                          method: "post",
                          url: "https://spl-it.xyz/twitterspy/api/v1/vname",
                          data: {
                            vname: twitter,
                            status: 1
                          },
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(() => {
                          getTwitters();
                        })
                      }}>
                         <Add />
                      </IconButton>)
                    } 
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
        count={twitters? twitters.length: 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default TwitterListTable;
