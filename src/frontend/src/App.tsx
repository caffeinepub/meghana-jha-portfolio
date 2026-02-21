import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <InternetIdentityProvider>
        <QueryClientProvider client={queryClient}>
          <Home />
          <Toaster />
        </QueryClientProvider>
      </InternetIdentityProvider>
    </ThemeProvider>
  );
}

export default App;
