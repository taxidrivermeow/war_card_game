import React from 'react';

const LoginPage = (props) => {
    return (
        <div className="login-page">
            <h1 className="title">Ready for WAR?</h1>
            <input className="name-input"
                   type="text"
                   placeholder="Enter your name"
                   onChange={props.setName}
            />
            <button className="start-btn"
                    onClick={props.checkName}
            >Start</button>
        </div>
    );
};

export default LoginPage;