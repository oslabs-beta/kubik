import React, { useState, useEffect } from 'react';
import CommonModal from '../common/CommonModal/CommonModal';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import CommonButton from '../common/CommonButton/CommonButton';
import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const defaultInputValues = {
  clusterUrl: '',
  clusterPort: '',
  clusterName: '',
};

const NewClusterModal = ({ open, onClose, addNewCluster }) => {
  // const [open, setOpen] = useState(false);
  // const [clusters, setClusters] = useState([]);
  const [values, setValues] = useState(defaultInputValues);

  // Styles for modal
  const modalStyles = {
    inputFields: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      marginBottom: '15px',
      '.MuiFormControl-root': {
        marginBottom: '20px',
      },
    },
  };

  // RegExp to use in validation
  const urlRegExp = /\w/g;
  const portRegExp = /\d/g;

  // create Schema for form validation
  const validationSchema = Yup.object().shape({
    clusterUrl: Yup.string()
      .required('Cluster URL is required')
      .matches(urlRegExp, { excludeEmptyString: true }),
    clusterPort: Yup.string()
      .required('Cluster Port is required')
      .matches(portRegExp, { excludeEmptyString: true }),
    clusterName: Yup.string()
      .required('Cluster Name is required')
      .matches(urlRegExp, { excludeEmptyString: true }),
  });

  /**
   * register - register input
   * handleSubmit - func that receives data if validation is successful
   * formState - contains info about the formState, and we call err obj inside
   * yupResolver - goes through inputs and validates for us
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // 'addUser' - handles opening Modal
  const addUser = (data) => {
    // console.log(data);
    addNewCluster(data);
  };

  // Function to handle submit
  const handleChange = (value) => {
    // console.log(value);
    setValues(value);
  };

  // useEffect that will set values to default if first open
  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);

  // Function that will display Inputs for user
  const getContent = () => {
    return (
      <Box sx={modalStyles.inputFields}>
        <TextField
          placeholder="Enter Cluster URL"
          name="clusterUrl"
          label="Cluster URL"
          required
          {...register('clusterUrl')}
          error={errors.clusterUrl ? true : false}
          helperText={errors.clusterUrl?.message}
          value={values.clusterUrl}
          onChange={(e) =>
            handleChange({ ...values, clusterUrl: e.target.value })
          }
        />
        <TextField
          placeholder="Enter Cluster Port"
          name="clusterPort"
          label="Cluster Port"
          required
          {...register('clusterPort')}
          error={errors.clusterPort ? true : false}
          helperText={errors.clusterPort?.message}
          value={values.clusterPort}
          onChange={(e) =>
            handleChange({ ...values, clusterPort: e.target.value })
          }
        />
        <TextField
          placeholder="Enter a Cluster Name"
          name="clusterName"
          label="Cluster Name"
          required
          {...register('clusterName')}
          error={errors.clusterName ? true : false}
          helperText={errors.clusterName?.message}
          value={values.clusterName}
          onChange={(e) =>
            handleChange({ ...values, clusterName: e.target.value })
          }
        />
      </Box>
    );
  };

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="New Cluster"
      subTitle='Fill out inputs and hit "submit" button.'
      content={getContent()}
      onSubmit={handleSubmit(addUser)}
    />
  );
};

export default NewClusterModal;