import style from './RegistrationPage.module.css'
import {RegistrationFormComponent} from "../../components/RegistrationFormComponent/RegistrationFormComponent.jsx";


export const RegistrationPage = () => {
    return (
        <div className={style.registration_wrapper}>
            <h1 className='text-2xl font-bold text-white mb-5'>Please register!</h1>
            <RegistrationFormComponent />
        </div>
    )
}
