import { useAppStore } from '@/store';
import React from 'react'
import { Avatar, AvatarImage } from './avatar';
import { HOST } from '@/utils/constants';
import { getColor } from '@/utils/utils';

const ContactList = ({contacts, isGroup = false}) => {

    const {selectedChatType, setSelectedChatType, selectedChatData, setSelectedChatData, setSelectedChatMessages, selectedChatMessages} = useAppStore();

    const handleClick = (contact) => {
        if(isGroup){
            setSelectedChatType("group");
        } else {
            setSelectedChatType("contact");
        }

       setSelectedChatData(contact);   

      //  console.log(selectedChatMessages[(selectedChatMessages.length) - 1].content)

        if(selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }

        
    }
  return (
    <div className='mt-5'>
        {
            contacts.map((contact, index) => (
                <div key={contact._id} onClick={() => handleClick(contact)} className={`pl-6 py-2 transition-all duration-300 cursor-pointer hover:bg-[#8417FF] hover:bg-[#F1F1F111]"} flex justify-start items-center ${contact._id === (selectedChatData && selectedChatData._id) ? "bg-[#8417FF]": ""}`}>

                    
                    <div className="flex gap-4 items-center justify-center text-neutral-300">
                        {
                            !isGroup && <Avatar className={`w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ${contact._id === (selectedChatData && selectedChatData._id) ? "border-2 border-white/70 ": ""}`}>
                            {
                              
                              contact.image ? <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className='w-full h-full object-cover bg-black' /> :
                                (
                                  <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                    {contact.username ? contact.username.charAt(0).toUpperCase() : contact?.username?.charAt(0).toUpperCase()}
                                  </div>
                                )}
                          </Avatar>
                        }
                        {
                          isGroup && <div className='bg-[#FFFFFF22] h-10 w-10 flex items-center justify-center rounded-full '> # </div>
                        } 
                        
                        <div className="flex flex-col">
                        <span className='uppercase'>{contact.username}</span>
                        {/* <span className='text-gray-100'>You: {(selectedChatMessages[selectedChatMessages.length - 1]).content}</span> */}
                        </div>
                        
                    </div>

                </div>
            ))
        }
    </div>
  )
}

export default ContactList
