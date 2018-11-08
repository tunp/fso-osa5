import React from 'react'
import PropTypes from 'prop-types'

const Message = ({msg, type}) => (<div className={type}>{msg}</div>)

Message.propTypes = {
    msg: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Message
