import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';

class PaginationTable extends Component {
  constructor() {
    super();

    this.state = {
      activePage: 1
    };
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  }

  render() {
    return (
      <div>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={20}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
          />
      </div>
    );
  }
}

export default PaginationTable;
