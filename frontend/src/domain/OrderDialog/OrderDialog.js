import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  ListItem,
  List,
  ListItemText,
  makeStyles,
  Box,
  TextField,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  singleOrderSelector,
  isLoadingSingleOrderSelector,
} from './SingleOrderReducer';
import { getOrder } from './SingleOrderActions';
import LoadingSpinner from '../../components/LoadingSpinner';
import AvatarOrInitials from '../../components/AvatarOrInitials';
import ResponsiveDialog from '../../components/ResponsiveDialog';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  avatarCustomer: {
    width: 30,
    height: 30,
    fontSize: '1rem',
  },
  listItemText: {
    textTransform: 'capitalize',
  },
  dialog: {
    minHeight: 640,
  },
}));

const OrderDialog = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const order = useSelector(singleOrderSelector);
  const isLoading = useSelector(isLoadingSingleOrderSelector);
  console.log(order);
  const [open, setOpen] = useState(true);
  const { oid } = useParams();

  useEffect(() => {
    dispatch(getOrder(oid));
  }, []);

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  return (
    <ResponsiveDialog
      onClose={handleClose}
      open={open}
      fullWidth
      classes={{
        paper: classes.dialog,
      }}
    >
      <DialogTitle disableTypography id="simple-dialog-title">
        <Typography align="center" variant="h4">
          Order information
        </Typography>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Grid container spacing={3} alignItems="baseline">
            <Grid item lg={12} container spacing={2}>
              <Grid item lg={12}>
                <Typography variant="h6" color="textSecondary">
                  Order Details
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body2" gutterBottom>
                  <strong>Pickup Location</strong>
                </Typography>
                <Typography>{order.from.address}</Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body2" gutterBottom>
                  <strong>Order Items</strong>
                </Typography>
                <List component="ol">
                  {order.items.map((item, index) => (
                    <ListItem
                      key={item.id}
                      dense
                      className={classes.listItem}
                    >
                      <Box mr={1}>
                        <Typography>
                          <strong>{index + 1}.</strong>
                        </Typography>
                      </Box>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          className: classes.listItemText,
                          variant: 'body1',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body2" gutterBottom>
                  <strong>Delivery Location</strong>
                </Typography>
                <Typography>{order.destination.address}</Typography>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body2" gutterBottom>
                  <strong>Description</strong>
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  cols={3}
                  disabled
                  value={order.description || 'No description'}
                />
              </Grid>
            </Grid>
            <Grid item lg={12} container spacing={2}>
              <Grid item lg={12}>
                <Typography variant="h6" color="textSecondary">
                  Customer Details
                </Typography>
              </Grid>
              <Grid item lg={12}>
                <Box display="flex" alignItems="center">
                  <AvatarOrInitials
                    className={classes.avatarCustomer}
                    displayName={order.customer.displayName}
                    imageUrl={order.customer.imageUrl}
                  />
                  <Box ml={1}>
                    <Typography>
                      {order.customer.displayName}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={12}>
                <Typography variant="body2" gutterBottom>
                  <strong>Phone Number</strong>
                </Typography>
                <TextField
                  disabled
                  variant="outlined"
                  placeholder="No Number"
                  fullWidth
                  value={
                    order.customer.phoneNumber || 'No phone number'
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </ResponsiveDialog>
  );
};

export default OrderDialog;
