import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomizedDialog = withStyles((theme) => (
    {
      paper: {
        width: '800px'
      },
      paperWidthSm: {
        maxWidth: '100%'
      }
    }
  ))(({title, content, actions, open, onClose, classes, paper}) => {
  
  return (
    <div>
      {
        title && content &&
        <Dialog
          onClose={onClose} 
          aria-labelledby="customized-dialog-title" 
          open={open}
          classes={{
            paper: paper ?? classes.paper,
            paperWidthSm: classes.paperWidthSm
          }}
        >
          <DialogTitle id="customized-dialog-title" onClose={onClose}>
            {title}
          </DialogTitle>
          <DialogContent dividers>
            {content}
          </DialogContent>
          <DialogActions>
            {
              actions.map((action, idx) => (
                <Button 
                  key={idx} 
                  onClick={action.onClick}
                  variant="contained" 
                  color={action.color}
                >
                  {action.name}
                </Button>
              ))
            }
          </DialogActions>
        </Dialog>
      }
    </div>
  );
});

export default CustomizedDialog;