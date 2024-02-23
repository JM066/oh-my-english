import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    const { error, errorInfo } = this.state
    console.log('EEEERRROR', error)
    const { children } = this.props
    if (error) {
      return (
        <div>
          <h2 className='fs-4'>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo?.componentStack}
          </details>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
