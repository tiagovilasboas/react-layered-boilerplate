import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { theme } from '@/pages/main/styles';

import { createExampleRepository } from '../service/exampleService';

import { ExampleComponent } from './ExampleComponent';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ExampleComponent', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with title', async () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });
  });

  it('renders description text', async () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(
      screen.getByText('This is an example component from the example-module.'),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });
  });

  it('calls onAction when button is clicked', async () => {
    const mockOnAction = vi.fn();
    renderWithTheme(
      <ExampleComponent title="Test Title" onAction={mockOnAction} />,
    );

    const button = await screen.findByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnAction).toHaveBeenCalledTimes(1);
    });
  });

  it('does not render button when onAction is not provided', async () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('createExampleRepository is the DI seam used by the module', () => {
    const repository = createExampleRepository({ kind: 'memory' });
    expect(repository).toHaveProperty('fetchData');
    expect(repository).toHaveProperty('createData');
  });
});
