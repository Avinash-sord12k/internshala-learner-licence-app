import { Slider, Stack, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

type CustomSliderProps = {
  name: string,
  control: any,
  defaultValue?: number,
  min?: number,
  max?: number,
  step?: number,
  label?: string,
  unit?: string,
  error?: string
}

const CustomSlider = (props: CustomSliderProps) => {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <Stack gap={4} direction={'row'}>
        <Typography variant='subtitle1'>{props.min}{props?.unit}</Typography>
        <Controller
          name={props.name}
          control={props.control}
          defaultValue={props.defaultValue}
          render={({ field }) => {
            return (
              <Slider
                {...field}
                id={props.name}
                aria-label={props.label}
                defaultValue={field.value}
                min={props.min}
                max={props.max}
                step={props.step}
                valueLabelDisplay="auto"
              />
            )
          }}
        />
        <Typography variant='subtitle1'>{props.max}{props?.unit}</Typography>
      </Stack>
      <Typography variant='subtitle1' color={'error'}>{props?.error}</Typography>
    </>
  )
}

export default CustomSlider
