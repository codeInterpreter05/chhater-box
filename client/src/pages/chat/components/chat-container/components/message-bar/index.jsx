// import { useSocket } from '@/context/SocketContext';
// import apiClient from '@/lib/api-client';
// import { useAppStore } from '@/store';
// import { UPLOAD_FILE_ROUTE } from '@/utils/constants';
// import EmojiPicker from 'emoji-picker-react';
// import React, { useEffect, useRef, useState } from 'react';
// import { GrAttachment } from 'react-icons/gr';
// import { IoSend } from 'react-icons/io5';
// import { RiEmojiStickerLine } from 'react-icons/ri';

// const MessageBar = () => {
//   const emojiRef = useRef(null);
//   const [message, setMessage] = useState("");
//   const [emojiPickerOpen, setemojiPickerOpen] = useState(false);
//   const { selectedChatType, selectedChatData, userInfo, addMessage, setIsUploading, setIsDownloading, setFileUploadProgress, setFileDownloadProgress } = useAppStore(); 
//   const socket = useSocket();
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (emojiRef.current && !emojiRef.current.contains(event.target)) {
//         setemojiPickerOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [emojiRef]);

//   const handleSendMessage = async () => {
//     if (message.trim() === "") return; 

//     const newMessage = {
//       sender: userInfo._id,
//       content: message,
//       receiver: selectedChatData._id,
//       messageType: 'text',
//       fileURL: undefined,
//       timestamp: new Date().toISOString(),
//     };

//     if (selectedChatType === 'contact') {
//       socket.emit('sendMessage', newMessage);

//       addMessage(newMessage);
//     }

//     setMessage("");
//   };

//   const handleAddEmoji = (emoji) => {
//     setMessage((message) => message + emoji.emoji);
//   };

//   const handleAttachmentClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   }

//   const handleAttachmentChange = async (e) => {
//       try {
//         const file = e.target.files[0];
//         if (file) {
//           const formData = new FormData();
//           formData.append('file', file);

//           setIsUploading(true);

//           const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {withCredentials:true,
//             onUploadProgress: (data) => {
//               setFileUploadProgress(Math.round((data.loaded / data.total) * 100));
//             }
//           });
          
//           if (response.status === 200 && response.data) {
//             setIsUploading(false);
//             if(selectedChatType === 'contact') {
//               socket.emit('sendMessage', {
//                 sender: userInfo._id,
//                 content: undefined,
//                 receiver: selectedChatData._id,
//                 messageType: 'file',
//                 fileURL: response.data.filePath,
//                 timestamp: new Date().toISOString(),
//               });
//             }
            
//           }
//         }
//       } catch (error) {
//         setIsUploading(false);
//         console.error('Error:', error);
//       }
//   }

//   return (
//     <div className="h-[10vh] bg-[#1C1D25] flex justify-center items-center px-2 sm:px-4 mb-6 gap-2 sm:gap-6">
//       <div className="flex-1 w-auto flex bg-[#2A2B33] rounded-xl items-center gap-5 h-[80%] sm:h-[100%]">
//         <input
//           type="text"
//           className="flex justify-between sm:p-5 pl-3 w-[60%] bg-transparent rounded-xl focus:border-none focus:outline-none"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <div className="flex justify-end pr-2 gap-2 sm:gap-5 w-[35%]">
//           <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300">
//             <GrAttachment className="text-xl sm:text-2xl" onClick={handleAttachmentClick} />
//           </button>
//           <input type="file" name="" id="" className='hidden' ref={fileInputRef} onChange={(e) => handleAttachmentChange(e)}/>
//           <div className="relative">
//             <button
//               className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
//               onClick={() => setemojiPickerOpen(true)}
//             >
//               <RiEmojiStickerLine className="text-xl sm:text-2xl mt-1" />
//             </button>
//             <div className="absolute bottom-16 right-0" ref={emojiRef}>
//               <EmojiPicker
//                 theme="dark"
//                 open={emojiPickerOpen}
//                 onEmojiClick={handleAddEmoji}
//                 autoFocusSearch={false}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <button
//         className="bg-[#8417FF] rounded-xl flex items-center justify-center p-[10px] sm:p-5 hover:bg-[rgb(116,27,218)] focus:border-none focus:outline-none focus:text-white transition-all duration-300"
//         onClick={handleSendMessage}
//       >
//         <IoSend className="text-2xl" />
//       </button>
//     </div>
//   );
// };

// export default MessageBar;

import { useSocket } from '@/context/SocketContext';
import apiClient from '@/lib/api-client';
import { useAppStore } from '@/store';
import { UPLOAD_FILE_ROUTE } from '@/utils/constants';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';

const MessageBar = () => {
  const emojiRef = useRef(null);
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setemojiPickerOpen] = useState(false);
  const { selectedChatType, selectedChatData, userInfo, addMessage, setIsUploading, setFileUploadProgress } = useAppStore(); 
  const socket = useSocket();
  const fileInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setemojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiRef]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return; 

    const newMessage = {
      sender: userInfo._id,
      content: message,
      receiver: selectedChatData._id,
      messageType: 'text',
      fileURL: undefined,
      timestamp: new Date().toISOString(),
    };

    if (selectedChatType === 'contact') {
      socket.emit('sendMessage', newMessage);
      addMessage(newMessage);
    } else if (selectedChatType === 'group') {
      socket.emit('sendGroupMessage', {
        sender: userInfo._id,
        content: message,
        messageType: 'text',
        fileURL: undefined,
        timestamp: new Date().toISOString(),
        groupId: selectedChatData._id,
      });
      
    }

    setMessage("");
  };

  const handleAddEmoji = (emoji) => {
    setMessage((message) => message + emoji.emoji);
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleAttachmentChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);

        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {withCredentials:true,
          onUploadProgress: (data) => {
            setFileUploadProgress(Math.round((data.loaded / data.total) * 100));
          }
        });
        
        if (response.status === 200 && response.data) {
          setIsUploading(false);
          if(selectedChatType === 'contact') {
            const newMessage = {
              sender: userInfo._id,
              content: undefined,
              receiver: selectedChatData._id,
              messageType: 'file',
              fileURL: response.data.filePath,
              timestamp: new Date().toISOString(),
            };
            socket.emit('sendMessage', newMessage);
            addMessage(newMessage);
          } else if (selectedChatType === 'group') {
            socket.emit('sendGroupMessage', {
              sender: userInfo._id,
              content: undefined,
              messageType: 'file',
              fileURL: response.data.filePath,
              timestamp: new Date().toISOString(),
              groupId: selectedChatData._id,
            });
          }
        }
      }
    } catch (error) {
      setIsUploading(false);
      console.error('Error:', error);
    }
  }

  return (
    <div className="h-[10vh] bg-[#1C1D25] flex justify-center items-center px-2 sm:px-4 mb-6 gap-2 sm:gap-6">
      <div className="flex-1 w-auto flex bg-[#2A2B33] rounded-xl items-center gap-5 h-[80%] sm:h-[100%]">
        <input
          type="text"
          className="flex justify-between sm:p-5 pl-3 w-[60%] bg-transparent rounded-xl focus:border-none focus:outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end pr-2 gap-2 sm:gap-5 w-[35%]">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300">
            <GrAttachment className="text-xl sm:text-2xl" onClick={handleAttachmentClick} />
          </button>
          <input type="file" name="" id="" className='hidden' ref={fileInputRef} onChange={handleAttachmentChange}/>
          <div className="relative">
            <button
              className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
              onClick={() => setemojiPickerOpen(true)}
            >
              <RiEmojiStickerLine className="text-xl sm:text-2xl mt-1" />
            </button>
            {emojiPickerOpen && (
              <div className="absolute bottom-16 right-0" ref={emojiRef}>
                <EmojiPicker
                  theme="dark"
                  onEmojiClick={handleAddEmoji}
                  autoFocusSearch={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="bg-[#8417FF] rounded-xl flex items-center justify-center p-[10px] sm:p-5 hover:bg-[rgb(116,27,218)] focus:border-none focus:outline-none focus:text-white transition-all duration-300"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
