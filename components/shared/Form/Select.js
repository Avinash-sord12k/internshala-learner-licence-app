"use client";
import React from "react";
import { FormControl, Typography, Select, MenuItem, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomDropDown = ({
  name,
  label,
  control,
  options,
  error,
  defaultValue = " ",
  disabled = false,
  isOptionsLoading = false,
  defaultSelection = {
    value: ' ',
    label: "select an option",
  }
}) => {
  const labelId = `${name}-label`;

  return (
    <FormControl sx={{
      width: '100%',
      mb: 2,
    }}>
      <Typography variant="subtitle1" >{label}</Typography>
      {/* <InputLabel id={labelId}>{label}</InputLabel> */}
      <Controller
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
          <Select
            disabled={disabled}
            variant="outlined"
            labelId={labelId}
            label={label}
            onChange={onChange}
            value={value}
            // defaultValue={defaultValue}
          >
            {isOptionsLoading
              ? <MenuItem
                style={{
                  minWidth: "100%",
                }}
                value={""}>
                {"loading..."}
              </MenuItem>
              : <MenuItem
                style={{
                  minWidth: "100%",
                }}
                value={defaultSelection.value}>
                {defaultSelection.label}
              </MenuItem>}
            {options.map((option, index) => (
              <MenuItem
                key={index}
                value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}}
        name={name}
        control={control}
      />
      <Typography variant="caption" color="error">{error}</Typography>
    </FormControl>
  );
};
export default CustomDropDown;
