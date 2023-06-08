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
