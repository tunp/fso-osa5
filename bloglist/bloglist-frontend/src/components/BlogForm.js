import React from 'react'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.submit = props.onAddBlog
        this.state = {
            title: "",
            author: "",
            url: "",
        }
    }

    inputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    clear() {
        this.setState({ title: "", author: "", url: "" })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <div>title<input name="title" value={this.state.title} onChange={this.inputChange}/></div>
                    <div>author<input name="author" value={this.state.author} onChange={this.inputChange}/></div>
                    <div>url<input name="url" value={this.state.url} onChange={this.inputChange}/></div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

BlogForm.propTypes = {
    onAddBlog: PropTypes.func.isRequired
}

export default BlogForm
