import { connect } from "react-redux";
import { addSapling, subtractSapling } from "./../actionCreators";

import Saplings from "./Saplings";

function mapDispatchToProps(dispatch) {
  return {
    increment: sapling => dispatch(addSapling(sapling)),
    decrement: sapling => dispatch(subtractSapling(sapling))
  };
}
function mapStateToProps(state) {
  return {
    selectedSaplings: state.selectedSaplings,
    totalOrder: state.sumTotal
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Saplings);
