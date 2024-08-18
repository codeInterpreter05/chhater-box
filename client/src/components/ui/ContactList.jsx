import { useAppStore } from '@/store';
import React from 'react'
import { Avatar, AvatarImage } from './avatar';
import { HOST } from '@/utils/constants';
import { getColor } from '@/utils/utils';

const ContactList = ({contacts, isGroup = false}) => {

    const {contact, setcontact, selectedChatType, setSelectedChatType} = useAppStore();

    const handleClick = (contact) => {
        if(isGroup){
            setcontact("group");
        } else {
            setSelectedChatType('contact');
        }

        setcontact(contact);   

        if(contact && contact._id !== contact._id) {
            setSelectedChatType([]);
        }
    }
  return (
    <div className='mt-5'>
        {
            contacts.map((contact, index) => (
                <div key={contact._id} onClick={() => handleClick(contact)} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${contact  & contact._id === contact._id ? "bg-[#8417FF] hover:bg-[#8417FF]" : "hover:bg-[#F1F1F111]"} flex justify-start items-center`}>
                    
                    <div className="flex gap-5 items-center justify-center text-neutral-300">
                        {
                            !isGroup && <Avatar className='w-12 h-12 rounded-full overflow-hidden flex justify-center items-center'>
                            {
                              
                              contact.image ? <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className='w-full h-full object-cover bg-black' /> :
                                (
                                  <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                    {contact.username ? contact.username.charAt(0).toUpperCase() : contact?.username?.charAt(0).toUpperCase()}
                                  </div>
                                )}
                          </Avatar>
                        }
                    </div>

                </div>
            ))
        }
    </div>
  )
}

export default ContactList
