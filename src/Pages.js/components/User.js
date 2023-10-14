import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Accordion,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
  Box,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEdit,
} from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { TbSquareRoundedArrowDown } from 'react-icons/tb';
import DeleteUserDialog from './DeleteUserDialog';

const User = ({ user, handleFilterDelete }) => {
  const [editedState, setEditedState] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState(user);

  const { dob, gender, description, picture, country, first, last, id } =
    userData;

  const handlePanelChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setEditedState(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setUserData(prevUserData => ({
        ...prevUserData,
        first: '',
        last: value,
      }));
    } else {
      setUserData(prevUserData => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleDeleteCallBack = deleted => {
    handleFilterDelete(id, deleted);
    setDeleteDialog(false);
  };
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dob.getFullYear();

    if (
      currentDate <
      new Date(currentDate.getFullYear(), dob.getMonth(), dob.getDate())
    ) {
      age--;
    }

    return age;
  }
  const handleFilterAdult = (deleteUser, edit) => {
    if (deleteUser && calculateAge(dob) > 18) {
      setDeleteDialog(true);
    } else if (edit && calculateAge(dob) > 18) {
      setEditedState(!editedState);
    } else {
      alert('you are minor you cant manipulate the details');
    }
  };

  const renderDetails = () => {
    if (editedState) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              variant='outlined'
              size='small'
              id='age'
              name='dob'
              onChange={handleChange}
              type='date'
              value={dob}
              fullWidth
              label='age'
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              variant='outlined'
              size='small'
              id='gender'
              fullWidth
              name='gender'
              onChange={handleChange}
              select
              label='gender'
              value={gender}
            >
              <MenuItem value='male'>male</MenuItem>
              <MenuItem value='Female'>female</MenuItem>
              <MenuItem value='Transgender'>transgender</MenuItem>
              <MenuItem value='Rather not say'>rather not say</MenuItem>
              <MenuItem value='Other'>other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              variant='outlined'
              fullWidth
              size='small'
              onChange={handleChange}
              id='country'
              name='country'
              value={country}
              autoFocus
              label='country'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              variant='outlined'
              fullWidth
              size='small'
              onChange={handleChange}
              id='description'
              name='description'
              value={description}
              rows={4}
              multiline
              label='Description'
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            spacing={2}
            display='flex'
            justifyContent='flex-end'
          >
            <AiOutlineCheckCircle
              fontSize='28px'
              color='green'
              ml='2'
              onClick={() => setEditedState(!editedState)}
            />
            <AiOutlineCloseCircle
              onClick={() => {
                setEditedState(!editedState);
                setUserData(user);
              }}
              fontSize='28px'
              color='red'
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <ListItemText secondary={calculateAge(dob)} primary='Age' />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <ListItemText secondary={gender} primary='gender' />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <ListItemText secondary={country} primary='Country' />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <ListItemText secondary={description} primary='Descriptipn' />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            spacing={2}
            display='flex'
            justifyContent='flex-end'
          >
            <HiOutlineTrash
              fontSize='28px'
              color='red'
              cursor='pointer'
              ml='2px'
              onClick={() => handleFilterAdult(true, false)}
            />
            <AiOutlineEdit
              onClick={() => handleFilterAdult(false, true)}
              fontSize='28px'
              color='blue'
              cursor='pointer'
            />
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <>
      <Accordion
        sx={{ mt: 1 }}
        key={id}
        expanded={expanded === 'panel' + id}
        onChange={handlePanelChange('panel' + id)}
      >
        <AccordionSummary
          expandIcon={<TbSquareRoundedArrowDown />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Box
            sx={{
              height: '50px',
              width: '50px',
              display: 'flex',
              borderRadius: '50%',
            }}
          >
            <img src={picture} alt='profile' style={{ borderRadius: '50%' }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ml: 2,
            }}
          >
            {editedState ? (
              <TextField
                variant='outlined'
                size='small'
                id='name'
                name='name'
                onChange={handleChange}
                value={`${first} ${last}`}
                fullWidth
              />
            ) : (
              <Typography variant='h6'>{`${first} ${last}`}</Typography>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>{renderDetails()}</AccordionDetails>
      </Accordion>
      <DeleteUserDialog
        open={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        handleDeleteCallBack={handleDeleteCallBack}
      />
    </>
  );
};

export default User;
