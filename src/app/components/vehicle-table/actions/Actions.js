import React, {Component} from 'react';
import {FormGroup, InputGroup, FormControl, Glyphicon} from 'react-bootstrap';

import './actions.scss';

class Actions extends Component {
  render() {
    return (
      <div className="vehicle-table-actions clearfix">
        <button className="btn btn-primary">Novo Carro</button>

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
