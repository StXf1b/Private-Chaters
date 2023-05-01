import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
//styles
import './Login.css';

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login, isPending, error } = useLogin();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }


  return (
    <form onSubmit={handleSubmit} className='auth-form'>
        <h2>Log In</h2>
        <label>
            <span>Email:</span>
            <input
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </label>
        <label>
            <span>Password:</span>
            <input
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </label>

        {!isPending && <button className='btn'>Login</button>}
        {isPending && <button className='btn-disabled' disabled>Loading...</button>} 
        {error && <div className='error'>{error}</div>}
    </form>
  )
}
