import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, ChevronLeft, Image as ImageIcon, MessageCircle, Plus, Users } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
  read: boolean;
}

interface Support {
  id: string;
  name: string;
  avatar: string;
  role: 'mother' | 'doula';
  online: boolean;
}

const mockSupport: Support[] = [
  {
    id: '1',
    name: 'Sophia Murphy',
    avatar: 'https://images.unsplash.com/photo-1629747387925-6905ff5a558a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    role: 'mother',
    online: true
  },
  {
    id: '2',
    name: 'Mable Cross',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    role: 'doula',
    online: false
  },
  {
    id: '3',
    name: 'Rachel Johnson',
    avatar: 'https://images.unsplash.com/photo-1618085222100-93f0eecad0aa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    role: 'doula',
    online: true
  },
  {
    id: '4',
    name: 'Amara Okina',
    avatar: 'https://images.unsplash.com/photo-1530785602389-07594beb8b73?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    role: 'doula',
    online: true
  },
  {
    id: '5',
    name: 'Jessica Thompson',
    avatar: 'https://plus.unsplash.com/premium_photo-1669882305249-5af7f5ed5c10?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    role: 'mother',
    online: false
  }
];

const mockConversations = [
  {
    id: '1',
    name: 'Rachel Johnson',
    avatar: 'https://images.unsplash.com/photo-1618085222100-93f0eecad0aa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'Looking forward to our appointment tomorrow!',
    timestamp: '2:30 PM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Amara Okina',
    avatar: 'https://images.unsplash.com/photo-1530785602389-07594beb8b73?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'Your test results look great! Everything is...',
    timestamp: '11:45 AM',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Jessica Thompson',
    avatar: 'https://plus.unsplash.com/premium_photo-1669882305249-5af7f5ed5c10?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'I can recommend some great prenatal yoga...',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  }
];

const mockMessages = [
  {
    id: '1',
    content: 'Hi Layla! How are you feeling today?',
    sender: 'other',
    timestamp: '2:15 PM',
    read: true,
  },
  {
    id: '2',
    content: "I'm doing well, thanks! Just had some questions about tomorrow's appointment.",
    sender: 'user',
    timestamp: '2:20 PM',
    read: true,
  },
  {
    id: '3',
    content: 'Of course! What would you like to know?',
    sender: 'other',
    timestamp: '2:25 PM',
    read: true,
  },
  {
    id: '4',
    content: 'Should I bring anything specific with me?',
    sender: 'user',
    timestamp: '2:28 PM',
    read: true,
  },
  {
    id: '5',
    content: 'Just bring your pregnancy journal and any questions you have. Looking forward to our appointment tomorrow!',
    sender: 'other',
    timestamp: '2:30 PM',
    read: false,
  },
];

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: String(messages.length + 1),
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen">
      <div className="flex h-screen">
        {/* Conversations List */}
        <div className={`w-full md:w-80 glass border-r border-purple-100/30 ${selectedConversation ? 'hidden md:block' : ''}`}>
          {/* Following Section */}
          <div className="p-4 border-b border-purple-100/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-purple-900 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Support
              </h2>
            </div>
            <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
              {mockSupport.map((person) => (
                <div key={person.id} className="flex-none text-center">
                  <div className="relative">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    {person.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <p className="text-xs text-purple-900 mt-1 font-medium truncate max-w-[80px]">
                    {person.name}
                  </p>
                  <p className="text-[10px] text-purple-600 capitalize">
                    {person.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-purple-100/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 glass-input rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="overflow-y-auto h-[calc(100vh-13rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className="p-4 hover:bg-white/30 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-purple-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-purple-600">{conversation.timestamp}</span>
                    </div>
                    <p className="text-sm text-purple-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{conversation.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="glass border-b border-purple-100/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden p-2 hover:bg-white/30 rounded-xl"
                  >
                    <ChevronLeft className="w-5 h-5 text-purple-600" />
                  </button>
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="font-medium text-purple-900">{selectedConversation.name}</h2>
                    {selectedConversation.online && (
                      <p className="text-xs text-green-500">Online</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/30 rounded-xl">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </button>
                  <button className="p-2 hover:bg-white/30 rounded-xl">
                    <Video className="w-5 h-5 text-purple-600" />
                  </button>
                  <button className="p-2 hover:bg-white/30 rounded-xl">
                    <MoreVertical className="w-5 h-5 text-purple-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'glass'
                    } rounded-2xl px-4 py-2`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-purple-600'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="glass border-t border-purple-100/30 p-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/30 rounded-xl">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 glass-input rounded-xl px-4 py-2 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 glass-button rounded-xl"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-purple-900 mb-2">Select a Conversation</h2>
              <p className="text-purple-600">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Message Button */}
      <button
        onClick={() => setShowNewMessage(true)}
        className="fixed right-4 bottom-4 w-12 h-12 glass-button rounded-xl flex items-center justify-center shadow-lg"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-6">New Message</h2>
              <div className="space-y-4">
                {mockFollowing.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => {
                      const conversation = conversations.find(c => c.id === person.id);
                      if (conversation) {
                        setSelectedConversation(conversation);
                      } else {
                        // Create new conversation
                        const newConversation: Conversation = {
                          id: person.id,
                          name: person.name,
                          avatar: person.avatar,
                          lastMessage: '',
                          timestamp: 'Now',
                          unread: 0,
                          online: person.online
                        };
                        setConversations([...conversations, newConversation]);
                        setSelectedConversation(newConversation);
                      }
                      setShowNewMessage(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/30 rounded-xl transition-colors"
                  >
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-purple-900">{person.name}</h3>
                      <p className="text-sm text-purple-600 capitalize">{person.role}</p>
                    </div>
                    {person.online && (
                      <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowNewMessage(false)}
                className="mt-6 w-full px-4 py-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};