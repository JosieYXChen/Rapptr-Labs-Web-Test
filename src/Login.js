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
    <div className="center">
      <div className="login">
        <h1>Rapptr Labs</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label><text>Email</text></label>
              <div className="wrapper">
                <i className="fas fa-user icon"></i>
                <input name="email" type="email" value={email} required placeholder="user@rapptrlabs.com" onChange={handleChange}></input>
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="wrapper">
                <i className="fas fa-lock icon"></i>
                <input name="password" type="text" value={password} required placeholder="Must be at least 4 characters" onChange={handleChange}></input>
              </div>
            </div>
            <button type="submit" disabled={submitted} >Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>)
}

export default Login;
