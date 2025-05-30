import style from './LoginPage.module.css'
import {AuthorizationFormComponent} from "../../components/AuthorizationFormComponent/AuthorizationFormComponent.jsx";

export const LoginPage = () => {
    return(
        <div className={style.login_wrapper}>
            <h1 className='text-2xl mb-5'>Welcome!</h1>
            <AuthorizationFormComponent />
        </div>
    )
}
