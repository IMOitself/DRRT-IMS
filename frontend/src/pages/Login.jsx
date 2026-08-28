import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const EMAIL_OFFICER = 'captain.erwin@gmail.com'
    const PASSWORD_OFFICER = 'shinzousasageyo'

    const EMAIL_MEMBER = 'levi.ackerman@gmail.com'
    const PASSWORD_MEMBER = 'shinzousasageyo'

    const testLoginAsOfficer = () => {
        axios.post('http://localhost:8000/api/login', {
            email: EMAIL_OFFICER,
            password: PASSWORD_OFFICER
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

    const testRegisterAsOfficer = () => {
        axios.post('http://localhost:8000/api/register', {
            name: 'Officer',
            email: EMAIL_OFFICER,
            password: PASSWORD_OFFICER
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
            <button onClick={testRegisterAsOfficer}> test register as Officer</button>
            <button onClick={testRegisterAsMember}> test register as Member</button>

            <button onClick={testLoginAsOfficer}> test login as Officer</button>
            <button onClick={testLoginAsMember}> test login as Member</button>
        </div>
    )
}