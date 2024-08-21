import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import { getColor } from '@/utils/utils';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react'
import {RiCloseFill} from 'react-icons/ri'

const ChatHeader = () => {

  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2F303B] flex items-center justify-between px-3 sm:px-8 py-10">
        <div className="flex gap-5 items-center w-full justify-between">
            <div className="flex gap-3 items-center justify-center">
              <div className='w-12 h-12 relative'>
                  <Avatar className='w-12 h-12 rounded-full overflow-hidden flex justify-center items-center'>
                    {
                      
                      selectedChatData.image ? <AvatarImage src={`${HOST}/${selectedChatData.image}`} alt="profile" className='w-full h-full object-cover bg-black' /> :
                        (
                          <div className={`uppercase h-12 w-12 text-2xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedChatData.color)}`}>
                            {selectedChatData.username ? selectedChatData.username.charAt(0).toUpperCase() : "#"}
                          </div>
                        )}
                  </Avatar>
                  </div>
                  <div className='uppercase ml-1 text-xl'>
                    {
                      selectedChatType === 'contact' && selectedChatData.username? selectedChatData.username : selectedChatData.name
                    }
                  </div>
            </div>
            <div className="flex gap-5 items-center justify-center">
                <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300'>
                    <RiCloseFill className="text-3xl" onClick={closeChat}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader
