import React from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  contentContainer: {
    position: 'relative',

    '& .icon-wrapper': {
      display: 'block'
    }
  }
}));

const CustomDialog = props => {
  const { open, hideDialog } = props;
  const classes = useStyles();

  return (
    <Dialog onClose={hideDialog} open={open}>
      <div className={classes.contentContainer}>
        <span className="icon-wrapper">
          <CloseIcon />
        </span>
        <div className="content-wrapper">
          {
            props.children
          }
        </div>

      </div>

    </Dialog>
  );
};

export default CustomDialog;