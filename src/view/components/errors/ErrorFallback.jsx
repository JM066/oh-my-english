import { useErrorBoundary } from 'react-error-boundary'
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
