import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const NAME_OFFICER = 'Captain Erwin'
    const EMAIL_OFFICER = 'captain.erwin@gmail.com'
    const PASSWORD_OFFICER = 'shinzousasageyo'

    const NAME_MEMBER = 'Levi Ackerman'
    const EMAIL_MEMBER = 'levi.ackerman@gmail.com'
    const PASSWORD_MEMBER = 'shinzousasageyo'

    const [displayResponse, setDisplayResponse] = useState('');

    const testLoginAsOfficer = () => {
        api
            .post("/login", {
                name: NAME_OFFICER,
                email: EMAIL_OFFICER,
                password: PASSWORD_OFFICER,
            })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                setDisplayResponse(res.data.message);
                navigate('/officer/roster')
            })
            .catch((err) => setDisplayResponse(err.toString() + '\n' + err.response.data.message));
    }
    const testLoginAsMember = () => {
        api
            .post("/login", {
                name: NAME_MEMBER,
                email: EMAIL_MEMBER,
                password: PASSWORD_MEMBER,
            })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                console.log(res.data)
                navigate(location.state?.from || '/');// go back to previous page
            })
            .catch((err) => setDisplayResponse(err.toString() + '\n' + err.response.data.message));
    }

    const testRegisterAsMember = () => {
        api
            .post("/register", {
                name: NAME_MEMBER,
                email: EMAIL_MEMBER,
                password: PASSWORD_MEMBER,
            })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                console.log(res.data)
                navigate(location.state?.from || '/');// go back to previous page
            })
            .catch((err) => setDisplayResponse(err.toString() + '\n' + err.response.data.message));
    }

    const testLogout = () => {
        api
            .post("/logout")
            .then((res) => {
                localStorage.removeItem('token');
                console.log(res.data)
                // navigate('/')
            })
            .catch((err) => setDisplayResponse(err.toString() + '\n' + err.response.data.message));
    }

    return (
        <div className='flex justify-center items-center h-screen flex-col gap-4'>
            <button onClick={testRegisterAsMember} className='hover:bg-primary-container transition-all active:scale-95'>
                test register as Member
            </button>
            <button onClick={testLoginAsMember} className='hover:bg-primary-container transition-all active:scale-95'>
                test login as Member
            </button>
            <button onClick={testLoginAsOfficer} className='hover:bg-primary-container transition-all active:scale-95'>
                test login as Officer
            </button>
            <button onClick={testLogout} className='hover:bg-primary-container transition-all active:scale-95'>
                test logout
            </button>
            <textarea value={displayResponse} className="w-full"/>
        </div>
    )
}