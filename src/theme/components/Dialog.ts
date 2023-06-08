import colors from 'styles/colors'

import type { ThemeOptions } from '@mui/material'

export const Dialog: ThemeOptions['components'] = {
  MuiDialog: {
    styleOverrides: {
      paper: ({ ownerState }) => ({
        background: colors.licorice[800],
        backgroundImage: `radial-gradient(${colors.licorice[600]}, ${colors.licorice[800]})`,
        ...(ownerState.fullScreen && {
          height: 'calc(100% - 120px)',
          width: 'calc(100% - 120px)',
          borderRadius: '4px',
          overflow: 'hidden',
        }),
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        backgroundImage: `linear-gradient(to right, ${colors.gumdrop[200]}, ${colors.apple[200]})`,
        backgroundClip: 'text',
        marginTop: '64px',
        textAlign: 'center',
        fontSize: '3rem',
        fontWeight: '700',
        color: 'transparent',
      },
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        textAlign: 'center',
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        marginTop: '64px',
        padding: '24px 48px',
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '24px 48px 48px',
      },
    },
  },
}
