import { createTheme, ThemeProvider } from '@mui/material'

import { AppContextProvider } from 'contexts/AppContext'
import { WalletContextProvider } from 'contexts/WalletContextProvider'
import Router from 'pages/Router'
import { theme } from 'theme'

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={createTheme(theme)}>
        <WalletContextProvider>
          <Router />
        </WalletContextProvider>
      </ThemeProvider>
    </AppContextProvider>
  )
}

export default App
