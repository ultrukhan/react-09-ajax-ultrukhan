import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';
import { getData } from '@/services/swDataHandler';

jest.mock('@/services/swDataHandler');

describe('App component', () => {
  const generateMockData = (type) => {
    switch (type) {
      case 'people':
        return {
          name: 'Luke Skywalker',
          gender: 'male',
          birth_year: '19BBY',
          eye_color: 'blue',
        };
      case 'planets':
        return {
          name: 'Tatooine',
          population: '200,000',
          orbital_period: '304',
          diameter: '10465',
        };
      case 'starships':
        return {
          name: 'X-Wing',
          model: 'T-65 starfighter',
          manufacturer: 'Incom Corporation',
          cost_in_credits: '150000',
        };
      default:
        return { name: 'not available' };
    }
  };

  beforeEach(() => {
    getData.mockClear();
    getData.mockResolvedValue(generateMockData('people'));
  });

  test('fetches and displays data on initial render', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => expect(getData).toHaveBeenCalledWith(1, 'people'));
    await waitFor(() => expect(screen.getAllByText(/Luke Skywalker/i).length).toBeGreaterThan(0));
    expect(screen.getByRole('img').src).toContain('img/characters/1.jpg');
  });

  test('renders "Next" button', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument());
    //expect(screen.getByAltText(/illustration/i)).toBeInTheDocument();
  });

  test('updates data when "Next" button is clicked', async () => {
    await act(async () => {
      render(<App />);
    });

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => expect(getData).toHaveBeenCalledWith(2, 'people'));
    await waitFor(() => expect(screen.getAllByText(/Luke Skywalker/i).length).toBeGreaterThan(0));
    expect(screen.getByRole('img').src).toContain('img/characters/2.jpg');
  });

  test('updates entity when header "Planets" is clicked', async () => {
    await act(async () => {
      render(<App />);
    });

    getData.mockResolvedValue(generateMockData('planets'));
    fireEvent.click(screen.getByText(/planets/i));

    await waitFor(() => expect(getData).toHaveBeenCalledWith(1, 'planets'));
    await waitFor(() => expect(screen.getAllByText(/Tatooine/i).length).toBeGreaterThan(0));
    expect(screen.getByRole('img').src).toContain('img/planets/1.jpg');
  });

  test('updates entity when header "Starships" is clicked', async () => {
    await act(async () => {
      render(<App />);
    });

    getData.mockResolvedValue(generateMockData('starships'));
    fireEvent.click(screen.getByText(/starships/i));

    await waitFor(() => expect(getData).toHaveBeenCalledWith(1, 'starships'));
    await waitFor(() => expect(screen.getAllByText(/X-Wing/i).length).toBeGreaterThan(0));
    expect(screen.getByRole('img').src).toContain('img/starships/1.jpg');
  });

  test('updates entity when header "People" is clicked', async () => {
    await act(async () => {
      render(<App />);
    });

    getData.mockResolvedValue(generateMockData('people'));
    fireEvent.click(screen.getByText(/people/i));

    await waitFor(() => expect(getData).toHaveBeenCalledWith(1, 'people'));
    await waitFor(() => expect(screen.getAllByText(/Luke Skywalker/i).length).toBeGreaterThan(0));
    expect(screen.getByRole('img').src).toContain('img/characters/1.jpg');
  });
});
