import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AppHeader from '../components/header/AppHeader';
import Content from './Content';
import * as Actions from '../actions/index';

class App extends Component {
  render() {
    const {actions, vehicles} = this.props;
    return (
      <div>
        <AppHeader/>
        <Content
          actions={actions}
          vehicles={vehicles}
          />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  vehicles: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
