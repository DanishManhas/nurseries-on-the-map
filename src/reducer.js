import {
  INITIALIZE_STATE,
  SELECT_NURSERY,
  ADD_SAPLING,
  SUBTRACT_SAPLING
} from "./actionTypes";

const initialState = {
  selectedNursery: "",
  nurseries: [],
  selectedSaplings: [],
  sumTotal: 0
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_STATE: {
      return { ...state, nurseries: action.locations.data };
    }
    case SELECT_NURSERY: {
      const selectedSaplings = [...state.nurseries].find(nursery => {
        return nursery.id === action.id;
      }).saplings;
      let newSelectedSaplings = [];
      selectedSaplings.forEach((sapling, index) => {
        for (let type in sapling.types) {
          newSelectedSaplings.push({
            id: sapling.id + "-" + type,
            name: sapling.name + " (" + sapling.types[type].name + ")",
            price: sapling.types[type].price,
            quantity: sapling.types[type].quantity,
            inCart: 0
          });
        }
      });
      return Object.assign({}, state, {
        selectedNursery: action.id,
        selectedSaplings: newSelectedSaplings,
        sumTotal: 0
      });
    }
    case ADD_SAPLING: {
      let selectedSaplings = [...state.selectedSaplings];
      let foundSapling = selectedSaplings.find(
        sapling => action.saplingId === sapling.id
      );
      foundSapling.inCart++;
      let sumTotal = { ...state }.sumTotal;
      let newSumTotal = sumTotal + foundSapling.price;

      return {
        ...state,
        selectedSaplings: selectedSaplings,
        sumTotal: newSumTotal
      };
    }
    case SUBTRACT_SAPLING: {
      let selectedSaplings = [...state.selectedSaplings];
      let foundSapling = selectedSaplings.find(
        sapling => action.saplingId === sapling.id
      );

      foundSapling.inCart--;
      let sumTotal = { ...state }.sumTotal;
      let newSumTotal = sumTotal - foundSapling.price;

      return {
        ...state,
        selectedSaplings: selectedSaplings,
        sumTotal: newSumTotal
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
