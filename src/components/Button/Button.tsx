import React from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  $fullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.proximaNova};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  outline: none;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: ${({ theme }) => theme.fontSizes.small};
        `;
      case 'large':
        return css`
          padding: 16px 32px;
          font-size: ${({ theme }) => theme.fontSizes.large};
        `;
      default:
        return css`
          padding: 12px 24px;
          font-size: ${({ theme }) => theme.fontSizes.medium};
        `;
    }
  }}

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${({ theme }) => theme.colors.grey};
          color: ${({ theme }) => theme.colors.white};
          &:hover:not(:disabled) {
            background-color: #555;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${({ theme }) => theme.colors.orange};
          border: 2px solid ${({ theme }) => theme.colors.orange};
          &:hover:not(:disabled) {
            background-color: ${({ theme }) => theme.colors.orange};
            color: ${({ theme }) => theme.colors.white};
          }
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.orange};
          color: ${({ theme }) => theme.colors.white};
          &:hover:not(:disabled) {
            background-color: #e66800;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(255, 116, 0, 0.3);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
