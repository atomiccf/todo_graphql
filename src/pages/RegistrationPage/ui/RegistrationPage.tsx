import style from './RegistrationPage.module.css'
import { RegistrationForm } from "features/registration/ui/RegistrationForm";

import img from "assets/sign_up_img.png";


export const RegistrationPage = () => {
    return (
        <div className={style.registration_wrapper}>
            <div className='flex items-center justify-around w-3/5 h-3/4 bg-white rounded min-h-[750px]'>
             <img className='mt-30' src={img} alt="phone_and_girl"/>
             <RegistrationForm />
            </div>
        </div>
    )
}
