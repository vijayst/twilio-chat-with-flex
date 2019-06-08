import React, { useEffect, useState } from 'react';
import './app.css';
import createChannel from './createChannel';

function Messages({ messages }) {
    function getClassName(message) {
        const sender = messages[messages.length - 1].author;
        return message.author === sender
            ? 'message message--sent'
            : 'message message--received';
    }

    return messages.map((m, i) => (
        <div key={i} className={getClassName(m)}>{m.body}</div>
    ));
}

export default function App() {
    const [channel, setChannel] = useState(null);
    const [message, setMessage] = useState('');
    let [messages, setMessages] = useState([]);

    useEffect(() => {
        createChannel('Vijay').then(channel => {
            setChannel(channel);
            channel.on('messageAdded', message => {
                console.log('message', message);
                messages = messages.slice();
                messages.unshift({ body: message.body, author: message.author });
                setMessages(messages);
            });
        });
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
            <Messages messages={messages} />
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
