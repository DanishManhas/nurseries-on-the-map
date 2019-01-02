import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

function SimpleSnackbar(props) {
  const { classes } = props;
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={props.openSnackBar}
        autoHideDuration={6000}
        onClose={props.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.children}</span>}
        action={[
          // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
          //   UNDO
          // </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
