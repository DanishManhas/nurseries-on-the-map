import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SaplingsContainer from "./SaplingsContainer";

const styles = {
  root: {
    width: "50%",
    maxWidth: 500,
    marginLeft: "60%",
    padding: "0 auto",
    textAlign: "center",
    color: "green"
  },
  hr: {
    width: "24px",
    color: "secondary",
    height: "4px"
  }
};

function Cart(props) {
  const { classes, selectedNursery } = props;
  if (!selectedNursery) {
    return (
      <div className={classes.root}>
        <Typography component="h3" variant="h3" gutterBottom>
          Select a nursery from the map
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography component="h4" variant="h4" gutterBottom>
        {selectedNursery.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {selectedNursery.address}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Contact us at : {selectedNursery.contactNumber}
      </Typography>
      <Divider />

      <SaplingsContainer />
    </div>
  );
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Cart);
