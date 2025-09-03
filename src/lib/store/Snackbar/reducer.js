'use client';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useSnackbarStore from '../../store/useSnackbarStore'; // adjust path as needed

const GlobalSnackbar = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={closeSnackbar}   
      autoHideDuration={4000}
    >
      <MuiAlert
        onClose={closeSnackbar}
        severity={severity}
        elevation={6}
        variant="outlined"
        sx={{ width: '100%', backgroundColor: "white" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
