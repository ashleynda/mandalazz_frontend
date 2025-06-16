// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';

// export default function TopRightSnackbar() {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ width: 500, display: 'flex', justifyContent: 'flex-end' }}>
//       <Button onClick={handleClick}>Show Top-Right Snackbar</Button>
//       <Snackbar
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         open={open}
//         onClose={handleClose}
//         message="I love snacks"
//         key="topright"
//       />
//     </Box>
//   );
// }


// components/GlobalSnackbar.tsx
'use client';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useSnackbarStore from '../../store/useSnackbarStore'; // adjust path as needed

const GlobalSnackbar = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();
  console.log('Snackbar open:', open, 'Message:', message);

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
