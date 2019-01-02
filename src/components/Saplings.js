import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CartOperation from "./CartOperation";

import Button from "./ReserveButton";
import Modal from "./Modal";
import SnackBar from "./SnackBar";

const styles = theme => ({
  root: {
    width: "80",
    margin: "0 auto",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    margin: "0 auto"
  }
});

class SimpleTable extends React.Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
      confirmed: false
    };
  }
  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };
  openSnackBar = () => {
    this.setState({
      openModal: false,
      openSnackBar: true
    });
  };

  handleSnackBarClosure = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackBar: false });
  };

  onConfirm = () => {
    this.openSnackBar();
  };

  render() {
    const { classes, selectedSaplings, totalOrder } = this.props;

    return (
      <Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Sampling</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="center">How many?</TableCell>
                <TableCell align="center">Left</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedSaplings &&
                selectedSaplings.map(sapling => {
                  return (
                    <TableRow key={sapling.id}>
                      <TableCell component="th" scope="row">
                        {sapling.name}
                      </TableCell>
                      <TableCell>Rs {sapling.price}</TableCell>
                      <TableCell align="center">
                        <CartOperation
                          sapling={sapling}
                          increment={this.props.increment}
                          decrement={this.props.decrement}
                        />
                      </TableCell>
                      <TableCell align="center">{sapling.quantity}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Button disabled={totalOrder < 10} onClick={this.handleOpen}>
            Reserve My Saplings
          </Button>
          <div>
            A minimum billing of Rs 10 is required to complete the booking
          </div>
        </Paper>
        <Modal
          open={this.state.openModal}
          totalOrder={totalOrder}
          handleClose={this.handleClose}
          onConfirm={this.onConfirm}
        >
          {selectedSaplings.filter(sapling => sapling.inCart > 0)}
        </Modal>
        <SnackBar
          openSnackBar={this.state.openSnackBar}
          handleClose={this.handleSnackBarClosure}
        >
          Your booking has been successful
        </SnackBar>
      </Fragment>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
