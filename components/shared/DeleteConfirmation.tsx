'use client';
import React from 'react'
import Modal from '@/components/shared/Modal';
import { Box, Button, Typography } from '@mui/material';

interface DeleteConfirmationModalProp {
  open: boolean,
  setOpen: any,
  handleDelete: any,
  text?: string,
  [x: string]: any
}

const DeleteConfirmationModal = ({ open, setOpen, handleDelete, text, ...rest }: DeleteConfirmationModalProp) => {

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      heading='Confirm Delete'
      subheading={text ?? 'Are you sure you want to delete this item?'}
      {...rest}
    >

      <Box>
        {rest.children}
      </Box>
      <Box sx={{
        p: '15px',
      }}>
        {
          !!rest.warningText &&
          <Typography variant='subtitle2' color='error'>
            {rest.warningText}
          </Typography>
        }
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'stretch',
        gap: '10px',
        padding: '15px',
        width: '100%',
      }}>
        <Button variant='contained' color="primary" onClick={() => setOpen(false)}>
          cancel
        </Button>
        <Button variant='contained' color="error" onClick={() => handleDelete()}>
          Delete
        </Button>
      </Box>
    </Modal>
  )
}

export default DeleteConfirmationModal;

