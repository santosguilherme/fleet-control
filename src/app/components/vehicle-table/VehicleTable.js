import React, {Component, PropTypes} from 'react';
import ActionsTable from './actions/Actions';
import Table from './table/Table';
import PaginationTable from './pagination/Pagination';

class VehicleTable extends Component {
  render() {
    const {actions, vehicles} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <ActionsTable {...actions}/>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Table vehicles={vehicles.list}/>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <PaginationTable/>
          </div>
        </div>
      </div>
    );
  }
}

VehicleTable.propTypes = {
  actions: PropTypes.object.isRequired,
  vehicles: PropTypes.object.isRequired
};

export default VehicleTable;
