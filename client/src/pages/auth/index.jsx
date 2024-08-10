import React, { useState } from 'react'
import Background from '@/assets/login2.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

const Auth = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); 
  const { setUserInfo } = useAppStore();

  const validateSignup = () => {
    if(!username || username.trim().length < 5){
      toast.error("Username should be at least 5 characters long");
      return false;
    }

    if(!password || password.trim().length < 8){
      toast.error("Password should be at least 8 characters long");
      return false;
    }

    if(password!== confirmPassword){
      toast.error("Passwords do not match");
      return false;
    }
      
    return true;
  }

  const handleSignup = async () => {
    if (validateSignup()) {
        try {
            const response = await apiClient.post(SIGNUP_ROUTE, { username, password }, { withCredentials: true });
            if(response.status === 201) {
              setUserInfo(response.data.user);
              toast.success("User created successfully");
              navigate('/profile');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Signup failed. Please try again.');
            }
            console.error(error);
        }
    }
}

const handleLogin = async () => {
    try {
        const response = await apiClient.post(LOGIN_ROUTE, { username, password }, { withCredentials: true });
        if(response.data.user._id){
          setUserInfo(response.data.user);
          if(response.data.user.profileSetUp) {
              navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error('Login failed. Please try again.');
        }
        console.error(error);
    }
}


 

  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center '>
      <div className="h-[88vh] bg-white border-2 border-whitetext-opacity-0 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 py-2">
        <div className="flex flex-col gap-10 items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-4xl font-bold md:text-5xl">ChatterBox</h1>
        
              </div>
              <p className="font-medium text-center mt-4 px-2">Fill in the details to start chatting</p>
            </div>
            <div className="flex justify-center items-center w-full">
              <Tabs className='w-3/4' defaultValue='login'>
                <TabsList className="bg-transparent rounded-none w-full">
                  <TabsTrigger value="login" 
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state:active]:text-black data-[state=active]:font-semibold 
                  data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>

                  <TabsTrigger value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state:active]:text-black data-[state=active]:font-semibold 
                  data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Signup</TabsTrigger>
                </TabsList>
                <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                  <Input className="rounded-full p-6" placeholder="Enter username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                  <Input className="rounded-full p-6" placeholder="Enter password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                  <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                </TabsContent>

                <TabsContent className="flex flex-col gap-5" value="signup">
                  <Input className="rounded-full p-6" placeholder="Enter Username" type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                  <Input className="rounded-full p-6" placeholder="Enter password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                  <Input className="rounded-full p-6" placeholder="Confirm password" type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                  <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
                </TabsContent>

              </Tabs>
            </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="bacgorund login" className="h-[500px]" />
        </div>
      </div>
    </div>
  )
}

export default Auth;
