import { AuthProvider } from '../lib/auth';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default App;
