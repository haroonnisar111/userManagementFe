import React, { useState } from 'react';
import data from '../data.json';
import { TextField, Grid, InputAdornment } from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import User from './components/User';

const UserList = () => {
  const [searchString, setSearchString] = useState('');
  const [userList, setUserList] = useState(data);

  const filteredUserData = userList.filter(user => {
    const fullName = `${user.first} ${user.last}`.toLowerCase();
    return fullName.includes(searchString.toLowerCase());
  });

  const handleFilterDelete = id => {
    setUserList(prevUserList => prevUserList.filter(user => user.id !== id));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <TextField
          size='small'
          placeholder='Search'
          fullWidth
          variant='outlined'
          onChange={e => setSearchString(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CiSearch fontSize='25px' />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        {filteredUserData.map(user => (
          <User
            key={user.id}
            user={user}
            handleFilterDelete={handleFilterDelete}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default UserList;
