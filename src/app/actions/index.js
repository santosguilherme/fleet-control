import actionFactory from './actionFactory';
import requestTypesFactory from './requestTypesFactory';

export const FIND_VEHICLES = requestTypesFactory('FIND_VEHICLES');

export const findVehicles = {
  request: filter => actionFactory(FIND_VEHICLES.REQUEST, filter),
  success: (filter, vehicles) => actionFactory(FIND_VEHICLES.SUCCESS, {filter, vehicles})
};
