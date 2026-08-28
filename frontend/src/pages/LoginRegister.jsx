import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
    const navigate = useNavigate();
    
    const NAME_OFFICER = 'Captain Erwin'
    const EMAIL_OFFICER = 'captain.erwin@gmail.com'
    const PASSWORD_OFFICER = 'shinzousasageyo'

    const NAME_MEMBER = 'Levi Ackerman'
    const EMAIL_MEMBER = 'levi.ackerman@gmail.com'
    const PASSWORD_MEMBER = 'shinzousasageyo'

    const testLoginAsOfficer = () => {
        api
            .post("/login", {
                name: NAME_OFFICER,
                email: EMAIL_OFFICER,
                password: PASSWORD_OFFICER,
            })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                console.log(res.data)
                // navigate('/officer/roster')
            })
            .catch((err) => console.error(err))
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
                // navigate('/');
            })
            .catch((err) => console.error(err));
    }

    const testRegisterAsOfficer = () => {
        api
            .post("/register", {
                name: NAME_OFFICER,
                email: EMAIL_OFFICER,
                password: PASSWORD_OFFICER,
            })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                console.log(res.data)
                // navigate('/officer/roster');
            })
            .catch((err) => console.error(err));
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
                // navigate('/');
            })
            .catch((err) => console.error(err));
    }

    const testLogout = () => {
        api
            .post("/logout")
            .then((res) => {
                localStorage.removeItem('token');
                console.log(res.data)
                navigate('/')
            })
            .catch((err) => console.error(err));
    }

    return (
        <div className='flex justify-center items-center h-screen flex-col gap-4'>
            <button onClick={testRegisterAsOfficer}> test register as Officer</button>
            <button onClick={testRegisterAsMember}> test register as Member</button>

            <button onClick={testLoginAsOfficer}> test login as Officer</button>
            <button onClick={testLoginAsMember}> test login as Member</button>
            <button onClick={testLogout}> test logout</button>
        </div>
    )
}