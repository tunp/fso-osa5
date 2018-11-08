import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import anecdoteReducer from './reducer'

const store = createStore(anecdoteReducer)

const render = () => {
    ReactDOM.render(
        <Provider store={ store }>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)
