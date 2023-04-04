import { Html, Head, Main, NextScript } from 'next/document'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Document() {

  const appTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#269000',
        light: 'var(--dark-theme-text-main)',
        dark: '#1E7400',
        contrastText: 'var(--dark-theme-text-main)',
      },
      secondary: {
        main: '#a6a7aa',
      },
      background: {
        default: '#141414',
        paper: '#141414',
      },
      text: {
        primary: '#E7E7E7',
        secondary: 'rgba(220,220,220,0.7)',
        disabled: 'rgba(148,148,148,0.5)',
      },
    },
  });

  return (
    <Html lang="en">
      <Head />
      <body id='root'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
