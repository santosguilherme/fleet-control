import React, {PropTypes} from 'react';

import './table.scss';

function getVehiclePhotoLink(imageUrl) {
  const hasntImageUrl = !imageUrl;
  return hasntImageUrl ? 'Sem foto' : (
    <a className="btn-link" href={imageUrl} target="_blank" rel="noopener noreferrer">
      <span>Imagem</span>
    </a>
  );
}

function Table({vehicles}) {
  return (
    <table className="table vehicle-table">
      <thead>
        <tr>
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

Table.propTypes = {
  vehicles: PropTypes.array.isRequired
};

export default Table;
