import actionFactory from './actionFactory';

describe('Factory to create react-redux actions', () => {
  it('actionFactory should be defined', () => {
    expect(actionFactory).toBeDefined();
  });

  it('actionFactory should be function', () => {
    expect(typeof actionFactory).toBe('function');
  });

  it('Should create action object with type', () => {
    const action = actionFactory('ACTION_NAME');

    expect(action).toEqual({
      type: 'ACTION_NAME'
    });
  });

  it('Should create action object with type and more attributes', () => {
    const action = actionFactory('ACTION_NAME', {actionParam: 'actionParamValue'});

    expect(action).toEqual({
      type: 'ACTION_NAME',
      actionParam: 'actionParamValue'
    });
  });
});
