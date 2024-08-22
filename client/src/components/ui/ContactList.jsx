import React from 'react';
import { Avatar, AvatarImage } from './avatar';
import { HOST } from '@/utils/constants';
import { getColor } from '@/utils/utils';
import { useAppStore } from '@/store';

const ContactList = ({ contacts, isGroup = false }) => {
  const {
    selectedChatType,
    setSelectedChatType,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatMessages,
    selectedChatMessages,
    groups
  } = useAppStore();

  const handleClick = (contact) => {
    if (isGroup) {
      setSelectedChatType("group");
    } else {
      setSelectedChatType("contact");
    }

    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }

    setSelectedChatData(contact);
  };

  return (
    <div className='mt-5 max-h-[40%] overflow-y-auto'>
      {contacts.map((contact, index) => (
        <div
          key={contact._id}
          onClick={() => handleClick(contact)}
          className={`pl-3 py-2 transition-all duration-300 cursor-pointer flex justify-start items-center ${contact._id === (selectedChatData && selectedChatData._id) ? "bg-[#8417FF]" : " hover:bg-[#2A2B33]"}`}
        >
          <div className="flex gap-4 items-center justify-center text-neutral-300">
            {!isGroup && (
              <Avatar className={`w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ${contact._id === (selectedChatData && selectedChatData._id) ? "border-2 border-white/70 " : ""}`}>
                {contact.image ? (
                  <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className='w-full h-full object-cover bg-black' />
                ) : (
                  <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                    {contact.username ? contact.username.charAt(0).toUpperCase() : contact?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </Avatar>
            )}
            {isGroup && (
              <div className={`uppercase h-12 w-12 text-2xl border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                #
              </div>
            )}
            <div className="flex flex-col">
              <span className='uppercase'>{isGroup ? contact.name : contact.username}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
