import { useAppStore } from '@/store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/utils/utils';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';
import { UPDATE_PROFILE_ROUTE } from '@/utils/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = async () => {
    try {
      const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {color: selectedColor}, {withCredentials: true});

      if(response.status === 200) {
        setUserInfo(response.data.user);
        toast.success('Profile created successfully!');
        navigate('/chat');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#1B1C24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[95vw] sm:w-[80vw] md:w-max px-4 py-8 border-[1px] border-white/50 rounded-xl">
        <div className='flex justify-start gap-2 sm:gap-5 items-center'>
          <IoArrowBack onClick={() => {handleGoBack()}} className='text-4xl lg:text-4xl text-white/90 cursor-pointer' />
          <h1 className='text-white text-2xl sm:text-3xl md:text-4xl text-center font-bold w-[80%]'>ChatterBox</h1>
        </div>
        <div className="grid sm:grid-cols-2 sm:justify-items-center">
          <div className="h-24 w-24 relative flex items-center justify-center mx-auto"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className='h-full w-full rounded-full overflow-hidden'>
              {
                image ? <AvatarImage src={image} alt="profile" className='w-32 h-32 object-cover bg-black' /> :
                  (
                    <div className={`uppercase h-24 w-24 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                      {username ? username.charAt(0).toUpperCase() : userInfo.username.charAt(0).toUpperCase()}
                    </div>
                  )}
            </Avatar>
            {
              hovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-black/50 rounded-full cursor-pointer">
                  {
                    image ?
                      <FaTrash className='text-white text-2xl cursor-pointer' onClick={() => setImage(null)} /> :
                      <>
                        <FaPlus className='text-white text-2xl cursor-pointer' />
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImageUpload}
                        />
                      </>
                  }
                </div>
              )
            }
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center mt-5">
            <div className="w-full flex justify-center items-center">
              <Input type="text" placeholder="Username" disabled value={userInfo.username} className='rounded-lg p-6 bg-[#2C2E3B] border-none max-w-72' />
            </div>
            <div className="flex w-full gap-5 justify-center items-center">
              {
                colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`${color} min-h-8 min-w-8 rounded-full cursor-pointer transition-all duration-200 ${selectedColor === index ? "outline outline-white/50 outline-[2px]" : ""}`}
                  />
                ))
              }
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className='h-12 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-200 text-xl' onClick={saveChanges}>
            Create Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

