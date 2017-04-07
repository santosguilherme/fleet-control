/* eslint-disable react/jsx-handler-names, react/forbid-component-props */
import React, {Component, PropTypes} from 'react';
import {Modal, Button, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import SimpleCurrencyInput from 'react-simple-currency';
import MaskedTextInput from 'react-text-mask';

class VehicleModal extends Component {
  constructor(props) {
    super(props);
    const vehicle = this.props.vehicle || {};

    this.state = {...vehicle};

    this.handleClose = this.handleClose.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onMoneyInputChange = this.onMoneyInputChange.bind(this);
    this.handleValidationState = this.handleValidationState.bind(this);
    this.disableSaveButton = this.disableSaveButton.bind(this);
  }

  handleDismiss() {
    this.props.onDismiss();
  }

  handleClose() {
    this.props.onClose(this.state);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if (name === 'placa') {
      value = value.toUpperCase();
    }

    this.setState({
      [name]: value
    });
  }

  onMoneyInputChange(rawValue) {
    this.setState({
      valor: rawValue
    });
  }

  handleValidationState(inputName) {
    if (inputName === 'placa') {
      const regex = /^[A-Za-z]{3}-[0-9]{4}$/;
      const placa = this.state.placa;

      return placa && regex.test(placa) ? '' : 'has-error';
    }

    if (inputName === 'marca' || inputName === 'modelo') {
      return this.state[inputName] ? '' : 'error';
    }
  }

  disableSaveButton() {
    return this.handleValidationState('placa') || this.handleValidationState('marca') || this.handleValidationState('modelo');
  }

  render() {
    return (
      <Modal backdrop={'static'} show={this.props.modalStatus} onHide={this.handleDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Veículos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <Row>
              <Col xs={12} sm={4} md={3} className={'form-group ' + this.handleValidationState('placa')}>
                <label>* Placa</label>

                <MaskedTextInput
                  mask={[/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/]}
                  className="form-control"
                  value={this.state.placa}
                  placeholder="AAA-0000"
                  onChange={this.handleChange}
                  guide
                  name="placa"
                  required
                  />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6} md={6}>
                <FormGroup validationState={this.handleValidationState('marca')}>
                  <ControlLabel>* Marca</ControlLabel>
                  <FormControl
                    name="marca"
                    type="text"
                    value={this.state.marca}
                    onChange={this.handleChange}
                    required
                    />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={6}>
                <FormGroup validationState={this.handleValidationState('modelo')}>
                  <ControlLabel>* Modelo</ControlLabel>
                  <FormControl
                    name="modelo"
                    type="text"
                    value={this.state.modelo}
                    onChange={this.handleChange}
                    required
                    />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6} md={6}>
                <FormGroup>
                  <ControlLabel>Combustível</ControlLabel>
                  <FormControl componentClass="select" name="combustivel" onChange={this.handleChange}>
                    <option>-- Selecione --</option>
                    <option value="Álcool">Álcool</option>
                    <option value="Flex">Flex</option>
                    <option value="Gasolina">Gasolina</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={12} sm={6} md={6} className="form-group">
                <label>Valor</label>
                <SimpleCurrencyInput
                  className="form-control"
                  value={this.state.valor}
                  name="valor"
                  precision={2}
                  separator=","
                  delimiter="."
                  unit="R$"
                  onInputChange={this.onMoneyInputChange}
                  />
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>URL da imagem</ControlLabel>
                  <FormControl
                    name="imagem"
                    type="text"
                    value={this.state.imagem}
                    onChange={this.handleChange}
                    />
                </FormGroup>
              </Col>
            </Row>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleDismiss}>Cancelar</Button>
          <Button bsStyle="primary" onClick={this.handleClose} disabled={this.disableSaveButton()}>
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
