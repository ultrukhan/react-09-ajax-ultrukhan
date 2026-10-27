import axios from 'axios';

const BASE_URL = 'https://swapi.py4e.com/api';
const NOT_AVAILABLE = 'not available';

const FIELDS = {
  people: ['name', 'gender', 'birth_year', 'eye_color', 'height', 'mass', 'hair_color'],
  planets: ['name', 'population', 'orbital_period', 'diameter', 'climate', 'terrain', 'gravity'],
  starships: [
    'name',
    'model',
    'manufacturer',
    'cost_in_credits',
    'length',
    'crew',
    'starship_class',
  ],
};

const pickFields = (data, fields) =>
  fields.reduce((result, field) => {
    if (data[field] !== undefined) {
      result[field] = data[field];
    }
    return result;
  }, {});

export const getData = async (id, entity) => {
  const fields = FIELDS[entity];

  if (!fields) {
    return { name: NOT_AVAILABLE };
  }

  try {
    const response = await axios.get(`${BASE_URL}/${entity}/${id}`);
    return pickFields(response.data, fields);
  } catch {
    return { name: NOT_AVAILABLE };
  }
};
