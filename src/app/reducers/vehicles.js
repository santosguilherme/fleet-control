import * as ActionTypes from '../actions';
import vehiclesService from '../services/vehiclesService';

const initialState = {
  list: vehiclesService.getAll()
};

export default function vehicles(state = initialState, action) {
  const actionType = action.type;

  if (actionType === ActionTypes.FIND_VEHICLES.SUCCESS) {
    return {...state};
  }

  return state;
}
