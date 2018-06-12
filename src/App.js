import React, {Component} from 'react'
import './App.css'
import {Board} from 'react-trello'

const data = require('./data.json')

const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class App extends Component {
    state = {boardData: {lanes: []}}

    setEventBus = eventBus => {
        this.setState({eventBus})
    }

    async componentWillMount() {
        const response = await this.getBoard()
        this.setState({boardData: response})
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    completeCard = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Purchased 2 Litres of milk from the store'}
        })
        this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'To-do', cardId: 'Milk'})
    }

    shouldReceiveNewData = nextData => {
        console.log('New card has been added')
        console.log(nextData)
    }

	handleCardAdd = (card, laneId) => {
		console.log(`New card added to lane ${laneId}`)
		console.dir(card)
	}

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h3>React Trello Application</h3>
                </div>
                <div className="App-intro">
                    <button onClick={this.completeCard} style={{margin: 5}}>
                        Complete Buy Milk
                    </button>
                    <Board
                        editable
												onCardAdd={this.handleCardAdd}
                        data={this.state.boardData}
                        draggable
                        onDataChange={this.shouldReceiveNewData}
                        eventBusHandle={this.setEventBus}
                        handleDragStart={handleDragStart}
                        handleDragEnd={handleDragEnd}
                    />
                </div>
            </div>
        )
    }
}

export default App
