import { Box, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import Switch from '@mui/material/Switch';

interface SwitchProps {
  control: any,
  name: string,
  label: string,
};

const CustomSwitch = (props: SwitchProps) => {
  return (
    <label htmlFor={props.name}>
      <Box sx={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant='body1'>{props.label}</Typography>
        <Controller
          name={props.name}
          control={props.control}
          defaultValue={false} // Set the initial value here
          render={({ field }) => (
            <Switch
              {...field}
              defaultChecked={field.value}
              id={props.name}
              size="medium"
            />
          )
          }
        />
      </Box>
    </label>
  )
}

export default CustomSwitch
