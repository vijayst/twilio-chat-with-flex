import React from 'react';
import './app.css';

export default function App() {
    return (
        <div className="message-container">
            <div class="message message--received">
                <p>Hi !</p>
            </div>
            <div className="message message--sent">
                <p>Hello</p>
            </div>
            <div className="message message--received">
                <p>How can i help you?</p>
            </div>
            <div className="message-container__send">
                <textarea className="message-container__input" placeholder="Type your message" />
            </div>
        </div>
    );
}
