import apiClient from '@/lib/api-client';
import { useAppStore } from '@/store';
import { GET_MESSAGES_ROUTE, HOST } from '@/utils/constants';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { MdFolderZip } from 'react-icons/md';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { getColor } from '@/utils/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MessageContainer = () => {
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages, setSelectedChatMessages, setIsUploading, setIsDownloading, setFileUploadProgress, setFileDownloadProgress } = useAppStore();
  const scrollRef = useRef(null);

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_MESSAGES_ROUTE, { _id: selectedChatData._id }, { withCredentials: true });
        if (response.status === 200 && response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === 'contact') {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFile = async (fileURL) => {
    try {
      setIsDownloading(true);
      setFileDownloadProgress(0);
      const response = await apiClient.get(`${HOST}/${fileURL}`, {
        responseType: 'blob',
        onDownloadProgress: (data) => {
          setFileDownloadProgress(Math.round((data.loaded / data.total) * 100));
        }
      });

      const fileBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileBlob;
      link.setAttribute('download', fileURL.split('/').pop()); // Use file name from URL
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileBlob);
      setIsDownloading(false);
      setFileDownloadProgress(0);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const renderDMMessages = (message) => {
    return (
      <div className={`${message.sender === selectedChatData._id ? 'text-left' : 'text-right'} py-[6px]`}>
        {message.messageType === 'text' && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? 'bg-[#8417FF]/5 text-[#8417FF]/90 border-[#8417FF]/50'
                : 'bg-[#2A2B33]/5 text-white/80 border-white/20'
            } border inline-block px-4 py-3 rounded my-1 max-width-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === 'file' && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? 'bg-[#8417FF]/5 text-[#8417FF]/90 border-[#8417FF]/50'
                : 'bg-[#2A2B33]/5 text-white/80 border-white/20'
            } border inline-block px-4 py-3 rounded my-1 max-width-[50%] break-words`}
          >
            {checkIfImage(message.fileURL) ? (
              <div className='cursor-pointer' onClick={() => {setShowImage(true); setImageURL(message.fileURL)}}>
                <img
                  className="cursor-pointer"
                  src={`${HOST}/${message.fileURL}`}
                  alt="File Attachment"
                  height={200}
                  width={200}
                />
              </div>
            ) : (
              <div className='flex items-center justify-center gap-3'>
                <span className='text-white/40 text-xl bg-black/20 rounded-full p-2 mt-1 cursor-pointer' onClick={() => downloadFile(message.fileURL)}>
                  <MdFolderZip />
                </span>
                <span>{message.fileURL.split('/').pop()}</span>
                <span className='bg-black/20 p-[6px] ml-0 sm:ml-5 mt-1 text-xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 text-white/80' onClick={() => downloadFile(message.fileURL)}>
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-600">{moment(message.timestamp).format('LT')}</div>
      </div>
    );
  };

  const renderGroupMessages = (message) => {
    return <div className={`mt-5 ${message.sender._id !== userInfo._id ? "text-left" : "text-right"}`}>
      
      {message.messageType === 'text' && (
        
          <div>
            <div className={`uppercase text-[${getColor(message.sender.color)}] border-none`}>
              {message.sender.username}
            </div>
            <div
                className={`${
                    `text-[${getColor(message.sender.color)}]/90 border-[${getColor(message.sender.color)}]`
                } border inline-block px-4 py-3 rounded my-1 max-width-[50%] break-words`}
                
              >
                {message.content}
              </div>     
              
        </div>
      )}
      {message.messageType === 'file' && (
          <div
            className={`${
              `text-[${getColor(message.sender.color)}`
            } border inline-block px-4 py-3 rounded my-1 max-width-[50%] break-words`}
          >
            {checkIfImage(message.fileURL) ? (
              <div className='cursor-pointer' onClick={() => {setShowImage(true); setImageURL(message.fileURL)}}>
                <img
                  className="cursor-pointer"
                  src={`${HOST}/${message.fileURL}`}
                  alt="File Attachment"
                  height={200}
                  width={200}
                />
              </div>
            ) : (
              <div className='flex items-center justify-center gap-3'>
                <span className='text-white/40 text-xl bg-black/20 rounded-full p-2 mt-1 cursor-pointer' onClick={() => downloadFile(message.fileURL)}>
                  <MdFolderZip />
                </span>
                <span>{message.fileURL.split('/').pop()}</span>
                <span className='bg-black/20 p-[6px] ml-0 sm:ml-5 mt-1 text-xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 text-white/80' onClick={() => downloadFile(message.fileURL)}>
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-600">{moment(message.timestamp).format('LT')}</div> 
    </div>
  }

  const renderMessages = () => {
    if (!Array.isArray(selectedChatMessages)) {
      return null;
    }
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format('LL')}
            </div>
          )}
          {selectedChatType === 'contact' && renderDMMessages(message)}
          {selectedChatType === 'group' && renderGroupMessages(message)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef}></div>
      {
        showImage && (
          <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-10 flex items-center justify-center backdrop-blur-lg flex-col">
            <div>
            <img
              className="cursor-pointer h-auto max-h-[80vh] mt-6 max-w-[90vw] w-full bg-cover"
              src={`${HOST}/${imageURL}`}
              alt="File Attachment"
              onClick={() => setShowImage(false)}
            />
            </div>
            <div className="flex gap-5 fixed top-0 mt-5">
              <button className ='bg-black/20 p-[6px] ml-0 sm:ml-5 mt-1 text-xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 text-white/80' >
                <IoMdArrowRoundDown onClick={() => downloadFile(imageURL)}/>
              </button>
              <button className ='bg-black/20 p-[6px] ml-0 sm:ml-5 mt-1 text-xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 text-white/80' >
                <IoCloseSharp onClick={() => {setShowImage(false); setImageURL(null)}}/>
              </button>
            </div>
          </div>
        ) 
      }
    </div>
  );
};

export default MessageContainer;


