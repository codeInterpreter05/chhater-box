import React, { useEffect, useState } from 'react'
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
import { CREATE_GROUP_ROUTE, GET_ALL_CONTACTS_ROUTE, SEARCH_CONTACTS_ROUTE } from '@/utils/constants'
import apiClient from '@/lib/api-client'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants'
import { Button } from '@/components/ui/button'
import MultipleSelector from '@/components/ui/multiselect'
  

const CreateGroup = () => {
    const {setSelectedChatType, setSelectedChatData, addGroup} = useAppStore();
    const [newGroupModel, setNewGroupModel] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setselectedContacts] = useState([]);
    const [groupName, setGroupName] = useState("");


    useEffect(() => {
      const getData = async () => {
        try {
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTE, { withCredentials: true });
            if(response.status === 200) {
                setAllContacts(response.data.contacts);

            }
        } catch (error) {
            console.error(error)
        }
      }

      getData();
    }, [])
    

    const createGroup = async () => {
        try {
            if(groupName.length > 0 && selectedContacts.length > 1) {
                const response = await apiClient.post(CREATE_GROUP_ROUTE, {
                    name: groupName,
                    members: selectedContacts.map(contact => contact.value)
                }, { withCredentials: true });

                if(response.status === 201) {
                    setNewGroupModel(false);
                    setGroupName("");
                    setselectedContacts([]);
                    addGroup(response.data.group);
                } 
            }
           
        } catch (error) {
            console.error(error)
        }
    }

  return <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus className='text-neutral-400 font-light text-opacity-90 text-sm hover:text-neutral-100 cursor-pointer transition-all duration-300'
                        onClick={() => setNewGroupModel(true)}
                    />
                </TooltipTrigger>
                <TooltipContent className='bg-[#1C1B1A] border-none mb-2 p-3 text-white'>
                    <p>Create New Group</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={newGroupModel} onOpenChange={setNewGroupModel}>
            <DialogContent className='bg-[#181920] border-none text-white w-[250px] sm:w-[400px] h-[400px] flex flex-col'>
                <DialogHeader>
                <DialogTitle className='mt-4'>Details of new gorup</DialogTitle>
                <DialogDescription>
                    
                </DialogDescription>
                </DialogHeader>
                <div>
                    <Input placeholder='Group name' className='rounded-lg p-6 bg-[#2C2E3B] border-none focus:border-none focus:outline-none transition-all duration-300'
                    onChange={(event) => setGroupName(event.target.value)} value={groupName}
                    />
                </div>
                <div>
                    <MultipleSelector className='rounded-lg bg-[#2C2E3B] border-none py-2 text-white'
                        defaultOptions = {allContacts}
                        placeholder = 'Select contacts'
                        value = {selectedContacts}
                        onChange = {setselectedContacts}
                        emptyIndicator = {
                            <p className='text-center text-lg text-gray-600'>No contacts found</p>
                        }
                    />
                </div>
                <div>
                    <Button className='w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300' onClick={() => createGroup()}>Create Group</Button>
                </div>
            </DialogContent>
        </Dialog>


  </>
}

export default CreateGroup
