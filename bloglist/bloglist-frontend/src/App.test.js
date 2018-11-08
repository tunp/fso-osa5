import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    describe('user not logged in', () => {
        beforeAll(() => {
            app = mount(<App />)
        })

        it('doesnt show any blogs', () => {
            app.update()
            expect(app.find('input[name="username"]').length).toBe(1)
            expect(app.find('input[name="password"]').length).toBe(1)
            expect(app.find('div.title_author').length).toBe(0)
            expect(app.find('div.blogdrop').length).toBe(0)
        })
    })
    describe('user logged in', () => {
        beforeAll(() => {
            const user = {
                username: 'testuser',
                token: '21433543',
                name: 'Testikäyttäjä'
            }
            localStorage.setItem('blogsLoggedUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('shows blogs', () => {
            app.update()
            expect(app.find('input[name="username"]').length).toBe(0)
            expect(app.find('input[name="password"]').length).toBe(0)
            expect(app.find('div.title_author').length).toBe(blogService.blogs.length)
            expect(app.find('div.blogdrop').length).toBe(blogService.blogs.length)
        })
    })
})
