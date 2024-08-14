import { useAppStore } from '@/store';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/utils/utils';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/api-client';
import { toast } from 'sonner';
import { ADD_PROFILE_IMAGE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from '@/utils/constants';
import { CodeSquare } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
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
      };
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, { withCredentials: true });
      if (response.status === 200) {
        setUserInfo({...userInfo, image: null  });
        setImage(null);
        toast.success('Image deleted successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#1B1C24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[90vw] sm:w-[80vw] md:w-max px-4 py-8 border-[1px] border-white/50 rounded-xl">
        <div className='flex justify-start gap-2 sm:gap-5 items-center'>
          <IoArrowBack onClick={handleGoBack} className='text-3xl lg:text-4xl text-white/90 cursor-pointer' />
          
        </div>
        <div className="grid sm:grid-cols-2 sm:justify-items-center">
          <div className="w-full h-full flex justify-center items-center">
          <div className="w-24 h-24 sm:h-32 sm:w-32 relative flex items-center justify-center mx-auto"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className='w-24 h-24 sm:h-32 sm:w-32 rounded-full overflow-hidden flex justify-center items-center'>
              {
                
                image ? <AvatarImage src={image} alt="profile" className='w-full h-full object-cover bg-black' /> :
                  (
                    <div className={`uppercase h-24 w-24 sm:h-32 sm:w-32 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                      {username ? username.charAt(0).toUpperCase() : userInfo?.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
            </Avatar>
            {
              hovered && (
                <div className="absolute inset-0 flex justify-center items-center bg-black/50 ring-fuchsia-500 rounded-full cursor-pointer"
                  onClick={image ? handleDeleteImage : handleFileInputClick}>
                  {
                    image ?
                      <FaTrash className='text-white text-2xl cursor-pointer' /> :
                      <>
                        <FaPlus className='text-white text-2xl cursor-pointer' />
                        
                      </>
                  }
                </div>
              )
            }
            <input type='file' accept=".jpeg, .jpg, .png, .svg, .webp " name='profile-image' className="hidden" ref={fileInputRef} onChange={handleImageChange}/>
          </div>
          </div>
          <div className="flex w-75 min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center mt-5">
          <div className="w-full flex flex-col gap-5 justify-center items-center">
  <div className="relative overflow-hidden whitespace-nowrap inline-block">
    <Input
      type="text"
      placeholder="Username"
      disabled
      value={`Hello ${userInfo.username}!`}
      className="rounded-lg p-6 bg-[#2C2E3B] border-none max-w-72 animate-[typewriter_1.5s_steps(30)_0.5s_forwards] opacity-0"
    />
    <span className="absolute top-0 right-0 h-full w-full animate-[blink_1s_step-end_infinite]"></span>
  </div>
  
  <div className="relative overflow-hidden whitespace-nowrap inline-block">
    <Input
      type="text"
      placeholder="Username"
      disabled
      value="Welcome to chatterbox"
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
