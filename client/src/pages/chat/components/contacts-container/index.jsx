import Logo from "@/components/ui/Logo";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";


const ContactsContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[22vw] bg-[#1B1C24] border-r-2 border-[#2F303B] w-full">
      <div className="pt-3">
        <Logo/>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-8">
            <Title title="Direct Messages" />
            <NewDM/>
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
      <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-small">
        {title}
      </h6>
    )
}

