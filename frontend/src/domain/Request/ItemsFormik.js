import React from 'react';
import MuiFormikTextField from '../../components/MuiFormikTextField';
import {
  InputAdornment,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Add, RemoveCircle } from '@material-ui/icons';

const ItemsFormik = ({ push, remove, form }) => {
  const { values, setFieldValue } = form;
  return (
    <>
      <MuiFormikTextField
        variant="outlined"
        label="Order Item"
        name="currentItem"
        placeholder="Enter an item"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  if (values.currentItem === '') return;
                  setFieldValue('currentItem', '');
                  push({ text: values.currentItem });
                }}
              >
                <Add color="secondary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box>
        <List>
          {values.items.map((value, index) => (
            <ListItem key={index}>
              <ListItemIcon style={{ minWidth: '38px' }}>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="delete"
                  onClick={() => remove(index)}
                >
                  <RemoveCircle color="primary" fontSize="small" />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={value.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default ItemsFormik;
