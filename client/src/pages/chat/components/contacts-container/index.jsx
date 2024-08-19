import Logo from "@/components/ui/Logo";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";
import { useEffect } from "react";
import apiClient from "@/lib/api-client";
import { GET_CONTACTS_FOR_DM_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/ui/ContactList";


const ContactsContainer = () => {

  const {directMessagesContacts, setDirectMessagesContacts} = useAppStore();

  useEffect(() => {
   const getContacts = async () => {
      try {
        const response = await apiClient.get(GET_CONTACTS_FOR_DM_ROUTE , { withCredentials: true });
        setDirectMessagesContacts(response.data.contacts);
      } catch (error) {
        console.error(error);
      }

   }

   getContacts();
  }, [])
  

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[22vw] bg-[#1B1C24] border-r-2 border-[#2F303B] w-full">
      <div className="pt-3">
        <Logo/>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-start gap-4 pr-8">
            <Title title="Direct Messages" />
            <NewDM/>
        </div>
        <div className="max-h-[80vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessagesContacts}/>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
            <Title title="Groups" />
        </div>
      </div>
      <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer;

const Title = ({ title }) => {
    return (
      <h6 className="uppercase tracking-widest text-neutral-400 pl-6 font-light text-opacity-90 text-small">
        {title}
      </h6>
    )
}

