import * as React from 'react';
import {Backdrop as MUIBackdrop} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Backdrop = (isOpen) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  
  React.useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <div>
      <MUIBackdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </MUIBackdrop>
    </div>
  );
}

export default Backdrop