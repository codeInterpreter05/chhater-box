import { useAppStore } from '@/store';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants';
import { getColor } from '@/utils/utils';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import React from 'react'
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IoPowerSharp } from 'react-icons/io5';
import apiClient from '@/lib/api-client';

const ProfileInfo = () => {
    const {userInfo, setUserInfo } = useAppStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true});
            if(response.status === 200) {
                navigate('/auth');
                setUserInfo(null);
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="absolute bottom-0 h-20 flex items-center justify-between px-4 w-full bg-[#2A2B33]">
        <div className="flex gap-3 items-center justify-center">
            <div className='w-12 h-12 relative hover:cursor-pointer' onClick={() => navigate("/profile")}>
            <Avatar className='w-12 h-12 rounded-full overflow-hidden flex justify-center items-center'>
              {
                
                userInfo.image ? <AvatarImage src={`${HOST}/${userInfo.image}`} alt="profile" className='w-full h-full object-cover bg-black' /> :
                  (
                    <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                      {userInfo.username ? userInfo.username.charAt(0).toUpperCase() : userInfo?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
            </Avatar>
            </div>
            <div className='uppercase'>
                {
                    userInfo.username ? userInfo.username : ""
                }
            </div>
        </div>
        <div className="flex gap-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FiEdit2 className='text-purple-500 text-xl font-medium cursor-pointer'
                            onClick={() => navigate('/profile')}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#1C1B1E] text-white border-none rounded p-2'>
                    <p>Edit profile</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <IoPowerSharp className='text-red-500 text-xl font-medium cursor-pointer'
                            onClick={handleLogout}
                        />
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#1C1B1E] text-white border-none rounded p-2'>
                    <p>Logout</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
  )
}

export default ProfileInfo

