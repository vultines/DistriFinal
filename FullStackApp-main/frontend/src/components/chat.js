// Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [userCount, setUserCount] = useState(0); // Variable de estado para el número de usuarios

    useEffect(() => {
        const newSocket = io('http://localhost:4000');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Conectado al servidor de sockets');
        });

        newSocket.on('disconnect', () => {
            console.log('Desconectado del servidor de sockets');
        });

        newSocket.on('chat message', (msg) => {
            console.log(`Mensaje recibido: ${msg}`);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        newSocket.on('user count', (count) => { // Escuchar el evento de número de usuarios
            setUserCount(count);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        socket.emit('chat message', inputMessage);
        setInputMessage('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '90px' }}>
            <div style={{ flex: 1, overflowY: 'scroll', marginBottom: '20px' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {messages.map((msg, index) => (
                        <li key={index} style={{ marginBottom: '10px', padding: '5px', background: '#f0f0f0', borderRadius: '5px' }}>{msg}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleMessageSubmit} style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    style={{ flex: 1, marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', background: 'blue', color: 'white', cursor: 'pointer' }}>Enviar</button>
            </form>
        </div>
    );
};

export default Chat;
