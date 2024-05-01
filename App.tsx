import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AuthProvider from './src/providers/AuthProvider';
import BottomTabs from './src/tabs/BottomTabs';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  const client = new QueryClient()

  return (
    <StripeProvider
    publishableKey="pk_test_wk6O7Cc5k3McBIG2Hut2irGs"
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <QueryClientProvider client={client}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <AuthProvider>
              <BottomTabs />
            </AuthProvider>
          </NavigationContainer>
        </ApplicationProvider>
      </QueryClientProvider>
    </StripeProvider>

  )

}
export default App