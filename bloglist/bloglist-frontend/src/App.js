import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            user: null
        }
    }

    componentDidMount() {
        blogService.getAll().then(blogs =>
          this.setState({ blogs })
        )

        const logged_user_json = window.localStorage.getItem('blogsLoggedUser')
        if (logged_user_json) {
            const user = JSON.parse(logged_user_json);
            blogService.setToken(user.token)
            this.setState({ user })
        }
    }

    showMsg(msg, msg_type) {
        const new_state = {
            msg,
            msg_type
        }
        this.setState(new_state);
        setTimeout(() => {
            this.setState({msg: undefined, msg_type: undefined});
        }, 2000);
    }

    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: event.target.username.value,
                password: event.target.password.value
            })
            window.localStorage.setItem('blogsLoggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.showMsg("Logged in as " + user.name, "success")
            this.setState({ user })
        } catch (exception) {
            this.showMsg("Error: " + exception, "fail")
        }
    }

    logout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('blogsLoggedUser')
        this.setState({ user: null })
    }

    addBlog = async (event) => {
        event.preventDefault()
        try {
            const new_blog = await blogService.add({
                title: this.blog_form.state.title,
                author: this.blog_form.state.author,
                url: this.blog_form.state.url
            })
            this.blog_form.clear()
            const blogs = this.state.blogs.concat(new_blog)
            this.showMsg("Added a new blog " + new_blog.title, "success")
            this.setState({ blogs })
            this.blog_form_togglable.toggleVisibility()
        } catch (exception) {
            this.showMsg("Error: " + exception, "fail")
        }
    }

    likeBlog = async (event) => {
        event.preventDefault()
        try {
            const id = event.target.attributes["data-id"].value;
            const blog = this.state.blogs.find(b => b._id === id)
            const liked_blog = await blogService.update(id, {
                //user: blog.user._id,
                likes: blog.likes + 1,
                author: blog.author,
                title: blog.title,
                url: blog.url
            })
            const blogs = this.state.blogs.map(b => b._id === id ? liked_blog : b)
            this.showMsg("Liked a blog " + liked_blog.title, "success")
            this.setState({ blogs })
        } catch (exception) {
            this.showMsg("Error: " + exception, "fail")
        }
    }

    removeBlog = async (event) => {
        event.preventDefault()
        const id = event.target.attributes["data-id"].value;
        const blog = this.state.blogs.find(b => b._id === id)
        if (window.confirm("Delele blog " + blog.title + " by " + blog.author + "?")) {
            try {
                await blogService.remove(id)
                const blogs = this.state.blogs.filter(b => b._id !== id)
                this.showMsg("Blog " + blog.title + " removed", "success")
                this.setState({ blogs })
            } catch (exception) {
                this.showMsg("Error: " + exception, "fail")
            }
        }
    }

    render() {
        const msg = this.state.msg ? (<Message msg={this.state.msg} type={this.state.msg_type} />) : undefined;
        let body;
        if (this.state.user === null) {
            body = (
                <div>
                    <h2>Kirjaudu sovellukseen</h2>
                    <form onSubmit={this.login}>
                        <div>käyttäjätunnus<input type="text" name="username"/></div>
                        <div>salasana<input type="password" name="password"/></div>
                        <button type="submit">kirjaudu</button>
                    </form>
                </div>
            )
        } else {
            body = (
                <div>
                    <h2>blogs</h2>
                    <p>{this.state.user.name} logged in<button onClick={this.logout}>logout</button></p>
                    {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                        <Blog key={blog._id} blog={blog} like_cb={this.likeBlog} remove_cb={ (!blog.user || blog.user._id === this.state.user.id) ? this.removeBlog : undefined }/>
                    )}
                    <Togglable button_label={"Add Blog"} ref={ component => this.blog_form_togglable = component }>
                        <BlogForm onAddBlog={this.addBlog} ref={ component => this.blog_form = component }/>
                    </Togglable>
                </div>
            )
        }
        return (
            <div>
                {msg}
                {body}
            </div>
        );
    }
}

export default App;
