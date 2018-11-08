import React from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({feedback}) => {
    let sum = feedback.good - feedback.bad
    let total = feedback.good + feedback.ok + feedback.bad
    return (
        <div>
            <p>hyvä {feedback.good}</p>
            <p>neutraali {feedback.ok}</p>
            <p>huono {feedback.bad}</p>
            <p>keskiarvo { sum / total }</p>
            <p>positiivisia { (feedback.good / total) * 100 } %</p>
        </div>
    )
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={() => this.props.store.dispatch({ type: "GOOD" })} text={"hyvä"}/>
                <Button handleClick={() => this.props.store.dispatch({ type: "OK" })} text={"neutraali"}/>
                <Button handleClick={() => this.props.store.dispatch({ type: "BAD" })} text={"huono"}/>
                <h1>statistiikka</h1>
                <Statistics feedback={this.props.store.getState()}/>
                <Button handleClick={() => this.props.store.dispatch({ type: "ZERO" })} text={"nollaa tilasto"}/>
            </div>
        )
    }
}

export default App
