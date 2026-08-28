import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const EMAIL_ADMIN = 'captain.erwin@gmail.com'
    const PASSWORD_ADMIN = 'shinzousasageyo'

    const EMAIL_MEMBER = 'levi.ackerman@gmail.com'
    const PASSWORD_MEMBER = 'shinzousasageyo'

    const testLoginAsAdmin = () => {
        axios.post('http://localhost:8000/api/login', {
            email: EMAIL_ADMIN,
            password: PASSWORD_ADMIN
        }).then(res => {
            navigate('/')
        }).catch(err => {
            console.log(err);
        })
    }
    const testLoginAsMember = () => {
        axios.post('http://localhost:8000/api/login', {
            email: EMAIL_MEMBER,
            password: PASSWORD_MEMBER
        }).then(res => {
            navigate('/')
        }).catch(err => {
            console.log(err);
        })
    }

    const testRegisterAsAdmin = () => {
        axios.post('http://localhost:8000/api/register', {
            name: 'Admin',
            email: EMAIL_ADMIN,
            password: PASSWORD_ADMIN
        })
        .then(res => navigate('/'))
        .catch(err => {
            console.log(err);
        })
    }
    const testRegisterAsMember = () => {
        axios.post('http://localhost:8000/api/register', {
            name: 'Member',
            email: EMAIL_MEMBER,
            password: PASSWORD_MEMBER
        })
        .then(res => navigate('/'))
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='flex justify-center items-center h-screen flex-col gap-4'>
            <button onClick={testRegisterAsAdmin}> test register as Admin</button>
            <button onClick={testRegisterAsMember}> test register as Member</button>

            <button onClick={testLoginAsAdmin}> test login as Admin</button>
            <button onClick={testLoginAsMember}> test login as Member</button>
        </div>
    )
}