import type { ThemeOptions } from '@mui/material'

export const Alert: ThemeOptions['components'] = {
  MuiAlert: {
    styleOverrides: {
      action: {
        padding: 0,
        alignItems: 'center',
      },
    },
  },
}
