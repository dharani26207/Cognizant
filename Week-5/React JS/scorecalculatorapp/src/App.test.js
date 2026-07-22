import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student management portal title', () => {
  render(<App />);
  const headingElement = screen.getByText(/Student Management Portal/i);
  expect(headingElement).toBeInTheDocument();
});
