import React, { useState } from 'react';
import api from '../api';
import axios from 'axios'
import { IoMdSend } from "react-icons/io";

const Chat = ({ fileId }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!fileId || isNaN(fileId)) {
      alert("Please upload a PDF first and ensure file ID is valid.");
      return;
    }
  
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
  console.log("reached till here")
    try {
      console.log("reached till here2")
      console.log("File ID:", fileId, "Question:", input);  // Add this to verify the values being sent

      // const response = await api.post(
      //   '/ask_question',
      //   { file_id: Number(fileId), question: input }, 
      //   { headers: { 'Content-Type': 'application/json' } }
      // );
      const response = await axios.post(
        'http://localhost:8000/ask_question',
        { file_id: Number(fileId), question: input },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("reached till here3")
      const botMessage = { sender: 'bot', text: response.data.answer };
      setMessages((prev) => [...prev, botMessage]);
      setInput('');
    } catch (error) {
      console.error("Error communicating with model:", error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error: Unable to get response from the model.' },
      ]);
    }
  };
  
  return (
    <div className="w-full h-full justify-between p-4 flex flex-col gap-4 bg-slate-600">
      <div className="h-full border p-4 bg-gray-50 rounded-lg  overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 flex items-center  gap-2`}>
            <div className='w-10 h-10'>
            <div className=' w-8 h-8 bg-gray-500 rounded-full'></div>
            </div>
            <span
              className={`ml-3 px-4 py-2 rounded  text-black `}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 w-full p-2 border rounded-lg shadow-lg bg-gray-50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="w-full p-2 bg-gray-50 outline-none"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-400 text-white rounded disabled:bg-blue-200"
          disabled={!fileId}
        >
          <IoMdSend/>
        </button>
      </div>
    </div>
  );
};

export default Chat;
