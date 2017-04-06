import React, {Component} from 'react';
import {FormGroup, InputGroup, FormControl, Glyphicon} from 'react-bootstrap';
import VehicleModal from '../vehicle-modal/VehicleModal';

import './actions.scss';

class Actions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      vehicle: {}
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDismissModal = this.handleDismissModal.bind(this);
  }

  handleCloseModal(vehicle) {
    console.log(vehicle);
    this.setState({showModal: false});
  }

  handleDismissModal() {
    this.setState({showModal: false});
  }

  handleOpenModal() {
    this.setState({showModal: true});
  }

  render() {
    return (
      <div className="vehicle-table-actions clearfix">
        <button
          className="btn btn-primary"
          onClick={this.handleOpenModal}
          >
          Novo Carro
        </button>

        <VehicleModal
          vehicle={this.state.vehicle}
          modalStatus={this.state.showModal}
          onClose={this.handleCloseModal}
          onDismiss={this.handleDismissModal}
          />

        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Pesquisar"
              />

            <InputGroup.Addon>
              <Glyphicon glyph="search"/>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

export default Actions;
