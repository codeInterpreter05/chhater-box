import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainer from './components/empty-chat-container';
import ChatContainer from './components/chat-container';

const Chat = () => {

  const {userInfo, selectedChatType, isUploading, isDownloading, fileUploadProgress, fileDownloadProgress } = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetUp){
      navigate('/profile');
      toast('Please set up your profile to continue');
    }
  }, [userInfo, navigate])
  
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {
        isUploading && <div className="fixed z-10 top-0 left-0 w-[100vw] h-[100vw] bg-[black]/80 flex flex-col items-center justify-center gap-5 backdrop-blur-lg  ">
          <h5 className='text-4xl animate-pulse '>
            Uploading file
          </h5>
          {fileUploadProgress}%
        </div>
      }
      {
        isDownloading && <div className="fixed z-10 top-0 left-0 w-[100vw] h-[100vw] bg-[black]/80 flex flex-col items-center justify-center gap-5 backdrop-blur-lg  ">
          <h5 className='text-4xl animate-pulse '>
            Dowloading file
          </h5>
          {fileDownloadProgress}%
        </div>
      }
      <ContactsContainer/>
      {
        selectedChatType === undefined ? <EmptyChatContainer/>: <ChatContainer/>
      }
      
    </div>
  )
}

export default Chat
