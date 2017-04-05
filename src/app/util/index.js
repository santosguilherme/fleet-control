import localStorageService from './localStorage';
import {FAVORITE_LOCAL_STORAGE_KEY} from '../constants';

export const initialCharge = () => {
  const storagedVehicles = localStorageService.get(FAVORITE_LOCAL_STORAGE_KEY);

  if (storagedVehicles && storagedVehicles.length) {
    return;
  }

  localStorageService.set(FAVORITE_LOCAL_STORAGE_KEY, getInitialsVehicles());
};

function getInitialsVehicles() {
  return [
    {
      combustivel: 'Flex',
      imagem: null,
      marca: 'Volkswagem',
      modelo: 'Gol',
      placa: 'FFF-5498',
      valor: 20000
    },
    {
      combustivel: 'Gasolina',
      imagem: null,
      marca: 'Volkswagem',
      modelo: 'Fox',
      placa: 'FOX-4125',
      valor: 20000
    },
    {
      combustivel: 'Alcool',
      imagem: 'http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg',
      marca: 'Volkswagen',
      modelo: 'Fusca',
      placa: 'PAI-4121',
      valor: 20000
    }
  ];
}
