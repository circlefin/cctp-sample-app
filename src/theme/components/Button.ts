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
