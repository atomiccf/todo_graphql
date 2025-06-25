import style from './LoginPage.module.css'
import img from 'assets/sign_in_img.png'
import { AuthorizationForm } from "features/auth";


export const LoginPage = () => {
    return(
        <div className={style.login_wrapper}>
            <div className='flex items-center justify-around w-3/5 h-3/4 bg-white rounded min-h-[600px]'>
                <AuthorizationForm />
                <img className='mt-30' src={img} alt="phone_and_girl"/>
            </div>
        </div>
    )
}
