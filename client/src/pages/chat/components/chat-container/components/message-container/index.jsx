import apiClient from '@/lib/api-client';
import { useAppStore } from '@/store';
import { GET_MESSAGES_ROUTE } from '@/utils/constants';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';

const MessageContainer = () => {
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessages, setSelectedChatMessages } = useAppStore();
  const scrollRef = useRef(null);

  useEffect(() => {

    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_MESSAGES_ROUTE, {_id: selectedChatData._id}, {withCredentials: true});
        if(response.status === 200 && response.data.messages){
          setSelectedChatMessages(response.data.messages);
        }
          
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    if(selectedChatData._id ) {
      if(selectedChatType === 'contact' ) {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages]);

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
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    return (
      <div className={`${message.sender === selectedChatData._id ? 'text-left' : 'text-right'} py-1`}>
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
        <div className="text-xs text-gray-600">{moment(message.timestamp).format('LT')}</div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MessageContainer;
