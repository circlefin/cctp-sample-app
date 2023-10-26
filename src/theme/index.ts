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

import { breakpoints } from './Breakpoints'
import { Alert } from './components/Alert'
import { Button } from './components/Button'
import { Dialog } from './components/Dialog'
import { Inputs } from './components/Inputs'
import { palette } from './Palette'
import { typography } from './Typography'

import type { ThemeOptions } from '@mui/material'

/**
 * Mui theme
 * @see https://mui.com/material-ui/customization/theming/
 */
export const theme: ThemeOptions | undefined = {
  breakpoints,
  palette,
  typography,
  components: {
    ...Alert,
    ...Button,
    ...Dialog,
    ...Inputs,
  },
}
