import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { appStore } from './stores/appStore'
import App from './App'
import './wdyr'
import './index.css'
import ErrorBoundary from './view/components/errors/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={appStore}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
