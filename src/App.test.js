import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Discover Extraordinary Living Spaces/i);
  expect(linkElement).toBeInTheDocument();
});
