const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD':
            state = { ...state }
            state.good++
            return state
        case 'OK':
            state = { ...state }
            state.ok++
            return state
        case 'BAD':
            state = { ...state }
            state.bad++
            return state
        case 'ZERO':
            state = { ...initialState }
            return state
        default: 
    }
    return state
}

export default counterReducer
