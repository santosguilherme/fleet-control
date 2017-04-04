import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AppHeader from '../components/header/AppHeader';
import Content from './Content';
import * as Actions from '../actions/index';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader/>
        <Content/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
