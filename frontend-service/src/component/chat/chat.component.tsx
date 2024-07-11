import {CSSProperties, useEffect, useState} from "react";
import { ChatDataDto } from "./dto/chat.dto";
import { io } from "socket.io-client";
import { Constant } from "../../constants/constant";
import './chat.css';

const socket = io('http://localhost:19111');

const inputStyle: CSSProperties = {
  flex: '1',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const senderInputStyle: CSSProperties = {
  flex: '1',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontWeight: 'bold',
}

const Chat = () => {
  const [sender, setSender] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatDataDto[]>([]);

  useEffect(() => {
    socket.on(Constant.SOCHIP_CHAT, (message: ChatDataDto) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off(Constant.SOCHIP_CHAT);
    }
  }, []);

  const sendMessage = () => {
    const payload: ChatDataDto = {
      sender,
      message,
    };

    if (!payload.sender || !payload.message) return;

    socket.emit(Constant.SOCHIP_CHAT, payload);
    setMessage('');
  }

  const clearMessage = () => {
    setMessages([]);
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f1a3e0',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Times New Roman',
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#61097e',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF',
      }}>
        Sờ Chíp Chat
      </h1>
      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom: '20px',
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: msg.sender === sender ? '#92b7de' : '#fff',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            <strong style={{
              color: msg.sender === sender ? '#001a85' : '#333',
            }}>
              {msg.sender}:
            </strong> {msg.message}
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '10px',
      }}>
        <input
          type='text'
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder='Nhập tên vào đây...'
          style={senderInputStyle}
        />
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Nhập tin nhắn vào đây...'
          style={inputStyle}
        />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
      }}>
        <button onClick={sendMessage}>Gửi</button>
        <button onClick={clearMessage}>Clear</button>
      </div>
    </div>
  )
}

export default Chat;