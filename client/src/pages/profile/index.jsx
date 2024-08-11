import { useAppStore } from '@/store';
import React from 'react'

const Profile = () => {
  const { userInfo } = useAppStore();
  return (
    <div>
      {userInfo.username}
    </div>
  )
}

export default Profile
