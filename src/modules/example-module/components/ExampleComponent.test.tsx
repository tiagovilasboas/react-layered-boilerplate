import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { theme } from '@/pages/main/styles';

import { ExampleComponent } from './ExampleComponent';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const jsonResponse = (body: unknown): Response =>
  ({
    ok: true,
    json: async () => body,
  }) as Response;

describe('ExampleComponent', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        if (init?.method === 'POST') {
          return jsonResponse({
            id: '1',
            name: 'New Item',
            description: 'Created via component action',
            createdAt: new Date().toISOString(),
          });
        }

        return jsonResponse([]);
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders with title', () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description text', () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(
      screen.getByText('This is an example component from the example-module.'),
    ).toBeInTheDocument();
  });

  it('calls onAction when button is clicked', async () => {
    const mockOnAction = vi.fn();
    renderWithTheme(
      <ExampleComponent title="Test Title" onAction={mockOnAction} />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnAction).toHaveBeenCalledTimes(1);
    });
  });

  it('does not render button when onAction is not provided', () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
