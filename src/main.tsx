import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { appStore } from './stores/appStore'
import ErrorFallback from './view/components/errors/ErrorFallback'
import App from './App'
import './wdyr'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={appStore}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
