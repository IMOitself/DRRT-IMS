import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    
    const EMAIL_OFFICER = 'captain.erwin@gmail.com'
    const PASSWORD_OFFICER = 'shinzousasageyo'

    const EMAIL_MEMBER = 'levi.ackerman@gmail.com'
    const PASSWORD_MEMBER = 'shinzousasageyo'

    const testLoginAsOfficer = async () => {
        
    }
    const testLoginAsMember = async () => {
        
    }

    const testRegisterAsOfficer = () => {
        
    }
    const testRegisterAsMember = () => {
        
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