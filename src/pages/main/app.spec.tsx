import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from './app';

describe('App', () => {
  test('renders App component and composes the example module', async () => {
    render(<App />);
    expect(
      screen.getByText('React Layered Architecture Boilerplate'),
    ).toBeInTheDocument();
    expect(screen.getByText('example-module')).toBeInTheDocument();
    expect(screen.getByAltText('React logo')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });
  });

  test('creates an item through the composed example module action', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create New Item' }));

    expect(await screen.findByText('New Item')).toBeInTheDocument();
  });
});
