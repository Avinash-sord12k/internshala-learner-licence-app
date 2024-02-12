"use client";
import { Alert, Box, IconButton } from '@mui/material';
import React, { useState, createContext, useContext, useEffect, useRef, useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'framer-motion';

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

  const memoizedValue = useMemo(() => ({ alert, setAlert }), [alert, setAlert]);

  return (
    <AlertContext.Provider value={memoizedValue}>
      {children}
      <AnimatePresence>
        <CustomAlert
          show={!!alert}
          severity={alert?.severity ?? 'info'}
          text={alert?.text ?? ''}
          setAlert={setAlert}
        />
      </AnimatePresence>
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

const CustomAlert: React.FC<AlertProps & {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>
  show: boolean;
}> = ({ text, severity, setAlert, show }) => {

  const ShowAlert = show && (!!text || !!severity);

  const handleClose = () => {
    setAlert(null); // Set the alert to null to close it
  };


  let borderColor;
  if (severity === 'success') {
    borderColor = 'green';
  } else if (severity === 'error') {
    borderColor = 'red';
  } else if (severity === 'warning') {
    borderColor = 'yellow';
  } else {
    borderColor = 'blue';
  }

  // if (!ShowAlert) {
  //   return null;
  // }

  return (
    <AnimatePresence>
      {ShowAlert &&
        <motion.div
          key="alert"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
            width: '100%',
          }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, type: 'tween' }}
        >
          <Alert
            sx={{
              width: '100%',
              maxWidth: 400,
              margin: '0 auto',
              borderLeft: `5px solid ${borderColor}`,
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
        </motion.div>}
    </AnimatePresence>
  );
};

export { AlertProvider, CustomAlert, useAlert };
