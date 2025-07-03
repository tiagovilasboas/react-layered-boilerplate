import { render, screen } from '@testing-library/react';

import App from './app';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(
      screen.getByText('React Layered Architecture Boilerplate'),
    ).toBeInTheDocument();
  });
});
