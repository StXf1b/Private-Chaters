import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
//styles
import './Signup.css';

export default function Signup() {
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const { signup, isPending, error } = useSignup();
    const tags = ["Member"];
    const comments = [];
    
    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, thumbnail, tags, comments);
    }

    const handleFileChange = (e) => {
        setThumbnail(null);
        let slected = e.target.files[0];
        if(!slected) {
            setThumbnailError('Please select a file');
            return;
        }
        if(!slected.type.includes('image')) {
            setThumbnailError('Please select a image file');
            return;
        }
        if(!slected.size > 1000000) {
            setThumbnailError('Image size should be less than 1MB');
            return;
        }
        setThumbnailError(null);
        setThumbnail(slected);
        console.log("Thumbnail updated")
    }

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
        <h2>Sign Up</h2>
        <label>
            <span>Username:</span>
            <input
            required
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            />
        </label>
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

        <label>
            <span>Profile Picture:</span>
            <input
            required
            type="file"
            onChange={handleFileChange}
            />
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
        </label>
        {!isPending && <button className='btn'>Sign Up</button>}
        {isPending && <button className='btn-disabled' disabled>Loading...</button>} 
        {error && <div className='error'>{error}</div>}
    </form>
  )
}
