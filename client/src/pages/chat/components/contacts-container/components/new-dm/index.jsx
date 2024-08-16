import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Lottie from 'react-lottie'
import { animationDefualtOptions, getColor } from '@/utils/utils'
import { SEARCH_CONTACTS_ROUTE } from '@/utils/constants'
import apiClient from '@/lib/api-client'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants'
  

const NewDM = () => {
    const {setSelectedChatType, setSelectedChatData} = useAppStore();
    const [openNewContactModel, setopenNewContactModel] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {
        try {
            console.log('Search term:', searchTerm)
            if(searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACTS_ROUTE, { searchTerm }, { withCredentials: true });
                if(response.status === 200) {
                    setSearchedContacts(response.data.contacts);
                }
            } else {
                setSearchedContacts([]);
            }
           
        } catch (error) {
            console.error(error)
        }
    }

    const selectNewContact = (contact) => {
        setopenNewContactModel(false);
        setSelectedChatType('contact');
        setSelectedChatData(contact);
        setSearchedContacts([]);
    }

  return <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus className='text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300'
                        onClick={() => setopenNewContactModel(true)}
                    />
                </TooltipTrigger>
                <TooltipContent className='bg-[#1C1B1A] border-none mb-2 p-3 text-white'>
                    <p>Add new contact</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModel} onOpenChange={setopenNewContactModel}>
            <DialogContent className='bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col'>
                <DialogHeader>
                <DialogTitle>Select a contact</DialogTitle>
                <DialogDescription>
                    
                </DialogDescription>
                </DialogHeader>
                <div>
                    <Input placeholder='Search contacts' className='rounded-lg p-6 bg-[#2C2E3B] border-none focus:border-none focus:outline-none transition-all duration-300'
                    onChange={(event) => searchContacts(event.target.value)}
                    />
                </div>

                {
                    searchedContacts.length > 0 && 
                    <ScrollArea className='h-[250px]'>
                        <div className="flex flex-col gap-5">
                            {searchedContacts.map((contact) => (
                                <div key={contact._id} className="flex items-center gap-3 cursor-pointer"
                                    onClick={() => selectNewContact(contact)}>
                                
            <div className='w-12 h-12 relative'>
                <Avatar className='w-12 h-12 rounded-full overflow-hidden flex justify-center items-center'>
                  {
                    
                    contact.image ? <AvatarImage src={`${HOST}/${contact.image}`} alt="profile" className='w-full h-full object-cover bg-black' /> :
                      (
                        <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                          {contact.username ? contact.username.charAt(0).toUpperCase() : contact?.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                </Avatar>
                </div>
                <div className='uppercase'>
                    {
                        contact.username ? contact.username : ""
                    }
                </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                }

                {
                    searchedContacts.length <= 0 && (
                        <div className='flex-1 md:flex mt-5 md:mt-0 flex-col justify-center items-center duration-1000 transition-all'>
                          <Lottie isClickToPauseDisabled={true} 
                            height={100}
                            width={100}
                            options={animationDefualtOptions}
                          />
                          <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                            <h3 className="poppins-medium text-purple-500">
                                <span>Search Contacts</span>
                            </h3>
                          </div>
                        </div>
                      )
                }
            </DialogContent>
        </Dialog>


  </>
}

export default NewDM
