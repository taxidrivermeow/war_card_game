import React from 'react';
import {gamePage} from "../utils/constants";

const ResultsPage = (props) => {
    return (
        <div className="results">
            <h1 className="score">{props.currentWinner}{props.currentWinner === 'Draw'?'':' win!'}</h1>
            <h1 className="score">Computer - {props.userName}</h1>
            <h2 className="score">Last score: {props.lastScore}</h2>
            <h1 className="score">Total score: {props.fullScore.computer} - {props.fullScore.user}</h1>
            <button onClick={() => {props.changePage(gamePage)}} className="again-btn">Again?</button>
        </div>
    );
};

export default ResultsPage;