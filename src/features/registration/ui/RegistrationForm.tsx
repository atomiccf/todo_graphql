import React from "react";
import style from './RegistrationForm.module.css'
import { useRegister } from "features/registration/model/useRegister";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import first_name_logo from 'assets/mdi_firstName.png'
import last_name_logo from 'assets/mdi_lastName.png'
import user_logo from 'assets/mdi_user.png'
import email_logo from 'assets/ic_baseline-email.png'
import confirm_password_logo from 'assets/mdi_password-outline.png'
import password_logo from 'assets/mdi_password.png'


interface IFormInput {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    terms: boolean
}

export const RegistrationForm = () => {
    const { register, handleSubmit, formState } = useForm<IFormInput>()
    const [ createUser ] = useRegister();
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        try {

           const response= await createUser({
                variables: {
                    userInput: {
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        terms: data.terms
                    }
                }
            });

            if (response.data){
                localStorage.setItem('jwt', response?.data.createUser.accessToken);
                navigate('/app/dashboard');
            }

        } catch (err) {
            alert(`Error creating user: ${err}`)
            console.error("Error creating user:", err);
        }
    }

    return (
        <div className='flex flex-col items-start'>
            <h1 className="text-3xl mb-5 ml-16 text-black ">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col justify-start gap-3 pl-1 mb-5 ml-16"
            >
                <div className={style.input_container}>
                    <img className={`${style.logo} ${style.logo_first_name}`} src={first_name_logo} alt="first_name_logo"/>
                    <input
                        {...register("first_name", {
                          required: 'First Name is required',
                          minLength: {
                            value: 3,
                            message: 'First Name must be at least 3 characters',
                          }
                        })}
                        className={style.input}
                        type="text"
                        placeholder="Enter First Name"
                    />
                    {formState.errors.first_name && <p className={style.error}>{formState.errors.first_name.message}</p>}
                </div>
                <div className={style.input_container}>
                    <img className={`${style.logo} ${style.logo_last_name}`} src={last_name_logo} alt="last_name_logo"/>
                    <input
                        {...register("last_name", {
                          required: 'Last Name is required',
                          minLength: {
                            value: 3,
                            message: 'Last Name must be at least 3 characters',
                          }
                        })}
                        className={style.input}
                        type="text"
                        placeholder="Enter Last Name"/>
                    {formState.errors.last_name && <p className={style.error}>{formState.errors.last_name.message}</p>}
                </div>
                <div className={style.input_container}>
                    <img className={`${style.logo} ${style.logo_user}`} src={user_logo} alt="user_logo"/>
                    <input
                        {...register("username", {
                            required: 'Username is required',
                            minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters',
                            },
                        })}
                        className={style.input}
                        type="text"
                        placeholder="Enter Username"/>
                    {formState.errors.username && <p className={style.error}>{formState.errors.username.message}</p>}
                </div>
                <div className={style.input_container}>
                    <img className={`${style.logo} ${style.logo_email}`} src={email_logo} alt="email_logo"/>
                    <input
                        {...register("email", {
                            required: 'Email is required',
                            pattern: {
                                value:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                                message: 'Invalid email format'
                            }
                        })
                        }
                        className={style.input}
                        type="text"
                        placeholder="Enter Email"/>
                    {formState.errors.email && <p className={style.error}>{formState.errors.email.message}</p>}
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
                        className={style.input}
                        type="password"
                        placeholder="Enter Password"
                    />
                    {formState.errors.password && <div className={style.error}>{formState.errors.password.message}</div>}
                </div>
                <div className={style.input_container}>
                    <img className={`${style.logo} ${style.logo_confirm_password}`} src={confirm_password_logo} alt="confirm_password_logo"/>
                    <input
                        {...register('confirm_password', {
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
                        className={style.input}
                        type="password"
                        placeholder="Confirm Password"/>
                </div>
                <div className="flex items-center">
                    <input
                        {...register('terms', {
                            required: 'Agreement is required',})
                        }
                        type="checkbox"
                        id="terms"
                        name="terms" />
                    <span style={{width:"30%", color:"black"}}>
                    I agree all terms
                </span>
                </div>
                <input type="submit" value="Register" className={style.submit}/>
            </form>
            <p className='ml-16 mb-2.5 text-black'>Already have an account? <Link to="/">Sign In</Link></p>
        </div>

    );

}
