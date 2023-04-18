import { Html, Head, Main, NextScript } from 'next/document'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
      </Head>
      <body id='root'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
