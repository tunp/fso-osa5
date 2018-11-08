import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    let blog
    let on_click_handler
    let blog_component
    beforeEach(() => {
        blog = {
            title: "test title 1",
            author: "test author 2",
            likes: 3,
            user: { name: "test user 4" }
        }
        on_click_handler = jest.fn()
        blog_component = shallow(<Blog blog={blog} like_cb={on_click_handler} />)
    })
    it('renders blog', () => {
        const title_author = blog_component.find('.title_author')
        const likes = blog_component.find('.likes')
        expect(title_author.text()).toContain(`${blog.title} ${blog.author}`)
        expect(likes.text()).toContain(`${blog.likes} likes`)
    })
    it('liking blog', () => {
        const button = blog_component.find('button')
        const count = 2
        for (let i = 0; i < count; i++) {
            button.simulate('click')
        }
        expect(on_click_handler.mock.calls.length).toBe(count)
    })
    it('blog content not shown', () => {
        const drop = blog_component.find('.blogdrop')
        expect(drop.getElement().props.style).toEqual({ display: 'none' })
    })
    it('blog content shown', () => {
        const vis_button = blog_component.find('.title_author')
        vis_button.simulate('click')
        const drop = blog_component.find('.blogdrop')
        expect(drop.getElement().props.style).toEqual({ display: '' })
    })
})
