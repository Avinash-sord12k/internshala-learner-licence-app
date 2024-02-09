import { Box, Radio, RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';


export const CustomRadioInput = ({ 
  row,
  id,
  control,
  name,
  label,
  options,
  error,
  required = false }: {
    row: boolean,
    id: string,
    control: any,
    name: string,
    label: string,
    options: { value: string, label: string }[],
    error: any,
    required?: boolean
  }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      mb: '1rem',
    }}>
      <Typography >{label}{required && "*"}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            row={row}
          >
            {options.map((option, index) => (
              <label
                htmlFor={`${id}-index`}
                key={`${id}-${option.value}`}
                style={{ display: "inline-flex", gap: '4px', alignItems: "center" }}>
                <Radio
                  {...field}
                  id={`${id}-index`}
                  value={option.value}
                  color="primary"
                />
                {option.label}
              </label>
            ))}
          </RadioGroup>
        )}
      />
      {!!error && <Typography variant='caption' color='danger'>
        {error}
      </Typography>}
    </Box>
  )
};