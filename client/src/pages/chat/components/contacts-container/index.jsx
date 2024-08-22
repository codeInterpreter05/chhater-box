import React, { useEffect, useState } from 'react';
import Logo from "@/components/ui/Logo";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";
import apiClient from "@/lib/api-client";
import { GET_CONTACTS_FOR_DM_ROUTE, GET_GROUPS_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/ui/ContactList";
import CreateGroup from "./components/create-group";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";

const ContactsContainer = () => {
  const { directMessagesContacts, setDirectMessagesContacts, groups, setGroups } = useAppStore();
  const [isDMDropdownOpen, setIsDMDropdownOpen] = useState(false);
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_CONTACTS_FOR_DM_ROUTE, { withCredentials: true });
        setDirectMessagesContacts(response.data.contacts);
      } catch (error) {
        console.error(error);
      }
    };

    const getGroups = async () => {
      try {
        const response = await apiClient.get(GET_GROUPS_ROUTE, { withCredentials: true });
        if (response.status === 200 && response.data.groups) {
          setGroups(response.data.groups);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getContacts();
    getGroups();
  }, [setGroups, setDirectMessagesContacts]);

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter(prevState => !prevState);
  };

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[22vw] bg-[#1B1C24] border-r-2 border-[#2F303B] w-full">
      <div className="pt-2">
        <Logo />
      </div>
      <div className="mb-5">
        <Dropdown
          title="Direct Messages"
          isOpen={isDMDropdownOpen}
          toggleDropdown={() => toggleDropdown(setIsDMDropdownOpen)}
          component={<NewDM />}
        >
          <div className={`${isGroupDropdownOpen ? "max-h-[180px]" : "max-h-[220px]"}  overflow-y-auto custom-scrollbar`}>
            <ContactList contacts={directMessagesContacts} />
          </div>
        </Dropdown>
      </div>
      <div className="my-5">
        <Dropdown
          title="Groups"
          isOpen={isGroupDropdownOpen}
          toggleDropdown={() => toggleDropdown(setIsGroupDropdownOpen)}
          component={<CreateGroup />}
        >
          <div className={`${isDMDropdownOpen ? "max-h-[180px]" : "max-h-[320px]"}  overflow-y-auto custom-scrollbar`}>
            <ContactList contacts={groups} isGroup={true} />
          </div>
        </Dropdown>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Dropdown = ({ title, isOpen, toggleDropdown, component, children }) => (
  <>
    <div className="flex items-center justify-start gap-2 px-2">
      {isOpen ? (
        <MdKeyboardArrowDown className="text-gray-500 text-[32px] cursor-pointer mt-1" onClick={toggleDropdown} />
      ) : (
        <MdKeyboardArrowRight className="text-gray-500 text-[32px] cursor-pointer mt-1" onClick={toggleDropdown} />
      )}
      <Title title={title} />
      {component}
    </div>
    {isOpen && children}
  </>
);

const Title = ({ title }) => (
  <h6 className="uppercase tracking-widest mr-2 text-neutral-400 font-light text-opacity-90 text-small">
    {title}
  </h6>
);

