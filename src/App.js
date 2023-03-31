import React, {useState} from 'react';
import './App.css';
import LoginPage from "./components/LoginPage";
import GamePage from "./components/GamePage";
import {gamePage, loginPage, resultsPage} from "./utils/constants";
import ResultsPage from "./components/ResultsPage";

const App = () => {
    const [userName, setUserName] = useState(null);
    const [currentWinner, setCurrentWinner] = useState('Draw');
    const [currentPage, setCurrentPage] = useState(loginPage);
    const [lastScore, setLastScore] = useState(null);
    const [fullScore, setFullScore] = useState({
        computer: 0,
        user: 0,
    });

    const gameOver = (winner, lastScore) => {
        let winnerName;
        let computerScore = fullScore.computer;
        let userScore = fullScore.user;
        if (winner === 'user') {
            winnerName = userName;
            userScore++;
        } else if (winner === 'computer') {
            winnerName = 'Computer';
            computerScore++;
        } else {
            winnerName = 'Draw';
        }

        setCurrentWinner(winnerName);
        setCurrentPage(resultsPage);
        setLastScore(lastScore);
        setFullScore({
            computer: computerScore,
            user: userScore,
        });
    }

    const changePage = page => {
        setCurrentPage(page);
    }

    const setName = e => {
        setUserName(e.currentTarget.value.trim());
    }

    const checkName = () => {
        if (userName) {
            changePage(gamePage);
        }
    }

    return (
        <div className={'wrapper'}>
            {(currentPage === gamePage) ? <GamePage userName={userName}
                                                    changePage={changePage}
                                                    gameOver={gameOver}
                /> :
                (currentPage === resultsPage) ? <ResultsPage userName={userName}
                                                             changePage={changePage}
                                                             fullScore={fullScore}
                                                             currentWinner={currentWinner}
                                                             lastScore={lastScore}
                /> : <LoginPage setName={setName}
                                checkName={checkName}
                />}
        </div>
    );
};

export default App;