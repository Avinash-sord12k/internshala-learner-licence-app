"use client";
import { Alert, Box, IconButton } from '@mui/material';
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

// Define the alert props
interface AlertProps {
  severity: 'success' | 'error' | 'warning' | 'info';
  text: string;
}

// Create the context for the alert
interface AlertContextProps {
  alert: AlertProps | null;
  setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>;
}

const AlertContext = createContext<AlertContextProps>({
  alert: null,
  setAlert: () => null,
});

const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the timer ID

  useEffect(() => {
    if (alert && alert.text.length > 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current); // Clear the previous timer if it exists
      }

      timerRef.current = setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
      {alert && (
        <CustomAlert severity={alert.severity} text={alert.text} setAlert={setAlert} />
      )}
    </AlertContext.Provider>
  );
};

// Custom useAlert hook to simplify accessing the context
const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

const CustomAlert: React.FC<AlertProps & { setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>> }> = ({ text, severity, setAlert }) => {
  if (!text || !severity) {
    return null; // Return null if there's no alert to display
  }

  const handleClose = () => {
    setAlert(null); // Set the alert to null to close it
  };

  return (
    <Box
    sx={(theme) => ({
      position: 'fixed',
      top: '30px',
      left: '50%',
      transform: `translate(-50%, ${text ? '10%' : '-300%'})`,
      transition: 'transform 0.3s ease-in-out',
      zIndex: 9999,
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: '50%',
      },
      [theme.breakpoints.up('md')]: {
        width: '500px',
      },
    })}
    >
      <Alert 
        sx={{
          width: '100%',
          borderLeft: `5px solid ${severity === 'success' ? 'green' : severity === 'error' ? 'red' : severity === 'warning' ? 'yellow' : 'blue'}`,
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
          },
        }}
        elevation={3} 
        severity={severity}
        action={
          <IconButton color="inherit" size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        {text}
      </Alert>
    </Box>
  );
};

export { AlertProvider, CustomAlert, useAlert };
