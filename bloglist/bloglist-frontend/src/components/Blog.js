import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    toggleVisibility = (e) => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const style = { display: this.state.visible ? '' : 'none' }
        const delete_button = this.props.remove_cb && (<div><button onClick={this.props.remove_cb} data-id={this.props.blog._id}>Delete</button></div>)
        return (
            <div>
                <div onClick={this.toggleVisibility} className="title_author">
                    {this.props.blog.title} {this.props.blog.author}
                </div>
                <div style={style} className={"blogdrop"}>
                    <div>
                        <a href={this.props.blog.url}>{this.props.blog.url}</a>
                    </div>
                    <div>
                        <span className="likes">{this.props.blog.likes} likes</span> <button onClick={this.props.like_cb} data-id={this.props.blog._id}>like</button>
                    </div>
                    <div>Added by {this.props.blog.user.name}</div>
                    {delete_button}
                </div>
            </div>
        )
    }
}

Blog.propTypes = {
    remove_cb: PropTypes.func,
    like_cb: PropTypes.func.isRequired,
    blog: PropTypes.object
}

export default Blog
