import colors from 'styles/colors'

import type { ThemeOptions } from '@mui/material'
import type {} from '@mui/lab/themeAugmentation'

export const Button: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === 'contained' && {
          ...(ownerState.color === 'primary' && {
            color: colors.licorice[800],
            background: colors.gumdrop[100],
            ...(!ownerState.disabled && {
              backgroundImage: `linear-gradient(to right, ${colors.gumdrop[200]}, ${colors.apple[200]})`,
              ':hover': {
                backgroundImage: 'none',
              },
            }),
          }),
          ...(ownerState.color === 'secondary' && {
            color: colors.licorice[100],
            background: colors.licorice[500],
            ':hover': {
              background: colors.licorice[400],
            },
          }),
        }),
        ...(ownerState.variant === 'outlined' && {
          background: colors.licorice[800],
          border: `2px solid ${colors.licorice[500]}`,
          ':hover': {
            background: colors.licorice[800],
            border: `2px solid ${colors.apple[100]}`,
          },
        }),
      }),
    },
  },
  MuiLoadingButton: {
    defaultProps: {
      variant: 'contained',
    },
  },
}
