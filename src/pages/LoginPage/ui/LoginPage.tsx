import style from './LoginPage.module.css'
import { AuthorizationForm } from "features/auth/";

export const LoginPage = () => {
    return(
        <div className={style.login_wrapper}>
            <h1 className='text-2xl mb-5'>Welcome!</h1>
            <AuthorizationForm />
        </div>
    )
}
