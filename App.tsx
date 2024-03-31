import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AuthProvider from './src/providers/AuthProvider';
import BottomTabs from './src/tabs/BottomTabs';


const App = () => {
  const client = new QueryClient()
  
  return (
    <QueryClientProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <AuthProvider>
            <BottomTabs />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>

  )

}
export default App