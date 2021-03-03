import '../styles/global.css'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'

export default function App ({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}
