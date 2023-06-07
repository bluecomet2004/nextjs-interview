import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, lightGreen,  } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4153AF',
      dark: '#1A2D3E',
      light: '#757FE1'
    },
    secondary: {
      main: grey[100]
    },
    action: {
      hover: lightGreen[50]
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
