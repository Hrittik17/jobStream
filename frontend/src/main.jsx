import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// import 'react-toastify/dist/ReactToastify.css'
// import 'react-toastify/ReactToastify.css'
// import { ToastContainer } from 'react-toastify'
import {Toaster} from 'react-hot-toast'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ui/errorFallback.jsx'
import { SettingProvider } from './context/settingContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <SettingProvider>
            <App />
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: '8px' }}
              toastOptions={{
                success: { duration: 3000 },
                error: { duration: 5000 },
                style: { fontSize: '16px', maxWidth: '500px', padding: '16px 24px' },
              }}
            />
            {/* <ToastContainer position='top-center' /> */}
          </SettingProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)