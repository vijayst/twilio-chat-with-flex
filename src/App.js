import React, { useEffect, useState } from 'react';
import './app.css';
import createChannel from './createChannel';

export default function App() {
    const [channel, setChannel] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        createChannel('Vijay Thirugnanam 2').then(
            channel => {
                setChannel(channel);
            }
        );
    }, []);

    function handleSubmit() {
        if (message && channel) {
            channel.sendMessage(message);
            setMessage('');
        }
    }

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    function handleKeyPress(e) {
        if (e.which === 13) {
            handleSubmit();
            e.preventDefault();
        }
    }

    return (
        <div className="message-container">
            <div className="message message--received">
                <p>Hi !</p>
            </div>
            <div className="message message--sent">
                <p>Hello</p>
            </div>
            <div className="message message--received">
                <p>How can i help you?</p>
            </div>
            <div className="message-container__send">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={handleMessageChange}
                        onKeyPress={handleKeyPress}
                        className="message-container__input"
                        placeholder="Type your message"
                    />
                </form>
            </div>
        </div>
    );
}
