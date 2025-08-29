/**
 * Copyright 2023 Circle Internet Financial, LTD.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
