import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastedSnack = ({msg, open, type, onClose})=> {
  const vertical = 'top';
  const horizontal = 'right';
  return (
      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
         {msg ? msg : ''}
        </Alert>
      </Snackbar>
  );
}

export default ToastedSnack;