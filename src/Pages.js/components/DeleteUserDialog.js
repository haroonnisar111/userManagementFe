import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { RxCross1 } from 'react-icons/rx';

function DeleteUserDialog(props) {
  return (
    <Dialog open={props.open} maxWidth='lg'>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          cursor: 'pointer',
        }}
      >
        <RxCross1 onClick={() => props.setDeleteDialog(false)} />
      </DialogTitle>
      <DialogContent>{`Are you sure you want to delete? you wount be able to retrieve it later`}</DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          sx={{ backgroundColor: 'white' }}
          autoFocus
          onClick={() => props.setDeleteDialog(false)}
        >
          cancel
        </Button>{' '}
        <Button
          variant='contained'
          color='error'
          sx={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => props.handleDeleteCallBack(true)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteUserDialog;
