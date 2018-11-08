import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hide_when_visible = { display: this.state.visible ? 'none' : '' }
        const show_when_visible = { display: this.state.visible ? '' : 'none' }
        return (
            <div>
                <div style={hide_when_visible}>
                    <button onClick={ this.toggleVisibility }>{ this.props.button_label }</button>
                </div>
                <div style={show_when_visible}>
                    { this.props.children }
                    <button onClick={ this.toggleVisibility }>Cancel</button>
                </div>
            </div>
        )
    }
}

Togglable.propTypes = {
    button_label: PropTypes.string.isRequired
}

export default Togglable;
