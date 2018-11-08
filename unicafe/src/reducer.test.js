import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }
    it('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }
        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)
    })
    it('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState
        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })
    it('ok is incremented', () => {
        const state = initialState
        deepFreeze(state)
        const newState = counterReducer(state, { type: 'OK' })
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0
        })
    })
    it('bad is incremented', () => {
        const state = initialState
        deepFreeze(state)
        const newState = counterReducer(state, { type: 'BAD' })
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1
        })
    })
    it('state is cleared', () => {
        const state = {...initialState}
        state.good++
        deepFreeze(state)
        const newState = counterReducer(state, { type: 'ZERO' })
        expect(newState).toEqual(initialState)
    })
})
