import React from "react";
import style from './AuthorizationForm.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { useLogin } from "features/auth/model/useLogin";
import user_logo from 'assets/mdi_user.png'
import password_logo from 'assets/mdi_password.png'
import {GoogleLoginButton} from "shared/ui/GoogleLoginButton";



interface IFormInput {
    username: string
    password: string
}

export const AuthorizationForm = () => {
    const { register, handleSubmit, formState } = useForm<IFormInput>()
    const navigate = useNavigate()
    const [loginUser] = useLogin();
    const onSubmit: SubmitHandler<IFormInput> = async (data:IFormInput) => {
        console.log(data)
        try {
            const response = await loginUser({
                variables: {
                    loginInput: {
                        username: data.username,
                        password: data.password,
                    }
                },
            });

            if (response.data) {
                localStorage.setItem('jwt', response?.data.loginUser.accessToken);
                navigate('app/dashboard');
            }

        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    return (
        <div className="flex flex-col items-start">
            <h1 className="text-3xl mb-5 ml-16 text-black">Sign In</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col justify-start gap-3 pl-1 mb-5 ml-16"
            >
                <div className={style.input_container}>
                    <img className={`${style.logo} ${style.logo_user}`} src={user_logo} alt="user_logo"/>
                    <input
                        {...register("username", {
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters',
                        },
                    })
                    }
                           type="text" placeholder="Enter username"
                           className={`${style.input} `}
                    />
                    {formState.errors.username && <p className={style.error}>{formState.errors.username.message}</p>}
                </div>
                <div className={style.input_container}>
                    <img className={`${style.logo} ${style.logo_password}`} src={password_logo} alt="password_logo"/>
                    <input
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/,
                                message:
                                    'Password must include at least one letter, one number, and one special character',
                            },
                        })}
                        type="password"
                        placeholder="Enter password"
                        className={style.input}
                    />
                    {formState.errors.password && <div className={style.error}>{formState.errors.password.message}</div>}
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="remember" name="scales" />
                    <span style={{width:"30%", color:"black"}}>
                    Remember me
                </span>
                </div>
                <input type="submit" value="Sign in" className={style.submit}/>
            </form>
            <div className='flex items-center justify-center'>
                <p className='ml-16 mr-2.5 mb-2.5 text-black'>Or, login with</p>
                <GoogleLoginButton />
            </div>

            <p className='ml-16 mb-2.5 text-black'>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>


    )
}
