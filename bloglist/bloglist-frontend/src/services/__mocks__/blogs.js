let token = null

const blogs = [
    {
        _id: 1,
        title: "test title 1",
        author: "test author 1",
        url: "https://author.test/1",
        likes: 1,
        user: { name: "Test User 1" }
    },
    {
        _id: 2,
        title: "test title 2",
        author: "test author 2",
        url: "https://author.test/2",
        likes: 2,
        user: { name: "Test User 2" }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (new_token) => {
    token = `bearer ${new_token}`
}

export default { getAll, blogs, setToken }
