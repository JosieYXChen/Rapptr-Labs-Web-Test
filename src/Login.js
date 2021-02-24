import './Login.css';
import {useState} from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    if(event.target.name === "email") setEmail(event.target.value);
    if(event.target.name === "password") setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmail('');
    setPassword('');
    setSubmitted(true);
  }

  return (<div className="max-width">
    <h1>Rapptr Labs</h1>
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Email</label>
        <input name="email" type="email" value={email} required placeholder="user@rapptrlabs.com" onChange={handleChange}></input>
      </div>
      <div className="field">
        <label>Password</label>
        <input name="password" type="text" value={password} required placeholder="Must be at least 4 characters" onChange={handleChange}></input>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>)
}

export default Login;
