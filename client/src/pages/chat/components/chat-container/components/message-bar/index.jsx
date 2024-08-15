import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerFill, RiEmojiStickerLine } from 'react-icons/ri';

const MessageBar = () => {
  const emojiRef = useRef(null);
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setemojiPickerOpen] = useState(false)  

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setemojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, [emojiRef])
  

  const handleSendMessage = async () => {

  }

  const handleAddEmoji = async (emoji) => {
    setMessage((message) => message + emoji.emoji)
  }

  return (
    <div className="h-[10vh] bg-[#1C1D25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2A2B33] rounded-xl items-center gap-5 pr-5">
        <input type="text" className='flex-1 p-5 bg-transparent rounded-xl focus:border-noe focus:outline-none' placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300'>
          <GrAttachment className='text-2xl'/>
        </button>
        <div className="relative">
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300' onClick={() => setemojiPickerOpen(true)}>
          <RiEmojiStickerLine className='text-2xl mt-1'/>
        </button>
        <div className="absolute bottom-16 right-0">
            <EmojiPicker theme='dark' open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
        </div>
        </div>
      </div>
      <button className='bg-[#8417FF] rounded-xl flex items-center justify-center p-5 hover:bg-[rgb(116,27,218)] focus:border-none focus:outline-none focus:text-white transition-all duration-300' onClick={handleSendMessage}>
          <IoSend className='text-2xl'/>
        </button>
    </div>
  )
}

export default MessageBar
