import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommonButton from '../CommonButton/CommonButton';
import { modalStyles } from './styles';
import Input from '@mui/material/Input';

// open, onClose, title, subTitle, content, onSubmit
const CommonModal = ({
  open,
  onClose,
  title,
  subTitle,
  content,
  validate,
  onSubmit,
}) => {
  // const validate = () => {
  //   console.log('need to validate');
  // };
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles.wrapper}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{subTitle}</Typography>
        {content}
        <Box sx={modalStyles.buttons}>
          <CommonButton variant="contained" onClick={onSubmit}>
            Submit
          </CommonButton>
          <CommonButton onClick={onClose}>Cancel</CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommonModal;
