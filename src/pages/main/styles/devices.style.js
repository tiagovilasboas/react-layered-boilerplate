import { theme } from './theme.style';

export const device = {
  mobileS: `(min-width: ${theme.breakpoints.mobileS})`,
  mobileM: `(min-width: ${theme.breakpoints.mobileM})`,
  mobileL: `(min-width: ${theme.breakpoints.mobileL})`,
  tablet: `(min-width: ${theme.breakpoints.tablet})`,
  tableL: `(min-width: ${theme.breakpoints.laptop})`,
  desktop: `(min-width: ${theme.breakpoints.desktop})`,
};
