import { useAppStore } from '@/store';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/utils/utils';
import { MdAddPhotoAlternate, MdDelete } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';
import { ADD_PROFILE_IMAGE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants';
import Logo from '@/components/ui/Logo';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setUsername(userInfo.username);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const saveChanges = async () => {
    try {
      const response = await apiClient.post(UPDATE_PROFILE_ROUTE, { color: selectedColor }, { withCredentials: true });

      if (response.status === 200) {
        setUserInfo(response.data.user);
        toast.success('Profile created successfully!');
        navigate('/chat');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile-image', file);

      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, { withCredentials: true });
      if (response.status === 200 && response.data.user.image) {
        setUserInfo({
          ...userInfo,
          image: response.data.user.image,
        });
        setImage(`${HOST}/${response.data.user.image}`);
        toast.success('Image updated successfully!');
        navigate('/chat');
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, { withCredentials: true });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage(null);
        toast.success('Image deleted successfully!');
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
      <div className='w-full flex justify-start items-center absolute top-4 pl-4'>
        <IoArrowBack onClick={handleGoBack} className='text-3xl lg:text-4xl text-white/90 cursor-pointer' />
      </div>
      <div className="flex flex-col gap-4 w-[100vw] sm:w-[80vw] md:w-max px-4 rounded-xl mt-2">
        <div className='flex justify-center items-center text-white'>
          <Logo />
        </div>
        <div className="grid sm:grid-cols-2 sm:justify-items-center">
          <div className="w-full h-full flex justify-center items-center relative">
            <Avatar className='w-24 h-24 sm:h-32 sm:w-32 rounded-full overflow-hidden flex justify-center items-center'>
              {
                image ? <AvatarImage src={image} alt="profile" className='w-full h-full object-cover bg-black' /> :
                  (
                    <div className={`uppercase h-24 w-24 sm:h-32 sm:w-32 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                      {username ? username.charAt(0).toUpperCase() : userInfo?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
            </Avatar>

            <div className="absolute bottom-0 sm:bottom-16 ml-10 sm:ml-14 transform translate-x-1/4 translate-y-1/4 flex gap-2">
              {
                !image && (
                  <div
                    onClick={handleFileInputClick}
                    className="bg-purple-700 p-2 sm:p-3 rounded-full cursor-pointer hover:bg-purple-900 transition-all duration-200"
                  >
                    <MdAddPhotoAlternate className='text-white text-xl' />
                  </div>
                )
              }
              {image && (
                <div
                onClick={handleDeleteImage}
                className="bg-purple-700 p-2 sm:p-3 rounded-full cursor-pointer hover:bg-purple-900 transition-all duration-200"
              >
                <MdDelete className='text-white text-xl' />
              </div>
              )}
            </div>
            <input type='file' accept=".jpeg, .jpg, .png, .svg, .webp" name='profile-image' className="hidden" ref={fileInputRef} onChange={handleImageChange} />
          </div>
          <div className="flex w-75 min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center mt-5">
            <div className="w-full flex flex-col gap-5 justify-center items-center">
              <div className="relative overflow-hidden whitespace-nowrap inline-block">
                <Input
                  type="text"
                  placeholder="Username"
                  disabled
                  value={`Hello ${userInfo.username.toUpperCase()}`}
                  className="rounded-lg p-6 bg-[#2C2E3B] border-none max-w-72 animate-[typewriter_1.5s_steps(30)_0.5s_forwards] opacity-0"
                />
                <span className="absolute top-0 right-0 h-full w-full animate-[blink_1s_step-end_infinite]"></span>
              </div>

              <div className="relative overflow-hidden whitespace-nowrap inline-block">
                <Input
                  type="text"
                  placeholder="Username"
                  disabled
                  value="Welcome to Synchat"
                  className="rounded-lg p-6 bg-[#2C2E3B] border-none max-w-72 animate-[typewriter_1.5s_steps(30)_2s_forwards] opacity-0"
                />
                <span className="absolute top-0 right-0 h-full w-full animate-[blink_1s_step-end_infinite]"></span>
              </div>

              <div className="relative overflow-hidden whitespace-nowrap inline-block">
                <Input
                  type="text"
                  placeholder="Username"
                  disabled
                  value="Connect with friends"
                  className="rounded-lg p-6 bg-[#2C2E3B] border-none max-w-72 animate-[typewriter_3s_steps(30)_3.5s_forwards] opacity-0"
                />
                <span className="absolute top-0 right-0 h-full w-full animate-[blink_1s_step-end_infinite]"></span>
              </div>
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
        <div className="w-full mt-4 flex items-center justify-center">
          <Button className='h-12 w-full max-w-[auto] sm:w-[100%] bg-purple-700 hover:bg-purple-900 transition-all duration-200 text-xl' onClick={saveChanges}>
            Create Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
