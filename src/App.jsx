import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { SavedJobsProvider } from './context/SavedJobsContext';
import { AppliedJobsProvider } from './context/AppliedJobsContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SavedJobsProvider>
          <AppliedJobsProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  borderRadius: '12px',
                  background: '#1e293b',
                  color: '#f8fafc',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: { primary: '#6366f1', secondary: '#fff' },
                },
              }}
            />
          </AppliedJobsProvider>
        </SavedJobsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
