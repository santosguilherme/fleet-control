import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';

import './pagination.scss';

class PaginationTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
    // todo - receber uma ação pagar filtrar a lista
  }

  render() {
    // todo - receber o numero de itens
    return (
      <div className="vehicles-table-pagination">
        <Pagination
          first
          last
          items={5}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
          />
      </div>
    );
  }
}

export default PaginationTable;
