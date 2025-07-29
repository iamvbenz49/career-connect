'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

// Dummy Users (Toggle between student and alumni here)
const loggedInUserId = 'alumni789'; // or 'student123'
const isAlumni = loggedInUserId.startsWith('alumni');

const contacts = isAlumni
  ? [
      { id: 'student123', name: 'KL Rahul' },
      { id: 'student456', name: 'Steven Smith' },
      { id: 'student789', name: 'Bruce Wayne' },
    ]
  : [
      { id: 'alumni789', name: 'Karan Mehta' },
      { id: 'alumni456', name: 'Shruti Desai' },
      { id: 'alumni123', name: 'Aditya Kapoor' },
    ];

type MessageType = {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
};

export default function ChatPage() {
  const [selectedReceiver, setSelectedReceiver] = useState(contacts[0]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedReceiver?.id) return;
    axios
      .get(`/api/chat/${loggedInUserId}/${selectedReceiver.id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Error fetching messages:', err));
  }, [selectedReceiver]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: MessageType = {
      senderId: loggedInUserId,
      receiverId: selectedReceiver.id,
      content: input,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post('/api/chat', newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[300px] bg-white border-r overflow-y-auto">
        <h2 className="text-xl font-bold px-4 py-4 border-b">Chats</h2>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              onClick={() => setSelectedReceiver(contact)}
              className={`cursor-pointer px-4 py-3 hover:bg-blue-50 border-b transition ${
                selectedReceiver.id === contact.id ? 'bg-blue-100 font-semibold' : ''
              }`}
            >
              {contact.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Chat with {selectedReceiver.name}
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">No messages yet. Start the convo 👀</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.senderId === loggedInUserId ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                  msg.senderId === loggedInUserId ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
                }`}>
                  <p>{msg.content}</p>
                  <span className="block text-xs text-right text-gray-400 mt-1">
                    {moment(msg.timestamp).format('h:mm A')}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t bg-white flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
