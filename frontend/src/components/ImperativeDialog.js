import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

// Wrapper component on top of the MUI Dialog component
// It provides a shorter and more concise way to use the dialog

export function Confirm({
  okLabel,
  cancelLabel,
  title,
  onHide,
  children,
  ...other
}) {
  okLabel = okLabel || 'Ok';
  cancelLabel = cancelLabel || 'Cancel';
  title = title || '';
  return (
    <Dialog
      disableBackdropClick
      onClose={() => onHide(false)}
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => onHide(true)} color="primary">
          {okLabel}
        </Button>
        <Button onClick={() => onHide(false)} color="primary">
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// The goal of this function is to provide an "imperative" API to using Modals in React ...
// This is particularly useful in the case where we would like to get either ...
// confirmation or cancellation before executing some action.
// e.g:
/* async function myFormSubmitHandler(values){
 *   const shouldSubmit = await dialog(MyModal);
 *   if(shouldSubmit) myApiCall(values);
 *   else doNothing();
 * }
 */

export function dialog(modalElement) {
  return new Promise((resolve) => {
    let mountNode = document.createElement('div');
    let open = true;
    render();

    function onExited() {
      if (!mountNode) return;
      ReactDOM.unmountComponentAtNode(mountNode);
      return null;
    }

    function render() {
      ReactDOM.render(
        React.cloneElement(modalElement, {
          open,
          onExited,
          onHide(action) {
            open = false;
            resolve(action);
            render();
          },
        }),
        mountNode,
      );
    }
  });
}
