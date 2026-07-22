import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cognizant academy navigation logo', () => {
  render(<App />);
  const logoElement = screen.getByText(/Cognizant Academy/i);
  expect(logoElement).toBeInTheDocument();
});
