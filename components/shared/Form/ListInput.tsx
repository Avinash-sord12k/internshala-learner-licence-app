import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

interface ListInputProps {
  control: any;
  name: string;
  label: string;
  type?: string;
  error?: any;
}

const ListInput = ({ control, name, label, type = 'text', error }: ListInputProps) => {
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name,
  });

  return (
    <div>
      <Typography variant="body1" mb={2}>
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingLeft: '15px',
        }}
      >
        {fields.map((field: any, index: number) => (
          <div key={field.id}>
            <Controller
              name={`${name}[${index}]`}
              control={control}
              defaultValue={field.value ?? ''}
              render={({ field }) => (
                <>
                  <TextField
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label={`${label} ${index + 1}`}
                    id={`${name}[${index}]`}
                    type={type}
                    variant="standard"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => {
                            console.log('clicked');
                            remove(index);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </>
              )}
            />
          </div>
        ))}
      </Box>
      <Typography variant="body2" fontSize={'small'} fontWeight={'thin'} mb={2}>
        {error?.message}
      </Typography>
      <Button type="button" onClick={() => append('')}>
        Add More {label}
      </Button>
    </div>
  );
};

export default ListInput;
