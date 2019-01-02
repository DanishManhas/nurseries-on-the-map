import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

function SimpleModal(props) {
  const { classes, onConfirm } = props;

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sapling</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.children.map(sapling => {
              return (
                <TableRow key={sapling.id}>
                  <TableCell component="th" scope="row">
                    {sapling.name}
                  </TableCell>
                  <TableCell>Rs {sapling.price}</TableCell>
                  <TableCell>{sapling.inCart}</TableCell>
                  <TableCell>Rs {sapling.inCart * sapling.price}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">Rs {props.totalOrder}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button color="primary" onClick={props.onConfirm}>
                  Confirm
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Modal>
  );
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
