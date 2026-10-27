import axios from 'axios';
import { getData } from './swDataHandler';

jest.mock('axios');

describe('swDataHandler getData function', () => {
  const baseUrl = 'https://swapi.py4e.com/api';
  const person = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBYY',
    gender: 'male',
    homeworld: `${baseUrl}/planets/1/`,
    films: [
      `${baseUrl}/films/1/`,
      `${baseUrl}/films/2/`,
      `${baseUrl}/films/3/`,
      `${baseUrl}/films/6/`,
    ],
    species: [],
    vehicles: [
      `${baseUrl}/vehicles/14/`,
      `${baseUrl}/vehicles/30/`,
    ],
    starships: [
      `${baseUrl}/starships/12/`,
      `${baseUrl}/starships/22/`,
    ],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: `${baseUrl}/people/1/`,
  };

  const planet = {
    name: 'Tatoooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [
      `${baseUrl}/people/1/`,
      `${baseUrl}/people/2/`,
      `${baseUrl}/people/4/`,
      `${baseUrl}/people/6/`,
      `${baseUrl}/people/7/`,
      `${baseUrl}/people/8/`,
      `${baseUrl}/people/9/`,
      `${baseUrl}/people/11/`,
      `${baseUrl}/people/43/`,
      `${baseUrl}/people/62/`,
    ],
    films: [
      `${baseUrl}/films/1/`,
      `${baseUrl}/films/3/`,
      `${baseUrl}/films/4/`,
      `${baseUrl}/films/5/`,
      `${baseUrl}/films/6/`,
    ],
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    url: `${baseUrl}/planets/1/`,
  };

  const starship = {
    name: 'Slave 131',
    model: 'Firespray-31-class patrol and attack',
    manufacturer: 'Kwat Systems Engineering',
    cost_in_credits: '123321',
    length: '21.5',
    max_atmosphering_speed: '1000',
    crew: '1',
    passengers: '6',
    cargo_capacity: '70000',
    consumables: '1 month',
    hyperdrive_rating: '3.0',
    MGLT: '70',
    starship_class: 'Patrol craft',
    pilots: [`${baseUrl}/people/22/`],
    films: [
      `${baseUrl}/films/2/`,
      `${baseUrl}/films/5/`
    ],
    created: '2014-12-15T13:00:56.332000Z',
    edited: '2014-12-20T21:23:49.897000Z',
    url: `${baseUrl}/starships/21/`,
  };

  beforeEach(() => {
    axios.get.mockClear();
  });

  test.each([
    [1, 'people', person],
    [2, 'people', person],
    [3, 'people', person],
    [1, 'planets', planet],
    [2, 'planets', planet],
    [3, 'planets', planet],
    [1, 'starships', starship],
    [2, 'starships', starship],
    [3, 'starships', starship],
  ])('calls axios.get with correct url and returns correct data', async (id, entity, mockData) => {
    axios.get.mockResolvedValueOnce({ data: mockData });
    await getData(id, entity);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/${entity}/${id}`);
  });

  test('returns correct data about person', async () => {
    axios.get.mockResolvedValueOnce({ data: person });
    const result = await getData(1, 'people');
    const valuesOfResult = Object.values(result);

    expect(valuesOfResult).toContain('Luke Skywalker');
    expect(valuesOfResult).toContain('male');
    expect(valuesOfResult).toContain('19BBYY');
    expect(valuesOfResult).toContain('blue');
  });

  test('returns correct data about planet', async () => {
    axios.get.mockResolvedValueOnce({ data: planet });
    const result = await getData(1, 'planets');
    const valuesOfResult = Object.values(result);

    expect(valuesOfResult).toContain('Tatoooine');
    expect(valuesOfResult).toContain('200000');
    expect(valuesOfResult).toContain('304');
    expect(valuesOfResult).toContain('10465');
  });

  test('returns correct data about starship', async () => {
    axios.get.mockResolvedValueOnce({ data: starship });
    const result = await getData(1, 'starships');
    const valuesOfResult = Object.values(result);

    expect(valuesOfResult).toContain('Slave 131');
    expect(valuesOfResult).toContain('Firespray-31-class patrol and attack');
    expect(valuesOfResult).toContain('Kwat Systems Engineering');
    expect(valuesOfResult).toContain('123321');
  });

  test('returns an object with "not available" value if request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Request failed with status code 404'));
    const result = await getData(1, 'planets');

    expect(result).toEqual({ name: 'not available' });
  });

  test('returns an object with "not available" value for unknown entity', async () => {
    const result = await getData(1, 'unknown');

    expect(result).toEqual({ name: 'not available' });
  });
});
