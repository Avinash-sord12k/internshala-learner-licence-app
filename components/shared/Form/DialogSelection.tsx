'use client';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
import Modal from '@/components/shared/Modal';

type DialogSelectionProps = {
  id: string,
  name: string,
  label: string,
  control: any,
  options: {
    label: string,
    value: string,
    imageSrc?: string, // Added imageSrc property
  }[],
  error: any,
  required: boolean,
  callBack: () => void,
  isLoading: boolean,
}

const DialogSelection = ({
  id, name, label, control, options, error, required, callBack, isLoading
}: DialogSelectionProps) => {

  const [open, setOpen] = React.useState(false);
  const { field } = useController({
    name,
    control,
    defaultValue: []
  });


  return (
    <Stack gap={2} my={2}>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<AddOutlinedIcon />}
        fullWidth
        onClick={() => { setOpen(true); callBack() }}>
        {label}
        {field?.value?.length && `: (${field.value.length}) selected`}
      </Button>

      {error && <Box sx={{ color: 'danger.main' }}>{error}</Box>}
      <Modal
        isLoading={isLoading}
        open={open}
        setOpen={setOpen}
        allowBackdropClick={false}
        heading='Select Products for the Deal'
      >
        <Stack gap={1} p={1} maxHeight={500} minHeight={300}>
          {options.map((option: any) => (
            <Box
              key={option.value}
              sx={{
                width: '400px',
                maxWidth: '90vw',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #e0e0e0',
                borderColor: field.value.includes(option.value) ? 'primary.main' : 'transparent',
                boxShadow: field.value.includes(option.value) ? 'inset 0 0 2px #1976d2' : 'none',
                display: 'flex',
                alignItems: 'center',
                '& img': {
                  width: '30px',
                  maxHeight: '30px',
                  marginRight: '10px',
                },
                '& label': {
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                },
              }}
            >
              <input
                id={option.value}
                type="checkbox"
                style={{ display: "none" }}
                checked={field.value.includes(option.value)}
                onChange={e => {
                  if (e.target.checked) {
                    field.onChange([...field.value, option.value]);
                  } else {
                    field.onChange(field.value.filter((value: any) => value !== option.value));
                  }
                }} />
              <label htmlFor={option.value}>
                {option?.imageSrc &&
                  <img
                    src={option.imageSrc}
                    alt={option?.label ?? 'product-selection-image'}
                  />}
                {option.label}
              </label>
            </Box>
          ))}
        </Stack>
      </Modal>
    </Stack>
  )
}

export default DialogSelection
