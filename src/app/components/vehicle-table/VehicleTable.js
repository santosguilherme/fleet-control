import React, {Component} from 'react';
import ActionsTable from './actions/Actions';
import Table from './table/Table';
import PaginationTable from './pagination/Pagination';

class vehicleTable extends Component {
  render() {
    return (
      <div>
        <ActionsTable/>
        <Table/>
        <PaginationTable/>
      </div>
    );
  }
}

export default vehicleTable;
