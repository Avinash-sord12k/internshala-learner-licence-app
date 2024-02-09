import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { DialogProps, Divider, IconButton, LinearProgress, useMediaQuery } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


export default function TransitionsModal({
  open,
  setOpen,
  heading,
  subheading,
  minHeight = "100px",
  minWidth = "400px",
  isLoading = false,
  allowBackdropClick = true,
  children }: {
    open: boolean,
    setOpen: any,
    children: React.ReactNode,
    heading?: string,
    subheading?: string,
    minHeight?: string,
    minWidth?: string,
    isLoading?: boolean,
    allowBackdropClick?: boolean,
  }) {
  const handleOpen = () => setOpen(true);
  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (!allowBackdropClick && reason && reason === "backdropClick")
      return;
    setOpen(false)
  };

  const isSmallScreen = useMediaQuery('(max-width:320px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Modal
      aria-labelledby={heading}
      aria-describedby={subheading}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          minHeight: minHeight,
          // width: isMobile ? '80vw' : minWidth,
          width: 'fit-content',
          // width: 'fit-content',
          '@media (max-width: 600px)': {
            width: '90vw',
          },
          maxWidth: '90vw',
          maxHeight: '92vh',
          boxShadow: 24,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}>
          <Box sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '50px',
            p: 4,
          }}>
            <Box>
              {heading && <Typography id="transition-modal-title" variant="h6" component="h2"
                sx={{
                  lineHeight: '1.4',
                }}
              >
                {heading}
              </Typography>}
              {subheading && <Typography id="transition-modal-description" sx={{ mt: 0 }}>
                {subheading}
              </Typography>}
            </Box>
            <Box sx={{ alignSelf: 'start' }}>
              <IconButton onClick={() => setOpen(false)}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            {isLoading && <LinearProgress sx={{
              width: '100%',
              display: 'block',
              position: 'absolute',
              bottom: 0,
              left: 0,
            }} />}
          </Box>
          <Divider />
          <Box sx={{
            overflowY: 'auto',
            maxHeight: 'calc(92vh - 150px)',
          }}>
            {children}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}