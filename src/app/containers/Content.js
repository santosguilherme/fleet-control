import React, {Component, PropTypes} from 'react';
import VehicleTable from '../components/vehicle-table/VehicleTable';

import './content.scss';

class Content extends Component {
  render() {
    const {actions, vehicles} = this.props;
    return (
      <div className="container vehicles-content">
        <VehicleTable
          actions={actions}
          vehicles={vehicles}
          />
      </div>
    );
  }
}

Content.propTypes = {
  actions: PropTypes.object.isRequired,
  vehicles: PropTypes.object.isRequired
};

export default Content;

