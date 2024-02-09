import { Box, Button } from '@mui/material';

interface ActionButtonsProps {
  submit?: boolean,
  submitText?: string,
  cancel?: Function,
  reset?: Function,
}

const ActionButtons = ({ submit = true, cancel, reset, submitText }: ActionButtonsProps) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '1rem',
      p: '1rem',
    }}>
      <Button variant='outlined'>
        Cancel
      </Button>
      {submit && <Button
        type='submit'
        variant='contained'
        color='primary'>
        {submitText ?? 'Submit'}
      </Button>}
    </Box>
  )
}

export default ActionButtons;