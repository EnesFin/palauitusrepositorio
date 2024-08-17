import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='outline-secondary' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className='d-grid gap-2'>
          <Button variant='outline-secondary' onClick={toggleVisibility}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
