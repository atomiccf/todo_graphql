import React, { useState } from "react";
import style from './RegistrationForm.module.css'
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "../model/graphql";


export const RegistrationForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    const handleEmail = (EO: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(EO.target.value)
    }

    const handlePassword = (EO: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(EO.target.value)
    }

    const handleFirstName = (EO: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(EO.target.value)
    }

    const handleLastName = (EO: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(EO.target.value)
    }

    const handleRegistrationButton = async () => {

        try {
             await createUser({
                variables: {
                    userInput: {
                        username: email,
                        password,
                        first_name: firstName,
                        last_name: lastName
                    }
                }
            });

        } catch (err) {
            console.error("Error creating user:", err);
        }
    }


    return (
        <div className={style.registration_container}>
            <h2 className="text-2xl text-black mb-3">Registration form:</h2>
            <div className="flex flex-col gap-5 justify-center">
                <input
                       type="text"
                       className="bg-white  border-1 rounded-sm p-2 border-black w-full
                         focus:outline focus:outline-sky-500 text-black"
                       placeholder="Email"
                       onChange={handleEmail}

                />
                <input
                    type="password"
                       placeholder="Password"
                    className="bg-white  border-1 rounded-sm p-2 border-black w-full
                         focus:outline focus:outline-sky-500 text-black"
                       onChange={handlePassword}
                />
                <input type="text"
                       placeholder="First Name"
                       className="bg-white  border-1 rounded-sm p-2 border-black w-full
                         focus:outline focus:outline-sky-500 text-black"
                       onChange={handleFirstName}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="bg-white  border-1 rounded-sm p-2 border-black w-full
                         focus:outline focus:outline-sky-500 text-black"
                    onChange={handleLastName}
                />
                <button
                    className="bg-gradient-to-r from-[#353e6a] via-[#283053] to-[#171c2f]"
                    onClick={handleRegistrationButton}
                >
                    Register
                </button>
            </div>
        </div>
    );

}
