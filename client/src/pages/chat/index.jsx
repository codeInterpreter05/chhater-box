import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {

  const {userInfo} = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetUp){
      navigate('/profile');
      toast('Please set up your profile to continue');
    }
  }, [userInfo, navigate])
  
  return (
    <div>
      {userInfo.username && <h1>Welcome {userInfo.username}!</h1>}
    </div>
  )
}

export default Chat
