const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW':
            return state.concat(action.data)
        case 'VOTE':
            const id = action.data.id
            const anecdote_to_vote = state.find(a => id === a.id)
            const voted_anecdote = {...anecdote_to_vote, votes: anecdote_to_vote.votes + 1}
            return state.map(a => a.id === id ? voted_anecdote : a)
        default: 
    }
    return state
}

export default anecdoteReducer
