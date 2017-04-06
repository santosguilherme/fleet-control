/* eslint-disable react/jsx-handler-names */
import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';

class VehicleModal extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss() {
    this.props.onDismiss();
  }

  handleClose() {
    this.props.onClose(this.props.vehicle);
  }

  render() {
    const {vehicle} = this.props;
    return (
      <Modal show={this.props.modalStatus} onHide={this.handleDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Veículos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Name: {vehicle.name}
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

          <h4>Popover in a modal</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleDismiss}>Cancelar</Button>
          <Button
            bsStyle="primary"
            onClick={this.handleClose}
            >
            Salvar Carro
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

VehicleModal.propTypes = {
  vehicle: PropTypes.object.isRequired,
  modalStatus: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default VehicleModal;
