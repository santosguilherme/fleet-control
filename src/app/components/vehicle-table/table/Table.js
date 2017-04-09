import React, {PropTypes, Component} from 'react';

import './table.scss';

function getVehiclePhotoLink(imageUrl) {
  const hasntImageUrl = !imageUrl;
  return hasntImageUrl ? 'Sem foto' : (
    <a className="btn-link" href={imageUrl} target="_blank" rel="noopener noreferrer">
      <span>Imagem</span>
    </a>
  );
}

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allSelected: false
    };

    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  handleSelectAll(event) {
    const checkboxValue = event.target.checked;
    this.setState({
      allSelected: checkboxValue
    });
    console.log('this.state.allSelected', this.state.allSelected);

    (this.props.vehicles || []).forEach(vehicle => {
      vehicle.selected = checkboxValue;
    });
  }

  render() {
    const {vehicles} = this.props;

    return (
      <table className="table vehicle-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                selected={this.state.allSelected}
                onChange={this.handleSelectAll}
                />
            </th>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Foto</th>
            <th>Combustível</th>
            <th>Valor</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle, index) =>
            <tr key={index}>
              <td>
                {vehicle.selected}
              </td>
              <td>{vehicle.placa}</td>
              <td>{vehicle.modelo}</td>
              <td>{vehicle.marca}</td>
              <td>{getVehiclePhotoLink(vehicle.imagem)}</td>
              <td>{vehicle.combustivel}</td>
              <td>{vehicle.valor}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  vehicles: PropTypes.array.isRequired
};

export default Table;
