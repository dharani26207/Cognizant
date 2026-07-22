import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blog explorer title', () => {
  render(<App />);
  const titleElement = screen.getByText(/JSONPlaceholder Blog Explorer/i);
  expect(titleElement).toBeInTheDocument();
});
