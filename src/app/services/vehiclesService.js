import {FAVORITE_LOCAL_STORAGE_KEY} from '../constants';
import localStorageService from '../util/localStorage';

const vehiclesService = {
  getAll: () => localStorageService.get(FAVORITE_LOCAL_STORAGE_KEY) || []
};

export default vehiclesService;
