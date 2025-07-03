import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it, vi } from 'vitest';

import { theme } from '@/pages/main/styles';

import { ExampleComponent } from './ExampleComponent';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ExampleComponent', () => {
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

  it('calls onAction when button is clicked', () => {
    const mockOnAction = vi.fn();
    renderWithTheme(
      <ExampleComponent title="Test Title" onAction={mockOnAction} />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('does not render button when onAction is not provided', () => {
    renderWithTheme(<ExampleComponent title="Test Title" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
