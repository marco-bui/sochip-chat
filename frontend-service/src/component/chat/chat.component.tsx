import { useEffect, useState } from "react";
import { ChatDataDto } from "./dto/chat.dto";
import { io } from "socket.io-client";
import { Constant } from "../../constants/constant";

const socket = io('http://localhost:19111');

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
    setSender('');
  }

  return (
    <div>
      <h1>Sờ Chíp Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type='text'
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        placeholder='Nhập tên vào đây...'
      />
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Nhập tin nhắn vào đây...'
      />
      <button onClick={sendMessage}></button>
    </div>
  )
}

export default Chat;