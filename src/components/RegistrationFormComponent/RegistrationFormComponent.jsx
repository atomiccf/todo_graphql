import { useState } from "react";
import style from './RegistrationFormComponent.module.css'
import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      username
      password  
      first_name
      last_name
    }
  }
`;

export const RegistrationFormComponent = () => {
    const [email, setEmail] = useState ()
    const [password, setPassword] = useState ()
    const [firstName, setFirstName] = useState  ()
    const [lastName, setLastName] = useState  ()

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    const handleEmail = (EO) => {
        setEmail(EO.target.value)
    }

    const handlePassword = (EO) => {
        setPassword(EO.target.value)
    }

    const handleFirstName = (EO) => {
        setFirstName(EO.target.value)
    }

    const handleLastName = (EO) => {
        setLastName(EO.target.value)
    }

    const handleRegistrationButton = async () => {

        try {

            const response = await createUser({
                variables: {
                    userInput: {
                        username: email,
                        password,
                        first_name: firstName,
                        last_name: lastName
                    }
                }
            });

            console.log("User Created:", response.data.createUser);
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
