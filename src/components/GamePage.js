import React, {Component} from 'react';
import {allCards, results} from "../utils/constants";
import Cards from "../utils/Cards";

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.deck = Cards.shuffleDeck([...allCards]);
        this.state = {
            button: 'Next',
            score: {
                computer: 0,
                user: 0,
            },
            decks: {
                computer: this.deck.splice(0, 26),
                user: this.deck,
            },
            currentCard: {
                computer: 'back',
                user: 'back',
            }
        }
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
            const currentComputerCard = Cards.checkValue(currentComputerCardCode);
            const currentUserCard = Cards.checkValue(currentUserCardCode);

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
}

export default GamePage;