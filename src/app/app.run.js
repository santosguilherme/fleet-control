(function () {
  'use strict';

  angular.module('fleetControl').run(run);

  /*@ngInject*/
  function run(vehiclesService) {
    vehiclesService.query().then(function (response) {
      if (response.totalElements) {
        return;
      }

      insertDefaultsVehicles();
    });
    function insertDefaultsVehicles() {
      [{
        combustivel: 'Flex',
        imagem: null,
        marca: 'Volkswagem',
        modelo: 'Gol',
        placa: 'FFF5498',
        valor: 20000
      }, {
        combustivel: 'Gasolina',
        imagem: null,
        marca: 'Volkswagem',
        modelo: 'Fox',
        placa: 'FOX4125',
        valor: 20000
      }, {
        combustivel: 'Alcool',
        imagem: 'http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg',
        marca: 'Volkswagen',
        modelo: 'Fusca',
        placa: 'PAI4121',
        valor: 20000
      }].forEach(function (vehicle) {
        vehiclesService.save(vehicle);
      });
    }
  }
})();