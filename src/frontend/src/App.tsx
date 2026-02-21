import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Home />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
