import React from 'react'
import PropTypes from 'prop-types'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({text, votes, handle_vote}) => (
    <div>
        {text}<br/>
        has {votes} votes<br/>
        <Button handleClick={handle_vote} text={"vote"}/>
    </div>
)

const actionFor = {
    anecdoteCreation(anecdote) {
        return {
            type: 'NEW',
            data: {
                id: generateId(),
                text: anecdote,
                votes: 0
            }
        }
    },
    anecdoteVoting(id) {
        return {
            type: 'VOTE',
            data: {id}
        }
    }
}

class App extends React.Component {
    vote = (id) => (e) => {
        e.preventDefault()
        this.context.store.dispatch(actionFor.anecdoteVoting(id))
    }

    addAnecdote = (e) => {
        e.preventDefault()
        this.context.store.dispatch(actionFor.anecdoteCreation(e.target.anecdote.value))
        e.target.anecdote.value = ""
    }
    render() {
        return (
            <div>
                <h1>Anecdotes</h1>
                {this.context.store.getState().sort((a, b) => { return b.votes - a.votes }).map(a => (<Anecdote key={a.id} text={a.text} votes={a.votes} handle_vote={this.vote(a.id)} />))}
                <h1>Create new</h1>
                <form onSubmit={this.addAnecdote}>
                    <input type="text" name="anecdote" />
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default App
