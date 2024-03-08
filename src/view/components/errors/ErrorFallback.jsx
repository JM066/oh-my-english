// import { Component } from 'react'
// import PropTypes from 'prop-types'

import { useErrorBoundary } from 'react-error-boundary'
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'

function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary()
  return (
    <div>
      <h2 className='fs-4'>Something went wrong.</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {error.error.message}
        <br />
      </details>
      <button type='button' onClick={resetBoundary}>
        Try again
      </button>
    </div>
  )
}

ErrorFallback.propTypes = {
  error: PropTypes.node.isRequired,
}
export default ErrorFallback
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { error: null, errorInfo: null }
//   }

//   // static getDerivedStateFromError(error) {
//   //   // Update state so the next render will show the fallback UI.
//   //   return { hasError: true }
//   // }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     this.setState({
//       error,
//       errorInfo,
//     })
//   }

//   render() {
//     const { errorInfo, error } = this.state
//     if (errorInfo) {
//       // Error path
//       return (
//         <div>
//           <h2 className='fs-4'>Something went wrong.</h2>
//           <details style={{ whiteSpace: 'pre-wrap' }}>
//             {error && error.toString()}
//             <br />
//             {errorInfo.componentStack}
//           </details>
//         </div>
//       )
//     }
//     const { children } = this.props
//     // Normally, just render children
//     return children
//   }
// }
// ErrorBoundary.propTypes = {
//   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
// }
// ErrorBoundary.whyDidYouRender = true
// export default ErrorBoundary
