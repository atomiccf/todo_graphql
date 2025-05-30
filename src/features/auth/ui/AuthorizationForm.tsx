import React, { useState } from "react";
import style from './AuthorizationForm.module.css'
import { useNavigate } from 'react-router-dom'
import { USER_LOGIN } from "../model/graphql";
import { useMutation} from "@apollo/client";



export const AuthorizationForm = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const [loginUser, { data,  }] = useMutation(USER_LOGIN);

    const handleEmail = (EO: React.ChangeEvent<HTMLInputElement>) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
          if (emailRegex.test(EO.target.value)) {
              setEmail(EO.target.value)
          } else {
             throw new Error("Invalid email format")
          }


    }


    const handlePassword = (EO: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(EO.target.value);
    }

    const handleLoginButton = async () => {
        try {
            const response = await loginUser({
                variables: {
                    loginInput: {
                        username: email,
                        password: password,
                    }
                },
            });
            console.log("Access granted:", response);
            console.log('Access_data', data);
            if(response.data){
                localStorage.setItem('jwt', response?.data.loginUser.accessToken);
            }
            navigate('app/main')
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleRegistrationButton = () => {
        navigate('/register')
    }

     return (
         <div className={style.login_container}>

             <h2 className="text-2xl mb-4.5 text-black">Sign In</h2>
             <div className='flex flex-col justify-center h-auto gap-5'>
                 <input type="email"
                        placeholder="E-mail"
                        className="bg-white border-1 mb-2.5 rounded-sm p-2 border-black w-full ,
                         focus:outline focus:outline-sky-500 text-black"
                        onChange={handleEmail}
                        />
                 <input type="password"
                        placeholder="Password"
                        id={'Password'}
                        onChange={handlePassword}
                        className="bg-white  border-1 rounded-sm p-2 border-black w-full
                         focus:outline focus:outline-sky-500 text-black"
                 />

                 <a className='mb-2.5 pl-37 text-[#5A85E4] text-[10px] align-text-center' href="#">
                     Forgot the password ?
                 </a>

                 <button className="bg-gradient-to-r from-[#12BBFF] via-[#159CFF] to-[#1864FF]" onClick={handleLoginButton}>
                     Sign in
                 </button>
                 <h6 className={style.login_container_mini_header}>or</h6>
                 <button
                     className="bg-gradient-to-r from-[#353e6a] via-[#283053] to-[#171c2f]"
                     onClick={handleRegistrationButton}>
                     Register
                 </button>
             </div>
         </div>
     )

}
