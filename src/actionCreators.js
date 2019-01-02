import {
  SELECT_NURSERY,
  INITIALIZE_STATE,
  ADD_SAPLING,
  SUBTRACT_SAPLING
} from "./actionTypes";

const initializeState = json => {
  console.log("State initialized", json);
  return {
    type: INITIALIZE_STATE,
    locations: json
  };
};
const selectNursery = id => {
  return {
    type: SELECT_NURSERY,
    id
  };
};

const addSapling = saplingId => {
  return {
    type: ADD_SAPLING,
    saplingId
  };
};
const subtractSapling = saplingId => {
  return {
    type: SUBTRACT_SAPLING,
    saplingId
  };
};

export { initializeState, selectNursery, addSapling, subtractSapling };
