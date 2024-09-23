const RechargeNumber = () => {
  return <div>RechargeNumber</div>;
};

export default RechargeNumber;

// import React, { useState, useEffect } from 'react';
// import { FiSearch, FiSend, FiSettings, FiUser } from 'react-icons/fi';
// import { MdOutlineEmojiEmotions } from 'react-icons/md';
// import { IoMdNotificationsOutline } from 'react-icons/io';

// const MessageDashboard = () => {
//   const [currentTheme, setCurrentTheme] = useState('light');
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   const themes = {
//     light: 'bg-white text-gray-800',
//     dark: 'bg-gray-900 text-white',
//     blue: 'bg-blue-100 text-blue-900',
//     green: 'bg-green-100 text-green-900',
//   };

//   const users = [
//     { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'online', bio: 'Software Developer' },
//     { id: 2, name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'offline', bio: 'UX Designer' },
//     { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'online', bio: 'Product Manager' },
//   ];

//   useEffect(() => {
//     // Simulating real-time message updates
//     const interval = setInterval(() => {
//       const newMsg = {
//         id: messages.length + 1,
//         sender: users[Math.floor(Math.random() * users.length)],
//         content: `New message ${messages.length + 1}`,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages(prevMessages => [...prevMessages, newMsg]);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const newMsg = {
//         id: messages.length + 1,
//         sender: users[0], // Assuming the first user is the current user
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages(prevMessages => [...prevMessages, newMsg]);
//       setNewMessage('');
//     }
//   };

//   const filteredMessages = messages.filter(msg =>
//     msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     msg.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className={`h-screen flex flex-col ${themes[currentTheme]}`}>
//       <header className="p-4 border-b flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Message Dashboard</h1>
//         <div className="flex items-center space-x-4">
//           <IoMdNotificationsOutline className="text-2xl cursor-pointer" />
//           <select
//             className="bg-transparent border rounded p-1"
//             value={currentTheme}
//             onChange={(e) => setCurrentTheme(e.target.value)}
//           >
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//             <option value="blue">Blue</option>
//             <option value="green">Green</option>
//           </select>
//           <FiSettings className="text-2xl cursor-pointer" />
//         </div>
//       </header>
//       <div className="flex-1 flex overflow-hidden">
//         <aside className="w-1/4 p-4 border-r overflow-y-auto">
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Search users or messages"
//               className="w-full p-2 border rounded"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <h2 className="text-xl font-semibold mb-2">Users</h2>
//           <ul>
//             {users.map(user => (
//               <li key={user.id} className="flex items-center mb-4 p-2 hover:bg-gray-100 rounded cursor-pointer">
//                 <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
//                 <div>
//                   <h3 className="font-semibold">{user.name}</h3>
//                   <p className="text-sm text-gray-600">{user.bio}</p>
//                 </div>
//                 <span className={`ml-auto w-3 h-3 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
//               </li>
//             ))}
//           </ul>
//         </aside>
//         <main className="flex-1 flex flex-col">
//           <div className="flex-1 p-4 overflow-y-auto">
//             {filteredMessages.map(msg => (
//               <div key={msg.id} className={`mb-4 ${msg.sender.id === users[0].id ? 'text-right' : ''}`}>
//                 <div className={`inline-block max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-2 rounded ${msg.sender.id === users[0].id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
//                   <p className="font-semibold">{msg.sender.name}</p>
//                   <p>{msg.content}</p>
//                   <p className="text-xs mt-1">{msg.timestamp}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="p-4 border-t">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type a message"
//                 className="flex-1 p-2 border rounded-l"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               />
//               <button
//                 className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition duration-200"
//                 onClick={handleSendMessage}
//               >
//                 <FiSend />
//               </button>
//               <button className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition duration-200">
//                 <MdOutlineEmojiEmotions />
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MessageDashboard;
