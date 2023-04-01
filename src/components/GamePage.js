import React, {useState} from 'react';
import {allCards, results} from "../utils/constants";
import Cards from "../utils/Cards";

const GamePage = (props) => {
    const deck = Cards.shuffleDeck([...allCards]);
    const [button, setButton] = useState('Next');
    const [score, setScore] = useState({
        computer: 0,
        user: 0,
    });
    const [decks, setDecks] = useState({
        computer: deck.splice(0, 26),
        user: deck,
    });
    const [currentCard, setCurrentCard] = useState({
        computer: 'back',
        user: 'back',
    });

    const nextStep = () => {
        if (button === results) {
            let winner;
            if (score.user > score.computer) {
                winner = props.userName;
            } else if (score.user < score.computer) {
                winner = 'Computer';
            } else {
                winner = 'Draw'
            }

            props.gameOver(winner, `${score.computer} - ${score.user}`);
        } else {
            const currentComputerCardCode = decks.computer.splice(0, 1);
            const currentUserCardCode = decks.user.splice(0, 1);
            const currentComputerCard = Cards.checkValue(currentComputerCardCode);
            const currentUserCard = Cards.checkValue(currentUserCardCode);

            let currentScoreComputer = score.computer;
            let currentScoreUser = score.user;

            if (currentComputerCard > currentUserCard) {
                currentScoreComputer++;
            } else if (currentComputerCard < currentUserCard) {
                currentScoreUser++;
            }

            setCurrentCard({
                computer: currentComputerCardCode,
                user: currentUserCardCode,
            });

            setScore({
                computer: currentScoreComputer,
                user: currentScoreUser,
            });

            if (decks.computer.length === 0 || decks.user.length === 0) {
                setButton(results);
            }
        }
    }

    return (
        <div className="game">
            <h1 className="playerName">Computer: {score.computer}</h1>
            <img className="card" src={require(`../img/${currentCard.computer}.png`)} alt={'card'}/>
            <img className="card" src={require(`../img/${currentCard.user}.png`)} alt={'card'}/>
            <h1 className="playerName">{props.userName}: {score.user}</h1>
            <button className="next-btn"
                    onClick={nextStep}
            >{button}
            </button>
        </div>
    );
};

export default GamePage;