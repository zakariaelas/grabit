import React from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import ProfileForm from './ProfileForm';
import { useDispatch } from 'react-redux';
import { editProfile } from './ProfileActions';

const Profile = ({ currentUser }) => {
  const dispatch = useDispatch();
  return (
    <Box px={2}>
      <Typography variant="h5" paragraph>
        Profile Settings
      </Typography>
      <Box mt={2} mb={4}>
        <Divider variant="fullWidth" />
      </Box>
      <Box px={2}>
        <ProfileForm
          initialValues={{
            displayName: currentUser.displayName,
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
            imageUrl: currentUser.imageUrl,
          }}
          onSubmit={(values) => {
            dispatch(editProfile(currentUser.id, values));
          }}
        />
      </Box>
    </Box>
  );
};

export default Profile;
