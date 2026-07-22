import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cricket squad center title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Cricket Squad Center/i);
  expect(titleElement).toBeInTheDocument();
});
