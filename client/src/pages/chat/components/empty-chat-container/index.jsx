import Logo from '@/components/ui/Logo'
import { animationDefualtOptions } from '@/utils/utils'
import React from 'react'
import Lottie from 'react-lottie'

const EmtyChatContainer = () => {
  return (
    <div className='flex-1 md:bg-[#1C1D25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all'>
      <Lottie isClickToPauseDisabled={true} 
        height={200}
        width={200}
        options={animationDefualtOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="poppins-medium flex flex-col items-center">
            <Logo/>
           <span className="text-gray-500 text-2xl">Connect with your friends and family</span>
        </h3>
      </div>
    </div>
  )
}

export default EmtyChatContainer
