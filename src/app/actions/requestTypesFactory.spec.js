import requestTypesFactory from './requestTypesFactory';

describe('Factory to create redux-saga actions', () => {
  it('requestTypesFactory should be defined', () => {
    expect(requestTypesFactory).toBeDefined();
  });

  it('requestTypesFactory should be function', () => {
    expect(typeof requestTypesFactory).toBe('function');
  });

  it('Should create REQUEST, SUCCESS and FAIL actions', () => {
    const vehicleRequestTypes = requestTypesFactory('VEHICLE');

    expect(vehicleRequestTypes).toEqual({
      REQUEST: 'VEHICLE_REQUEST',
      SUCCESS: 'VEHICLE_SUCCESS',
      FAILURE: 'VEHICLE_FAILURE'
    });
  });
});
