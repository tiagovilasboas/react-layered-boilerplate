import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it, vi } from 'vitest';

import { theme } from '@/pages/main/styles';

import { Button } from './Button';

const renderButton = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Button', () => {
  it('renders children and handles click', () => {
    const onClick = vi.fn();
    renderButton(<Button onClick={onClick}>Save</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not click when disabled', () => {
    const onClick = vi.fn();
    renderButton(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies the large size and secondary variant styles from the theme', () => {
    renderButton(
      <Button size="large" variant="secondary">
        Big
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Big' })).toHaveStyle({
      padding: '16px 32px',
      fontSize: theme.fontSizes.large,
      backgroundColor: theme.colors.grey,
      color: theme.colors.white,
    });
  });
});
