import React, {Component} from 'react';
import {allCards, results} from "../utils/constants";
import Card from "../utils/Card";

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.deck = [...allCards];
        this.state = {
            button: 'Next',
            score: {
                computer: 0,
                user: 0,
            },
            decks: {
                computer: [],
                user: [],
            },
            currentCard: {
                computer: 'back',
                user: 'back',
            }
        }
    }

    shuffleDeck = () => {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    divideDeck = () => {
        const computerDeck = this.deck.splice(0, 26);
        const userDeck = this.deck;
        this.setState({
            ...this.state, decks: {
                computer: computerDeck,
                user: userDeck
            }
        });
    }

    nextStep = () => {
        if (this.state.button === results) {
            let winner;
            const currentScoreComputer = this.state.score.computer;
            const currentScoreUser = this.state.score.user;
            const score = `${currentScoreComputer} - ${currentScoreUser}`;

            if (currentScoreUser > currentScoreComputer) {
                winner = 'user';
            } else if (currentScoreUser < currentScoreComputer) {
                winner = 'computer';
            } else {
                winner = 'draw'
            }

            this.props.gameOver(winner, score);
        } else {
            const currentComputerCardCode = this.state.decks.computer.splice(0, 1);
            const currentUserCardCode = this.state.decks.user.splice(0, 1);
            const currentComputerCard = Card.checkValue(currentComputerCardCode);
            const currentUserCard = Card.checkValue(currentUserCardCode);

            let currentScoreComputer = this.state.score.computer;
            let currentScoreUser = this.state.score.user;

            if (currentComputerCard > currentUserCard) {
                currentScoreComputer++;
            } else if (currentComputerCard < currentUserCard) {
                currentScoreUser++;
            }

            let result = {
                ...this.state,
                currentCard: {
                    computer: currentComputerCardCode,
                    user: currentUserCardCode,
                },
                score: {
                    computer: currentScoreComputer,
                    user: currentScoreUser,
                },
            }

            if (this.state.decks.computer.length === 0 || this.state.decks.user.length === 0) {
                result.button = results;
            }

            this.setState(result);
        }
    }

    render() {
        return (
            <div className="game">
                <h1 className="playerName">Computer: {this.state.score.computer}</h1>
                <img className="card" src={require(`../img/${this.state.currentCard.computer}.png`)} alt={'card'}/>
                <img className="card" src={require(`../img/${this.state.currentCard.user}.png`)} alt={'card'}/>
                <h1 className="playerName">{this.props.userName}: {this.state.score.user}</h1>
                <button className="next-btn"
                        onClick={this.nextStep}
                >{this.state.button}
                </button>
            </div>
        );
    }

    componentDidMount() {
        this.shuffleDeck();
        this.divideDeck();
    }
}

export default GamePage;