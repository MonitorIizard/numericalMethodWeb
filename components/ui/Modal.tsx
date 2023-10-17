import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  open : boolean;
  setOpen : (value : boolean) => void;
  modalContent : { header : string, 
              description : string }
}

export default function TransitionsModal( { open, setOpen, modalContent } : Props ) {
  const handleClose = () => setOpen( false );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className='text-black'
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {modalContent.header}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {modalContent.description}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}